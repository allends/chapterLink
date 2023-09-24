/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  themes: [
    {
      default: {
        primary: "#2563eb",
        secondary: "#a78bfa",
        accent: "#fbcfe8",
        neutral: "#2b3440",
        "base-100": "#ffffff",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
      },
    },
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
