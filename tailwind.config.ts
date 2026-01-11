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
        'cream-bg': '#F2F0EB',
        'brown-text': '#5B4233',
        'primary': '#c0841a',
        'gradient-start': '#2f6f73',
        'gradient-end': '#c0841a',
        'safe-green': '#10B981',
        'warning-orange': '#F59E0B',
        'danger-red': '#EF4444',
        'gauge-safe': '#15803d',
        'pink-light': '#EEDDD8',
        'brown-medium': '#A88B78',
        'gray-brown': '#AFA393',
        'beige-light': '#EBE1DD',
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'sans-serif'],
        sans: ['var(--font-arabic)', 'sans-serif'], // Default to Arabic font
        serif: ['Playfair Display', 'serif'], // Logo
        tajawal: ['Tajawal', 'sans-serif'], // Fallback if needed
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
