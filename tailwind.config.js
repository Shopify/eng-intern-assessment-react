/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        'shopify-green': {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        }
      },
      fontFamily: {
        poppins: ['Poppins', "sans-serif"]
      },
    },
  },
  plugins: [],
}
