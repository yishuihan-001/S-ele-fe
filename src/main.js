import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../lib/js/rem'
import './svg'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Dialog from './components/dialog'

Vue.use(Mint)
/* 注册全局dialog组件 */
Vue.component('Dialog', Dialog)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
