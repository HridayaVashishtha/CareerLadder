'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertCircle, Lightbulb, Trophy, Users, TrendingUp } from 'lucide-react';
import { getAssessment } from '@/lib/api';
import type { PredictionResult } from '@/lib/api';
import { PageHeader, CardWrapper, ProgressBar } from '@/lib/ui-components';

export default function ReportPage() {
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
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-48 bg-slate-700/50 rounded-lg animate-pulse" />
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-700/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Assessment Report"
          subtitle="No assessment found"
        />
        <CardWrapper variant="subtle">
          <div className="py-12 text-center">
            <p className="text-slate-400 mb-6 text-base">
              No assessment data available. Please complete an assessment first.
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-400';
      case 'Medium':
        return 'text-amber-400';
      case 'High':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Page Title */}
      <PageHeader
        title="Your Assessment Report"
        subtitle={`Generated for Student ID: ${studentId}`}
      />

      {error && (
        <CardWrapper variant="danger">
          <div className="flex items-start gap-3 p-4">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        </CardWrapper>
      )}

      {/* Executive Summary */}
      <CardWrapper variant="default">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Executive Summary</h2>
          {assessment.summary && (
            <p className="text-slate-300 leading-relaxed mb-6">{assessment.summary}</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Overall Risk Score</p>
              <p className={`text-3xl font-bold ${getRiskColor(assessment.risk)}`}>
                {Math.round(assessment.riskScore)}%
              </p>
              <p className="text-slate-400 text-sm mt-2">Risk: {assessment.risk}</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Confidence Score</p>
              <p className="text-3xl font-bold text-blue-400">
                {Math.round(assessment.confidence * 100)}%
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">CGPA</p>
              <p className="text-3xl font-bold text-purple-400">
                {assessment.cgpa.toFixed(2)}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Internships</p>
              <p className="text-3xl font-bold text-amber-400">
                {assessment.interns}
              </p>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Score Breakdown */}
      <CardWrapper variant="default">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Performance Scores</h2>
          <div className="space-y-6">
            {[
              { label: 'Academic Score', value: assessment.acadScore, color: 'purple' as const },
              { label: 'Experience Score', value: assessment.expScore, color: 'blue' as const },
              { label: 'Institution Score', value: assessment.instScore, color: 'green' as const },
              { label: 'Market Score', value: assessment.marketScore, color: 'amber' as const },
            ].map((item) => (
              <div key={item.label}>
                <ProgressBar
                  label={item.label}
                  value={Math.round(item.value * 10)}
                  color={item.color}
                  showValue={true}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>

      {/* Placement Timeline */}
      <CardWrapper variant="default">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Placement Timeline</h2>
          <div className="space-y-6">
            {[
              { time: '3 Months', prob: assessment.p3, color: 'green' as const },
              { time: '6 Months', prob: assessment.p6, color: 'blue' as const },
              { time: '12 Months', prob: assessment.p12, color: 'purple' as const },
            ].map((item) => (
              <div key={item.time}>
                <ProgressBar
                  label={item.time}
                  value={Math.round(item.prob * 100)}
                  color={item.color}
                  showValue={true}
                  size="lg"
                />
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>

      {/* Salary Insights */}
      <CardWrapper variant="default">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Salary Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-3">Expected Average</p>
              <p className="text-4xl font-bold text-amber-400 mb-2">
                ₹{(assessment.avgCtc || 6.5).toFixed(1)}L
              </p>
              <p className="text-slate-500 text-xs">per annum (CTC)</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-3">Expected Range (Low)</p>
              <p className="text-4xl font-bold text-green-400 mb-2">
                ₹{(assessment.salLo || 5).toFixed(1)}L
              </p>
              <p className="text-slate-500 text-xs">conservative estimate</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-3">Expected Range (High)</p>
              <p className="text-4xl font-bold text-purple-400 mb-2">
                ₹{(assessment.salHi || 8).toFixed(1)}L
              </p>
              <p className="text-slate-500 text-xs">optimistic estimate</p>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Key Strengths */}
      {assessment.shap_positive && assessment.shap_positive.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Your Strengths</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessment.shap_positive.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/30 rounded-lg p-4"
                >
                  <p className="text-green-300 font-semibold">{item.feature}</p>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Areas for Improvement */}
      {assessment.shap_negative && assessment.shap_negative.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Areas for Improvement</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessment.shap_negative.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 border border-amber-700/30 rounded-lg p-4"
                >
                  <p className="text-amber-300 font-semibold">{item.feature}</p>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Recommendations */}
      {assessment.recommendations && assessment.recommendations.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Recommendations</h2>
            </div>
            <div className="space-y-4">
              {assessment.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">{rec.title}</h3>
                  <p className="text-slate-300">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Interview Tips */}
      {assessment.interview_tips && assessment.interview_tips.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Interview Tips</h2>
            <ul className="space-y-3">
              {assessment.interview_tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-slate-300">
                  <span className="text-blue-400 font-bold mt-1">[{idx + 1}]</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
      )}

      {/* Resume Tips */}
      {assessment.resume_tips && assessment.resume_tips.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Resume Tips</h2>
            <ul className="space-y-3">
              {assessment.resume_tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-slate-300">
                  <span className="text-purple-400 font-bold mt-1">[{idx + 1}]</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardWrapper>
      )}

      {/* Cohort Comparison */}
      {assessment.cohort && (
        <CardWrapper variant="default">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Your Cohort Standing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Your Percentile</p>
                <p className="text-3xl font-bold text-blue-400">
                  {assessment.cohort.percentile ? `${assessment.cohort.percentile}%` : 'N/A'}
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Cohort Size</p>
                <p className="text-3xl font-bold text-green-400">
                  {assessment.cohort.cohort_size}
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Cohort Avg Salary</p>
                <p className="text-2xl font-bold text-amber-400">
                  ₹{assessment.cohort.cohort_sal_avg.toFixed(1)}L
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Cohort 6-Month Placement</p>
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round(assessment.cohort.cohort_p6_avg * 100)}%
                </p>
              </div>
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Suggested Recruiters */}
      {assessment.recruiters && assessment.recruiters.length > 0 && (
        <CardWrapper variant="default">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white">Suggested Recruiters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessment.recruiters.map((recruiter, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 border border-amber-700/30 rounded-lg p-4 text-center"
                >
                  <p className="text-amber-300 font-semibold">{recruiter}</p>
                </div>
              ))}
            </div>
          </div>
        </CardWrapper>
      )}

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-slate-400 text-sm">
          {assessment.ai_powered && '[✓] This report is AI-powered and personalized based on your assessment data'}
        </p>
      </div>
    </div>
  );
}
