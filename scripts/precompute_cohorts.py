"""
Run once: python scripts/precompute_cohorts.py
Generates models/cohort_stats.json used by api.py for percentile benchmarking.
"""
import pandas as pd
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, '..', 'data', 'students_data.csv')
OUT_PATH = os.path.join(BASE_DIR, '..', 'models', 'cohort_stats.json')

COURSES = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "MBA",
    "Biotech", "Nursing", "Commerce", "Law", "Architecture",
    "Psychology", "Pharmacy", "Agriculture", "Media", "Mathematics"
]
IDX_COURSE = {i: c for i, c in enumerate(COURSES)}

df = pd.read_csv(CSV_PATH)
df['course_name'] = df['course'].map(IDX_COURSE)

cohorts = {}
for (course_name, tier), grp in df.groupby(['course_name', 'tier']):
    key = f"{course_name}|{int(tier)}"
    cohorts[key] = {
        "count":       len(grp),
        "p6_mean":     round(float(grp['placed_6m'].mean()), 3),
        "salary_mean": round(float(grp['salary'].mean()), 2),
        "salary_p25":  round(float(grp['salary'].quantile(0.25)), 2),
        "salary_p75":  round(float(grp['salary'].quantile(0.75)), 2),
        # Store sorted p6 values for percentile lookup
        "p6_scores":   sorted([round(float(x), 3) for x in grp['placed_6m'].tolist()])
    }

with open(OUT_PATH, 'w') as f:
    json.dump(cohorts, f, indent=2)

print(f"Cohort stats written to {OUT_PATH}")
print(f"Total cohorts: {len(cohorts)}")
for k, v in list(cohorts.items())[:3]:
    print(f"  {k}: n={v['count']}, p6_mean={v['p6_mean']}, sal_mean={v['salary_mean']}")