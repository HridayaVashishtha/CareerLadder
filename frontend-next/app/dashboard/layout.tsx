'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, User, Briefcase, DollarSign, BookOpen, Mic } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/dashboard/profile', label: 'My Profile', icon: User },
    { href: '/dashboard/jobs', label: 'Job Opportunities', icon: Briefcase },
    { href: '/dashboard/loan-wellness', label: 'Loan Wellness', icon: DollarSign },
    { href: '/dashboard/skill-up', label: 'Skill Up', icon: BookOpen },
    { href: '/dashboard/interview', label: 'Interview Zone', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-xl font-bold text-white">Career Predictor</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Student Dashboard</span>
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex mt-16">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 bg-slate-800/30 border-r border-purple-500/20 px-4 py-8 flex-col fixed left-0 top-16 bottom-0 h-[calc(100vh-64px)]">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href
                      ? 'bg-purple-600/30 text-purple-300 border-l-2 border-purple-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Profile Card */}
          <div className="mt-auto p-4 bg-purple-600/10 border border-purple-500/30 rounded-lg">
            <p className="text-slate-300 text-sm mb-2">Placement Score</p>
            <p className="text-3xl font-bold text-purple-400 mb-2">78/100</p>
            <p className="text-slate-400 text-xs">Update profile to improve</p>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden w-full bg-slate-800/20 border-b border-purple-500/20 px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                    pathname === item.href
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700/50 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
