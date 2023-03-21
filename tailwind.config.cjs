/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    boxShadow: {
      md: '0px 4px 6px rgba(54, 78, 126, 0.101545)',
      lg: '0px 10px 20px rgba(54, 78, 126, 0.25)'
    },
    extend: {
      fontFamily: { sans: ['Plus Jakarta SansVariable', 'sans-serif'] },
      fontSize: { '2sm': '0.9375rem' }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
