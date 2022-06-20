const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  productionSourceMap: process.env.NODE_ENV === 'dev',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.coderush.top:8082',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip', // 使用gzip压缩
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
          threshold: 10240,
          // deleteOriginalAssets:true, //删除源文件，不建议
          minRatio: 1
        })
      )
    }
  },
  lintOnSave: false
}
