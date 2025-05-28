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
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "border-flow": "border-flow 4s linear infinite",
        "text-shimmer": "text-shimmer 2.5s ease-in-out infinite",
        "nav-slide": "nav-slide 0.6s ease-out",
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
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(100%) skewX(-12deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.6",
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 40px rgba(147, 51, 234, 0.6)",
          },
        },
        "border-flow": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "-200% center",
          },
          "100%": {
            backgroundPosition: "200% center",
          },
        },
        "nav-slide": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
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
