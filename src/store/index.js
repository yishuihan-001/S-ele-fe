import Vue from 'vue'
import Vuex from 'vuex'
// import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
  placeholderImg: 'http://f0.jmstatic.com/btstatic/h5/index/bg_logo_1_1.jpg',
  userInfo: null,
  currCity: null
}

const mutations = {
  Set_UserInfo (state, userInfo) {
    state.userInfo = userInfo
  },

  Set_CurrCity (state, city) {
    state.currCity = city
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
