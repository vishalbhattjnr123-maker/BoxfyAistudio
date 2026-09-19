/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "rgba(255, 255, 255, 0.05)",
        primary: "#e50914", /* Optional OTT red, or subtle purple */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
