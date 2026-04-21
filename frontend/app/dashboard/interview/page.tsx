'use client';

import { useState } from 'react';
import { Mic, Bot, FileText, CheckCircle, Circle, Eye, Zap } from 'lucide-react';
import { useAssessment } from '../AssessmentContext';
import { getHeadingClass, getBodyClass, getLabelClass } from '@/lib/design-system';
import { PageHeader, CardWrapper, Button, SectionHeader, InfoCard } from '@/lib/ui-components';

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState<'mock' | 'hr' | 'resume'>('mock');
  const { assessment } = useAssessment();

  if (!assessment) {
    return (
      <div className="space-y-8 max-w-6xl">
        <PageHeader
          title="Interview Zone"
          subtitle="Complete an assessment to get personalized interview prep"
        />
      </div>
    );
  }

  const mockTopics = [
    {
      id: 1,
      title: 'Data Structures Basics',
      difficulty: 'Beginner',
      questions: 15,
      completionTime: '45 min',
      completed: true,
    },
    {
      id: 2,
      title: 'Arrays & Strings',
      difficulty: 'Intermediate',
      questions: 20,
      completionTime: '60 min',
      completed: false,
    },
    {
      id: 3,
      title: 'Trees & Graphs',
      difficulty: 'Hard',
      questions: 25,
      completionTime: '90 min',
      completed: false,
    },
    {
      id: 4,
      title: 'System Design Fundamentals',
      difficulty: 'Intermediate',
      questions: 10,
      completionTime: '75 min',
      completed: false,
    },
  ];

  const hrQuestions = [
    {
      id: 1,
      question: 'Tell me about yourself',
      tips: [
        'Start with your background and current focus',
        'Highlight key achievements and skills',
        'Connect to the role you are applying for',
        'Keep it to 2-3 minutes',
      ],
      videoAvailable: true,
    },
    {
      id: 2,
      question: 'Why do you want to work here?',
      tips: [
        'Research the company thoroughly',
        'Align your values with company values',
        'Show specific knowledge about projects',
        'Connect to your career goals',
      ],
      videoAvailable: true,
    },
    {
      id: 3,
      question: 'What are your strengths?',
      tips: [
        'Be specific with concrete examples',
        'Relate strengths to the job requirements',
        'Use the STAR method (Situation, Task, Action, Result)',
        'Back up claims with proof',
      ],
      videoAvailable: false,
    },
    {
      id: 4,
      question: 'Tell me about a challenge you faced',
      tips: [
        'Use the STAR method for structured response',
        'Focus on resolution and learning outcomes',
        'Show problem-solving skills',
        'Stay professional and positive',
      ],
      videoAvailable: true,
    },
  ];

  const getDifficultyColor = (difficulty: string): 'success' | 'warning' | 'danger' => {
    if (difficulty === 'Beginner') return 'success';
    if (difficulty === 'Intermediate') return 'warning';
    return 'danger';
  };

  return (
    <div className="space-y-10 max-w-6xl">
      <PageHeader
        title="Interview Zone"
        subtitle={`Practice mock interviews, HR questions, and coding rounds • Personalized for ${Math.round(assessment.p6 * 100)}% placement probability`}
      />

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-700/50">
        {[
          { id: 'mock' as const, label: 'Coding Rounds', icon: Bot },
          { id: 'hr' as const, label: 'HR Questions', icon: Mic },
          { id: 'resume' as const, label: 'Resume Tips', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 border-b-2 ${
                isActive
                  ? 'text-purple-300 border-purple-500 bg-purple-500/5'
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Coding Round Section */}
      {activeTab === 'mock' && (
        <div className="space-y-8">
          <SectionHeader title="Coding Interview Rounds" subtitle="Master technical rounds with targeted practice" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTopics.map((topic) => (
              <CardWrapper key={topic.id} variant="default">
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`${getHeadingClass('h4', 'white')} mb-3`}>{topic.title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                            topic.difficulty === 'Beginner'
                              ? 'bg-green-500/20 border-green-500/40 text-green-300'
                              : topic.difficulty === 'Intermediate'
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-red-500/20 border-red-500/40 text-red-300'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                        {topic.completed && (
                          <span className="px-3 py-1 rounded-lg text-xs font-semibold border bg-green-500/20 border-green-500/40 text-green-300 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                    {topic.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 flex-shrink-0" />
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-slate-400 border-t border-slate-700/50 pt-4">
                    <span className="font-medium">{topic.questions} questions</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {topic.completionTime}
                    </span>
                  </div>

                  {/* Action */}
                  <Button
                    variant={topic.completed ? 'secondary' : 'primary'}
                    size="md"
                    fullWidth
                  >
                    {topic.completed ? 'Review Solutions' : 'Start Practice'}
                  </Button>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>
      )}

      {/* HR Questions Section */}
      {activeTab === 'hr' && (
        <div className="space-y-8">
          <SectionHeader title="HR Interview Questions" subtitle="Prepare answers with expert tips and video examples" />
          <div className="space-y-5">
            {hrQuestions.map((item) => (
              <CardWrapper key={item.id} variant="default">
                <div className="p-8 space-y-5">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold text-white flex-1">"{item.question}"</h3>
                    {item.videoAvailable && (
                      <span className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/40 rounded-full text-red-300 text-xs font-semibold whitespace-nowrap flex-shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                        Video Sample
                      </span>
                    )}
                  </div>

                  {/* Tips Section */}
                  <div>
                    <p className={`${getBodyClass('small', 'secondary')} text-sm font-semibold mb-3`}>Expert Tips</p>
                    <div className="space-y-2">
                      {item.tips.map((tip, idx) => (
                        <InfoCard key={idx} variant="info">
                          {tip}
                        </InfoCard>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <Button variant="primary" size="md" fullWidth>
                    Practice Answering
                  </Button>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>
      )}

      {/* Resume Tips Section */}
      {activeTab === 'resume' && (
        <div className="space-y-8">
          <SectionHeader title="Resume & Interview Prep" subtitle="Optimize your resume and ace interviews" />

          {/* Resume Tips */}
          <div>
            <h3 className={`${getHeadingClass('h2', 'white')} mb-5`}>Resume Optimization Tips</h3>
            <div className="space-y-4">
              {[
                'Quantify all achievements with metrics and measurable results',
                'Use action verbs (Developed, Designed, Implemented) to start bullet points',
                'Tailor resume for each company and role you apply for',
                'Include relevant certifications and technical skills prominently',
              ].map((tip, idx) => (
                <InfoCard key={idx} variant="success">
                  {tip}
                </InfoCard>
              ))}
            </div>
          </div>

          {/* Interview Tips */}
          <div>
            <h3 className={`${getHeadingClass('h2', 'white')} mb-5`}>Interview Preparation Tips</h3>
            <div className="space-y-4">
              {[
                'Research the company thoroughly before the interview',
                'Practice the STAR method for behavioral questions',
                'Prepare 3-5 questions to ask your interviewer',
                'Conduct mock interviews with peers for feedback',
              ].map((tip, idx) => (
                <InfoCard key={idx} variant="info">
                  {tip}
                </InfoCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
