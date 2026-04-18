'use client';

import { BookOpen, Clock, DollarSign, Flame, Zap, Users } from 'lucide-react';

export default function SkillUpPage() {
  const skills = [
    {
      name: 'Data Structures & Algorithms',
      demand: 'Very High',
      yourLevel: 30,
      target: 80,
      resources: ['LeetCode Premium', 'GeeksforGeeks', 'Striver DSA Sheet'],
      estimatedTime: '3 months',
    },
    {
      name: 'System Design',
      demand: 'High',
      yourLevel: 40,
      target: 75,
      resources: ['System Design Primer', 'YouTube Tutorials', 'Mock Interviews'],
      estimatedTime: '2 months',
    },
    {
      name: 'AWS Cloud',
      demand: 'High',
      yourLevel: 50,
      target: 85,
      resources: ['A Cloud Guru', 'AWS Training', 'Hands-on Projects'],
      estimatedTime: '2 months',
    },
    {
      name: 'Communication & Presentation',
      demand: 'Medium',
      yourLevel: 60,
      target: 80,
      resources: ['Toastmasters', 'Public Speaking Courses'],
      estimatedTime: '1 month',
    },
    {
      name: 'Leadership Skills',
      demand: 'Medium',
      yourLevel: 55,
      target: 75,
      resources: ['LinkedIn Learning', 'Team Projects', 'Mentoring Others'],
      estimatedTime: '2 months',
    },
    {
      name: 'Python Advanced',
      demand: 'Medium',
      yourLevel: 65,
      target: 85,
      resources: ['Advanced Python Course', 'Open Source Projects'],
      estimatedTime: '1.5 months',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Skill Up & Growth</h1>
        <p className="text-slate-400">Personalized learning plan to close gaps and boost employability</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Skills to Improve', value: '6', icon: BookOpen },
          { label: 'Estimated Timeline', value: '3 months', icon: Clock },
          { label: 'Learning Hours', value: '200+', icon: BookOpen },
          { label: 'Potential Salary Boost', value: '+₹2-3L', icon: DollarSign },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-start gap-2 mb-1">
                <Icon className="w-5 h-5 text-purple-400 mt-1" />
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="space-y-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-xs font-medium">
                    {skill.demand}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock className="w-4 h-4" />
                  Learning time: {skill.estimatedTime}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Placement Impact</p>
                <p className="text-2xl font-bold text-purple-400">+15%</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Your Level: <span className="text-white font-bold">{skill.yourLevel}%</span></span>
                <span className="text-slate-400">Target: <span className="text-green-400 font-bold">{skill.target}%</span></span>
              </div>

              <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all"
                  style={{ width: `${skill.yourLevel}%` }}
                ></div>
              </div>

              <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden border-2 border-dashed border-green-500/50">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-30 transition-all"
                  style={{ width: `${skill.target}%` }}
                ></div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="flex items-center gap-2 text-slate-300 font-medium mb-2">
                <BookOpen className="w-4 h-4" />
                Recommended Resources
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.resources.map((resource) => (
                  <span
                    key={resource}
                    className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm hover:bg-purple-600/40 cursor-pointer transition"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <button className="w-full px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-300 rounded-lg font-medium transition-colors">
              Start Learning Path
            </button>
          </div>
        ))}
      </div>

      {/* Learning Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Priority Path */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">Priority Learning Path (Next 3 Months)</h3>
          </div>
          <ol className="space-y-3 text-slate-300">
            <li className="flex gap-3">
              <span className="font-bold text-red-400">Month 1:</span>
              <span>DSA Fundamentals & Practice on LeetCode</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-400">Month 2:</span>
              <span>AWS Certification + System Design basics</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-400">Month 3:</span>
              <span>Advanced DSA + Mock Interviews & Presentations</span>
            </li>
          </ol>
          <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
            Start Priority Path
          </button>
        </div>

        {/* Quick Wins */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">Quick Wins (This Month)</h3>
          </div>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Complete AWS Solutions Architect certification</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Solve 50 LeetCode problems (Medium level)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Give 3 mock interviews</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Prepare elevator pitch & LinkedIn updates</span>
            </li>
          </ul>
          <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
            Track Quick Wins
          </button>
        </div>
      </div>

      {/* Learning Communities */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Join Learning Communities</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'DSA Study Group', members: '1.2K' },
            { name: 'AWS Community', members: '5K+' },
            { name: 'Mock Interview Partners', members: '800' },
          ].map((community) => (
            <div key={community.name} className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
              <Users className="w-6 h-6 text-blue-400 mb-2" />
              <p className="text-white font-bold">{community.name}</p>
              <p className="text-slate-400 text-sm">{community.members} members</p>
              <button className="mt-2 w-full px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 rounded text-sm transition-colors">
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
