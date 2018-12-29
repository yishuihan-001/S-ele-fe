/**
 * 配置编译环境和线上环境之间的切换
 *
 * hostUrl: 域名地址
 * routerMode: 路由模式
 *
 */

let hostUrl = ''
let routerMode = 'history'

if (process.env.NODE_ENV === 'production') {
  hostUrl = ''
} else {
  hostUrl = 'http://127.0.0.1:9000'
}

module.exports = {
  hostUrl,
  routerMode
}
