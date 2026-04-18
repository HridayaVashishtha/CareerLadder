import pandas as pd
import numpy as np
import random, math

random.seed(42)
np.random.seed(42)

COURSES = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "MBA",
    "Biotech", "Nursing", "Commerce", "Law", "Architecture",
    "Psychology", "Pharmacy", "Agriculture", "Media", "Mathematics"
]

SALARY_MAP = {
    "Computer Science": {1: (12, 40), 2: (6, 18), 3: (3, 9)},
    "Electronics":      {1: (10, 28), 2: (5, 14), 3: (3, 8)},
    "Mechanical":       {1: (8, 22),  2: (4, 12), 3: (3, 7)},
    "Civil":            {1: (7, 18),  2: (4, 10), 3: (2, 6)},
    "MBA":              {1: (14, 45), 2: (7, 20), 3: (4, 10)},
    "Biotech":          {1: (8, 20),  2: (4, 11), 3: (2, 6)},
    "Nursing":          {1: (5, 14),  2: (3, 9),  3: (2, 6)},
    "Commerce":         {1: (8, 22),  2: (4, 12), 3: (3, 7)},
    "Law":              {1: (10, 30), 2: (5, 15), 3: (3, 8)},
    "Architecture":     {1: (8, 22),  2: (4, 12), 3: (2, 7)},
    "Psychology":       {1: (6, 16),  2: (3, 9),  3: (2, 5)},
    "Pharmacy":         {1: (6, 16),  2: (3, 10), 3: (2, 6)},
    "Agriculture":      {1: (5, 14),  2: (3, 8),  3: (2, 5)},
    "Media":            {1: (6, 18),  2: (3, 10), 3: (2, 6)},
    "Mathematics":      {1: (8, 24),  2: (4, 13), 3: (3, 7)},
}

DEMAND_BASE = {
    "Computer Science": 3, "Electronics": 2, "Mechanical": 2, "Civil": 1,
    "MBA": 3, "Biotech": 2, "Nursing": 2, "Commerce": 2, "Law": 2,
    "Architecture": 1, "Psychology": 1, "Pharmacy": 2, "Agriculture": 1,
    "Media": 1, "Mathematics": 2
}

COURSE_MAP = {c: i for i, c in enumerate(COURSES)}

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

data = []
for _ in range(12000):
    course = random.choice(COURSES)
    tier = random.choices([1, 2, 3], weights=[0.15, 0.42, 0.43])[0]

    cgpa_skew = random.choices(['low', 'mid', 'high'], weights=[0.42, 0.38, 0.20])[0]
    if cgpa_skew == 'low':
        cgpa = round(np.random.uniform(3.5, 6.2), 2)
    elif cgpa_skew == 'mid':
        cgpa = round(np.random.uniform(6.0, 7.8), 2)
    else:
        cgpa = round(np.random.uniform(7.5, 10.0), 2)

    internships    = random.choices([0,1,2,3,4], weights=[0.48, 0.28, 0.14, 0.07, 0.03])[0]
    intern_quality = random.choices([0,1,2,3,4], weights=[0.48, 0.15, 0.18, 0.12, 0.07])[0]
    if internships == 0:
        intern_quality = 0

    certifications = random.choices([0,1,2,3,4,5], weights=[0.30, 0.25, 0.20, 0.13, 0.08, 0.04])[0]
    skill_level    = random.choices([0,1,2],        weights=[0.40, 0.42, 0.18])[0]
    projects_score = random.choices([0,1,2,3],      weights=[0.30, 0.30, 0.25, 0.15])[0]

    sal_range      = SALARY_MAP[course][tier]
    avg_salary     = round(random.uniform(*sal_range), 1)
    placement_rate = random.randint(25, 98)
    placement_cell = random.choices([0,1,2,3], weights=[0.30, 0.30, 0.25, 0.15])[0]

    job_demand   = DEMAND_BASE[course] + random.choice([-1, -1, 0, 0, 1])
    job_demand   = min(max(job_demand, 1), 3)
    job_activity = random.choices([1,2,3], weights=[0.40, 0.38, 0.22])[0]

    region_density = random.uniform(0.1, 1.0)
    macro          = random.choices([1,2,3,4], weights=[0.25, 0.38, 0.25, 0.12])[0]
    pipeline       = random.choices([0,1,2,3,4], weights=[0.38, 0.25, 0.20, 0.12, 0.05])[0]

    score = (
        (cgpa - 5) * 0.8 +
        internships * 1.8 +
        intern_quality * 0.9 +
        certifications * 0.5 +
        skill_level * 1.5 +
        projects_score * 0.8 +
        (4 - tier) * 2.2 +
        (placement_rate / 100) * 3.0 +
        placement_cell * 0.7 +
        job_demand * 1.8 +
        job_activity * 1.2 +
        region_density * 1.5 +
        macro * 0.8 +
        pipeline * 1.2
    )

    score += np.random.normal(0, 5.5)

    p3  = sigmoid((score - 22) / 4.5)
    p6  = sigmoid((score - 18) / 4.5)
    p12 = sigmoid((score - 13) / 4.5)

    placed_3m  = int(random.random() < p3)
    placed_6m  = int(random.random() < p6)
    placed_12m = int(random.random() < p12)

    placed_6m  = max(placed_6m, placed_3m)
    placed_12m = max(placed_12m, placed_6m)

    if random.random() < 0.18: placed_3m  = 1 - placed_3m
    if random.random() < 0.13: placed_6m  = 1 - placed_6m
    if random.random() < 0.10: placed_12m = 1 - placed_12m

    placed_6m  = max(placed_6m, placed_3m)
    placed_12m = max(placed_12m, placed_6m)

    salary = round(avg_salary * (0.60 + 0.65 * p6) + np.random.normal(0, 2.0), 1)
    salary = min(max(salary, sal_range[0] * 0.55), sal_range[1] * 1.15)

    risk = "low" if p6 > 0.72 else "medium" if p6 > 0.35 else "high"

    data.append([
        cgpa, internships, intern_quality, certifications, skill_level,
        projects_score, COURSE_MAP[course], tier, placement_rate, avg_salary,
        placement_cell, job_demand, job_activity, region_density, macro, pipeline,
        placed_3m, placed_6m, placed_12m, salary, risk
    ])

df = pd.DataFrame(data, columns=[
    "cgpa", "internships", "intern_quality", "certifications", "skill_level",
    "projects_score", "course", "tier", "placement_rate", "avg_salary",
    "placement_cell", "job_demand", "job_activity", "region_density", "macro", "pipeline",
    "placed_3m", "placed_6m", "placed_12m", "salary", "risk"
])

df.to_csv("data/students_data.csv", index=False)
print("Dataset ready!", df.shape)
print("\nPlacement label counts:")
print("3m:", df["placed_3m"].value_counts().to_dict())
print("6m:", df["placed_6m"].value_counts().to_dict())
print("12m:", df["placed_12m"].value_counts().to_dict())
print("\nRisk distribution:")
print(df["risk"].value_counts().to_dict())