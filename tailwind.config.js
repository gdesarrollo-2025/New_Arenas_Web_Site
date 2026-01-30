/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  /* 
  primary: "#802a90",
  secondary: "#6a2078".
  tertiary:"#2a6d90",
  accent:"#7ab547",
  text:"#000000",
  text-light:"#ffffff",
  light:"#f3f4f6",
  dark:"#000000",

  primary: "#1A3643",
        secondary: "#54595F",
        accent: "#93B174",
        text: "#383B3F",
        dark: "#000000",
        light: "#f3f4f6",
  */
  theme: {
    extend: {
      colors: {
        primary: "#802a90",
        secondary: "#6a2078",
        tertiary: "#2a6d90",
        accent: "#7ab547",
        text: "#000000",
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