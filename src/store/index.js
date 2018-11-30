import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
  userInfo: null,
  isLogin: false,
  placeholderImg: 'http://f0.jmstatic.com/btstatic/h5/index/bg_logo_1_1.jpg'
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },

  setLoginStatus (state, boo) {
    state.isLogin = boo
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
