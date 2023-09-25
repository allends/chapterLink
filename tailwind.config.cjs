/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  themes: ["light", "dark", "corporate"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
