import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "auth-bg": "url('/images/auth-bg.jpg')",
      },
      colors: {
        primary: "#fc8019",
        secondary: "#1f1f23",
        "primary-word": "#000000",
        "secondary-word": "#777777",
        disable: "#d8d8d8",
        border: "#e3e3e6",
        "momo-border": "#d82d8b",
        "momo-bg": "#fff0f6",
        "sidebar-bg": "#12192c",
      },
      fontFamily: {
        "web-name": [
          "Gill Sans",
          "Gill Sans MT",
          "Calibri",
          "Trebuchet MS",
          "sans-serif",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-animate")],
} satisfies Config;

export default config;
