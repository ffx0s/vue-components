module.exports = {
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
