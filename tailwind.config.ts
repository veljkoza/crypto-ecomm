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
          slate: "#3B3B3B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
