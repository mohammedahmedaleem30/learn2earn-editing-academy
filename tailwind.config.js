/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: "#fff1f3",
          100: "#ffe3e8",
          200: "#ffcbd4",
          300: "#ff9bab",
          400: "#ff5f78",
          500: "#dc143c",
          600: "#b11226",
          700: "#920f20",
          800: "#7a1020",
          900: "#681321",
          950: "#3b060e",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "red-glow": "var(--shadow-red)",
        "red-glow-strong": "var(--shadow-red-strong)",
        panel: "var(--shadow-panel)",
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
