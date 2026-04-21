'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, User, Briefcase, DollarSign, BookOpen, Mic, TrendingUp } from 'lucide-react';
import { getBodyClass, getLabelClass, getValueClass } from '@/lib/design-system';
import { AssessmentProvider, useAssessment } from './AssessmentContext';

function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { assessment } = useAssessment();

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
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">CareerLadder</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className={`hidden sm:inline ${getBodyClass('small', 'muted')}`}>Student Dashboard</span>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 bg-gradient-to-b from-slate-900/80 to-slate-900/50 border-r border-white/10 px-6 py-8 flex-col fixed left-0 top-16 bottom-0 h-[calc(100vh-64px)] backdrop-blur-sm">
          {/* Navigation Menu */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-purple-600/40 text-purple-200 border-l-2 border-purple-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/40'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`font-medium text-sm ${isActive ? 'text-purple-200' : 'inherit'}`}>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Placement Score Card */}
          <div className="mt-auto p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/40 rounded-2xl backdrop-blur-sm hover:border-purple-500/60 transition-colors duration-200">
            <p className={`${getLabelClass('muted')} mb-3`}>Placement Score</p>
            <p className={`${getValueClass('large', 'purple')} font-mono mb-3`}>
              {assessment ? Math.round(assessment.riskScore) : '--'}
              <span className={`${getBodyClass('small', 'muted')}`}>/100</span>
            </p>
            <div className="w-full h-1.5 bg-slate-700/40 rounded-full overflow-hidden border border-white/10 mb-3">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, assessment?.riskScore || 0)}%` }}
              />
            </div>
            <p className={`${getBodyClass('xsmall', 'muted')} font-medium`}>
              {assessment
                ? assessment.riskScore > 75
                  ? '✓ Excellent profile'
                  : assessment.riskScore > 50
                  ? '→ Improve key areas'
                  : '! Update profile'
                : 'Take assessment'}
            </p>
          </div>
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-white/10 px-2 py-2">
          <div className="flex gap-1 justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-200 text-xs font-medium ${
                    isActive
                      ? 'bg-purple-600/40 text-purple-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden xs:block">{item.label.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 mb-20 md:mb-0">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssessmentProvider>
      <DashboardContent>{children}</DashboardContent>
    </AssessmentProvider>
  );
}
