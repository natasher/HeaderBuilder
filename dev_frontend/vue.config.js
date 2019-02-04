module.exports = {
  configureWebpack: {
    // devtool: 'source-map'
    devtool: ''
  },
  filenameHashing: false,
  chainWebpack: config => {
    config.plugins.delete( 'html' )
    config.plugins.delete( 'preload' )
    config.plugins.delete( 'prefetch' )
    config.optimization.delete('splitChunks')
  }
}