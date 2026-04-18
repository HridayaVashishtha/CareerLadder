'use client';

import { PredictionResult, FormData, whatIf } from '@/lib/api';
import { FEATURE_LABELS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import WhatIfSimulator from './WhatIfSimulator';

interface ResultsProps {
  result: PredictionResult;
  formData: FormData;
  onNewAssessment: () => void;
}

export default function AssessmentResults({ result, formData, onNewAssessment }: ResultsProps) {
  const [view, setView] = useState<'student' | 'lender'>('student');
  const [whatIfData, setWhatIfData] = useState<Partial<FormData>>({});

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'High': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-slate-500/20 border-slate-500/30';
    }
  };

  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const lpa = (v: number) => `${parseFloat(v.toFixed(1))} LPA`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <button
              onClick={onNewAssessment}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium mb-4 flex items-center gap-2"
            >
              ← New Assessment
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">Assessment Report</h1>
            <p className="text-slate-400">
              {formData.course} · Tier {formData.tier?.split(' ')[1] || '2'} · {formData.year}
            </p>
          </div>

          {/* Risk Badge */}
          <div className={`px-6 py-3 rounded-xl border ${getRiskBgColor(result.risk)}`}>
            <div className={`text-xl font-bold ${getRiskColor(result.risk)}`}>{result.risk} Risk</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView('student')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'student'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setView('lender')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              view === 'lender'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Lender View
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Risk Score</p>
            <p className={`text-3xl font-bold ${getRiskColor(result.risk)}`}>{result.riskScore}/100</p>
            <p className="text-slate-500 text-sm mt-2">{result.risk} placement risk</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Confidence</p>
            <p className="text-3xl font-bold text-purple-400">{pct(result.confidence)}</p>
            <p className="text-slate-500 text-sm mt-2">prediction certainty</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Expected Salary</p>
            <p className="text-3xl font-bold text-emerald-400">{lpa(result.salMid)}</p>
            <p className="text-slate-500 text-sm mt-2">LPA midpoint</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">Timeline</p>
            <p className="text-lg font-bold text-white">{result.timeline}</p>
            <p className="text-slate-500 text-sm mt-2">most likely window</p>
          </div>
        </div>

        {/* Probability & Salary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Probability */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">Placement Probability</h3>

            {[
              { label: 'Within 3 months', value: result.p3 },
              { label: 'Within 6 months', value: result.p6 },
              { label: 'Within 12 months', value: result.p12 }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-4 last:mb-0">
                <div className="text-sm text-slate-400 min-w-36">{item.label}</div>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: pct(item.value) }} />
                </div>
                <div className="text-sm font-mono text-slate-300 min-w-12 text-right">{pct(item.value)}</div>
              </div>
            ))}

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-400 font-mono mb-2">95% CONFIDENCE INTERVAL</p>
              <p className="text-sm text-slate-300">
                6-month: {pct(Math.max(0, result.p6 - 0.1))} – {pct(Math.min(1, result.p6 + 0.1))}
              </p>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">Salary Estimate</h3>

            <div className="mb-6">
              <p className="text-3xl font-bold text-white mb-1">
                {lpa(result.salMid)}
                <span className="text-sm text-slate-400 ml-2">midpoint</span>
              </p>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs text-slate-400">{lpa(result.salLo)}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full relative">
                  <div
                    className="absolute h-full bg-purple-500/50 border border-purple-500"
                    style={{
                      left: `${Math.round((result.salLo / (result.salHi * 1.1)) * 100)}%`,
                      right: `${100 - Math.round((result.salHi / (result.salHi * 1.1)) * 100)}%`
                    }}
                  />
                </div>
                <span className="text-xs text-slate-400">{lpa(result.salHi)}</span>
              </div>

              <p className="text-xs text-slate-400 mt-3">
                Peer avg: {lpa(result.avgCtc)} · Estimate reflects profile premium
              </p>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-400 font-mono mb-3 uppercase tracking-wider">Peer Benchmark</p>
              {[
                { label: 'Your estimate', value: result.salMid, color: 'bg-purple-500' },
                { label: 'Institute avg', value: result.avgCtc, color: 'bg-slate-500' },
                { label: 'Low estimate', value: result.salLo, color: 'bg-slate-600' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                  <div className="text-xs text-slate-400 min-w-24">{item.label}</div>
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${Math.min(100, (item.value / (result.salHi * 1.1)) * 100)}%` }}
                    />
                  </div>
                  <div className="text-xs font-mono text-slate-300 min-w-14 text-right">{lpa(item.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Factor Scores */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">Factor Scores</h3>

            {[
              { label: 'Academic strength', value: result.acadScore },
              { label: 'Experience', value: result.expScore },
              { label: 'Institute quality', value: result.instScore },
              { label: 'Market conditions', value: result.marketScore }
            ].map((item, i) => {
              const color = item.value > 0.65 ? 'bg-green-500' : item.value > 0.4 ? 'bg-yellow-500' : 'bg-red-500';
              return (
                <div key={i} className="flex items-center gap-3 mb-4 last:mb-0">
                  <div className="text-sm text-slate-400 min-w-36">{item.label}</div>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${color}`} style={{ width: pct(item.value) }} />
                  </div>
                  <div className="text-sm font-mono text-slate-300 min-w-12 text-right">{pct(item.value)}</div>
                </div>
              );
            })}
          </div>

          {/* SHAP Signals */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">SHAP Risk Signals</h3>

            <div className="space-y-2">
              {result.shap_positive?.map((signal, i) => (
                <div key={`pos-${i}`} className="flex gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-green-300">
                    <strong>{FEATURE_LABELS[signal.feature] || signal.feature}</strong> is boosting your placement chances
                  </p>
                </div>
              ))}

              {result.shap_negative?.map((signal, i) => (
                <div key={`neg-${i}`} className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-red-300">
                    <strong>{FEATURE_LABELS[signal.feature] || signal.feature}</strong> is the primary risk factor
                  </p>
                </div>
              ))}

              {!result.shap_positive?.length && !result.shap_negative?.length && (
                <p className="text-sm text-slate-400">No major risk signals detected.</p>
              )}
            </div>
          </div>
        </div>

        {/* What-If Simulator */}
        <WhatIfSimulator
          initialData={formData}
          baseResult={result}
          onUpdate={setWhatIfData}
        />

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">Recommended Actions</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center flex-shrink-0 text-xs font-mono text-purple-400">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{rec.title}</p>
                    <p className="text-sm text-slate-400 mt-1">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lender View */}
        {view === 'lender' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">Lender Portfolio Signal</h3>
            <div className="space-y-3">
              {[
                { key: 'Early delinquency risk', value: result.risk },
                { key: 'Repayment readiness (6mo)', value: pct(result.p6) },
                { key: 'Salary coverage ratio', value: `${(result.salMid / 4).toFixed(1)}x` },
                { key: 'Portfolio flag', value: result.riskScore > 65 ? 'Flag for review' : 'Clear' },
                { key: 'Recommended action', value: result.risk === 'Low' ? 'Standard processing' : result.risk === 'Medium' ? 'Require skill plan' : 'Hold — counselling' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
                  <span className="text-slate-300">{item.key}</span>
                  <span className="font-mono text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
