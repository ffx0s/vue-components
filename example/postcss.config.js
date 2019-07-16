const { properties } = require('muvc/styles/variables')

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
