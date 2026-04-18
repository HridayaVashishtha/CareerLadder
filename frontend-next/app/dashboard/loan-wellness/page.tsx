'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CreditCard, AlertTriangle } from 'lucide-react';

export default function LoanWellnessPage() {
  const [placementMonth, setPlacementMonth] = useState(4);

  const calculateEMI = () => {
    const loanAmount = 500000; // ₹5 LPA
    const monthlyRate = 8.5 / 100 / 12; // 8.5% annual
    const totalMonths = 60; // 5 years
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  };

  const getStressLevel = (month: number) => {
    if (month <= 3) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
    if (month <= 6) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
  };

  const stress = getStressLevel(placementMonth);
  const monthlyEMI = calculateEMI();
  const expectedSalary = 750000; // ₹7.5L
  const monthlyIncome = expectedSalary / 12;
  const emiToIncomeRatio = (monthlyEMI / monthlyIncome) * 100;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Loan Wellness</h1>
        <p className="text-slate-400">EMI readiness meter & loan planning tools</p>
      </div>

      {/* Loan Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Loan Amount', value: '₹5,00,000', icon: DollarSign },
          { label: 'Interest Rate', value: '8.5% p.a.', icon: TrendingUp },
          { label: 'Loan Tenure', value: '60 months', icon: Clock },
          { label: 'Monthly EMI', value: `₹${monthlyEMI.toLocaleString()}`, icon: CreditCard },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-start gap-2 mb-2">
                <Icon className="w-5 h-5 text-purple-400 mt-1" />
                <p className="text-slate-400 text-sm">{item.label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* EMI Readiness Meter */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20 space-y-6">
        <h2 className="text-2xl font-bold text-white">EMI Readiness Meter</h2>

        {/* Slider */}
        <div className="space-y-4">
          <label className="block">
            <p className="text-slate-300 mb-3">If you get placed in: <span className="font-bold text-purple-400">{placementMonth} months</span></p>
            <input
              type="range"
              min="1"
              max="12"
              value={placementMonth}
              onChange={(e) => setPlacementMonth(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>Immediate</span>
              <span>1 Year</span>
            </div>
          </label>
        </div>

        {/* Stress Level */}
        <div className={`p-6 rounded-lg ${stress.bg} border ${stress.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 mb-2">Repayment Stress Level</p>
              <p className={`text-4xl font-bold ${stress.color}`}>{stress.level}</p>
            </div>
            <AlertTriangle className={`w-12 h-12 ${stress.color}`} />
          </div>
        </div>

        {/* Insight Message */}
        <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm">
            {placementMonth <= 3
              ? '💡 Get placed soon! Every month of delay increases EMI stress. Focus on job applications now.'
              : placementMonth <= 6
              ? '💡 You have some time. Use it to build skills and secure a better-paying role for comfortable repayment.'
              : '💡 Good timeline. You can repay comfortably. Focus on skill development for better salary.'}
          </p>
        </div>
      </div>

      {/* Income vs EMI */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-green-500/20 space-y-6">
        <h2 className="text-2xl font-bold text-white">Income vs EMI Projection</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-400 text-sm mb-2">Expected Monthly Income</p>
            <p className="text-3xl font-bold text-green-400">₹{(monthlyIncome).toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">Based on projected salary: ₹7.5L/year</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Monthly EMI</p>
            <p className="text-3xl font-bold text-orange-400">₹{monthlyEMI.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">{emiToIncomeRatio.toFixed(1)}% of monthly income</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-300 font-medium">Income</span>
              <span className="text-slate-400 text-sm">100%</span>
            </div>
            <div className="h-12 bg-slate-700/50 rounded-lg overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-green-500 to-green-600 flex items-center">
                <span className="text-white font-bold ml-4">₹{(monthlyIncome).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-300 font-medium">EMI</span>
              <span className="text-slate-400 text-sm">{emiToIncomeRatio.toFixed(1)}%</span>
            </div>
            <div className="h-12 bg-slate-700/50 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center transition-all"
                style={{ width: `${emiToIncomeRatio}%` }}
              >
                <span className="text-white font-bold ml-4">₹{monthlyEMI.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-300 font-medium">Remaining</span>
              <span className="text-slate-400 text-sm">{(100 - emiToIncomeRatio).toFixed(1)}%</span>
            </div>
            <div className="h-12 bg-slate-700/50 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center transition-all"
                style={{ width: `${100 - emiToIncomeRatio}%` }}
              >
                <span className="text-white font-bold ml-4">
                  ₹{(monthlyIncome - monthlyEMI).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EMI Tools */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Grace Period Info */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Grace Period</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• EMI holiday for first 6 months after graduation</p>
            <p>• During grace period: Interest accrues (not paid)</p>
            <p>• No EMI payments required during this time</p>
            <p className="text-purple-300 font-medium">Your grace period: June 2026 - December 2026</p>
          </div>
        </div>

        {/* Placement Delay Support */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Placement Delay Support</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Moratorium period up to 2 years after graduation</p>
            <p>• EMI reduction options for 12-month period</p>
            <p>• Consider part-time/contract work while searching</p>
            <p className="text-blue-300 font-medium">Contact lender to discuss options if delayed</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all">
          Download EMI Plan
        </button>
        <button className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-colors">
          Contact Lender
        </button>
      </div>
    </div>
  );
}
