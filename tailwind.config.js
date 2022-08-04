/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: "100%",
      md: "100%",
      lg: "1128px",
      xl: "1128px"
    },
    extend: {
      colors: {
        "black-dimmed": "#18181a"
      }
    }
  },
  plugins: []
}
