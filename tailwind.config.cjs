/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    boxShadow: {
      lg: '0px 10px 20px rgba(54, 78, 126, 0.25)'
    },
    extend: {
      fontFamily: { sans: ['Plus Jakarta SansVariable', 'sans-serif'] },
      fontSize: { '2sm': '0.9375rem' }
    }
  }
}
