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
          DEFAULT: '#D4AF37',
          light: '#F0D875',
          dark: '#A5845D',
        },
        charcoal: {
          DEFAULT: '#111111',
          800: '#1A1A1A',
          700: '#222222',
          600: '#2E2E2E',
          500: '#3A3A3A',
        },
        ivory: {
          DEFAULT: '#F7F0E6',
          100: '#FDF9F5',
          200: '#F0E8D9',
          300: '#E2D5C0',
        },
        crimson: '#8B1A1A',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 175, 55, 0)' },
        },
        grain: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cine': 'linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #0D0D0D 100%)',
      },
      aspectRatio: {
        'cinema': '21/9',
        'portrait': '3/4',
      },
    },
  },
  plugins: [],
}
