/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1A3643",
        secondary: "#54595F",
        tertiary: "#2a6d90",
        accent: "#93B174",
        text: "#383B3",
        textlight: "#ffffff",
        light: "#f3f4f6",
        dark: "#000000",
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
} 