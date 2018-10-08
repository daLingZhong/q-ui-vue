const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  lintOnSave: true,
  outputDir: './docs',
  baseUrl: './',
  productionSourceMap: false,
  filenameHashing: false,
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, './example/main.ts'),
    },
    // optimization: {
    //   minimizer: [
    //     // we specify a custom UglifyJsPlugin here to get source maps in production
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         compress: {},
    //         mangle: {}
    //       }
    //     })
    //   ]
    // }
    // 压缩后代码会插件会不被执行，这里先用测试环境防止压缩
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(path.resolve(__dirname, './example'))
  },
}
