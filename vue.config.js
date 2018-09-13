module.exports = {
  lintOnSave: true,
  outputDir: 'lib',
  productionSourceMap: false,
  filenameHashing: false,
  // configureWebpack:(config)=>{
  //   //入口文件
  //   delete config.entry.app
  //   config.entry.index = './src/index.js'
  // },
  pages: {
    index: {
      entry: 'example/main.ts',
      template: `./public/index.html`
    },
  }
}
