from config.mappings import (
    FEATURE_LABELS,
    RECOMMENDATION_MAP,
    RECRUITER_DOMAIN_MAP,
    RESUME_TIPS,
    INTERVIEW_TIPS,
)
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import json
import shap
import anthropic

app = Flask(__name__)
CORS(app)

# ─── Load models ──────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, '..', 'models')

model_3m     = joblib.load(os.path.join(MODELS_DIR, 'placement_3m.pkl'))
model_6m     = joblib.load(os.path.join(MODELS_DIR, 'placement_6m.pkl'))
model_12m    = joblib.load(os.path.join(MODELS_DIR, 'placement_12m.pkl'))
model_salary = joblib.load(os.path.join(MODELS_DIR, 'salary_model.pkl'))
model_risk   = joblib.load(os.path.join(MODELS_DIR, 'risk_model.pkl'))
risk_encoder = joblib.load(os.path.join(MODELS_DIR, 'risk_encoder.pkl'))
feature_names = joblib.load(os.path.join(MODELS_DIR, 'feature_names.pkl'))

# SHAP explainer (load once at startup — expensive)
explainer_6m = shap.TreeExplainer(model_6m)

# Cohort stats for percentile benchmarking
_cohort_path = os.path.join(MODELS_DIR, 'cohort_stats.json')
with open(_cohort_path) as f:
    COHORT_STATS = json.load(f)

# Anthropic client
_anthropic = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY", ""))

# ─── Static mappings ──────────────────────────────────────────────────────────
COURSES = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "MBA",
    "Biotech", "Nursing", "Commerce", "Law", "Architecture",
    "Psychology", "Pharmacy", "Agriculture", "Media", "Mathematics"
]
COURSE_MAP = {c: i for i, c in enumerate(COURSES)}

TIER_MAP = {
    "Tier 1 (IIT / IIM / NIT / Top 10)": 1,
    "Tier 2 (State govt. / NAAC A)":     2,
    "Tier 3 (Private / NAAC B)":         3,
}
DEMAND_MAP   = {"Very high": 3, "High": 2, "Moderate": 2, "Low": 1}
ACTIVITY_MAP = {"Actively applying (daily)": 3, "Occasionally browsing": 2, "Not started": 1}

TIER_SCORE = {1: 1.0, 2: 0.7, 3: 0.4}
CELL_SCORE = {
    "Very active (100+ recruiters)": 1.0, "Active (50–100 recruiters)": 0.75,
    "Moderate": 0.45, "Weak / inactive": 0.2, "": 0.4
}
TREND_SCORE  = {"Consistently strong": 1.0, "Improving": 0.8, "Consistent": 0.6, "Declining": 0.3, "": 0.5}
IQ_SCORE     = {"Fortune 500 / MNC": 1.0, "Mid-size company": 0.75, "Startup": 0.6,
                "Research / Academic lab": 0.65, "No internship": 0.0, "": 0.0}
SKILL_SCORE  = {"Advanced (industry-ready)": 1.0, "Intermediate": 0.6, "Beginner": 0.25, "": 0.4}
PROJ_SCORE   = {"Published / deployed project": 1.0, "Multiple academic projects": 0.7,
                "1–2 college projects": 0.4, "None": 0.1, "": 0.3}
PIPELINE_SCORE = {"Offers in hand": 1.0, "Multiple rounds ongoing": 0.8,
                  "First rounds scheduled": 0.5, "No interviews yet": 0.1, "": 0.2}
MACRO_SCORE  = {"Hiring boom / expansion": 1.0, "Stable": 0.7,
                "Slowdown / cautious hiring": 0.4, "Recession / layoffs": 0.15, "": 0.6}
JPA_SCORE    = {"Actively applying (daily)": 1.0, "Occasionally browsing": 0.5, "Not started": 0.1, "": 0.3}

IQ_NUM = {
    "Fortune 500 / MNC": 4, "Mid-size company": 3, "Startup": 2,
    "Research / Academic lab": 1, "No internship": 0, "": 0
}
SKILL_NUM    = {"Beginner": 0, "Intermediate": 1, "Advanced (industry-ready)": 2}
PROJ_NUM     = {"None": 0, "1–2 college projects": 1, "Multiple academic projects": 2,
                "Published / deployed project": 3}
CELL_NUM     = {"Weak / inactive": 0, "Moderate": 1, "Active (50–100 recruiters)": 2,
                "Very active (100+ recruiters)": 3}
REGION_NUM   = {"Tier 3 city / rural": 0.3, "Tier 2 city": 0.6,
                "Metro (Mumbai/Delhi/Bangalore)": 1.0, "International / remote": 0.9}
MACRO_NUM    = {"Recession / layoffs": 1, "Slowdown / cautious hiring": 2, "Stable": 3, "Hiring boom / expansion": 4}
PIPELINE_NUM = {"No interviews yet": 0, "First rounds scheduled": 1,
                "Multiple rounds ongoing": 2, "Offers in hand": 3, "": 0}


def _cohort_percentile(course_str: str, tier_val: int, p6: float) -> dict:
    key = f"{course_str}|{tier_val}"
    stats = COHORT_STATS.get(key)
    if not stats:
        return {"percentile": None, "cohort_size": 0, "cohort_p6_avg": None}
    scores = stats["p6_scores"]
    below  = sum(1 for s in scores if s <= p6)
    pct    = round(below / len(scores) * 100)
    return {
        "percentile":    pct,
        "cohort_size":   stats["count"],
        "cohort_p6_avg": stats["p6_mean"],
        "cohort_sal_avg": stats["salary_mean"],
    }


def _ai_summary(course_str, tier_str, cgpa, internships, risk, salary,
                timeline, top_positive, top_negative, riskScore):
    """Call Anthropic API for a lender-ready 3-sentence summary."""
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        return None   # fall back to template in frontend

    pos_str = ", ".join(
        f"{FEATURE_LABELS.get(x['feature'], x['feature'])} (positive)"
        for x in top_positive[:2]
    )
    neg_str = ", ".join(
        f"{FEATURE_LABELS.get(x['feature'], x['feature'])} (risk)"
        for x in top_negative[:2]
    )

    prompt = (
        f"You are a concise loan-risk analyst. Write exactly 3 sentences for a lender.\n"
        f"Student: {course_str}, {tier_str.split('(')[0].strip()}, CGPA {cgpa}, "
        f"{internships} internship(s).\n"
        f"Model output: {risk} placement risk (score {riskScore}/100), "
        f"expected salary {round(salary,1)} LPA, timeline: {timeline}.\n"
        f"Key drivers: {pos_str}. Risk factors: {neg_str}.\n"
        f"Sentence 1: overall risk verdict. Sentence 2: top strength and top risk factor. "
        f"Sentence 3: one concrete action for the lender. Plain English, no bullet points."
    )

    try:
        msg = _anthropic.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=180,
            messages=[{"role": "user", "content": prompt}],
        )
        return msg.content[0].text.strip()
    except Exception:
        return None


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    try:
        # ── Parse inputs ──────────────────────────────────────────────────
        cgpa             = float(data.get('cgpa', 6.0))
        internships      = int(data.get('internships', 0))
        certifications   = int(data.get('certifications', 0))
        course_str       = data.get('course', 'Computer Science')
        tier_str         = data.get('tier', 'Tier 2 (State govt. / NAAC A)')
        placement_rate   = float(data.get('placement_rate', 65))
        avg_salary       = float(data.get('avg_salary', 6.0))
        job_demand_str   = data.get('job_demand', 'Moderate')
        job_activity_str = data.get('job_activity', 'Occasionally browsing')
        skill_str        = data.get('skill', 'Intermediate')
        intern_quality   = data.get('intern_quality', '')
        projects_str     = data.get('projects', '')
        placement_cell   = data.get('placement_cell', '')
        pipeline_str     = data.get('pipeline', '')
        macro_str        = data.get('macro', 'Stable')
        region_str       = data.get('region', '')
        trend_str        = data.get('trend', '')

        course_enc   = COURSE_MAP.get(course_str, 0)
        tier_val     = TIER_MAP.get(tier_str, 2)
        demand_enc   = DEMAND_MAP.get(job_demand_str, 2)
        activity_enc = ACTIVITY_MAP.get(job_activity_str, 2)

        # ── Build model input ─────────────────────────────────────────────
        input_df = pd.DataFrame([{
            'cgpa':           cgpa,
            'internships':    internships,
            'intern_quality': IQ_NUM.get(intern_quality, 0),
            'certifications': certifications,
            'skill_level':    SKILL_NUM.get(skill_str, 1),
            'projects_score': PROJ_NUM.get(projects_str, 1),
            'course':         course_enc,
            'tier':           tier_val,
            'placement_rate': placement_rate,
            'avg_salary':     avg_salary,
            'placement_cell': CELL_NUM.get(placement_cell, 1),
            'job_demand':     demand_enc,
            'job_activity':   activity_enc,
            'region_density': REGION_NUM.get(region_str, 0.6),
            'macro':          MACRO_NUM.get(macro_str, 3),
            'pipeline':       PIPELINE_NUM.get(pipeline_str, 0),
        }])

        # ── SHAP ──────────────────────────────────────────────────────────
        shap_vals = explainer_6m.shap_values(input_df)
        if isinstance(shap_vals, list):
            sv = shap_vals[1][0]   # class 1 (placed)
        else:
            sv = shap_vals[0]

        shap_pairs   = sorted(zip(feature_names, sv.tolist()), key=lambda x: abs(x[1]), reverse=True)
        top_positive = [{"feature": k, "impact": round(v, 3)} for k, v in shap_pairs if v > 0][:3]
        top_negative = [{"feature": k, "impact": round(v, 3)} for k, v in shap_pairs if v < 0][:3]

        # ── Predictions ───────────────────────────────────────────────────
        p3  = float(model_3m.predict_proba(input_df)[0][1])
        p6  = float(model_6m.predict_proba(input_df)[0][1])
        p12 = float(model_12m.predict_proba(input_df)[0][1])
        p6  = max(p6, p3)
        p12 = max(p12, p6)

        salary = float(model_salary.predict(input_df)[0])

        # Salary adjustments
        penalty = 1.0
        if internships == 0:    penalty -= 0.25
        elif internships == 1:  penalty -= 0.15
        if certifications == 0: penalty -= 0.05
        if tier_val == 3:       penalty -= 0.15
        elif tier_val == 2:     penalty -= 0.05
        salary = salary * max(penalty, 0.4)
        salary = min(salary, avg_salary * 1.4)
        salary = max(salary, avg_salary * 0.45)

        # ── Risk ──────────────────────────────────────────────────────────
        risk_pred = model_risk.predict(input_df)[0]
        risk      = risk_encoder.inverse_transform([risk_pred])[0].capitalize()
        riskScore = int((1 - p6) * 100)
        salary    = salary * (1 - riskScore / 300)
        salary    = max(salary, avg_salary * 0.4)

        # ── Factor scores ─────────────────────────────────────────────────
        acadScore = (
            ((cgpa - 5) / 5) * 0.5 +
            TREND_SCORE.get(trend_str, 0.5) * 0.3 +
            min(certifications / 8, 1) * 0.2
        )
        expScore = min(
            (internships / 5) * 0.35 +
            IQ_SCORE.get(intern_quality, 0) * 0.3 +
            SKILL_SCORE.get(skill_str, 0.4) * 0.2 +
            PROJ_SCORE.get(projects_str, 0.3) * 0.15,
            1.0
        )
        instScore = (
            TIER_SCORE.get(tier_val, 0.5) * 0.4 +
            CELL_SCORE.get(placement_cell, 0.4) * 0.3 +
            (placement_rate / 100) * 0.3
        )
        marketScore = (
            (demand_enc / 3) * 0.35 +
            MACRO_SCORE.get(macro_str, 0.6) * 0.30 +
            JPA_SCORE.get(job_activity_str, 0.3) * 0.20 +
            PIPELINE_SCORE.get(pipeline_str, 0.2) * 0.15
        )

        total      = acadScore * 0.25 + expScore * 0.25 + instScore * 0.25 + marketScore * 0.25
        confidence = min(0.96, max(0.50, 0.58 + total * 0.32))

        # ── Timeline ──────────────────────────────────────────────────────
        if p3 > 0.65:       timeline = 'Within 3 months'
        elif p6 > 0.65:     timeline = 'Within 6 months'
        elif p12 > 0.70:    timeline = 'Within 12 months'
        else:               timeline = 'Likely delayed'

        # ── SHAP-driven recommendations ───────────────────────────────────
        # Rank weak features by magnitude, map to rich recommendation objects
        neg_features = [f for f, v in shap_pairs if v < 0]
        recs = []
        seen = set()
        for f in neg_features:
            if f in RECOMMENDATION_MAP and f not in seen:
                recs.append(RECOMMENDATION_MAP[f])
                seen.add(f)
            if len(recs) == 4:
                break
        # Always ensure at least 2 recs
        if len(recs) < 2:
            for f in ["job_activity", "pipeline"]:
                if f not in seen and f in RECOMMENDATION_MAP:
                    recs.append(RECOMMENDATION_MAP[f])

        # ── Resume & interview coaching ───────────────────────────────────
        resume_tips    = []
        interview_tips = []
        for f, v in shap_pairs:
            if v < 0:
                if f in RESUME_TIPS:    resume_tips.append(RESUME_TIPS[f])
                if f in INTERVIEW_TIPS: interview_tips.append(INTERVIEW_TIPS[f])
            if len(resume_tips) >= 3 and len(interview_tips) >= 3:
                break

        # ── Recruiter matches (SHAP-driven) ──────────────────────────────
        # Use top positive SHAP features to surface best-fit recruiter types
        recruiters = []
        seen_r = set()
        for f, v in shap_pairs[:6]:
            for domain in RECRUITER_DOMAIN_MAP.get(f, []):
                if domain not in seen_r:
                    recruiters.append(domain)
                    seen_r.add(domain)
            if len(recruiters) >= 5:
                break

        # ── Cohort percentile ─────────────────────────────────────────────
        cohort = _cohort_percentile(course_str, tier_val, p6)

        # ── AI summary (Anthropic) ────────────────────────────────────────
        ai_summary = _ai_summary(
            course_str, tier_str, cgpa, internships,
            risk, salary, timeline, top_positive, top_negative, riskScore
        )

        # ── Template summary fallback ─────────────────────────────────────
        strengths, concerns = [], []
        if cgpa >= 7.5:                                 strengths.append('strong academic record')
        if internships >= 2:                            strengths.append('solid internship history')
        if expScore > 0.7:                              strengths.append('industry-ready skill profile')
        if instScore > 0.7:                             strengths.append('strong institute placement infrastructure')
        if cgpa < 6.5:                                  concerns.append('low CGPA')
        if internships == 0:                            concerns.append('no internship exposure')
        if SKILL_SCORE.get(skill_str, 0.4) < 0.3:      concerns.append('early-stage skill level')
        if marketScore < 0.45:                          concerns.append('challenging market conditions')
        if PIPELINE_SCORE.get(pipeline_str, 0.2) < 0.35: concerns.append('no active interview pipeline')

        s_str  = f"Key strengths: {', '.join(strengths[:3])}. " if strengths else ''
        c_str  = f"Primary risk drivers: {', '.join(concerns)}. " if concerns else 'No significant risk flags. '
        action = (
            'Lenders should consider conditional disbursement with mandatory skill-up milestones.'
            if risk == 'High' else
            'Recommend monitoring interview progress at the 3-month mark.'
            if risk == 'Medium' else
            'Standard processing recommended — low repayment risk.'
        )
        template_summary = (
            f"This {course_str} student from a {tier_str.split('(')[0].strip()} institute shows "
            f"overall placement risk of {risk.lower()} (score: {riskScore}/100) with model "
            f"confidence of {round(confidence*100)}%. {s_str}{c_str}"
            f"Predicted salary: {round(salary*0.8,1)}–{round(salary*1.2,1)} LPA. {action}"
        )

        summary = ai_summary if ai_summary else template_summary

        # ── Response ──────────────────────────────────────────────────────
        return jsonify({
            'p3':  round(p3, 3),
            'p6':  round(p6, 3),
            'p12': round(p12, 3),

            'salMid': round(salary, 2),
            'salLo':  round(salary * 0.8, 2),
            'salHi':  round(salary * 1.2, 2),
            'avgCtc': avg_salary,

            'risk':       risk,
            'riskScore':  riskScore,
            'confidence': round(confidence, 3),
            'timeline':   timeline,
            'summary':    summary,
            'ai_powered': bool(ai_summary),

            'acadScore':   round(max(min(acadScore, 1), 0), 3),
            'expScore':    round(max(min(expScore,  1), 0), 3),
            'instScore':   round(max(min(instScore, 1), 0), 3),
            'marketScore': round(max(min(marketScore, 1), 0), 3),

            'cgpa':     cgpa,
            'interns':  internships,
            'skill':    skill_str,
            'demand':   job_demand_str,
            'macro':    MACRO_SCORE.get(macro_str, 0.6),
            'pipeline': PIPELINE_SCORE.get(pipeline_str, 0.2),
            'proj':     PROJ_SCORE.get(projects_str, 0.3),

            'shap_positive': top_positive,
            'shap_negative': top_negative,

            'recommendations': recs,
            'resume_tips':     resume_tips,
            'interview_tips':  interview_tips,
            'recruiters':      recruiters,

            'cohort': cohort,
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/whatif', methods=['POST'])
def whatif():
    """Accepts same payload as /predict, returns just the key deltas.
    Frontend sends modified profile; we return new p6, riskScore, salary, timeline."""
    return predict()   # identical logic, frontend diffs the numbers


if __name__ == '__main__':
    app.run(debug=True, port=5000)