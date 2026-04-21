const API_BASE = 'http://127.0.0.1:5000';

export interface FormData {
  cgpa: number;
  trend: string;
  course: string;
  year: string;
  internships: number;
  intern_quality: string;
  certifications: number;
  skill: string;
  projects: string;
  tier: string;
  placement_cell: string;
  placement_rate: number;
  avg_salary: number;
  job_demand: string;
  region: string;
  job_activity: string;
  pipeline: string;
  macro: string;
}

export interface PredictionResult {
  riskScore: number;
  risk: 'Low' | 'Medium' | 'High';
  confidence: number;
  p3: number;
  p6: number;
  p12: number;
  salMid: number;
  salLo: number;
  salHi: number;
  avgCtc: number;
  timeline: string;
  acadScore: number;
  expScore: number;
  instScore: number;
  marketScore: number;
  shap_positive?: Array<{ feature: string }>;
  shap_negative?: Array<{ feature: string }>;
  recommendations?: Array<{ title: string; desc: string }>;
  resume_tips?: string[];
  interview_tips?: string[];
  recruiters?: string[];
  summary?: string;
  ai_powered?: boolean;
  cohort?: {
    percentile: number | null;
    cohort_p6_avg: number;
    cohort_sal_avg: number;
    cohort_size: number;
  };
  cgpa: number;
  interns: number;
}

export async function predict(data: FormData): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Server ${res.status}`);
  const result = await res.json();
  if (result.error) throw new Error(result.error);
  return result;
}

export async function whatIf(data: FormData): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/whatif`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Server ${res.status}`);
  return await res.json();
}

export async function saveAssessment(
  studentId: string,
  formData: FormData,
  predictionResult: PredictionResult
): Promise<{ success: boolean; message: string; student_id: string }> {
  const res = await fetch(`${API_BASE}/save-assessment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      student_id: studentId,
      form_data: formData,
      prediction_result: predictionResult,
    }),
  });

  if (!res.ok) throw new Error(`Server ${res.status}`);
  const result = await res.json();
  if (result.error) throw new Error(result.error);
  return result;
}

export async function getAssessment(
  studentId: string
): Promise<{
  student_id: string;
  form_data: FormData;
  prediction_result: PredictionResult;
  created_at: string;
  updated_at: string;
}> {
  const res = await fetch(`${API_BASE}/get-assessment/${studentId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error(`Server ${res.status}`);
  const result = await res.json();
  if (result.error) throw new Error(result.error);
  return result;
}
