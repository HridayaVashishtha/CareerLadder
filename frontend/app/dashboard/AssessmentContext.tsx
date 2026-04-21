'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAssessment, PredictionResult, FormData } from '@/lib/api';

interface AssessmentContextType {
  assessment: PredictionResult | null;
  formData: FormData | null;
  studentId: string;
  loading: boolean;
  error: string | null;
}

const AssessmentContext = createContext<AssessmentContextType>({
  assessment: null,
  formData: null,
  studentId: '',
  loading: true,
  error: null,
});

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [assessment, setAssessment] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem('studentId');
    if (!savedId) {
      setLoading(false);
      return;
    }

    setStudentId(savedId);
    loadAssessment(savedId);
  }, []);

  const loadAssessment = async (id: string) => {
    try {
      const data = await getAssessment(id);
      setAssessment(data.prediction_result);
      setFormData(data.form_data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assessment');
    }
    setLoading(false);
  };

  return (
    <AssessmentContext.Provider value={{ assessment, formData, studentId, loading, error }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
