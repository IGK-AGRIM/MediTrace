/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#090B0F",
          surface: "#11151B",
          elevated: "#171C23",
          elevated2: "#1D232B",
        },
        border: {
          subtle: "rgba(255,255,255,0.07)",
          soft: "rgba(255,255,255,0.12)",
        },
        ink: {
          primary: "#EDEFF2",
          secondary: "#9AA3AF",
          muted: "#656D79",
        },
        accent: {
          DEFAULT: "#20C7B5",
          dim: "#17998C",
          soft: "rgba(32,199,181,0.12)",
          softer: "rgba(32,199,181,0.06)",
        },
        status: {
          good: "#3FB871",
          goodSoft: "rgba(63,184,113,0.12)",
          warn: "#D9A441",
          warnSoft: "rgba(217,164,65,0.12)",
          critical: "#E0596B",
          criticalSoft: "rgba(224,89,107,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
        elevated: "0 8px 30px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        md2: "10px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "toast-in": {
          "0%": { opacity: 0, transform: "translateY(-8px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 180ms ease-out",
        "slide-up": "slide-up 220ms ease-out",
        "toast-in": "toast-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};
