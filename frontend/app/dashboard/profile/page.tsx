'use client';

import { BookOpen, Briefcase, Award, Code, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useAssessment } from '../AssessmentContext';
import { getHeadingClass, getBodyClass, getLabelClass, getValueClass } from '@/lib/design-system';
import { PageHeader, CardWrapper, SectionHeader, Button, StatDisplay } from '@/lib/ui-components';

export default function ProfilePage() {
  const { formData, assessment } = useAssessment();

  if (!formData || !assessment) {
    return (
      <div className="space-y-8 max-w-4xl">
        <PageHeader
          title="My Career Profile"
          subtitle="No assessment data found. Please complete an assessment first."
        />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl">
      <PageHeader
        title="My Career Profile"
        subtitle="View and update your career information"
      />

      {/* Academic Snapshot */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className={getHeadingClass('h2', 'white')}>Academic Snapshot</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatDisplay label="Course" value={formData.course} color="purple" />
            <StatDisplay label="CGPA" value={formData.cgpa} unit="/ 10" color="green" />
            <StatDisplay label="Graduation Year" value={formData.year} color="white" />
            <StatDisplay label="Institute Tier" value={formData.tier} color="white" />
            <StatDisplay label="Academic Trend" value={formData.trend} color="white" />
            <StatDisplay label="Skill Level" value={formData.skill} color="purple" />
          </div>
        </div>
      </CardWrapper>

      {/* Experience */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className={getHeadingClass('h2', 'white')}>Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className={`${getLabelClass('muted')} mb-2`}>Internships</p>
              <p className={getValueClass('large', 'blue')}>{formData.internships}</p>
            </div>
            <div>
              <p className={`${getLabelClass('muted')} mb-2`}>Internship Quality</p>
              <p className={getValueClass('normal', 'blue')}>{formData.intern_quality}</p>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Certifications & Skills */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-amber-500/20">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className={getHeadingClass('h2', 'white')}>Certifications & Achievements</h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className={`${getBodyClass('base', 'white')} font-medium`}>{formData.certifications} professional certifications completed</p>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* Projects & Portfolio */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className={getHeadingClass('h2', 'white')}>Projects & Portfolio</h2>
          </div>

          <div className="p-6 rounded-xl border border-purple-500/30 bg-purple-500/5">
            <p className={`${getHeadingClass('h4', 'white')}`}>{formData.projects}</p>
          </div>
        </div>
      </CardWrapper>

      {/* Placement Profile Strength */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/20">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <h2 className={getHeadingClass('h2', 'white')}>Profile Strength Assessment</h2>
            </div>
            <div className="text-right">
              <p className={getLabelClass('muted')}>Score</p>
              <p className={getValueClass('large', 'green')}>{Math.round(assessment.riskScore)}/100</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { item: 'Academics', status: formData.cgpa > 7 },
              { item: 'Internship Experience', status: formData.internships > 0 },
              { item: 'Certifications', status: formData.certifications > 0 },
              { item: 'Projects', status: formData.projects !== 'None' },
              { item: 'Skill Level', status: formData.skill === 'Advanced (industry-ready)' },
            ].map((check) => (
              <div key={check.item} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-700/30 transition-colors duration-200 border border-white/5">
                <span className={`${getBodyClass('base', 'secondary')} font-medium`}>{check.item}</span>
                {check.status ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardWrapper>

      {/* Action Button */}
      <div className="flex gap-3">
        <Button fullWidth variant="primary" size="lg">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
