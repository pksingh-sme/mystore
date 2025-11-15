/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9900', // Amazon orange
        secondary: '#232F3E', // Amazon dark blue
        accent: '#146EB4', // Amazon light blue
        background: {
          light: '#FFFFFF',
          dark: '#0F172A'
        },
        muted: '#565656', // Amazon gray
        success: '#007600', // Amazon success green
        warning: '#FFA41C', // Amazon warning orange
        danger: '#DC3545' // Amazon danger red
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}