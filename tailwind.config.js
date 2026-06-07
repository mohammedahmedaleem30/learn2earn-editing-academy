/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vault: {
          black: "#050405",
          charcoal: "#0d0b0d",
          panel: "#141014",
          cream: "#f7efe2",
          muted: "#b8aa99",
          magenta: "#ff2fb3",
          rose: "#ff5a8a",
          gold: "#d6a84f",
          bronze: "#9a6531",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 42px rgba(255, 47, 179, 0.26)",
        gold: "0 0 34px rgba(214, 168, 79, 0.2)",
        panel: "0 20px 70px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "fade-up": "fadeUp 520ms ease both",
        "pulse-ring": "pulseRing 2.2s ease-out infinite",
        "float-slow": "floatSlow 10s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,47,179,0.36)" },
          "70%": { boxShadow: "0 0 0 12px rgba(255,47,179,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(239,68,68,0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
