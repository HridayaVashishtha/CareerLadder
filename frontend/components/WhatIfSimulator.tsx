'use client';

import { useState, useEffect } from 'react';
import { FormData, PredictionResult, whatIf } from '@/lib/api';

interface WhatIfSimulatorProps {
  initialData: FormData;
  baseResult: PredictionResult;
  onUpdate: (data: Partial<FormData>) => void;
}

export default function WhatIfSimulator({ initialData, baseResult, onUpdate }: WhatIfSimulatorProps) {
  const [cgpa, setCgpa] = useState(initialData.cgpa);
  const [internships, setInternships] = useState(initialData.internships);
  const [certs, setCerts] = useState(initialData.certifications);
  const [simResult, setSimResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const newData: FormData = {
          ...initialData,
          cgpa,
          internships,
          certifications: certs
        };

        const result = await whatIf(newData);
        setSimResult(result);
      } catch (e) {
        console.error('What-if failed:', e);
      } finally {
        setLoading(false);
      }
    }, 500);

    setTimer(newTimer);

    return () => clearTimeout(newTimer);
  }, [cgpa, internships, certs, initialData]);

  const formatDelta = (val: number, inverse = false): string => {
    const sign = (val < 0) !== inverse ? '↓' : '↑';
    const color = (val < 0) !== inverse ? 'text-green-400' : 'text-red-400';
    return `<span class="${color}">${sign}${Math.abs(val).toFixed(inverse ? 1 : 0)}</span>`;
  };

  const riskDelta = simResult ? simResult.riskScore - baseResult.riskScore : 0;
  const p6Delta = simResult ? simResult.p6 - baseResult.p6 : 0;
  const salDelta = simResult ? simResult.salMid - baseResult.salMid : 0;

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 mb-8">
      <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-6">What-If Simulator</h3>
      <p className="text-sm text-slate-300 mb-6">Adjust your profile to see how risk changes</p>

      <div className="space-y-6">
        {/* CGPA Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">CGPA</label>
            <span className="text-sm font-mono text-purple-400">{cgpa.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="4"
            max="10"
            step="0.1"
            value={cgpa}
            onChange={(e) => setCgpa(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
          />
          <div className="text-xs text-slate-400">
            {cgpa !== initialData.cgpa && (
              <span className={cgpa > initialData.cgpa ? 'text-green-400' : 'text-red-400'}>
                {cgpa > initialData.cgpa ? '+' : ''}{(cgpa - initialData.cgpa).toFixed(1)}
              </span>
            )}
          </div>
        </div>

        {/* Internships Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">Internships</label>
            <span className="text-sm font-mono text-purple-400">{internships}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={internships}
            onChange={(e) => setInternships(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
          />
          <div className="text-xs text-slate-400">
            {internships !== initialData.internships && (
              <span className={internships > initialData.internships ? 'text-green-400' : 'text-red-400'}>
                {internships > initialData.internships ? '+' : ''}{internships - initialData.internships}
              </span>
            )}
          </div>
        </div>

        {/* Certifications Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">Certifications</label>
            <span className="text-sm font-mono text-purple-400">{certs}</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            step="1"
            value={certs}
            onChange={(e) => setCerts(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-purple-500"
          />
          <div className="text-xs text-slate-400">
            {certs !== initialData.certifications && (
              <span className={certs > initialData.certifications ? 'text-green-400' : 'text-red-400'}>
                {certs > initialData.certifications ? '+' : ''}{certs - initialData.certifications}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {simResult && (
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-2">Risk Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{simResult.riskScore}</span>
                <span className={riskDelta < 0 ? 'text-green-400' : 'text-red-400'}>
                  {riskDelta < 0 ? '↓' : '↑'}{Math.abs(riskDelta).toFixed(0)} pts
                </span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-2">6-Month Placement</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{Math.round(simResult.p6 * 100)}%</span>
                <span className={p6Delta > 0 ? 'text-green-400' : 'text-red-400'}>
                  {p6Delta > 0 ? '+' : ''}{Math.round(p6Delta * 100)}%
                </span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-xs text-slate-400 mb-2">Expected Salary</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{simResult.salMid.toFixed(1)} LPA</span>
                <span className={salDelta > 0 ? 'text-green-400' : 'text-red-400'}>
                  {salDelta > 0 ? '+' : ''}{salDelta.toFixed(2)} LPA
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-8 text-center text-slate-400 text-sm">
          Simulating changes...
        </div>
      )}
    </div>
  );
}
