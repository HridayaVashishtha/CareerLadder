'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CreditCard, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAssessment } from '../AssessmentContext';
import { getHeadingClass, getBodyClass, getLabelClass, getValueClass } from '@/lib/design-system';
import { PageHeader, MetricCard, CardWrapper, InfoCard, StatDisplay, SectionHeader } from '@/lib/ui-components';

export default function LoanWellnessPage() {
  const { assessment } = useAssessment();
  const [placementMonth, setPlacementMonth] = useState(4);

  if (!assessment) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Loan Wellness"
          subtitle="Complete an assessment to see your EMI readiness"
        />
      </div>
    );
  }

  // Use assessment data
  const expectedSalary = (assessment.avgCtc || 6.5) * 100000; // Convert to rupees
  const monthlyIncome = expectedSalary / 12;

  // Standard loan calculation
  const loanAmount = 500000; // ₹5L
  const monthlyRate = 8.5 / 100 / 12;
  const totalMonths = 60;
  const monthlyEMI =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const emiToIncomeRatio = (monthlyEMI / monthlyIncome) * 100;

  const getStressLevel = (month: number) => {
    if (month <= 3)
      return {
        level: 'High',
        color: 'danger' as const,
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        textColor: 'text-red-400',
      };
    if (month <= 6)
      return {
        level: 'Moderate',
        color: 'warning' as const,
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        textColor: 'text-amber-400',
      };
    return {
      level: 'Low',
      color: 'success' as const,
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
    };
  };

  const stress = getStressLevel(placementMonth);

  return (
    <div className="space-y-10 max-w-5xl">
      <PageHeader
        title="Loan Wellness"
        subtitle="EMI readiness meter & loan planning tools"
      />

      {/* Loan Overview Cards */}
      <div>
        <SectionHeader title="Loan Overview" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <CardWrapper variant="subtle">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-purple-500/20">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Loan Amount</p>
                  <p className="text-2xl font-bold text-white font-mono mt-1">₹5,00,000</p>
                </div>
              </div>
            </div>
          </CardWrapper>

          <CardWrapper variant="subtle">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-blue-500/20">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Interest Rate</p>
                  <p className="text-2xl font-bold text-white font-mono mt-1">8.5% p.a.</p>
                </div>
              </div>
            </div>
          </CardWrapper>

          <CardWrapper variant="subtle">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-amber-500/20">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Loan Tenure</p>
                  <p className="text-2xl font-bold text-white font-mono mt-1">60 months</p>
                </div>
              </div>
            </div>
          </CardWrapper>

          <CardWrapper variant="subtle">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-green-500/20">
                  <CreditCard className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-400 text-xs font-medium tracking-wider uppercase">Monthly EMI</p>
                  <p className="text-2xl font-bold text-green-300 font-mono mt-1">₹{Math.round(monthlyEMI).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardWrapper>
        </div>
      </div>

      {/* Income Overview */}
      <div>
        <SectionHeader title="Income Overview" />
        <div className="grid md:grid-cols-2 gap-6">
          <MetricCard
            label="Expected Annual Salary"
            value={`₹${(assessment.avgCtc || 6.5).toFixed(1)}L`}
            color="green"
            subtext="Based on your assessment"
          />
          <MetricCard
            label="Monthly Income"
            value={`₹${Math.round(monthlyIncome).toLocaleString()}`}
            color="green"
            subtext="Gross monthly salary"
          />
        </div>
      </div>

      {/* EMI Readiness Meter - Enhanced Visualization */}
      <CardWrapper variant="default">
        <div className="p-8 space-y-8">
          <SectionHeader title="EMI Readiness Meter" subtitle="Adjust your placement timeline to see EMI stress levels" />

          {/* Interactive Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="placement-slider" className="block">
                <p className="text-slate-300 font-semibold">
                  If you get placed in:{' '}
                  <span className="text-purple-300 text-lg">{placementMonth} month{placementMonth !== 1 ? 's' : ''}</span>
                </p>
              </label>
            </div>
            <input
              id="placement-slider"
              type="range"
              min="1"
              max="12"
              value={placementMonth}
              onChange={(e) => setPlacementMonth(Number(e.target.value))}
              className="w-full h-3 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500 transition-all"
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Immediate (1 mo)</span>
              <span>1 Year (12 mo)</span>
            </div>
          </div>

          {/* Stress Level Visual */}
          <div className={`p-8 rounded-2xl ${stress.bgColor} border ${stress.borderColor} transition-all duration-300`}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-2">Repayment Stress Level</p>
                <p className={`text-5xl font-bold font-mono ${stress.textColor}`}>{stress.level}</p>
                <p className="text-slate-400 text-xs mt-3">
                  {placementMonth <= 3
                    ? 'High EMI burden relative to expected income'
                    : placementMonth <= 6
                    ? 'Moderate EMI obligations'
                    : 'Low EMI burden, comfortable repayment'}
                </p>
              </div>
              <div className={`p-6 rounded-2xl ${stress.bgColor} border ${stress.borderColor}`}>
                <AlertTriangle className={`w-12 h-12 ${stress.textColor}`} />
              </div>
            </div>
          </div>

          {/* EMI to Income Ratio Analysis */}
          <div className="space-y-3">
            <p className="text-slate-300 font-semibold">EMI to Income Ratio</p>
            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-blue-300 font-mono">{emiToIncomeRatio.toFixed(1)}%</p>
                  <p className="text-blue-300 text-sm mt-2">
                    {emiToIncomeRatio > 40
                      ? '✗ High - Aim to reduce loan or increase salary'
                      : emiToIncomeRatio > 30
                      ? '→ Moderate - Comfortable repayment expected'
                      : '✓ Low - Very comfortable repayment'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs mb-1">Industry Standard: &lt;30%</p>
                  <div className="w-40 h-2 bg-slate-700/50 rounded-full overflow-hidden border border-blue-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, emiToIncomeRatio / 0.4)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insight Message */}
          <InfoCard
            variant={
              placementMonth <= 3
                ? 'danger'
                : placementMonth <= 6
                ? 'warning'
                : 'success'
            }
            title={
              placementMonth <= 3
                ? 'Urgent: Get Placed Soon!'
                : placementMonth <= 6
                ? 'Action: Build Competitive Skills'
                : 'Great: Maintain Your Trajectory'
            }
          >
            {placementMonth <= 3
              ? '[→] Every month of delay increases EMI stress. Focus on job applications NOW. Target roles paying ₹7L+'
              : placementMonth <= 6
              ? '[→] You have some breathing room. Use it to build skills and secure a better-paying role for comfortable repayment.'
              : '[✓] Excellent timeline. You can repay comfortably. Continue skill development for career growth.'}
          </InfoCard>
        </div>
      </CardWrapper>

      {/* Recommendations Based on Risk Profile */}
      <div>
        <SectionHeader title="Personalized Recommendations" />
        <div className="space-y-4">
          {assessment.risk === 'High' ? (
            <>
              <InfoCard variant="danger" icon={AlertTriangle} title="High Risk Profile">
                Prioritize securing placement within 2-3 months for loan comfort. Your profile needs significant improvements.
              </InfoCard>
              <InfoCard variant="warning" title="Upskill Strategy">
                Target higher-paying roles (₹8L+) through specialized certifications and project experience.
              </InfoCard>
              <InfoCard variant="info" title="Parallel Action">
                Explore loan restructuring options or co-signer arrangements to reduce EMI burden.
              </InfoCard>
            </>
          ) : assessment.risk === 'Medium' ? (
            <>
              <InfoCard variant="warning" icon={AlertTriangle} title="Medium Risk Profile">
                Focus on placement in the next 4-6 months. You're on a workable timeline but need to stay focused.
              </InfoCard>
              <InfoCard variant="info" title="Enhancement Path">
                Build additional certifications and complete 1-2 portfolio projects to boost salary competitiveness.
              </InfoCard>
              <InfoCard variant="success" title="EMI Readiness">
                Your income expectations align well with EMI obligations if placed within 6 months.
              </InfoCard>
            </>
          ) : (
            <>
              <InfoCard variant="success" icon={CheckCircle2} title="Low Risk Profile">
                You're in an excellent position for comfortable EMI repayment and career stability.
              </InfoCard>
              <InfoCard variant="success" title="Growth Focus">
                Shift focus from placement to career growth. Aim for specialized roles with higher salary potential.
              </InfoCard>
              <InfoCard variant="info" title="Financial Planning">
                Consider optimal loan disbursement timing and explore additional skill-based certifications.
              </InfoCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
