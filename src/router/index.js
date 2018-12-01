import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')

const routes = [
  // 地址为空时跳转home页面
  {
    path: '',
    redirect: '/home'
  },
  // 首页城市列表页
  {
    path: '/home',
    component: home
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  // 当前选择城市页
  {
    path: '/city/:cityid',
    component: city
  },
  // 所有商铺列表页
  {
    path: '/msite',
    component: msite,
    meta: { keepAlive: true }
  },
  // 特色商铺列表页
  {
    path: '/food',
    component: food
  },
  // 搜索页
  {
    path: '/search',
    component: search
  },
  // 商铺页
  {
    path: '/shop',
    component: shop,
    children: [
      {
        path: 'foodDetail', // 食品详情页
        component: foodDetail
      },
      {
        path: 'shopDetail', // 商铺详情页
        component: shopDetail,
        children: [
          {
            path: 'shopSafe', // 商铺安全认证页
            component: shopSafe
          }
        ]
      }
    ]
  },
  // 订单确认页
  {
    path: '/confirmOrder',
    component: confirmOrder,
    children: [
      {
        path: 'remark', // 订单备注页
        component: remark
      },
      {
        path: 'invoice', // 发票抬头
        component: invoice
      },
      {
        path: 'payment', // 付款页面
        component: payment
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
