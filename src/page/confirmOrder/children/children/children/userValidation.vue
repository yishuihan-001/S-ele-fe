<template>
  <div class="container userValidation">
    <Header back="true" title="用户手机验证" noRight="true"/>

    <div class="main">
      <p class="p-title bf f18">收不到短信？使用<span>语音验证码</span></p>
      <div class="p-operate flex bf">
        <input type="text" class="g-input" placeholder="验证码" v-model="verifycode">
        <span class="g-btn" @click="sendVerifycode">获取验证码</span>
      </div>

      <div class="r-btn bf">
        <span class="g-btn" @click="comfirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Ju from '@lib/js/judge'
import Header from '@src/components/header'

export default {
  data () {
    return {
      verifycode: '',
      correctcode: ''
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
    ...mapMutations(['Set_IsVerifyPhone']),

    // 验证通过
    comfirm () {
      if (Ju.isEmpty(this.verifycode)) {
        return Toast('验证码不能为空')
      }
      if (+this.verifycode !== +this.correctcode) {
        return Toast('您输入的验证码有误')
      }
      this.Set_IsVerifyPhone(true)
      this.$router.back()
    },

    // 发送验证码
    sendVerifycode () {
      let arr = []
      for (let i = 0; i < 4; i++) {
        arr.push(Math.floor(Math.random() * 10))
      }
      this.correctcode = arr.join('')
      Toast('验证码：' + this.correctcode)
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../../../lib/style/util");

  .userValidation{
    z-index: 9;
  }
  .p-title{
    .hlh(0.5rem);
    padding: 0 0.1rem;
    span{
      color: @c-redyellow;
      font-size: 0.18rem;
      margin-left: 0.05rem;
    }
  }

  .p-operate{
    justify-content: space-between;
    padding: 0.1rem;
    span{
      width: 0.8rem;
      flex-shrink: 0;
      margin-left: 0.1rem;
      &.disable{
        .bg(#f1f1f1);
        .border(solid, #f1f1f1, 1px);
        color: #999;
      }
    }
    input{
      flex-grow: 1;
    }
  }

  .r-btn{
    padding: 0.2rem 0.1rem;
    span{
      .hlh(0.4rem);
      .bg(@c-green);
      .border(solid, @c-green, 1px);
    }
  }

</style>
