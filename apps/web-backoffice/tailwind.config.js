/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
