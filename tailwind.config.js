/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0066FF",
          cyan: "#00D4FF",
          purple: "#7C3AED",
          pink: "#EC4899",
        },
        surface: {
          primary: "#0A0A0B",
          secondary: "#111113",
          tertiary: "#18181B",
          elevated: "#1F1F23",
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "gradient-x": "gradient-x 10s ease infinite",
        "gradient-y": "gradient-y 10s ease infinite",
        "gradient-xy": "gradient-xy 10s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "gradient-y": {
          "0%, 100%": { "background-position": "50% 0%" },
          "50%": { "background-position": "50% 100%" },
        },
        "gradient-xy": {
          "0%, 100%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
        },
        glow: {
          "0%": { opacity: 0.5, transform: "scale(1)" },
          "100%": { opacity: 1, transform: "scale(1.05)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
}
