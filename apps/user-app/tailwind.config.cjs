import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // turborepo shared
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
