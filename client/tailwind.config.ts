import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { createThemes } from "tw-colors";

const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  50: 900,
  100: 800,
  200: 700,
  300: 600,
  400: 500,
  500: 400,
  600: 300,
  700: 200,
  800: 100,
  900: 50,
};

const generarteThemeObject = (
  colors: DefaultColors,
  mapping: Record<number, number>,
  invert = false
) => {
  const theme: Record<string, Record<string, string>> = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value : (key as keyof DefaultColors);
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
};

const lightTheme = generarteThemeObject(colors, shadeMapping);
const darkTheme = generarteThemeObject(colors, shadeMapping, true);

const themes = {
  light: { ...lightTheme, white: "#fff" },
  dark: { ...darkTheme, white: colors.gray[500], black: colors.gray[50] },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
};
export default config;
