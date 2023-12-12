import type { Config } from 'tailwindcss';

export default ({
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: 'rgb(var(--color-blue) / <alpha-value>)',
        darkGray: 'rgb(var(--color-dark-gray) / <alpha-value>)',
        grayBorder: 'rgb(var(--color-gray-border) / <alpha-value>)',
        red: 'rgb(var(--color-red) / <alpha-value>)',
        green: 'rgb(var(--color-green) / <alpha-value>)',

        background: 'rgb(var(--theme-background) / <alpha-value>)',

        textPrimary: 'rgb(var(--text-primary) / <alpha-value>)',
        textSecondary: 'rgb(var(--text-secondary) / <alpha-value>)',

        hoverEffect: 'var(--color-hover-effect)',

        error: 'rgb(var(--error) / <alpha-value>)'
      },
      animation: {
        'fade-in': 'fadeIn 1.3s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
} satisfies Config);
