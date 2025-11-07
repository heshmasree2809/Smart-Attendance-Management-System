/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        accent: "#A78BFA",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
