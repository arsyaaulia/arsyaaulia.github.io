/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "!./node_modules/**/*",
    "!./.git/**/*"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec489a',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
        'pulse-slow': 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}