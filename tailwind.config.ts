import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        aurora: "auroraMove 12s ease-in-out infinite alternate",
        aurora2: "auroraMove2 16s ease-in-out infinite alternate",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        auroraMove: {
          "0%": { transform: "translate(-50%, -50%) scale(1)" },
          "100%": { transform: "translate(-40%, -60%) scale(1.2)" },
        },
        auroraMove2: {
          "0%": { transform: "translate(-50%, -50%) scale(1)" },
          "100%": { transform: "translate(-60%, -40%) scale(1.1)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
