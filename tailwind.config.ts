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
        auth: "url('/images/auth-bg.jpg')",
        main: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url('/images/bg-main-page.jpg')",
        favourite:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4) ), url('/images/bg-favourite.jpg')",
      },
      colors: {
        primary: "#fc8019",
        "hover-primary": "#f37000",
        secondary: "#1f1f23",
        "hover-secondary": "#2b2b2e",
        "primary-word": "#000000",
        "secondary-word": "#777777",
        disable: "#d8d8d8",
        border: "#e3e3e6",
        "momo-border": "#d82d8b",
        "momo-bg": "#fff0f6",
        "sidebar-bg": "#12192c",
      },
      boxShadow: {
        "report-card":
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "primary-shadow": "0 0 45px -15px rgba(0,0,0,0.3)",
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
        move_to_left: {
          "0%": { transform: "translateX(0)", width: "0px", opacity: "1" },
          "100%": {
            transform: "translateX(-100%)",
            width: "400px",
            opacity: "0",
          },
        },
        move_to_right: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateX(100%)",
            width: "0px",
            opacity: "0",
          },
        },
        disappear_to_left: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "row-disappear": "disappear_to_left .5s linear",
        "col-move-to-right": "move_to_right .3s linear forwards",
        "col-move-to-left": "move_to_left .3s linear forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwindcss-animate")],
} satisfies Config;

export default config;
