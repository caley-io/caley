const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#262626',
        primary: '#404040',
        secondary: '#141414',
        highlight: '#303030',
        modal: '#161618',
        borderPrimary: '#303030',
        borderSecondary: '#424242',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(500px)',
      },
      boxShadow: {
        'xs': '0px 1px 2px 0px #1018280D'
      },
      dropShadow: {
        'form': '0px 4px 10px rgba(52, 54, 60, 0.08)',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '.625rem',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'],
    },
  },
  options: {
    safelist: ['dark', 'light']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
