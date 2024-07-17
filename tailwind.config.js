import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'like': '#dc2626',
        'repost': '#0284c7',
        'comment': '#16a34a'
      }
    }
  },
  plugins: [daisyui, typography],
  daisyui: {
    themes: [
      {
        dark: {
          primary: '#4f46e5',
          secondary: '#3730a3',
          accent: '#818cf8',
          neutral: '#1c1917',
          'base-100': '#09090b',
          info: '#a1a1aa',
          success: '#15803d',
          warning: '#eab308',
          error: '#dc2626'
        },
        light: {
          primary: '#4f46e5',
          secondary: '#3730a3',
          accent: '#4338ca',
          neutral: '#1c1917',
          'base-100': '#e2e8f0',
          info: '#3f3f46',
          success: '#15803d',
          warning: '#eab308',
          error: '#dc2626'
        }
      }
    ]
  }
};
