/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#0D0D0D',
          graphite: '#1A1A2E',
          surface: '#111827',
          card: '#161624',
        },
        accent: {
          green: '#00E676',
          'green-dim': 'rgba(0, 230, 118, 0.15)',
          red: '#FF3D57',
          'red-dim': 'rgba(255, 61, 87, 0.15)',
        },
        titanium: {
          DEFAULT: '#B0BEC5',
          dim: 'rgba(176, 190, 197, 0.15)',
          border: 'rgba(176, 190, 197, 0.12)',
        },
        text: {
          primary: '#E8EAED',
          secondary: '#B0BEC5',
          muted: 'rgba(176, 190, 197, 0.45)',
        },
      },
      animation: {
        'blink': 'blink 1.1s step-end infinite',
        'marquee': 'marquee 28s linear infinite',
        'scan': 'scan 8s linear infinite',
        'green-pulse': 'green-pulse 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};