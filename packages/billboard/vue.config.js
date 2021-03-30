// const webpack = require('webpack')

module.exports = {
  chainWebpack() {
    // chain.plugin('element-plus-lang').use(webpack.NormalModuleReplacementPlugin, [/element-plus[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]en/, 'element-plus/lib/locale/lang/zh-cn'])
  },
  configureWebpack() {
    // return config
  },
  pluginOptions: {
    electronBuilder: {
      publish: ['github'],
      nodeIntegration: true
    }
  }
}
