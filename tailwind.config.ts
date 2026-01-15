import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Brand Colors
        'brand-brown': '#5B4233',        // Main brown text color
        'brand-gold': '#c0841a',         // Primary gold/amber
        'brand-gold-dark': '#a0701a',   // Darker gold variant
        'brand-gold-darker': '#b0720a', // Even darker gold
        'brand-brown-dark': '#291d12',  // Very dark brown
        
        // Background Colors
        'cream-bg': '#F2F0EB',
        'brown-medium': '#A88B78',
        'gray-brown': '#AFA393',
        'beige-light': '#EBE1DD',
        'pink-light': '#EEDDD8',
        
        // Gradient Colors
        'gradient-start': '#2f6f73',     // Teal/cyan start
        'gradient-end': '#c0841a',       // Gold end
        
        // Status Colors
        'safe-green': '#10B981',
        'warning-orange': '#F59E0B',
        'danger-red': '#EF4444',
        'gauge-safe': '#15803d',
        'gauge-warning': '#F59E0B',
        'gauge-danger': '#EF4444',
        
        // Accent Colors
        'accent-yellow': '#eab308',      // Bright yellow
        'accent-blue': '#3B82F6',        // Blue
        'accent-purple': '#8B5CF6',      // Purple
        'accent-pink': '#EC4899',        // Pink
        
        // Google Colors (for OAuth buttons)
        'google-blue': '#4285F4',
        'google-green': '#34A853',
        'google-yellow': '#FBBC05',
        'google-red': '#EA4335',
        
        // Light Tint Colors (for symptoms/indicators)
        'tint-orange-light': '#FED7AA',
        'tint-blue-light': '#BFDBFE',
        'tint-yellow-light': '#FDE68A',
        'tint-purple-light': '#C7D2FE',
        'tint-pink-light': '#FECACA',
        'tint-purple-lighter': '#E9D5FF',
        'tint-green-light': '#D1FAE5',
        'tint-red-light': '#FEE2E2',
        
        // Legacy aliases (for backward compatibility)
        'brown-text': '#5B4233',
        'primary': '#c0841a',
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'sans-serif'],
        sans: ['var(--font-arabic)', 'sans-serif'], // Default to Arabic font
        serif: ['Playfair Display', 'serif'], // Logo
        tajawal: ['Tajawal', 'sans-serif'], // Fallback if needed
      },
      fontSize: {
        // Typography System - Unified sizes
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],   // 14px
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],            // 16px
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],          // 18px
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0' }],          // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],       // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],    // 60px
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],       // 72px
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],        // 96px
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.04em' }],         // 128px
      },
      boxShadow: {
        'luxury': '0 20px 40px rgba(0,0,0,0.08)', // Cards
        'button': '0 10px 25px rgba(47,111,115,0.2)', // Buttons
        'radar': '0 0 40px rgba(16,185,129,0.3)', // Radar Chart
        'timeline': '0 10px 30px rgba(0,0,0,0.1)', // Timeline
      },
    },
  },
  plugins: [],
};
export default config;
