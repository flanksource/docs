module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.tsx'],
  corePlugins: { preflight: false },
  // important: '#tailwind',
  theme: {
    extend: {
      maxWidth: {
        xxs: '18rem'
      }
    }
  }
}
