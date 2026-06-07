/**
 * Unified Design System for RankNest
 * Affiliate-focused product priority ranker
 * Color palette optimized for conversions and trust
 */

export const THEME = {
  // Primary colors - for CTAs and key actions
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Primary action
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c3d66",
  },

  // Accent - Amazon affiliate/CTA secondary
  accent: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24", // Amazon-inspired
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Success - for positive affirmations
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#145231",
  },

  // Neutral/Gray - structure and backgrounds
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    150: "#ecf0f5",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Semantic colors
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",

  // Dark mode support
  darkBg: "#0f1419",
  darkCard: "#1a1f2e",
  darkBorder: "#2d3748",
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    sans: "var(--font-inter-font), system-ui, sans-serif",
    heading: "var(--font-manrope-font), system-ui, sans-serif",
    mono: "var(--font-geist), monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
} as const;

export const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  "3xl": "2rem",
  full: "9999px",
} as const;

export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
} as const;

export const TRANSITIONS = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Component-specific color mappings
 */
export const COMPONENT_COLORS = {
  // Buttons
  button: {
    primary: THEME.primary[600],
    primaryHover: THEME.primary[700],
    affiliate: THEME.accent[500], // Amazon/affiliate links
    affiliateHover: THEME.accent[600],
    secondary: THEME.neutral[700],
  },
  // Cards
  card: {
    background: "#ffffff",
    border: THEME.neutral[200],
    hoverBorder: THEME.primary[300],
    shadow: SHADOWS.md,
  },
  // Text
  text: {
    primary: THEME.neutral[900],
    secondary: THEME.neutral[600],
    tertiary: THEME.neutral[500],
    muted: THEME.neutral[400],
  },
  // Badges
  badge: {
    prime: THEME.success[100],
    primeText: THEME.success[700],
    affiliate: THEME.accent[100],
    affiliateText: THEME.accent[700],
    featured: THEME.primary[100],
    featuredText: THEME.primary[700],
  },
  // Scores/Rankings
  score: {
    top: THEME.primary[500], // 1-3 rank
    good: THEME.success[500], // 4-7 rank
    moderate: THEME.accent[400], // 8-15 rank
    low: THEME.neutral[300], // 16+ rank
  },
} as const;

/**
 * Accessibility-friendly color contrast pairs
 */
export const A11Y = {
  textOnPrimary: "#ffffff",
  textOnAccent: "#ffffff",
  textOnNeutral: THEME.neutral[900],
  focusRing: THEME.primary[500],
  focusRingOffset: 2,
} as const;
