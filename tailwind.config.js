/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '5%',
        sm: '1rem',
      },
    },
    extend: {
      // screens: {
      //   sm: "600px",
      //   md: "700px",
      //   lg: "1000px",
      //   xl: "1250px",
      // },
      fontFamily:{
        'manrope':["Manrope", 'sans-serif'],
      },
      colors: {
        'custom-green': '#0E7A81',
        'custom-half-green': 'rgba(14, 121, 129, 0.2)',
        'white':'#ffffff',
        'custom-ash': '#f1f1f1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};