/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B5ED7",
        secondary: "#22C55E",
        accent: "#38BDF8",
        background: "#FFFFFF",
        foreground: "#111827",
      },
    },
  },
  plugins: [],
}
