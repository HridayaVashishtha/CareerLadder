# ─── FEATURE LABELS (UI friendly) ────────────────────────────────────────────
FEATURE_LABELS = {
    "cgpa":           "Academic score (CGPA)",
    "internships":    "Internship count",
    "intern_quality": "Internship quality",
    "certifications": "Certifications",
    "skill_level":    "Skill level",
    "projects_score": "Projects / portfolio",
    "course":         "Course",
    "tier":           "Institute tier",
    "placement_rate": "Historic placement rate",
    "avg_salary":     "Institute average salary",
    "placement_cell": "Placement cell strength",
    "job_demand":     "Field job demand",
    "job_activity":   "Job search activity",
    "region_density": "Location job density",
    "macro":          "Market conditions",
    "pipeline":       "Interview pipeline",
}

# ─── SHAP feature → recommended action ───────────────────────────────────────
RECOMMENDATION_MAP = {
    "cgpa": {
        "title": "Improve academic performance",
        "desc":  "Focus on scoring above 7.5 in remaining semesters — many recruiters use CGPA as a filter.",
        "type":  "academic"
    },
    "internships": {
        "title": "Secure an internship immediately",
        "desc":  "Even a 6-week internship at a mid-size company significantly improves placement probability.",
        "type":  "experience"
    },
    "intern_quality": {
        "title": "Target higher-quality internships",
        "desc":  "MNC or startup internships signal stronger industry readiness than academic lab work alone.",
        "type":  "experience"
    },
    "certifications": {
        "title": "Earn a recognised certification",
        "desc":  "Complete field-specific certs (e.g. AWS, CFA, NCLEX, PMP) to signal job-readiness to recruiters.",
        "type":  "skill"
    },
    "skill_level": {
        "title": "Upskill to industry-ready level",
        "desc":  "Use platforms like Coursera, Udemy, or NPTEL. Focus on the top 2-3 tools in your field.",
        "type":  "skill"
    },
    "projects_score": {
        "title": "Build a deployed project",
        "desc":  "A real, published project (GitHub, live product, or case study) is weighted heavily by recruiters.",
        "type":  "portfolio"
    },
    "placement_rate": {
        "title": "Leverage your placement cell",
        "desc":  "Register early, attend all mock drives, and connect with alumni at target companies.",
        "type":  "network"
    },
    "job_demand": {
        "title": "Explore adjacent high-demand roles",
        "desc":  "Consider roles in adjacent domains that are currently hiring heavily in your field.",
        "type":  "market"
    },
    "job_activity": {
        "title": "Apply actively — 5–10 roles per day",
        "desc":  "Use LinkedIn, Naukri, Internshala, and company career pages. Consistency beats volume.",
        "type":  "action"
    },
    "pipeline": {
        "title": "Push interviews to final rounds",
        "desc":  "Follow up on pending applications, practice mock interviews, and target companies already engaging you.",
        "type":  "action"
    },
    "placement_cell": {
        "title": "Engage placement drives actively",
        "desc":  "Attend all pre-placement talks and company-specific bootcamps offered by your institute.",
        "type":  "network"
    },
    "region_density": {
        "title": "Consider relocating to a higher-opportunity region",
        "desc":  "Metro cities have 3–5x more active job postings. Even remote-first roles are easier to access from metros.",
        "type":  "market"
    },
    "macro": {
        "title": "Target recession-resilient sectors",
        "desc":  "Healthcare, government, and essential services hire steadily even in downturns.",
        "type":  "market"
    },
    "tier": {
        "title": "Compensate for institute tier with strong credentials",
        "desc":  "Build a strong LinkedIn, certifications, and GitHub to offset recruiter bias toward higher-tier institutes.",
        "type":  "network"
    },
    "avg_salary": {
        "title": "Research realistic salary bands",
        "desc":  "Align expectations with your institute's actual CTC benchmarks to avoid screening yourself out.",
        "type":  "academic"
    },
}

# ─── SHAP feature → recruiter domain types ───────────────────────────────────
RECRUITER_DOMAIN_MAP = {
    "cgpa":           ["Consulting firms", "BFSI companies", "Campus-first recruiters"],
    "internships":    ["MNCs with return-offer programs", "Structured graduate programs"],
    "intern_quality": ["Fortune 500 companies", "Global tech firms"],
    "certifications": ["Specialised tech roles", "Finance / audit firms", "Healthcare firms"],
    "skill_level":    ["Product-based tech companies", "SaaS startups"],
    "projects_score": ["Startups", "Product companies", "Research organisations"],
    "placement_rate": ["Campus placement partners", "Mass-hiring companies"],
    "job_demand":     ["High-growth sector employers"],
    "job_activity":   ["Companies with rolling applications"],
    "pipeline":       ["Companies already in your interview funnel"],
    "placement_cell": ["Campus-partnered corporates"],
    "region_density": ["Metro-based companies", "Remote-first employers"],
    "macro":          ["Stable industries", "Government-adjacent sectors"],
}

# ─── Resume coaching tips by weak feature ────────────────────────────────────
RESUME_TIPS = {
    "cgpa":           "Add a 'Key Courses' section highlighting your strongest subjects — this shifts focus from GPA to depth.",
    "internships":    "Add any freelance work, open-source contributions, or volunteer roles to your experience section.",
    "intern_quality": "Quantify impact from internships: '↑ 18% system efficiency' beats 'worked on backend systems'.",
    "certifications": "List certifications with provider and date. Incomplete certs still signal intent — mark them 'In Progress'.",
    "skill_level":    "Add a Skills matrix with proficiency levels. Recruiters scan for keywords — match your target JD.",
    "projects_score": "Give each project a one-line impact statement: 'Deployed X, used by Y users, reduced Z by N%'.",
    "pipeline":       "Tailor your resume header/summary to each company's domain before applying.",
    "job_activity":   "Ensure your LinkedIn is 100% complete and matches your resume — many recruiters cross-check.",
}

# ─── Interview coaching tips by weak feature ──────────────────────────────────
INTERVIEW_TIPS = {
    "cgpa":           "Prepare to address academic gaps proactively. Have a confident 30-second story ready.",
    "internships":    "Use the STAR method (Situation, Task, Action, Result) for any academic project when asked about experience.",
    "intern_quality": "Practice behavioural questions about impact: what did you own, what did you change, what was the result.",
    "skill_level":    "For tech roles: practice 2 LeetCode problems daily. For others: prepare 3 domain case studies.",
    "projects_score": "Be ready to do a live demo or whiteboard walkthrough of your best project.",
    "pipeline":       "Send a follow-up email 48h after every interview. 60% of candidates don't — this alone sets you apart.",
    "job_activity":   "Set a target: 5 applications + 1 networking message per day. Track in a simple spreadsheet.",
    "macro":          "Research the company's recent news before interviews — show you understand their market position.",
}