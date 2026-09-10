/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4ff',
          100: '#dce8ff',
          200: '#b9d0ff',
          300: '#84aeff',
          400: '#4d82ff',
          500: '#2358ff',
          600: '#0f39f5',
          700: '#0a29e1',
          800: '#0f23b6',
          900: '#12228f',
          950: '#0B1D3A',
        },
        brand: {
          dark:   '#0B1D3A',
          navy:   '#1B3A6B',
          blue:   '#2563EB',
          teal:   '#06B6D4',
          orange: '#F59E0B',
          amber:  '#F97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
