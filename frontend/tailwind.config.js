/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '3rem',
      }
    },
    screens: {
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1200px',
      '2xl': '1200px',
    },
  },
  plugins: [],
}
