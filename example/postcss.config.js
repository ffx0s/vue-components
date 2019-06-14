const { properties } = require('vue-components/styles/variables')

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
