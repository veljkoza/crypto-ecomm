import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d8f3dc",
          600: "#40916c",
        },
        black: {
          rich: "#02040F",
          slate: { 100: "#3B3B3B", 300: "#2B2B2B" },
        },
        neutral: {
          500: "#858584",
        },
      },

      fontFamily: {
        work: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
