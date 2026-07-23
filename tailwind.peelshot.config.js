/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./peel-shot.html'],
  theme: {
    extend: {
      colors: {
        canvas: '#FBF6F2',
        surface: '#FFFFFF',
        ink: '#241D1A',
        subink: '#6E6159',
        rouge: '#C4293D',
        rougedark: '#9C1F30',
        blush: '#F7E6E1',
        line: '#EBE0D9',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Public Sans', 'sans-serif'],
      },
      maxWidth: {
        prose: '38rem',
      },
    },
  },
  plugins: [],
};
