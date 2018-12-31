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
 * 搜索地址
 */
Api.searchPlace = data => fetch('/city/search', data)

/**
 * 通过id获取城市信息
 */
Api.getCityById = data => fetch('/city/getCityById/' + data)

/**
 * 用户
 */
/**
 * 获取用户信息
 */
Api.getUserInfo = () => fetch('/user/userInfo')

/**
 * 登录
 */
Api.userLogin = data => fetch('/user/login', data, 'post')

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
 * 商铺分类
 */
Api.shopCategoryAll = () => fetch('/shopping/category/all')

/**
 * 商铺列表
 */
Api.shopList = data => fetch('/shopping/shop/getList', data, 'post')

/**
 * 其他
 */
/**
 * 获取验证码
 */
Api.getVerifycode = () => fetch('/sundry/verify')

export default Api
