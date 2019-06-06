const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.resolve.alias.set(
      'vue$',
      resolve('./node_modules/vue/dist/vue.esm.js')
    )
  },
  css: {
    extract: false
  },
  productionSourceMap: false
}
