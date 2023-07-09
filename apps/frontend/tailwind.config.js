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

      textPrimary: '#ffffff',
      textSecondary: 'rgb(var(--text-secondary) / <alpha-value>)',

      hoverEffect: 'var(--color-hover-effect)',
    },
    extend: {},
  },
  plugins: [],
};
