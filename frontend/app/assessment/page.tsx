'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FormData, PredictionResult, predict, saveAssessment } from '@/lib/api';
import AssessmentForm from '@/components/AssessmentForm';
import AssessmentResults from '@/components/AssessmentResults';

type AppState = 'form' | 'loading' | 'results';

export default function AssessmentPage() {
  const [state, setState] = useState<AppState>('form');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [showStudentIdInput, setShowStudentIdInput] = useState(false);

  useEffect(() => {
    // Check for saved student ID in localStorage
    const savedId = localStorage.getItem('studentId');
    if (savedId) {
      setStudentId(savedId);
    }
  }, []);

  const handleSubmit = async (data: FormData) => {
    // If no student ID, show input
    if (!studentId) {
      setShowStudentIdInput(true);
      return;
    }

    setState('loading');
    setError('');

    try {
      const prediction = await predict(data);
      
      // Save to backend
      await saveAssessment(studentId, data, prediction);
      
      // Save student ID to localStorage
      localStorage.setItem('studentId', studentId);

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

  const handleSetStudentId = (id: string) => {
    if (id.trim()) {
      setStudentId(id);
      setShowStudentIdInput(false);
    }
  };

  if (state === 'form') {
    return (
      <div>
        <div className="bg-gradient-to-b from-slate-900 to-transparent py-6 px-4 border-b border-slate-800">
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition">
            ← Back to Home
          </Link>
        </div>
        
        {showStudentIdInput && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">Enter Your Student ID</h3>
              <p className="text-slate-400 text-sm mb-6">This will be used to save your assessment results</p>
              <input
                type="text"
                placeholder="e.g. STU123456"
                defaultValue={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleSetStudentId(studentId)}
              />
              <button
                onClick={() => handleSetStudentId(studentId)}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!studentId.trim()}
              >
                Continue with Assessment
              </button>
            </div>
          </div>
        )}
        
        <AssessmentForm onSubmit={handleSubmit} loading={false} />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500/20 border border-red-500/40 rounded-lg p-4 max-w-md text-red-300 text-sm">
            ⚠ {error}
          </div>
        )}
        
        {studentId && (
          <div className="fixed bottom-4 left-4 bg-purple-500/20 border border-purple-500/40 rounded-lg p-3 text-purple-300 text-xs">
            Student ID: {studentId}
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
