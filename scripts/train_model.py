import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.metrics import classification_report, mean_absolute_error
from sklearn.preprocessing import LabelEncoder
from sklearn.utils.class_weight import compute_sample_weight
import joblib
import numpy as np

df = pd.read_csv("data/students_data.csv")

le_risk = LabelEncoder()
df["risk_enc"] = le_risk.fit_transform(df["risk"])

FEATURES = [
    "cgpa", "internships", "intern_quality", "certifications", "skill_level",
    "projects_score", "course", "tier", "placement_rate", "avg_salary",
    "placement_cell", "job_demand", "job_activity", "region_density", "macro", "pipeline"
]

X = df[FEATURES]
joblib.dump(FEATURES, "models/feature_names.pkl")

X_train, X_test = train_test_split(df, test_size=0.2, random_state=42, stratify=df["placed_6m"])

print("=" * 55)
print(f"Train: {len(X_train)} | Test: {len(X_test)}")
print("=" * 55)

for target, fname in [
    ("placed_3m",  "placement_3m"),
    ("placed_6m",  "placement_6m"),
    ("placed_12m", "placement_12m"),
]:
    sw = compute_sample_weight("balanced", X_train[target])

    clf = GradientBoostingClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.04,
        subsample=0.8,
        min_samples_leaf=10,
        random_state=42
    )
    clf.fit(X_train[FEATURES], X_train[target], sample_weight=sw)

    # CV without sample_weight (just for rough trend, not leaking fit_params)
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_val_score(clf, X_train[FEATURES], X_train[target],
                                cv=cv, scoring='f1_macro')
    print(f"\n{target} — CV macro-F1: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
    print("Test report:")
    print(classification_report(X_test[target], clf.predict(X_test[FEATURES])))
    joblib.dump(clf, f"models/{fname}.pkl")

# Salary
print("\n── Salary ──")
reg = GradientBoostingRegressor(
    n_estimators=300, max_depth=5, learning_rate=0.04,
    subsample=0.8, min_samples_leaf=10, random_state=42
)
reg.fit(X_train[FEATURES], X_train["salary"])
preds = reg.predict(X_test[FEATURES])
mae  = mean_absolute_error(X_test["salary"], preds)
mape = np.mean(np.abs((X_test["salary"] - preds) / X_test["salary"].clip(lower=0.1))) * 100
print(f"MAE: {mae:.2f} LPA | MAPE: {mape:.1f}%")
joblib.dump(reg, "models/salary_model.pkl")

# Risk
print("\n── Risk classifier ──")
sw_risk = compute_sample_weight("balanced", X_train["risk_enc"])
risk_clf = GradientBoostingClassifier(
    n_estimators=300, max_depth=4, learning_rate=0.04,
    subsample=0.8, min_samples_leaf=15, random_state=42
)
risk_clf.fit(X_train[FEATURES], X_train["risk_enc"], sample_weight=sw_risk)
print(classification_report(X_test["risk_enc"], risk_clf.predict(X_test[FEATURES]),
      target_names=le_risk.classes_))
joblib.dump(risk_clf, "models/risk_model.pkl")
joblib.dump(le_risk,  "models/risk_encoder.pkl")

print("All models saved.")