import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'rgba(var(--border) / <alpha-value>)',
        input: 'rgba(var(--input) / <alpha-value>)',
        ring: 'rgba(var(--ring) / <alpha-value>)',
        background: 'rgba(var(--background) / <alpha-value>)',
        foreground: 'rgba(var(--foreground) / <alpha-value>)',
        like: 'rgba(var(--like) / <alpha-value>)',
        repost: 'rgba(var(--repost) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgba(var(--primary) / <alpha-value>)',
          foreground: 'rgba(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary) / <alpha-value>)',
          foreground: 'rgba(var(--secondary-foreground) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive) / <alpha-value>)',
          foreground: 'rgba(var(--destructive-foreground) / <alpha-value>)'
        },
        muted: {
          DEFAULT: 'rgba(var(--muted) / <alpha-value>)',
          foreground: 'rgba(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgba(var(--accent))',
          foreground: 'rgba(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'rgba(var(--popover) / <alpha-value>)',
          foreground: 'rgba(var(--popover-foreground) / <alpha-value>)'
        },
        card: {
          DEFAULT: 'rgba(var(--card) / <alpha-value>)',
          foreground: 'rgba(var(--card-foreground) / <alpha-value>)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
