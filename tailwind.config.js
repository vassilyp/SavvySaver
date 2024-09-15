/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      sm: "22px",
      base: "28px",
      lg: "34px",
      xl: "40px",
    },
    colors: {
      black: "#000000",
      red: "#ff0000",
      yellow: "#ffff00",
      white: "#ffffff",
      lightyellow: "#fdf6c4",
      gold: "#b88204",
    },
    backgroundImage: {
      "custom-gradient":
        "linear-gradient(-4deg, #BA1E08 0%, #440B04 20%, #0F0301 53%)",
    },
    extend: {},
  },
  plugins: [],
};

// black: #000000
// red: #c45039
// gold: e4ba29
