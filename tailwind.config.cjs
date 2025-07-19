// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
    },
    fontFamily: {
      pfd: ['Playfair Display', 'serif'],
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
    ],
    darkMode: false,
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
