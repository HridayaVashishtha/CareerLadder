'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FormData, PredictionResult, predict } from '@/lib/api';
import AssessmentForm from '@/components/AssessmentForm';
import AssessmentResults from '@/components/AssessmentResults';

type AppState = 'form' | 'loading' | 'results';

export default function AssessmentPage() {
  const [state, setState] = useState<AppState>('form');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: FormData) => {
    setState('loading');
    setError('');

    try {
      const prediction = await predict(data);
      setResult(prediction);
      setFormData(data);
      setState('results');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not connect to backend. Make sure api.py is running on http://127.0.0.1:5000'
      );
      setState('form');
    }
  };

  const handleNewAssessment = () => {
    setState('form');
    setResult(null);
    setFormData(null);
    setError('');
  };

  if (state === 'form') {
    return (
      <div>
        <div className="bg-gradient-to-b from-slate-900 to-transparent py-6 px-4 border-b border-slate-800">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition">
            ← Back to Home
          </Link>
        </div>
        <AssessmentForm onSubmit={handleSubmit} loading={false} />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500/20 border border-red-500/40 rounded-lg p-4 max-w-md text-red-300 text-sm">
            ⚠ {error}
          </div>
        )}
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 mx-auto animate-spin" />
          <h2 className="text-xl text-white font-medium">Running assessment...</h2>
          <p className="text-slate-400 text-sm">This may take a moment while we analyze your profile.</p>
        </div>
      </div>
    );
  }

  if (state === 'results' && result && formData) {
    return <AssessmentResults result={result} formData={formData} onNewAssessment={handleNewAssessment} />;
  }

  return null;
}
