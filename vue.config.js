/* eslint-env node */
const assetsDomain = ''

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8083,
    https: false,
    hotOnly: false
  },

  configureWebpack: {},

  css: {
    extract: false
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath(assetsDomain)
    }
  }
}
