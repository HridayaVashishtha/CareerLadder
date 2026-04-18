'use client';

import { BarChart3, Zap, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, Arush! 👋</h1>
        <p className="text-slate-400">Here's your career overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placement Readiness Score */}
        <div className="group relative p-7 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-white/[0.08] hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Placement Readiness</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent mt-1">78/100</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/20 group-hover:bg-purple-500/30 transition">
              <BarChart3 className="w-6 h-6 text-purple-300" />
            </div>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[78%] bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
          </div>
          <p className="text-slate-400 text-xs mt-3">Strong profile • Good internships</p>
        </div>

        {/* 3 Month Placement Chance */}
        <div className="group relative p-7 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-white/[0.08] hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Placement in 3 Months</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent mt-1">72%</p>
              <p className="text-slate-400 text-xs mt-3">High probability</p>
            </div>
            <div className="p-3 rounded-2xl bg-green-500/20 group-hover:bg-green-500/30 transition">
              <Zap className="w-6 h-6 text-green-300" />
            </div>
          </div>
        </div>

        {/* Expected Salary */}
        <div className="group relative p-7 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-white/[0.08] hover:border-amber-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Expected Salary</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent mt-1">₹6–8L</p>
              <p className="text-slate-400 text-xs mt-3">Peer avg ₹6.5L</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/20 group-hover:bg-amber-500/30 transition">
              <TrendingUp className="w-6 h-6 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Repayment Status */}
        <div className="group relative p-7 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl hover:bg-white/[0.08] hover:border-orange-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">EMI Readiness</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent mt-1">Medium</p>
              <p className="text-slate-400 text-xs mt-3">Risk level</p>
            </div>
            <div className="p-3 rounded-2xl bg-orange-500/20 group-hover:bg-orange-500/30 transition">
              <AlertCircle className="w-6 h-6 text-orange-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Placement Timeline */}
      <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">Placement Probability Timeline</h2>
        <div className="space-y-5">
          {[
            { time: '3 Months', prob: 72, color: 'from-green-400 to-green-500' },
            { time: '6 Months', prob: 89, color: 'from-blue-400 to-blue-500' },
            { time: '12 Months', prob: 96, color: 'from-purple-400 to-purple-500' },
          ].map((item) => (
            <div key={item.time} className="flex items-center gap-4">
              <div className="w-24 text-slate-300 font-semibold text-sm">{item.time}</div>
              <div className="flex-1">
                <div className="h-9 bg-white/5 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} flex items-center justify-end pr-4 transition-all duration-500 shadow-lg shadow-current/50`}
                    style={{ width: `${item.prob}%` }}
                  >
                    <span className="text-white font-bold text-sm">{item.prob}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">AI Recommendations</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/5 hover:border-white/10">
              <span className="text-green-400 font-bold text-lg mt-0.5 min-w-fit">✓</span>
              <span className="text-slate-200 text-sm leading-relaxed">Strong academics - maintain CGPA above 8</span>
            </li>
            <li className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/5 hover:border-white/10">
              <span className="text-amber-400 font-bold text-lg mt-0.5 min-w-fit">⚡</span>
              <span className="text-slate-200 text-sm leading-relaxed">Improve DSA skills - critical for tech roles</span>
            </li>
            <li className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/5 hover:border-white/10">
              <span className="text-amber-400 font-bold text-lg mt-0.5 min-w-fit">⚡</span>
              <span className="text-slate-200 text-sm leading-relaxed">Complete AWS certification - high market demand</span>
            </li>
            <li className="flex items-start gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition border border-white/5 hover:border-white/10">
              <span className="text-blue-400 font-bold text-lg mt-0.5 min-w-fit">→</span>
              <span className="text-slate-200 text-sm leading-relaxed">Apply to 15 active job openings this week</span>
            </li>
          </ul>
        </div>

        {/* Skill Gap Analysis */}
        <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Skill Gap Analysis</h2>
          <div className="space-y-5">
            {[
              { skill: 'Data Structures', demand: 'Critical', level: 30, color: 'from-red-400 to-orange-400' },
              { skill: 'System Design', demand: 'High', level: 40, color: 'from-orange-400 to-amber-400' },
              { skill: 'Cloud (AWS)', demand: 'High', level: 50, color: 'from-amber-400 to-yellow-400' },
            ].map((item) => (
              <div key={item.skill} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-200 font-semibold text-sm">{item.skill}</span>
                  <span className="text-slate-400 text-xs px-2 py-1 rounded-full bg-white/5 group-hover:bg-white/[0.08] transition">{item.demand}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 shadow-lg shadow-current/40`}
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <button className="group relative p-7 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-left">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative">
            <h3 className="text-lg font-bold text-white mb-2">Apply for Jobs</h3>
            <p className="text-slate-400 text-sm">Explore 15 matched opportunities</p>
          </div>
        </button>
        
        <button className="group relative p-7 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-left">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative">
            <h3 className="text-lg font-bold text-white mb-2">EMI Planning</h3>
            <p className="text-slate-400 text-sm">Simulate loan repayment scenarios</p>
          </div>
        </button>
        
        <button className="group relative p-7 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 text-left">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative">
            <h3 className="text-lg font-bold text-white mb-2">Skill Learning</h3>
            <p className="text-slate-400 text-sm">Start your personalized learning path</p>
          </div>
        </button>
      </div>
    </div>
  );
}
