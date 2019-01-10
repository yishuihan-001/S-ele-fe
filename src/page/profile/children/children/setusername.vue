<template>
  <div class="container setusername">
    <Header back="true" title="修改用户名" noRight="true"/>

    <div class="main">
      <div class="s-con bf">
        <input type="text" class="g-input" placeholder="请输入用户名" v-model="username">
        <p class="c6 f12">用户名需介于5-24字符之间</p>
      </div>

      <div class="r-btn">
        <span class="g-btn" @click="confirmChange">确认修改</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      username: ''
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    ...mapMutations(['Set_UserInfo']),

    // 确认修改
    async confirmChange () {
      try {
        let va = new Va()
        va.add(this.username, [{ rule: 'isEmpty', msg: '用户名不能为空' }, { rule: 'minLength:5', msg: '用户名长度需介于5-24字符之间' }, { rule: 'maxLength:24', msg: '用户名长度需介于5-24字符之间' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }
        let resObj = await Api.userChangeUsername({ username: this.username })
        Res(resObj, () => {
          this.updateUserInfo()
        })
      } catch (err) {
        Toast(err.message || '用户名修改失败')
      }
    },

    // 更新用户信息
    async updateUserInfo () {
      try {
        // 获取当前登录态
        let userInfo = await Api.userInfo()
        Res(userInfo, data => {
          this.Set_UserInfo(data)
          Toast('用户名修改成功')
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }, false)
      } catch (err) {
        Toast(err.message || '用户名更新失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../../lib/style/util");

.setusername {
  z-index: 12;
}

.s-con{
  padding: 0.1rem;
  p{
    .hlh(0.3rem);
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-blue);
    .border(solid, @c-blue, 1px);
  }
}
</style>
