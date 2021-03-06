const path = require('path')
const hostUrl = require('./config').hostUrl
const isPro = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  filenameHashing: true,
  pages: undefined,
  lintOnSave: true,
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  chainWebpack: config => {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  configureWebpack: config => {
    if (!isPro) {
      config.devtool = 'cheap-module-eval-source-map'
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@src': resolve('src'),
        '@lib': resolve('lib')
      }
    }
  },
  css: {
    extract: false, // 设为true改变vue文件style样式时浏览器不刷新，此时style提取至独立的css文件了，而不是动态注入javascipt中
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: hostUrl,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: () => {}
  },
  pluginOptions: {}
}
