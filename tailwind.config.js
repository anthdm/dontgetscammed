/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}"
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
        "black-normal": "#0d1117",
        "black-dimmed": "#161b22",
        muted: "#8b949e"
      }
    }
  },
  plugins: []
}
