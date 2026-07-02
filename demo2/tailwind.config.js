/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          dark: '#AA823B',
          brass: '#C5A059',
        },
        obsidian: {
          950: '#050507',
          900: '#0D0D11',
          800: '#15161C',
          700: '#1F2027',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
