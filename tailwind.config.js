/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'gh-gold': '#c5a059',
        'gh-brown': '#8c6c30',
        'gh-dark': '#121212',
        'gh-sand': '#f9f6f0',
      },
      fontFamily: {
        ivy: ['"IvyPresto Display"', 'Playfair Display', 'Georgia', 'serif'],
        assistant: ['Assistant', 'sans-serif'],
      },
      keyframes: {
        'scroll-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        }
      },
      animation: {
        'scroll-down': 'scroll-down 2s cubic-bezier(0.15, 0.85, 0.45, 1) infinite',
      }
    },
  },
  plugins: [],
};
