// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        caramellatte: {
          "primary": "oklch(0% 0 0)",
          "primary-content": "oklch(100% 0 0)",

          "secondary": "oklch(22.45% 0.075 37.85)",
          "secondary-content": "oklch(95% 0.05 70.697)",

          "accent": "oklch(46.44% 0.111 37.85)",
          "accent-content": "oklch(95% 0.05 70.697)",

          "neutral": "oklch(55% 0.195 38.402)",
          "neutral-content": "oklch(98% 0.016 73.684)",

          "base-100": "oklch(98% 0.016 73.684)",
          "base-200": "oklch(95% 0.038 75.164)",
          "base-300": "oklch(90% 0.076 70.697)",
          "base-content": "oklch(30% 0.123 38.172)",

          "info": "oklch(42% 0.199 265.638)",
          "info-content": "oklch(95% 0.05 70.697)",

          "success": "oklch(43% 0.095 166.913)",
          "success-content": "oklch(95% 0.05 70.697)",

          "warning": "oklch(82% 0.189 84.429)",
          "warning-content": "oklch(30% 0.112 45.904)",

          "error": "oklch(70% 0.191 22.216)",
          "error-content": "oklch(30% 0.141 25.723)",
        }
      },
      "light", // fallback
    ],
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
