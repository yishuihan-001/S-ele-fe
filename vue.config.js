const path = require('path')
const devEnv = require('./config/dev.env') // 本地环境
const testEnv = require('./config/test.env') // 测试环境
const proEnv = require('./config/pro.env') // 生产环境

const env = process.env.NODE_ENV
const isPro = process.env.NODE_ENV === 'production'
let target = ''

// 默认是本地环境
if (env === 'production') {
  target = proEnv.hosturl
} else if (env === 'test') {
  target = testEnv.hosturl
} else {
  target = devEnv.hosturl
}

function resolve (dir) {
  return path.join(__dirname, dir)
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
  chainWebpack: () => {},
  configureWebpack: config => {
    if (!isPro) {
      config.devtool = 'cheap-module-eval-source-map'
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src')
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
      '/blog': {
        target: target,
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
