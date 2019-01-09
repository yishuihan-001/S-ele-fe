import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
  placeholderImg: 'http://f0.jmstatic.com/btstatic/h5/index/bg_logo_1_1.jpg',
  userInfo: null, // 用户信息
  currCity: null, // 当前城市
  cityAddress: null, // 具体地址
  remarkIdList: [], // 已选备注id
  selfRemarks: '', // 自定义备注
  currentAddress: null, // 当前收货地址
  receiveAddress: [], // 收货地址列表
  isVerifyPhone: false, // 是否验证手机号码
  locationAddress: '' // 添加收货的定位地址
}

const mutations = {
  Set_UserInfo (state, userInfo) {
    state.userInfo = userInfo
  },

  Set_CurrCity (state, city) {
    state.currCity = city
  },

  Set_CityAddress (state, address) {
    state.cityAddress = address
  },

  Set_RemarkIdList (state, list) {
    state.remarkIdList = list
  },

  Set_SelfRemarks (state, str) {
    state.selfRemarks = str
  },

  Set_CurrentAddress (state, obj) {
    state.currentAddress = obj
  },

  Set_ReceiveAddress (state, list) {
    state.receiveAddress = list
  },

  Set_IsVerifyPhone (state, boo) {
    state.isVerifyPhone = boo
  },

  Set_LocationAddress (state, str) {
    state.locationAddress = str
  }
}

const actions = {
  // async getAdminData ({ commit }) {
  //   try {
  //     const res = await getAdminInfo()
  //     if (res.status == 1) {
  //       commit('saveAdminInfo', res.data)
  //     } else {
  //       throw new Error(res)
  //     }
  //   } catch (err) {
  //     console.log('您尚未登陆或者session失效')
  //   }
  // }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
