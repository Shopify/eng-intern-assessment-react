/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'btn-green': '#32CD32',
        'btn-green-hold': '#28A745',
        'btn-red':'#FF6347',
        'btn-yellow':'#FFD700',
        'btn-yellow-hold': '#FFC107',
        'btn-grey':'#808080',
        'btn-grey-hold': '#6C757D',
        'light-grey': '#F5F5F5'
      }
    },
  },
  plugins: [],
}