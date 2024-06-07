import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
