'use client';

import { useState } from 'react';
import { Mic, Bot, User, FileText, CheckCircle, Circle, Play, Eye } from 'lucide-react';

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState('mock');

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
        'Start with your background',
        'Highlight key achievements',
        'Connect to the role',
        'Keep it to 2-3 minutes',
      ],
      videoAvailable: true,
    },
    {
      id: 2,
      question: 'Why do you want to work here?',
      tips: [
        'Research the company',
        'Align with values',
        'Show specific knowledge',
        'Connect to your goals',
      ],
      videoAvailable: true,
    },
    {
      id: 3,
      question: 'What are your strengths?',
      tips: [
        'Be specific with examples',
        'Relate to the job',
        'Use the STAR method',
        'Back with proof',
      ],
      videoAvailable: false,
    },
    {
      id: 4,
      question: 'Tell me about a challenge you faced',
      tips: [
        'Use the STAR method',
        'Focus on resolution',
        'Show learning',
        'Stay professional',
      ],
      videoAvailable: true,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Interview Zone</h1>
        <p className="text-slate-400">Practice mock interviews, HR questions, and coding rounds</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-slate-800">
        {[
          { id: 'mock', label: 'Mock Interviews', icon: Bot },
          { id: 'hr', label: 'HR Questions', icon: Mic },
          { id: 'resume', label: 'Resume Feedback', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-400 border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Mock Interview Section */}
      {activeTab === 'mock' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20 hover:border-purple-500/50 transition cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
                      {topic.title}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        topic.difficulty === 'Beginner'
                          ? 'bg-green-500/20 text-green-300'
                          : topic.difficulty === 'Intermediate'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {topic.difficulty}
                      </span>
                      {topic.completed && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  {topic.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-500" />
                  )}
                </div>

                <div className="flex justify-between text-sm text-slate-400 mb-4">
                  <span>{topic.questions} questions</span>
                  <span>{topic.completionTime}</span>
                </div>

                <button className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  topic.completed
                    ? 'bg-slate-700/50 text-slate-300'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}>
                  {topic.completed ? 'Review' : 'Start Practice'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HR Questions Section */}
      {activeTab === 'hr' && (
        <div className="space-y-6">
          {hrQuestions.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-blue-500/20 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-white">"{item.question}"</h3>
                {item.videoAvailable && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-xs font-medium">
                    <Eye className="w-3 h-3" />
                    Video Sample
                  </span>
                )}
              </div>

              <div>
                <p className="text-slate-400 font-medium mb-3">Tips to Answer:</p>
                <ul className="space-y-2">
                  {item.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Mic className="w-4 h-4" />
                  Practice Answer
                </button>
                {item.videoAvailable && (
                  <button className="flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Watch Sample
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resume Feedback Section */}
      {activeTab === 'resume' && (
        <div className="space-y-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-green-500/20 space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Resume Feedback</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  category: 'Format & Layout',
                  score: 8,
                  feedback: 'Clean layout, easy to read. Consider reducing margins slightly.',
                },
                {
                  category: 'Content & Achievements',
                  score: 7,
                  feedback: 'Good details. Add more quantified metrics (e.g., "improved by 30%").',
                },
                {
                  category: 'Skills Section',
                  score: 7,
                  feedback: 'Well organized. Prioritize skills by job relevance, not all together.',
                },
                {
                  category: 'Work Experience',
                  score: 8,
                  feedback: 'Strong descriptions. Use STAR method more consistently.',
                },
              ].map((item) => (
                <div key={item.category} className="p-4 bg-slate-700/30 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">{item.category}</p>
                    <p className={`text-xl font-bold ${item.score >= 8 ? 'text-green-400' : item.score >= 6 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {item.score}/10
                    </p>
                  </div>
                  <p className="text-slate-400 text-sm">{item.feedback}</p>
                  <div className="w-full h-1 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${item.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-lg transition-all">
              Upload Resume for AI Review
            </button>
          </div>

          {/* Resume Examples */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4">Resume Templates & Examples</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['Software Engineer', 'Data Analyst', 'Product Manager'].map((role) => (
                <button key={role} className="p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-left transition-colors">
                  <p className="font-bold text-white">{role}</p>
                  <p className="text-sm text-slate-400 mt-1">Download template</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="grid md:grid-cols-4 gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-900/10 border border-purple-500/20">
        {[
          { label: 'Mock Interviews Completed', value: '3/12' },
          { label: 'HR Questions Practiced', value: '8/15' },
          { label: 'Resume Score', value: '7.8/10' },
          { label: 'Interview Readiness', value: '72%' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-purple-400">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
