const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      resolve('./node_modules/vue/dist/vue.esm.js')
    )
    // config.module
    //   .rule('compile')
    //   .test(/\.js$/)
    //   .include.add(resolve('./node_modules/webpack-dev-server'))
    //   .end()
    //   .use('babel')
    //   .loader('babel-loader')
    //   .options({
    //     presets: [['@babel/preset-env', { loose: true }]]
    //   })
  },
  css: {
    extract: false
  },
  productionSourceMap: false
  // transpileDependencies: ['webpack-dev-server']
}
