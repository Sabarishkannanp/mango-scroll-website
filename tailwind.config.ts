import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'Arial', 'sans-serif'],
      },
      colors: {
        'strawberry-red': '#C62828',
        'deep-crimson': '#5A0612',
        'glow-gold': '#FFB43A',
      },
      boxShadow: {
        glow: '0 0 50px rgba(255, 93, 46, 0.34)',
        'glow-strong': '0 0 80px rgba(255, 180, 58, 0.28)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 50% 52%, rgba(198,40,40,.27), transparent 42%)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
