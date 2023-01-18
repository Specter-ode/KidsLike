/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-color': '#000000',
        'second-color': '#858598',
        'third-color': '#3E7ADC',
        'fourth-color': '#8EC63F',
        'line-color': '#E3E2E7',
        'accent-color': '#FFBC33',
        'second-accent-color': 'rgba(255, 188, 51, 0.5)',
        'bg-color': '#E5E5E5',
        'second-bg-color': '#F1F1F1',
        'third-bg-color': '#F6F7FB',
      },
      boxShadow: {
        header: '0px 2px 4px rgba(0, 0, 0, 0.15)',
        form: '0px 2px 4px 2px rgba(0, 0, 0, 0.2)',
      },
      fontFamily: {
        main: ['Montserrat'],
      },
      screens: {
        sMob: '480px',
        sTablet: '768px',
        sLaptop: '1280px',
      },
    },
  },
  plugins: [],
};
