/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        text: 'rgba(var(--color-text), <alpha-value>)',
        background: 'rgba(var(--color-background), <alpha-value>)',
        primary: 'rgba(var(--color-primary), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary), <alpha-value>)',
        accent: 'rgba(var(--color-accent), <alpha-value>)',
        white: 'rgba(var(--color-white), <alpha-value>)',
        error: 'rgba(var(--color-error), <alpha-value>)',
        special: 'rgba(var(--color-special), <alpha-value>)',
        dark: {
          text: '#e8eefd',
          background: '#02091d',
          primary: '#b3c7ff',
          secondary: '#05143d',
          accent: '#2258ec'
        }
      }
    }
  },
  plugins: []
}
