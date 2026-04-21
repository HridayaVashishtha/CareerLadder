'use client';

import { Briefcase, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { useAssessment } from '../AssessmentContext';
import { getHeadingClass, getBodyClass } from '@/lib/design-system';
import { PageHeader, CardWrapper, Button } from '@/lib/ui-components';

export default function JobsPage() {
  const { assessment, formData } = useAssessment();

  // Generate job matches based on assessment scores
  const generateJobs = () => {
    if (!assessment || !formData) return [];

    const baseSalary = assessment.avgCtc || 6.5;
    const p6Score = Math.round(assessment.p6 * 100);

    return [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Microsoft',
        salary: `₹${Math.round(baseSalary + 2)}–${Math.round(baseSalary + 5)}L`,
        fit: Math.min(95, p6Score + 15),
        skills: ['Java', 'Python', 'Cloud'],
        location: 'Bangalore',
        description: 'Build cloud-based solutions for enterprise clients',
      },
      {
        id: 2,
        title: 'Backend Developer',
        company: 'Amazon',
        salary: `₹${Math.round(baseSalary + 1)}–${Math.round(baseSalary + 4)}L`,
        fit: Math.min(92, p6Score + 12),
        skills: ['Java', 'SQL', 'AWS'],
        location: 'Hyderabad',
        description: 'Design and develop scalable backend services',
      },
      {
        id: 3,
        title: 'Data Engineer',
        company: 'Google',
        salary: `₹${Math.round(baseSalary)}–${Math.round(baseSalary + 3)}L`,
        fit: Math.min(88, p6Score + 8),
        skills: ['Python', 'SQL', 'Analytics'],
        location: 'Bangalore',
        description: 'Build data pipelines and analytics platforms',
      },
      {
        id: 4,
        title: 'DevOps Engineer',
        company: 'Meta',
        salary: `₹${Math.round(baseSalary + 1.5)}–${Math.round(baseSalary + 4.5)}L`,
        fit: Math.min(85, p6Score + 10),
        skills: ['Docker', 'Kubernetes', 'AWS'],
        location: 'Remote',
        description: 'Manage infrastructure and deployment pipelines',
      },
      {
        id: 5,
        title: 'Cloud Architect',
        company: 'LinkedIn',
        salary: `₹${Math.round(baseSalary + 2.5)}–${Math.round(baseSalary + 5.5)}L`,
        fit: Math.min(82, p6Score + 7),
        skills: ['AWS', 'Architecture', 'Python'],
        location: 'Pune',
        description: 'Design cloud infrastructure for scale',
      },
      {
        id: 6,
        title: 'Product Analyst',
        company: 'Uber',
        salary: `₹${Math.round(baseSalary - 0.5)}–${Math.round(baseSalary + 2.5)}L`,
        fit: Math.min(80, p6Score + 5),
        skills: ['SQL', 'Analytics', 'Python'],
        location: 'Mumbai',
        description: 'Drive product decisions with data insights',
      },
    ];
  };

  const jobs = generateJobs();

  if (!assessment || !formData) {
    return (
      <div className="space-y-8 max-w-5xl">
        <PageHeader
          title="Job Opportunities"
          subtitle="Complete an assessment to see personalized job matches"
        />
      </div>
    );
  }

  const getMatchColorClass = (fit: number) => {
    if (fit >= 90) return 'from-green-400 to-emerald-500';
    if (fit >= 80) return 'from-blue-400 to-cyan-500';
    return 'from-amber-400 to-yellow-500';
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <PageHeader
        title="AI-Matched Job Opportunities"
        subtitle={`${jobs.length} roles personalized for your profile and skills`}
      />

      {/* Job Cards Grid */}
      <div className="space-y-4">
        {jobs.map((job) => {
          const matchGradient = getMatchColorClass(job.fit);
          return (
            <CardWrapper key={job.id} variant="default">
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Main Content */}
                  <div className="md:col-span-3 space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/20 flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {job.title}
                        </h3>
                        <p className="text-slate-400 font-medium">{job.company}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {job.description}
                    </p>

                    {/* Location & Salary */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="font-semibold text-green-300">{job.salary}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs font-medium text-purple-300 hover:bg-purple-500/30 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Match Score Card */}
                  <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-700/10 border border-slate-600/30">
                    {/* Circular Progress */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-28 h-28 transform -rotate-90">
                        <circle cx="56" cy="56" r="50" stroke="rgba(71, 85, 105, 0.3)" strokeWidth="3" fill="none" />
                        <circle
                          cx="56"
                          cy="56"
                          r="50"
                          stroke={`url(#gradient-${job.id})`}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${(job.fit / 100) * 314.16} 314.16`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id={`gradient-${job.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={job.fit >= 90 ? '#10b981' : job.fit >= 80 ? '#06b6d4' : '#f59e0b'} />
                            <stop offset="100%" stopColor={job.fit >= 90 ? '#059669' : job.fit >= 80 ? '#0891b2' : '#d97706'} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute text-center">
                        <p className="text-3xl font-bold text-white font-mono">{job.fit}%</p>
                        <p className="text-xs text-slate-400 font-medium">Match</p>
                      </div>
                    </div>

                    <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </div>
  );
}
