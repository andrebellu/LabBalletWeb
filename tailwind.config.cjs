// tailwind.config.js
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
