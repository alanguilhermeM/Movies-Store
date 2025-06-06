import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-100%)" }, // Desliza até o final
          "100%": { transform: "translateX(0)" }, // Volta à posição inicial
        },
      },
      animation: {
        slide: "slide 5s linear infinite", // Duração e tipo de repetição
      },

    },
    screens: {
  		ss: '360px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px',
		  '3xl': '1920px'
  	}
  },
  plugins: [],
};
export default config;
