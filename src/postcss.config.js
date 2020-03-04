const path = require('path')

module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'color-mod-function': {
          unresolved: 'ignore',
          importFrom: [path.join(__dirname, '/styles/variables.css')]
        }
      }
    }
  }
}
