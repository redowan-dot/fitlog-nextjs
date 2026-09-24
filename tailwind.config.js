/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        surface: "#151517",
        surface2: "#1C1D1F",
        line: "#2A2B2E",
        muted: "#96979C",
        paper: "#F3F3EF",
        volt: "#CCFF00",
        voltDim: "#A8D400",
        danger: "#FF5C5C",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        volt: "0 0 0 1px rgba(204,255,0,0.4), 0 8px 24px -8px rgba(204,255,0,0.35)",
      },
    },
  },
  plugins: [],
};
