/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Nunito",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=emerald]"],
          primary: "#ea5234",
          "primary-content": "#f9fafb",
          accent: "#66cc8a",
          "accent-content": "#223D30",
          secondary: "#377cfb",
          "secondary-content": "#f9fafb",
          neutral: "#333c4d",
          "neutral-content": "#f9fafb",
          "base-100": "#ffffff",
          "base-content": "#333c4d",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-focus-scale": "1",
        },
      },
      "dracula",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "emerald",
  },
}
