import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing GDGC brand colors
        gdgc: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
        },

        // Added vivid GoAvo-style greens and brand secondary
        green_accent1: '#4C5C18',
        green_accent2: '#6DA025',
        green_accent3: '#B5E08B',
        brand_secondary: '#7E9719',
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
};

export default config;
