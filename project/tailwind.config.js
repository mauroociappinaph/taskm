/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          500: "#F4A261",
          600: "#E76F51",
          700: "#D45D3B",
        },
        gray: {
          50: "#FFFAF5",
          100: "#FDF0E7",
          300: "#E4D8D2",
          600: "#8C7C74",
          800: "#5C4A43",
        },
        green: {
          500: "#A8D5BA",
        },
        blue: {
          500: "#9CC5E3",
        },
        yellow: {
          500: "#FFE29A",
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        scaleIn: "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
