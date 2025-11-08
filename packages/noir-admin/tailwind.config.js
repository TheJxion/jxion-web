/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "noir-black": "#0D0D0D",
        "noir-gold": "#FFD700",
        "noir-gray": {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        "noir-deep-purple": "#171717",
        "noir-deep-purple-light": "#262626",
        "noir-deep-purple-lighter": "#404040",
        "noir-deep-purple-lightest": "#525252",
        "noir-deep-purple-lightestest": "#737373",
        "noir-deep-purple-lightestestest": "#A3A3A3",
        "noir-deep-purple-lightestestestest": "#D4D4D4",
        "noir-deep-purple-lightestestestestest": "#E5E5E5",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
