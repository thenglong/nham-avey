/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
      mono: ["FMono-Regular", "Menlo", "Monaco", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
