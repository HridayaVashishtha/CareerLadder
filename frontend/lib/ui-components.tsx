/**
 * Reusable UI Components using the Design System
 * These provide standardized implementations of common patterns
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  getCardClass,
  getButtonClass,
  getStatusBadgeClass,
  metricCardClass,
  getHeadingClass,
  getBodyClass,
  getLabelClass,
  getValueClass,
} from './design-system';

// === METRIC CARD COMPONENT ===
export interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  color?: 'purple' | 'green' | 'amber' | 'red' | 'blue';
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  color = 'purple',
  subtext,
  className = '',
}: MetricCardProps) {
  const colorMap = {
    purple: 'text-purple-300',
    green: 'text-green-300',
    amber: 'text-amber-300',
    red: 'text-red-300',
    blue: 'text-blue-300',
  };

  const bgColorMap = {
    purple: 'bg-purple-500/20',
    green: 'bg-green-500/20',
    amber: 'bg-amber-500/20',
    red: 'bg-red-500/20',
    blue: 'bg-blue-500/20',
  };

  return (
    <div className={`group relative p-7 ${metricCardClass(color)} ${className}`}>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className={`${getLabelClass('muted')} mb-2`}>
            {label}
          </p>
          <p className={`${getValueClass('large', color)} font-mono`}>
            {value}
          </p>
          {subtext && (
            <p className={`${getBodyClass('xsmall', 'muted')} mt-3`}>{subtext}</p>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-2xl ${bgColorMap[color]} group-hover:opacity-120 transition`}>
            <Icon className={`w-6 h-6 ${colorMap[color]}`} />
          </div>
        )}
      </div>
    </div>
  );
}

// === INFO CARD COMPONENT (for sections like recommendations) ===
export interface InfoCardProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  title?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function InfoCard({
  variant = 'info',
  title,
  children,
  icon: Icon,
  className = '',
}: InfoCardProps) {
  const variantStyles = {
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    danger: 'bg-red-500/10 border-red-500/30 text-red-300',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    default: 'bg-slate-700/20 border-slate-600/40 text-slate-300',
  };

  const iconColorMap = {
    success: 'text-green-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
    default: 'text-slate-400',
  };

  return (
    <div className={`p-4 rounded-xl border ${variantStyles[variant]} ${className}`}>
      <div className="flex gap-3">
        {Icon && <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColorMap[variant]}`} />}
        <div className="flex-1">
          {title && <p className={`${getBodyClass('small', 'secondary')} font-semibold mb-1`}>{title}</p>}
          <div className={`${getBodyClass('small', 'secondary')} opacity-90`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// === PROGRESS BAR COMPONENT ===
export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'purple' | 'green' | 'amber' | 'red' | 'blue';
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'purple',
  showValue = true,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  
  const colorMap = {
    purple: 'from-purple-400 to-purple-500',
    green: 'from-green-400 to-green-500',
    amber: 'from-amber-400 to-amber-500',
    red: 'from-red-400 to-red-500',
    blue: 'from-blue-400 to-blue-500',
  };

  const shadowMap = {
    purple: 'shadow-purple-500/50',
    green: 'shadow-green-500/50',
    amber: 'shadow-amber-500/50',
    red: 'shadow-red-500/50',
    blue: 'shadow-blue-500/50',
  };

  const heightMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const heightMapInner = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <p className={`${getBodyClass('small', 'secondary')}`}>{label}</p>}
          {showValue && <p className={`${getBodyClass('small', 'secondary')} font-semibold`}>{Math.round(percentage)}%</p>}
        </div>
      )}
      <div className={`${heightMap[size]} bg-white/5 rounded-full overflow-hidden border border-white/10`}>
        <div
          className={`${heightMapInner[size]} bg-gradient-to-r ${colorMap[color]} rounded-full shadow-lg ${shadowMap[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// === BUTTON COMPONENT ===
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${getButtonClass(variant, size)} ${fullWidth ? 'w-full' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
        {...props}
      >
        {loading ? '...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// === STATUS BADGE COMPONENT ===
export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info';
  text: string;
  className?: string;
}

export function StatusBadge({ status, text, className = '' }: StatusBadgeProps) {
  return (
    <span className={`${getStatusBadgeClass(status)} ${className}`}>
      {text}
    </span>
  );
}

// === SECTION HEADER COMPONENT ===
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-8 ${className}`}>
      <div>
        <h2 className={`${getHeadingClass('h2', 'white')} mb-2`}>{title}</h2>
        {subtitle && <p className={`${getBodyClass('small', 'muted')}`}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// === PAGE HEADER COMPONENT ===
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className={`${getHeadingClass('h1', 'white')} mb-2`}>{title}</h1>
      {subtitle && <p className={`${getBodyClass('base', 'muted')}`}>{subtitle}</p>}
    </div>
  );
}

// === CARD WRAPPER COMPONENT ===
export interface CardWrapperProps {
  variant?: 'default' | 'elevated' | 'subtle' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  children: React.ReactNode;
}

export function CardWrapper({
  variant = 'default',
  className = '',
  children,
}: CardWrapperProps) {
  return (
    <div className={`${getCardClass(variant)} ${className}`}>
      {children}
    </div>
  );
}

// === STAT DISPLAY COMPONENT (for key metrics) ===
export interface StatDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'white' | 'purple' | 'green' | 'amber' | 'red' | 'blue';
}

export function StatDisplay({ label, value, unit, color = 'white' }: StatDisplayProps) {
  const colorMap = {
    white: 'text-white',
    purple: 'text-purple-300',
    green: 'text-green-300',
    amber: 'text-amber-300',
    red: 'text-red-300',
    blue: 'text-blue-300',
  };

  return (
    <div>
      <p className={`${getLabelClass('muted')} mb-1`}>
        {label}
      </p>
      <p className={`${getValueClass('normal', color)}`}>
        {value}{unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
}
