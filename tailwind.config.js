/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'minister': {
          'gold': '#FFD700',
          'gold-secondary': '#FFA500',  
          'gold-light': '#FFED4E',
          'dark': '#1a1a1a',
          'sidebar': '#2d2d2d',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-delayed-1': 'bounce 1s infinite 0.1s',
        'bounce-delayed-2': 'bounce 1s infinite 0.2s',
      },
    },
  },
  plugins: [],
};
