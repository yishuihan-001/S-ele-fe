import Vue from 'vue'
import Router from 'vue-router'
const routerMode = require('../../config').routerMode

Vue.use(Router)

/* A */ const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
/* A */ const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
/* A */ const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
/* A */ const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
/* A */ const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
/* A */ const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
/* A */ const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
/* A */ const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
/* A */ const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
/* A */ const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
/* A */ const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
/* A */ const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
/* A */ const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
/* A */ const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
/* A */ const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/userValidation')), 'userValidation')
/* A */ const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
/* A */ const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
/* A */ const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
/* A */ const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
/* A */ const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
/* A */ const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
/* A */ const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
/* A */ const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
/* A */ const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
/* A */ const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
/* A */ const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
const vipcard = r => require.ensure([], () => r(require('../page/vipcard/vipcard')), 'vipcard')
const invoiceRecord = r => require.ensure([], () => r(require('../page/vipcard/children/invoiceRecord')), 'invoiceRecord')
const useCart = r => require.ensure([], () => r(require('../page/vipcard/children/useCart')), 'useCart')
const vipDescription = r => require.ensure([], () => r(require('../page/vipcard/children/vipDescription')), 'vipDescription')
const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')
const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/balanceDetail')), 'balanceDetail')
const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit')
const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon')
const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription')
const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory')
const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange')
const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend')
const points = r => require.ensure([], () => r(require('../page/points/points')), 'points')
const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/pointsDetail')), 'pointsDetail')

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
        path: 'foodDetail/:id', // 食品详情页
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
        path: 'payment/:id', // 付款页面
        component: payment
      },
      {
        path: 'chooseAddress', // 选择地址
        component: chooseAddress,
        children: [
          {
            path: 'addAddress', // 新增地址
            component: addAddress,
            children: [
              {
                path: 'userValidation', // 用户验证
                component: userValidation
              },
              {
                path: 'searchAddress', // 搜索地址
                component: searchAddress
              }
            ]
          }
        ]
      }
    ]
  },
  // 登录注册页
  {
    path: '/login',
    component: login
  },
  // 个人中心页
  {
    path: '/profile',
    component: profile,
    children: [
      {
        path: 'info', // 个人信息
        component: info,
        children: [
          {
            path: 'setusername', // 修改用户名
            component: setusername
          },
          {
            path: 'address', // 编辑地址
            component: address,
            children: [
              {
                path: 'add', // 新增地址
                component: add,
                children: [
                  {
                    path: 'addDetail', // 搜索地址
                    component: addDetail
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // 修改密码页
  {
    path: '/forget',
    component: forget
  },
  // 订单列表
  {
    path: '/order',
    component: order,
    children: [
      {
        path: 'orderDetail', // 订单详情页
        component: orderDetail
      }
    ]
  },
  // 会员中心
  {
    path: '/vipcard',
    component: vipcard,
    children: [
      {
        path: 'invoiceRecord', // 购买记录（开发票）
        component: invoiceRecord
      },
      {
        path: 'useCart', // 兑换会员（购买会员卡）
        component: useCart
      },
      {
        path: 'vipDescription', // 会员说明（我的优惠）
        component: vipDescription
      }
    ]
  },
  // 发现
  {
    path: '/find',
    component: find
  },
  // 下载页
  {
    path: '/download',
    component: download
  },
  // 服务中心
  {
    path: '/service',
    component: service,
    children: [
      {
        path: 'questionDetail', // 问题详情
        component: questionDetail
      }
    ]
  },
  // 余额
  {
    path: '/balance',
    component: balance,
    children: [
      {
        path: 'balanceDetail', // 余额说明
        component: balanceDetail
      }
    ]
  },
  // 我的优惠
  {
    path: '/benefit',
    component: benefit,
    children: [
      {
        path: 'coupon', // 代金券说明
        component: coupon
      },
      {
        path: 'hbDescription', // 红包说明
        component: hbDescription
      },
      {
        path: 'hbHistory', // 历史红包
        component: hbHistory
      },
      {
        path: 'exchange', // 兑换红包
        component: exchange
      },
      {
        path: 'commend', // 推荐有奖
        component: commend
      }
    ]
  },
  // 我的积分
  {
    path: '/points',
    component: points,
    children: [
      {
        path: 'pointsDetail', // 积分说明
        component: pointsDetail
      }
    ]
  }
]

export default new Router({
  mode: routerMode,
  base: process.env.BASE_URL,
  routes
})
