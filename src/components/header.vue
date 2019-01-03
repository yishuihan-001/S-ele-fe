<template>
  <div class="header flex">
    <slot name="left"></slot>
    <div class="h-back flex" @click="$router.back()" v-if="back">
      <SvgIcon class="icon-style" iconName="arrow-left" />
    </div>

    <router-link tag="div" to="/home" class="h-title cf f16" v-if="titleLink && title">{{title}}</router-link>
    <div class="h-title cf f16" v-else-if="title">{{title}}</div>
    <div class="h-emtpyMiddle" v-else></div>

    <slot name="right"></slot>
    <div class="h-emtpyRight" v-if="noRight"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'

export default {
  data () {
    return {

    }
  },
  props: ['back', 'title', 'noRight', 'titleLink'],
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {

  },
  computed: {
    ...mapState(['currCity'])
  },
  methods: {
    ...mapMutations(['Set_UserInfo', 'Set_CurrCity']),

    async initData () {
      try {
        // 获取当前登录态
        let userInfo = await Api.userInfo()
        Res(userInfo, data => {
          this.Set_UserInfo(data)
        }, false)

        // 获取当前城市
        if (!this.currCity) {
          let res1 = await Api.getCity({ type: 'guess' })
          Res(res1, data => {
            this.Set_CurrCity(data)
          })
        }
      } catch (err) {
        Toast(err.message || '获取用户信息失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../lib/style/util");

div.header {
  .bg;
  height: 0.45rem;
  justify-content: space-between;
}
.h-back {
  .wh(0.45rem, 0.45rem);
}
.h-emtpyMiddle,
.h-emtpyRight {
  .wh(0.1rem, 0.45rem);
}
</style>
