import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  // darkMode: 'selector',
  darkMode: 'false',
  theme: {
    //   // screens: {
    //   //   sm: '480px',
    //   //   md: '768px',
    //   //   lg: '976px',
    //   //   xl: '1440px',
    //   // },
    extend: {
      colors: {
        slate: {
          50: '#f5f6fa',
          100: '#ebedf3',
          200: '#d2d9e5',
          300: '#aab7cf',
          400: '#7c91b4',
          500: '#5b739c',
          600: '#4e638d',
          700: '#3b4a69',
          800: '#344058',
          900: '#2f384b',
          950: '#1f2432',
        },

        secondary: {
          50: '#feffe4',
          100: '#faffc4',
          200: '#f4ff90',
          300: '#e8ff50',
          400: '#d4ff00',
          500: '#b9e600',
          600: '#90b800',
          700: '#6c8b00',
          800: '#556d07',
          900: '#485c0b',
          950: '#253400',
        },

        primary: {
          50: '#edf7ff',
          100: '#d7ecff',
          200: '#b7dfff',
          300: '#86cdff',
          400: '#4db0ff',
          500: '#248cff',
          600: '#0d6bff',
          700: '#0654f0',
          800: '#0c44c1',
          900: '#113e97',
          950: '#0f265c',
        },
      },
    },
    fontFamily: {
      sans: ['degular-text', 'Trebuchet MS', 'sans-serif'],
      titles: ['new-hero', 'Trebuchet MS', 'sans-serif'],
    },
    // fontSize: {
    // sm: '1rem',
    // base: '1.9rem',
    // xl: '2rem',
    // },
    // extend: {
    //   spacing: {
    //     128: '32rem',
    //     144: '36rem',
    //   },
    //   borderRadius: {
    //     '4xl': '2rem',
    //   },
    // },
  },
  plugins: [formsPlugin, typographyPlugin, flowbitePlugin],
};
