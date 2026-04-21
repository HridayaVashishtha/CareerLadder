'use client';

import { BookOpen, Clock, DollarSign, Flame, Zap, Target } from 'lucide-react';
import { useAssessment } from '../AssessmentContext';
import { getHeadingClass, getBodyClass, getLabelClass, getValueClass } from '@/lib/design-system';
import { PageHeader, CardWrapper, MetricCard, ProgressBar, Button, SectionHeader, InfoCard } from '@/lib/ui-components';

export default function SkillUpPage() {
  const { assessment } = useAssessment();

  if (!assessment) {
    return (
      <div className="space-y-8 max-w-6xl">
        <PageHeader
          title="Skill Up & Growth"
          subtitle="Complete an assessment to see your personalized learning path"
        />
      </div>
    );
  }

  // Generate skills based on assessment
  const generateSkills = () => {
    const baseSkills = [
      {
        name: 'Data Structures & Algorithms',
        demand: 'Very High',
        yourLevel: 30,
        target: 80,
        resources: ['LeetCode Premium', 'GeeksforGeeks', 'Striver DSA Sheet'],
        estimatedTime: '3 months',
        impact: '+25%',
      },
      {
        name: 'System Design',
        demand: 'High',
        yourLevel: 40,
        target: 75,
        resources: ['System Design Primer', 'YouTube Tutorials', 'Mock Interviews'],
        estimatedTime: '2 months',
        impact: '+18%',
      },
      {
        name: 'Cloud & DevOps',
        demand: 'High',
        yourLevel: 50,
        target: 85,
        resources: ['A Cloud Guru', 'AWS Training', 'Hands-on Projects'],
        estimatedTime: '2 months',
        impact: '+20%',
      },
      {
        name: 'Communication Skills',
        demand: 'Medium',
        yourLevel: 60,
        target: 80,
        resources: ['Toastmasters', 'Interview Coach', 'Mock Interviews'],
        estimatedTime: '1 month',
        impact: '+12%',
      },
    ];
    return baseSkills;
  };

  const skills = generateSkills();
  const potentialSalaryBoost = Math.min(5, Math.max(1, (assessment.riskScore / 100) * 3));

  return (
    <div className="space-y-10 max-w-6xl">
      <PageHeader
        title="Skill Up & Growth"
        subtitle="Personalized learning plan to close gaps and boost employability"
      />

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard
          label="Skills to Improve"
          value={skills.length}
          icon={BookOpen}
          color="purple"
          subtext="domains identified"
        />
        <MetricCard
          label="Timeline"
          value="3 Months"
          icon={Clock}
          color="blue"
          subtext="estimated duration"
        />
        <MetricCard
          label="Learning Hours"
          value="200+"
          icon={Target}
          color="amber"
          subtext="total investment"
        />
        <MetricCard
          label="Salary Boost"
          value={`+₹${Math.round(potentialSalaryBoost)}–${Math.round(potentialSalaryBoost + 1)}L`}
          icon={DollarSign}
          color="green"
          subtext="potential increase"
        />
      </div>

      {/* Skills Grid */}
      <div className="space-y-5">
        <SectionHeader title="Skills Roadmap" />
        {skills.map((skill, idx) => (
          <CardWrapper key={idx} variant="default">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`${getHeadingClass('h3', 'white')}`}>{skill.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        skill.demand === 'Very High'
                          ? 'bg-red-500/20 border-red-500/40 text-red-300'
                          : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      {skill.demand} Demand
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {skill.estimatedTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${getLabelClass('muted')} mb-1`}>Placement Impact</p>
                  <p className={getValueClass('large', 'purple')}>{skill.impact}</p>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-2">
                    <span>Current Level</span>
                    <span>{skill.yourLevel}%</span>
                  </div>
                  <ProgressBar
                    value={skill.yourLevel}
                    max={100}
                    color="amber"
                    showValue={false}
                    size="md"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-2">
                    <span>Target Level</span>
                    <span>{skill.target}%</span>
                  </div>
                  <ProgressBar
                    value={skill.target}
                    max={100}
                    color="green"
                    showValue={false}
                    size="md"
                  />
                </div>
              </div>

              {/* Gap Analysis */}
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-300 text-sm font-medium">
                  Gap to close: <span className="font-bold">{skill.target - skill.yourLevel}% improvement needed</span>
                </p>
              </div>

              {/* Resources */}
              <div>
                <div className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Recommended Resources
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.resources.map((resource) => (
                    <span
                      key={resource}
                      className="px-3 py-2 bg-purple-500/15 border border-purple-500/40 rounded-lg text-purple-300 text-sm font-medium hover:bg-purple-500/25 transition-colors duration-200 cursor-pointer"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <Button variant="primary" size="md" fullWidth>
                Start Learning Path
              </Button>
            </div>
          </CardWrapper>
        ))}
      </div>

      {/* Learning Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Priority Path */}
        <CardWrapper variant="danger">
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-red-500/20">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <h3 className={`${getHeadingClass('h2', 'white')}`}>Priority Path (3 Months)</h3>
            </div>

            <div className="space-y-4">
              {[
                { month: 'Month 1', task: 'DSA Fundamentals & LeetCode practice' },
                { month: 'Month 2', task: 'Cloud Certification + System Design basics' },
                { month: 'Month 3', task: 'Advanced DSA + Mock Interviews' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-red-500/20 last:border-b-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400 font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-white text-sm">{item.month}</p>
                    <p className="text-slate-400 text-sm mt-1">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" size="md" fullWidth>
              Start Priority Path
            </Button>
          </div>
        </CardWrapper>

        {/* Quick Wins */}
        <CardWrapper variant="success">
          <div className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Quick Wins (This Month)</h3>
            </div>

            <div className="space-y-3">
              {[
                'Complete cloud certification',
                'Solve 50 LeetCode Medium problems',
                'Give 3 mock interviews',
              ].map((task, idx) => (
                <InfoCard key={idx} variant="success">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    {task}
                  </div>
                </InfoCard>
              ))}
            </div>

            <Button variant="primary" size="md" fullWidth>
              Track Progress
            </Button>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
