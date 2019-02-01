module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/district': {
        target: 'https://apis.map.qq.com/ws'
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  css: {
    extract: false
  }
}
