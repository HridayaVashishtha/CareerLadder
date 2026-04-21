'use client';

import { PredictionResult, FormData, whatIf } from '@/lib/api';
import { FEATURE_LABELS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import WhatIfSimulator from './WhatIfSimulator';
import { TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle2, Target, Zap, Award, GraduationCap, Briefcase, Trophy, BarChart3, Flag } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <button
            onClick={onNewAssessment}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium mb-6 flex items-center gap-2 transition-colors"
          >
            ← New Assessment
          </button>
          
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">Assessment Report</h1>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm">{formData.course}</span>
                <span>Tier {formData.tier?.split(' ')[1] || '2'}</span>
                <span>Year {formData.year}</span>
              </div>
            </div>

            {/* Risk Badge - Enhanced */}
            <div className={`px-6 py-4 rounded-2xl border backdrop-blur-lg ${getRiskBgColor(result.risk)}`}>
              <div className="flex items-center gap-3">
                {result.risk === 'Low' && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                {result.risk === 'Medium' && <AlertCircle className="w-6 h-6 text-yellow-400" />}
                {result.risk === 'High' && <AlertCircle className="w-6 h-6 text-red-400" />}
                <div>
                  <div className={`text-2xl font-bold ${getRiskColor(result.risk)}`}>{result.risk} Risk</div>
                  <p className="text-xs text-slate-400 mt-1">Placement Risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setView('student')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              view === 'student'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Student View
          </button>
          <button
            onClick={() => setView('lender')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              view === 'lender'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Lender View
          </button>
        </div>

        {/* Summary Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Risk Score Card */}
          <div className="group relative bg-gradient-to-br from-slate-800 via-slate-800/50 to-slate-900 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Risk Score</p>
                <Target className={`w-4 h-4 ${getRiskColor(result.risk)}`} />
              </div>
              <p className={`text-4xl font-bold ${getRiskColor(result.risk)}`}>{result.riskScore}</p>
              <p className="text-slate-500 text-sm mt-3">{result.risk} placement risk</p>
            </div>
          </div>

          {/* Confidence Card */}
          <div className="group relative bg-gradient-to-br from-slate-800 via-slate-800/50 to-slate-900 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Confidence</p>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-4xl font-bold text-blue-400">{pct(result.confidence)}</p>
              <p className="text-slate-500 text-sm mt-3">prediction certainty</p>
            </div>
          </div>

          {/* Salary Card */}
          <div className="group relative bg-gradient-to-br from-slate-800 via-slate-800/50 to-slate-900 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Expected Salary</p>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-4xl font-bold text-emerald-400">{lpa(result.salMid)}</p>
              <p className="text-slate-500 text-sm mt-3">LPA midpoint</p>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="group relative bg-gradient-to-br from-slate-800 via-slate-800/50 to-slate-900 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">Timeline</p>
                <Calendar className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-white">{result.timeline}</p>
              <p className="text-slate-500 text-sm mt-3">most likely window</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Probability Section */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Placement Probability</h3>
            </div>

            <div className="space-y-5">
              {[
                { label: '3 Months', value: result.p3 },
                { label: '6 Months', value: result.p6 },
                { label: '12 Months', value: result.p12 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                    <span className="text-lg font-bold text-purple-400">{pct(item.value)}</span>
                  </div>
                  <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                      style={{ width: pct(item.value) }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <p className="text-xs text-slate-400 font-mono mb-2">CONFIDENCE INTERVAL (95%)</p>
              <p className="text-sm text-slate-300">
                6-month: <span className="text-purple-400 font-semibold">{pct(Math.max(0, result.p6 - 0.1))}</span> – <span className="text-purple-400 font-semibold">{pct(Math.min(1, result.p6 + 0.1))}</span>
              </p>
            </div>
          </div>

          {/* Salary Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Salary Estimate</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-5xl font-bold text-emerald-400">{lpa(result.salMid)}</p>
                <span className="text-sm text-slate-400">LPA</span>
              </div>
              <p className="text-slate-400 text-sm">Midpoint estimate</p>
            </div>

            {/* Salary Range Visualization */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                <span>{lpa(result.salLo)} Low</span>
                <span className="font-mono">{lpa(result.salHi)} High</span>
              </div>
              <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full relative overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full opacity-80"
                  style={{
                    left: `${Math.round((result.salLo / (result.salHi * 1.1)) * 100)}%`,
                    right: `${100 - Math.round((result.salHi / (result.salHi * 1.1)) * 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Benchmark Comparison */}
            <div className="pt-6 border-t border-slate-700/50">
              <p className="text-xs text-slate-400 font-mono mb-4 uppercase tracking-wider">Peer Benchmark</p>
              <div className="space-y-3">
                {[
                  { label: 'Your Estimate', value: result.salMid, color: 'from-emerald-500 to-emerald-400' },
                  { label: 'Institute Average', value: result.avgCtc, color: 'from-slate-500 to-slate-400' },
                  { label: 'Low Estimate', value: result.salLo, color: 'from-slate-600 to-slate-500' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs text-slate-400 min-w-32 font-medium">{item.label}</div>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${Math.min(100, (item.value / (result.salHi * 1.1)) * 100)}%` }}
                      />
                    </div>
                    <div className="text-xs font-mono text-emerald-300 min-w-14 text-right">{lpa(item.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Factor Scores */}
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Factor Scores</h3>
            </div>

            <div className="space-y-5">
              {[
                { label: 'Academic Strength', value: result.acadScore, Icon: GraduationCap },
                { label: 'Experience', value: result.expScore, Icon: Briefcase },
                { label: 'Institute Quality', value: result.instScore, Icon: Trophy },
                { label: 'Market Conditions', value: result.marketScore, Icon: BarChart3 }
              ].map((item, i) => {
                const color = item.value > 0.65 ? 'from-green-500 to-emerald-400' : item.value > 0.4 ? 'from-amber-500 to-orange-400' : 'from-red-500 to-rose-400';
                const textColor = item.value > 0.65 ? 'text-green-400' : item.value > 0.4 ? 'text-amber-400' : 'text-red-400';
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.Icon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300 font-medium">{item.label}</span>
                      </div>
                      <span className={`text-lg font-bold ${textColor}`}>{pct(item.value)}</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${color}`}
                        style={{ width: pct(item.value) }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SHAP Signals */}
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Risk Signals</h3>
            </div>

            <div className="space-y-3">
              {result.shap_positive && result.shap_positive.length > 0 && (
                <>
                  <p className="text-xs text-slate-400 font-semibold mb-3 uppercase">Positive Factors</p>
                  {result.shap_positive.slice(0, 3).map((signal, i) => (
                    <div key={`pos-${i}`} className="flex gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30 hover:border-green-500/50 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-200">
                        <strong className="text-green-300">{FEATURE_LABELS[signal.feature] || signal.feature}</strong> is boosting placement chances
                      </p>
                    </div>
                  ))}
                </>
              )}

              {result.shap_negative && result.shap_negative.length > 0 && (
                <>
                  <p className="text-xs text-slate-400 font-semibold mb-3 mt-4 uppercase">Risk Factors</p>
                  {result.shap_negative.slice(0, 3).map((signal, i) => (
                    <div key={`neg-${i}`} className="flex gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/5 border border-red-500/30 hover:border-red-500/50 transition-all">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">
                        <strong className="text-red-300">{FEATURE_LABELS[signal.feature] || signal.feature}</strong> is a primary risk factor
                      </p>
                    </div>
                  ))}
                </>
              )}

              {!result.shap_positive?.length && !result.shap_negative?.length && (
                <p className="text-sm text-slate-400 text-center py-4">No major signals detected</p>
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
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Recommended Actions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:border-blue-500/50 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{rec.title}</p>
                    <p className="text-sm text-slate-400">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lender View */}
        {view === 'lender' && (
          <div className="bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-7 mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">Lender Portfolio Signal</h3>
              </div>
              <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getRiskBgColor(result.risk)} ${getRiskColor(result.risk)}`}>
                {result.risk} Risk
              </span>
            </div>

            <div className="space-y-3">
              {[
                { key: 'Early Delinquency Risk', value: result.risk, Icon: AlertCircle },
                { key: 'Repayment Readiness (6mo)', value: pct(result.p6), Icon: CheckCircle2 },
                { key: 'Salary Coverage Ratio', value: `${(result.salMid / 4).toFixed(1)}x`, Icon: DollarSign },
                { key: 'Portfolio Flag', value: result.riskScore > 65 ? 'Flag for review' : 'Clear', Icon: Flag },
                { key: 'Recommended Action', value: result.risk === 'Low' ? 'Standard processing' : result.risk === 'Medium' ? 'Require skill plan' : 'Hold — counselling', Icon: Target }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 transition-all">
                  <div className="flex items-center gap-3">
                    <item.Icon className="w-5 h-5 text-slate-400" />
                    <p className="text-sm text-slate-400 font-semibold">{item.key}</p>
                  </div>
                  <p className="font-mono text-white font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
