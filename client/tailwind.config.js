/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00205C",
        secondary: "#FFC72C",
        tertiary: "#F6F6F6",
        background: "#F5F6FA",
        red: "#FF0000",
        green: "#BCFFE3",
      },
    },
  },
  plugins: [],
};
