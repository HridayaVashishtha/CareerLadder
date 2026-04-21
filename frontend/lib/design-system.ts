/**
 * Design System for CareerLadder
 * Provides consistent spacing, typography, colors, and component styles
 */

// === SPACING SYSTEM (8px grid) ===
export const spacing = {
  xs: '4px',   // 0.5 units
  sm: '8px',   // 1 unit
  md: '16px',  // 2 units
  lg: '24px',  // 3 units
  xl: '32px',  // 4 units
  '2xl': '40px', // 5 units
  '3xl': '48px', // 6 units
} as const;

// === COLOR PALETTE ===
export const colors = {
  // Primary
  primary: '#8b5cf6',        // Purple 500
  primaryLight: '#a78bfa',   // Purple 400
  primaryDark: '#7c3aed',    // Purple 600
  
  // Semantic colors
  success: '#10b981',        // Emerald 500
  successLight: '#6ee7b7',   // Emerald 300
  warning: '#f59e0b',        // Amber 500
  warningLight: '#fcd34d',   // Amber 300
  danger: '#ef4444',         // Red 500
  dangerLight: '#fca5a5',    // Red 300
  info: '#3b82f6',           // Blue 500
  infoLight: '#93c5fd',      // Blue 300
  
  // Neutrals
  background: '#030712',     // Slate 950
  surface: '#111827',        // Slate 900
  surfaceHover: '#1f2937',   // Slate 800
  surfaceAlt: '#0f172a',     // Slate 950/lighter
  
  text: '#f8fafc',           // Slate 50
  textSecondary: '#cbd5e1',  // Slate 300
  textMuted: '#94a3b8',      // Slate 400
  
  border: '#334155',         // Slate 700
  borderLight: 'rgba(255, 255, 255, 0.08)',
} as const;

// === TYPOGRAPHY ===
export const typography = {
  // Headings
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-2xl font-bold tracking-tight',
  h3: 'text-xl font-bold tracking-tight',
  h4: 'text-lg font-semibold tracking-tight',
  h5: 'text-base font-semibold tracking-tight',
  
  // Body
  body: 'text-base font-normal',
  bodySmall: 'text-sm font-normal',
  bodyXSmall: 'text-xs font-normal',
  
  // Labels
  label: 'text-sm font-medium tracking-wide uppercase',
  labelSmall: 'text-xs font-medium tracking-wider uppercase',
  
  // Monospace (for numbers/values)
  mono: 'font-mono',
  value: 'text-2xl font-bold font-mono',
  valueLarge: 'text-4xl font-bold font-mono',
  valueSmall: 'text-lg font-semibold font-mono',
} as const;

// === CARD STYLES ===
export const card = {
  base: 'rounded-2xl backdrop-blur-xl border transition-all duration-300',
  default: 'bg-white/[0.05] border-white/10 hover:bg-white/[0.08] hover:border-white/20 shadow-lg',
  elevated: 'bg-white/[0.08] border-white/20 shadow-xl hover:shadow-2xl',
  subtle: 'bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50',
  
  // Color variants
  primary: 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/40',
  success: 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20 hover:border-green-500/40',
  warning: 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/40',
  danger: 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 hover:border-red-500/40',
  info: 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/40',
} as const;

// === COMPONENT PADDING ===
export const padding = {
  card: 'p-8',           // Default card padding
  cardCompact: 'p-6',    // Compact card
  cardSmall: 'p-4',      // Small card
  section: 'p-8',        // Section padding
  sectionCompact: 'p-6',
} as const;

// === BUTTON STYLES ===
export const button = {
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50',
  
  primary: 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 active:from-purple-700 active:to-purple-800',
  secondary: 'bg-slate-700/50 text-slate-100 hover:bg-slate-600/50 border border-slate-600/50',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-700/30',
  
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
} as const;

// === GRADIENT CLASSES ===
export const gradient = {
  primary: 'from-purple-600 to-purple-700',
  primaryLight: 'from-purple-400 to-purple-500',
  success: 'from-green-400 to-green-500',
  warning: 'from-amber-400 to-amber-500',
  danger: 'from-red-400 to-red-500',
  info: 'from-blue-400 to-blue-500',
} as const;

// === SHADOW CLASSES ===
export const shadow = {
  sm: 'shadow-md',
  md: 'shadow-lg',
  lg: 'shadow-xl',
  xl: 'shadow-2xl',
  glow: 'shadow-lg shadow-purple-500/20',
  glowGreen: 'shadow-lg shadow-green-500/20',
  glowAmber: 'shadow-lg shadow-amber-500/20',
  glowRed: 'shadow-lg shadow-red-500/20',
  glowBlue: 'shadow-lg shadow-blue-500/20',
} as const;

// === BORDER RADIUS ===
export const radius = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
} as const;

// === LAYOUT ===
export const layout = {
  containerMax: 'max-w-6xl',
  sidebarWidth: 'w-64',
  topBarHeight: '64px',
} as const;

// === SPACING HELPERS (Tailwind classes) ===
export const spacingClass = {
  gap: 'gap-6',
  gapSmall: 'gap-4',
  gapLarge: 'gap-8',
  
  mb: 'mb-8',
  mbSmall: 'mb-4',
  mbLarge: 'mb-12',
  
  mt: 'mt-8',
  mtSmall: 'mt-4',
  mtLarge: 'mt-12',
  
  p: 'p-8',
  pSmall: 'p-4',
  pLarge: 'p-12',
} as const;

// === ANIMATION ===
export const animation = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

// === ACCESSIBILITY ===
export const a11y = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-900',
} as const;

// === UTILITY FUNCTIONS ===

/**
 * Combine card base style with variant
 */
export function getCardClass(variant: keyof typeof card = 'default'): string {
  return `${card.base} ${card[variant]}`;
}

/**
 * Combine button base style with variant and size
 */
export function getButtonClass(
  variant: keyof Omit<typeof button, 'base' | 'sizes'> = 'primary',
  size: keyof typeof button.sizes = 'md'
): string {
  return `${button.base} ${button[variant]} ${button.sizes[size]}`;
}

/**
 * Create a gradient text class
 */
export function getGradientTextClass(gradientKey: keyof typeof gradient): string {
  return `bg-gradient-to-r ${gradient[gradientKey]} bg-clip-text text-transparent`;
}

/**
 * Create a gradient background with glow shadow
 */
export function getGradientGlowClass(gradientKey: keyof typeof gradient): string {
  const shadowKey = `glow${gradientKey.charAt(0).toUpperCase() + gradientKey.slice(1)}` as keyof typeof shadow;
  return `bg-gradient-to-r ${gradient[gradientKey]} ${shadow[shadowKey] || shadow.glow}`;
}

/**
 * Status badge styles
 */
export function getStatusBadgeClass(status: 'success' | 'warning' | 'danger' | 'info'): string {
  const styles = {
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };
  return `px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`;
}

/**
 * Metric card for displaying key values
 */
export function metricCardClass(colorAccent: 'purple' | 'green' | 'amber' | 'red' | 'blue' = 'purple'): string {
  const accentMap = {
    purple: 'border-purple-500/40 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20',
    green: 'border-green-500/40 hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20',
    amber: 'border-amber-500/40 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/20',
    red: 'border-red-500/40 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20',
    blue: 'border-blue-500/40 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20',
  };
  return `${card.base} bg-white/[0.05] ${accentMap[colorAccent]} transition-all duration-300`;
}

/**
 * Get heading class with optional color override
 */
export function getHeadingClass(
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' = 'h1',
  textColor: 'white' | 'muted' = 'white'
): string {
  const baseTypography = typography[level];
  const colorClass = textColor === 'white' ? 'text-white' : 'text-slate-400';
  return `${baseTypography} ${colorClass}`;
}

/**
 * Get body text class with optional color
 */
export function getBodyClass(
  size: 'base' | 'small' | 'xsmall' = 'base',
  textColor: 'white' | 'muted' | 'secondary' = 'white'
): string {
  const sizeMap = {
    base: typography.body,
    small: typography.bodySmall,
    xsmall: typography.bodyXSmall,
  };
  const colorMap = {
    white: 'text-white',
    muted: 'text-slate-400',
    secondary: 'text-slate-300',
  };
  return `${sizeMap[size]} ${colorMap[textColor]}`;
}

/**
 * Get label class with optional color
 */
export function getLabelClass(
  textColor: 'white' | 'muted' | 'secondary' = 'muted'
): string {
  const colorMap = {
    white: 'text-white',
    muted: 'text-slate-400',
    secondary: 'text-slate-300',
  };
  return `${typography.label} ${colorMap[textColor]}`;
}

/**
 * Get value (number) class with optional color
 */
export function getValueClass(
  size: 'large' | 'normal' | 'small' = 'normal',
  textColor: 'purple' | 'green' | 'amber' | 'red' | 'blue' | 'white' = 'white'
): string {
  const sizeMap = {
    large: typography.valueLarge,
    normal: typography.value,
    small: typography.valueSmall,
  };
  const colorMap = {
    purple: 'text-purple-300',
    green: 'text-green-300',
    amber: 'text-amber-300',
    red: 'text-red-300',
    blue: 'text-blue-300',
    white: 'text-white',
  };
  return `${sizeMap[size]} ${colorMap[textColor]}`;
}
