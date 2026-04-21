'use client';

import { BarChart3, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAssessment } from '@/lib/api';
import type { PredictionResult } from '@/lib/api';
import { PageHeader, MetricCard, CardWrapper, ProgressBar } from '@/lib/ui-components';

export default function Dashboard() {
  const [assessment, setAssessment] = useState<PredictionResult | null>(null);
  const [studentId, setStudentId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

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
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assessment');
      setLoading(false);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-48 bg-slate-700/50 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-700/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Welcome to CareerLadder!"
          subtitle="Complete an assessment to see your personalized dashboard"
        />
        <CardWrapper variant="subtle">
          <div className="py-12 text-center">
            <p className="text-slate-400 mb-6 text-base">
              No assessment data found. Take your first assessment to get started!
            </p>
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/30"
            >
              Start Assessment
            </a>
          </div>
        </CardWrapper>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <PageHeader
            title={`Welcome Back, Arush! [✓]`}
            subtitle={`Here's your career overview (Student ID: ${studentId})`}
          />
        </div>
        <a
          href="/dashboard/report"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/30 whitespace-nowrap mt-2"
        >
          View Full Report
        </a>
      </div>

      {/* Error Alert */}
      {error && (
        <CardWrapper variant="danger">
          <div className="flex items-start gap-3 p-4">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        </CardWrapper>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Placement Readiness"
          value={`${Math.round(assessment.riskScore)}%`}
          icon={BarChart3}
          color="purple"
          subtext={`Risk: ${assessment.risk}`}
        />

        <MetricCard
          label="Placement in 3 Months"
          value={`${Math.round(assessment.p3 * 100)}%`}
          icon={Zap}
          color="green"
          subtext={
            assessment.p3 > 0.7
              ? 'High probability'
              : assessment.p3 > 0.4
              ? 'Moderate probability'
              : 'Low probability'
          }
        />

        <MetricCard
          label="Expected Salary"
          value={`₹${(assessment.avgCtc || 6.5).toFixed(1)}L`}
          icon={TrendingUp}
          color="amber"
          subtext={`Range: ₹${(assessment.salLo || 5).toFixed(1)}L - ₹${(assessment.salHi || 8).toFixed(1)}L`}
        />

        <MetricCard
          label="EMI Readiness"
          value={assessment.risk}
          icon={AlertCircle}
          color={assessment.risk === 'Low' ? 'green' : assessment.risk === 'Medium' ? 'amber' : 'red'}
          subtext="Risk level"
        />
      </div>

      {/* Placement Probability Timeline */}
      <CardWrapper variant="default">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Placement Probability Timeline</h2>
          <div className="space-y-6">
            {[
              {
                time: '3 Months',
                prob: Math.round(assessment.p3 * 100),
                color: 'green' as const,
              },
              {
                time: '6 Months',
                prob: Math.round(assessment.p6 * 100),
                color: 'blue' as const,
              },
              {
                time: '12 Months',
                prob: Math.round(assessment.p12 * 100),
                color: 'purple' as const,
              },
            ].map((item) => (
              <div key={item.time}>
                <ProgressBar
                  label={item.time}
                  value={item.prob}
                  color={item.color}
                  showValue={true}
                  size="lg"
                />
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}
