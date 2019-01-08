import fetch from '../../lib/js/fetch'
// import Util from '../../lib/js/util'

let Api = {}

/**
 * 地址
 */
/**
 * 获取当前城市，城市列表，热门城市
 */
Api.getCity = data => fetch('/city/target', data)

/**
 * 通过id获取城市信息
 */
Api.getCityById = data => fetch('/city/getCityById/' + data)

/**
 * 搜索地址
 */
Api.searchPlace = data => fetch('/city/search', data)

/**
 * 用户
 */
/**
 * 登录 没有账号自动创建账号
 */
Api.userLogin = data => fetch('/user/login', data, 'post')

/**
 * 获取用户信息
 */
Api.userInfo = () => fetch('/user/userInfo')

/**
 * 退出登录
 */
Api.userSignout = () => fetch('/user/signout')

/**
 * 修改密码
 */
Api.userChangePassword = data => fetch('/user/changePassword', data, 'post')

/**
 * 商铺
 */
/**
 * 获取商品列表
 */
Api.foodList = data => fetch('/shopping/food/getList', data)

/**
 * 获取所有商铺分类
 */
Api.shopCategoryAll = () => fetch('/shopping/category/all')

/**
 * 获取所有配送方式
 */
Api.shopDeliveryAll = () => fetch('/shopping/delivery/all')

/**
 * 获取所有商家属性标签
 */
Api.shopLabelAll = () => fetch('/shopping/label/all')

/**
 * 获取商铺详情
 */
Api.shopDetail = data => fetch('/shopping/shop/detail/' + data)

/**
 * 获取商铺列表
 */
Api.shopList = data => fetch('/shopping/shop/getList', data, 'post')

/**
 * 获取商品分类
 */
Api.menuList = data => fetch('/shopping/menu/getMenu/' + data)

/**
 * 获取评价信息
 */
Api.getRatings = data => fetch('/shopping/rate/getRatings/' + data)

/**
 * 获取评价分数
 */
Api.getScores = data => fetch('/shopping/rate/getScores/' + data)

/**
 * 获取评价标签
 */
Api.getTags = data => fetch('/shopping/rate/getTags/' + data)

/**
 * 订单
 */
/**
 * 创建结算信息
 */
Api.accountCreate = data => fetch('/order/account/create', data, 'post')

/**
 * 其他
 */
/**
 * 获取验证码
 */
Api.getVerifycode = () => fetch('/sundry/verify')

export default Api
