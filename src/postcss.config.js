const { properties } = require('./styles/variables')

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
