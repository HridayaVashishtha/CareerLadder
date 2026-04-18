'use client';

import { useState } from 'react';
import { FormData } from '@/lib/api';
import { COURSES, YEARS } from '@/lib/constants';

interface FormProps {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export default function AssessmentForm({ onSubmit, loading }: FormProps) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('cgpa') || name.includes('rate') || name.includes('salary') ? parseFloat(value) : isNaN(parseInt(value)) ? value : parseInt(value),
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!formData.cgpa || formData.cgpa < 0 || formData.cgpa > 10) newErrors.cgpa = 'Enter 0–10';
      if (!formData.trend) newErrors.trend = 'Required';
      if (!formData.course) newErrors.course = 'Required';
      if (!formData.year) newErrors.year = 'Required';
    } else if (s === 2) {
      if (formData.internships === undefined || formData.internships < 0) newErrors.internships = 'Enter 0 or more';
      if (formData.certifications === undefined || formData.certifications < 0) newErrors.certifications = 'Enter 0 or more';
      if (!formData.skill) newErrors.skill = 'Required';
    } else if (s === 3) {
      if (!formData.tier) newErrors.tier = 'Required';
      if (!formData.placement_rate || formData.placement_rate < 0 || formData.placement_rate > 100) newErrors.placement_rate = 'Enter 0–100';
      if (!formData.avg_salary || formData.avg_salary < 0) newErrors.avg_salary = 'Enter a positive number';
    } else if (s === 4) {
      if (!formData.job_demand) newErrors.job_demand = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit(formData as FormData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">AI Career Predictor</h1>
              <p className="text-purple-300">Placement risk & salary assessment</p>
            </div>
            <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg">
              <span className="text-sm font-mono text-purple-300">v3.0 · Beta</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-all ${
                  s <= step ? 'bg-purple-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Section 1: Academics */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Student Academics</h2>
                <p className="text-slate-400 text-sm mb-8">Section 1 of 4</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CGPA / GPA</label>
                  <input
                    type="number"
                    name="cgpa"
                    value={formData.cgpa || ''}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.1"
                    placeholder="e.g. 7.8"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white placeholder-slate-500 transition-all focus:outline-none ${
                      errors.cgpa ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  />
                  {errors.cgpa && <p className="text-red-400 text-xs mt-1">{errors.cgpa}</p>}
                  <p className="text-slate-400 text-xs mt-1">Scale of 10</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Academic Trend</label>
                  <select
                    name="trend"
                    value={formData.trend || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.trend ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select trend</option>
                    <option>Consistently strong</option>
                    <option>Improving</option>
                    <option>Consistent</option>
                    <option>Declining</option>
                  </select>
                  {errors.trend && <p className="text-red-400 text-xs mt-1">{errors.trend}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Course / Discipline</label>
                  <select
                    name="course"
                    value={formData.course || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.course ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select course</option>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Year of Graduation</label>
                  <select
                    name="year"
                    value={formData.year || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.year ? 'border-red-500 focus:border-red-400' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select year</option>
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                  {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Experience & Skills</h2>
                <p className="text-slate-400 text-sm mb-8">Section 2 of 4</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Number of Internships</label>
                  <input
                    type="number"
                    name="internships"
                    value={formData.internships || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 2"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.internships ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  />
                  {errors.internships && <p className="text-red-400 text-xs mt-1">{errors.internships}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Internship Quality</label>
                  <select
                    name="intern_quality"
                    value={formData.intern_quality || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select quality</option>
                    <option>Fortune 500 / MNC</option>
                    <option>Mid-size company</option>
                    <option>Startup</option>
                    <option>Research / Academic lab</option>
                    <option>No internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Certifications / Courses</label>
                  <input
                    type="number"
                    name="certifications"
                    value={formData.certifications || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 3"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.certifications ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  />
                  {errors.certifications && <p className="text-red-400 text-xs mt-1">{errors.certifications}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Skill Self-Assessment</label>
                  <select
                    name="skill"
                    value={formData.skill || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.skill ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select level</option>
                    <option>Advanced (industry-ready)</option>
                    <option>Intermediate</option>
                    <option>Beginner</option>
                  </select>
                  {errors.skill && <p className="text-red-400 text-xs mt-1">{errors.skill}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Projects / Portfolio</label>
                  <select
                    name="projects"
                    value={formData.projects || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Published / deployed project</option>
                    <option>Multiple academic projects</option>
                    <option>1–2 college projects</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Institute */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Institute & Program</h2>
                <p className="text-slate-400 text-sm mb-8">Section 3 of 4</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Institute Tier</label>
                  <select
                    name="tier"
                    value={formData.tier || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.tier ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select tier</option>
                    <option>Tier 1 (IIT / IIM / NIT / Top 10)</option>
                    <option>Tier 2 (State govt. / NAAC A)</option>
                    <option>Tier 3 (Private / NAAC B)</option>
                  </select>
                  {errors.tier && <p className="text-red-400 text-xs mt-1">{errors.tier}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Placement Cell Strength</label>
                  <select
                    name="placement_cell"
                    value={formData.placement_cell || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Very active (100+ recruiters)</option>
                    <option>Active (50–100 recruiters)</option>
                    <option>Moderate</option>
                    <option>Weak / inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Historic Placement Rate (%)</label>
                  <input
                    type="number"
                    name="placement_rate"
                    value={formData.placement_rate || ''}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="e.g. 78"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.placement_rate ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  />
                  {errors.placement_rate && <p className="text-red-400 text-xs mt-1">{errors.placement_rate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Avg. CTC at Institute (LPA)</label>
                  <input
                    type="number"
                    name="avg_salary"
                    value={formData.avg_salary || ''}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g. 8.5"
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.avg_salary ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  />
                  {errors.avg_salary && <p className="text-red-400 text-xs mt-1">{errors.avg_salary}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Market */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Market Signals</h2>
                <p className="text-slate-400 text-sm mb-8">Section 4 of 4</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Demand (Field)</label>
                  <select
                    name="job_demand"
                    value={formData.job_demand || ''}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-slate-700/50 text-white transition-all focus:outline-none ${
                      errors.job_demand ? 'border-red-500' : 'border-slate-600 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select</option>
                    <option>Very high</option>
                    <option>High</option>
                    <option>Moderate</option>
                    <option>Low</option>
                  </select>
                  {errors.job_demand && <p className="text-red-400 text-xs mt-1">{errors.job_demand}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                  <select
                    name="region"
                    value={formData.region || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Metro (Mumbai/Delhi/Bangalore)</option>
                    <option>Tier 2 city</option>
                    <option>Tier 3 city / rural</option>
                    <option>International / remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Portal Activity</label>
                  <select
                    name="job_activity"
                    value={formData.job_activity || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Actively applying (daily)</option>
                    <option>Occasionally browsing</option>
                    <option>Not started</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Interview Pipeline</label>
                  <select
                    name="pipeline"
                    value={formData.pipeline || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Offers in hand</option>
                    <option>Multiple rounds ongoing</option>
                    <option>First rounds scheduled</option>
                    <option>No interviews yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Macroeconomic Outlook</label>
                  <select
                    name="macro"
                    value={formData.macro || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-600 bg-slate-700/50 text-white focus:border-purple-500 focus:outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option>Hiring boom / expansion</option>
                    <option>Stable</option>
                    <option>Slowdown / cautious hiring</option>
                    <option>Recession / layoffs</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-slate-700">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 transition-all"
              >
                {loading ? 'Running...' : 'Run Assessment'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
