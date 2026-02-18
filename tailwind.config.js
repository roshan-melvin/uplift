/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#F5C842',
          500: '#E6B800',
          600: '#C9A000',
        },
        navy: {
          900: '#0A0E1A',
          800: '#0D1224',
          700: '#111827',
        },
        teal: {
          400: '#2DD4BF',
          500: '#14B8A6',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'underline-grow': 'underline-grow 1s ease forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'underline-grow': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
