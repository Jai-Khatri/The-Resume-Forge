/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'transparent-black': 'rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}