import type { Config } from "tailwindcss";

export const tailwindConfig: Config = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  