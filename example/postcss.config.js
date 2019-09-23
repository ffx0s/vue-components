const { properties } = require('lvan/styles/variables')

module.exports = {
  plugins: {
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: properties
        }
      }
    }
  }
}
