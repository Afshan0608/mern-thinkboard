import daisyui from 'daisyui';       // Importing daisyUI for Tailwind CSS components

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],      // Adding daisyUI plugin for Tailwind CSS
  daisyui:{
    themes:["forest"],     // Using the 'forest' theme from daisyUI
  },
}
