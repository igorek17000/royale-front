// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#131B29',
        secondary: '#1D2738',
        bluish: '#233354',
        'custom-red': '#D91139',
        'custom-redh': '#f91c46',
        money: '#40e094',
        pinkMoney: 'rgb(255, 73, 106)',
        greenMoney: 'rgb(78, 227, 157)',
        greenBorder: 'rgba(39,165,154,.38)',
        pinkBorder: 'rgba(239,83,79,.38)',
      },
      fontFamily: {
        sans: ['Inter'],
        roboto: ['Roboto Mono'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
