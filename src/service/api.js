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
 * 修改用户名
 */
Api.userChangeUsername = data => fetch('/user/changeUsername', data, 'post')

/**
 * 商铺
 */
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
 * 获取所有备注标签
 */
Api.shopRemarkAll = () => fetch('/shopping/remark/all')

/**
 * 获取商品列表
 */
Api.foodList = data => fetch('/shopping/food/getList', data)

/**
 * 获取商品详情
 */
Api.foodDetail = data => fetch('/shopping/food/detail/' + data)

/**
 * 搜索商铺
 */
Api.shopSearch = data => fetch('/shopping/shop/search', data)

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
 * 获取结算信息
 */
Api.accountDetail = data => fetch('/order/account/getInfo/' + data)

/**
 * 创建订单
 */
Api.orderCreate = data => fetch('/order/indent/create', data, 'post')

/**
 * 获取用户订单列表
 */
Api.orderList = () => fetch('/order/indent/list')

/**
 * 获取订单详情
 */
Api.orderDetail = data => fetch('/order/indent/detail/' + data)

/**
 * 配送地址
 */
/**
 * 创建地址
 */
Api.addressCreate = data => fetch('/address/addAddress', data, 'post')

/**
 * 获取地址列表
 */
Api.addressList = () => fetch('/address/getAddressList')

/**
 * 删除地址
 */
Api.addressRemove = data => fetch('/address/removeAddress/' + data, '', 'delete')

/**
 * 获取地址详情
 */
Api.addressDetail = data => fetch('/address/getAddress/' + data)

/**
 * 红包
 */
/**
 * 获取可用红包
 */
Api.hongbaoUsable = data => fetch('/hongbao/getHongbaoUsable', data)

/**
 * 获取过期红包
 */
Api.hongbaoDue = data => fetch('/hongbao/getHongbaoDue', data)

/**
 * 获取过期红包
 */
Api.hongbaoExchange = data => fetch('/hongbao/exchange', data, 'post')

/**
 * 其他
 */
/**
 * 获取验证码
 */
Api.getVerifycode = () => fetch('/sundry/verify')

/**
 * 获取常见问题
 */
Api.getExplainList = () => fetch('/sundry/explainList')

/**
 * 获取常见问题详情
 */
Api.getExplainDetail = data => fetch('/sundry/explainDetail/' + data)

export default Api
