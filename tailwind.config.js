/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        bg: '#05060a',
        surface: '#0d0f18',
        primary: '#1E293B',
        accent: '#8B5CF6',
        accent2: '#FF4D6D',
        muted: '#94A3B8',
      },
      fontFamily: {
        display: ['Calistoga', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
