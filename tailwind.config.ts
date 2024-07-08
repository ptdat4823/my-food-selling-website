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
        light:
          "linear-gradient(90deg,rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2)),url('/images/light-bg.jpg')",
        dark: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/images/dark-page.jpg')",
        favourite:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url('/images/bg-favourite.jpg')",
        intro:
          "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.169)), url('/images/intro-bg.jpg')",
      },
      colors: {
        //light theme

        //background color
        secondary: "#1f1f23",
        "momo-bg": "#fff0f6",
        "sidebar-bg": "#12192c",

        //hover background color
        "hover-primary": "#f37000",
        "hover-secondary": "#2b2b2e",

        //text color
        "primary-word": "#323232",
        "secondary-word": "#777777",
        disable: "#d8d8d8",

        //border color
        border: "#e3e3e6",
        "momo-border": "#d82d8b",

        //dark

        //background color
        "dark-bg": "#090e34",
        "dark-secondary-bg": "#242733",
        "dark-secondary": "#1a0d60",
        "dark-sidebar-bg": "#060929",
        "dark-disable": "#25367a",

        //hover background color
        "dark-hover-primary": "#324bae",
        "dark-hover-secondary": "#1d1d4e",

        //text color
        "dark-primary-word": "#ffffff",
        "dark-secondary-word": "#dddddd",

        //border color
      },
      boxShadow: {
        "report-card":
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "primary-shadow": "0 0 60px 0px rgba(0,0,0,0.2)",
        "highlight-orange": "0 10px 30px -6px rgb(243, 112, 0)",
        "highlight-dark": "0 10px 30px -6px #597aff",
        "highlight-white": "0 10px 30px -6px #ffffff",
      },
      fontFamily: {
        "web-name": [
          "Gill Sans",
          "Gill Sans MT",
          "Calibri",
          "Trebuchet MS",
          "sans-serif",
        ],

        nunito: ["var(--font-nunito)"],
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
        "row-disappear": "disappear_to_left .5s linear forwards",
        "col-move-to-right": "move_to_right .3s linear forwards",
        "col-move-to-left": "move_to_left .3s linear forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#597aff",
              foreground: "#ffffff",
            },
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#fc8019",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
