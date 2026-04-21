'use client';

import Link from 'next/link';
import { TrendingUp, BarChart3, Zap, Target } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-20">
      {/* Glowing Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full">
            <span className="text-purple-300 text-sm font-medium">v3.0 • Beta</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Your Degree Got You Here.
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                AI Helps You Get Hired Faster.
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              AI-powered career guidance for education loan students. Predict placement chances, estimate salary, and reduce repayment stress.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/assessment">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                Check My Placement Score
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-colors">
                Build My Career Plan
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">2,500+</div>
              <p className="text-slate-400 text-sm">Students Placed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">92%</div>
              <p className="text-slate-400 text-sm">Placement Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">₹6.5L</div>
              <p className="text-slate-400 text-sm">Avg Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">What We Offer</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:scale-[1.02] hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Predict Your Chances</h3>
              <p className="text-slate-400">Get AI-powered predictions for placement in 3, 6, and 12 months based on your profile.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:scale-[1.02] hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Estimate Your Salary</h3>
              <p className="text-slate-400">Know your expected salary range and compare with peers in your field.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:scale-[1.02] hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Improve Employability</h3>
              <p className="text-slate-400">Get personalized recommendations to boost your placement score and skills.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.08] hover:scale-[1.02] hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Reduce Repayment Stress</h3>
              <p className="text-slate-400">Plan your loan EMI with confidence based on projected salary and placement timeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Share Profile', desc: 'Enter your academic & experience details' },
              { step: 2, title: 'AI Analysis', desc: 'Our AI analyzes your placement potential' },
              { step: 3, title: 'Get Insights', desc: 'Receive personalized career recommendations' },
              { step: 4, title: 'Track Progress', desc: 'Monitor improvements and opportunities' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[40%] h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-4 bg-white/[0.03]">
        <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-[32px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-slate-300">Take our assessment in 5 minutes and get your personalized career plan.</p>
          <div className="pt-4">
            <Link href="/assessment">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105">
                Start Free Assessment
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 px-4 text-center text-slate-500">
        <p>© 2026 CareerLadder. All rights reserved. | Built for education loan students.</p>
      </footer>
    </main>
  );
}
