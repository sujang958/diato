/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          "Pretendard Variable",
          "-apple-system",
          "Inter",
          "Noto Sans KR",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
