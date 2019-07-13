const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    plugins: [new InlineManifestWebpackPlugin('manifest')]
  },
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      resolve('./node_modules/vue/dist/vue.runtime.esm.js')
    )
    config.optimization.runtimeChunk({ name: 'manifest' })
    config.plugin('html').tap(args => {
      args[0].inject = false
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      //
    } else {
      config.devtool('eval-source-map')
    }
  },
  css: {
    extract: false
  },
  productionSourceMap: false
}
