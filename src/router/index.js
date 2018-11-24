import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')

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
    path: '/search/:geohash',
    component: search
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})