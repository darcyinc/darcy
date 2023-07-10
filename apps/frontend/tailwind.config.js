/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      blue: 'rgb(var(--color-blue) / <alpha-value>)',
      darkGray: 'rgb(var(--color-dark-gray) / <alpha-value>)',
      grayBorder: 'rgb(var(--color-gray-border) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
      green: 'rgb(var(--color-green) / <alpha-value>)',

      background: 'rgb(var(--background) / <alpha-value>)',

      textPrimary: 'rgb(var(--text-primary) / <alpha-value>)',
      textSecondary: 'rgb(var(--text-secondary) / <alpha-value>)',

      hoverEffect: 'var(--color-hover-effect)',

      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
};
