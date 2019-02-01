const { properties } = require('./src/styles/variables')

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
