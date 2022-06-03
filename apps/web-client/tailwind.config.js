/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path")

module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {},
  },
  plugins: [],
}
