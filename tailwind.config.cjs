/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
  plugins: [],
}
