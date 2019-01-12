<template>
  <div class="container exchange">
    <Header back="true" title="兑换红包" noRight="true"/>

    <div class="main">
      <div class="e-com">
        <div><input type="text" placeholder="请输入兑换码" v-model="exchangecode"></div>
        <div>
          <input type="text" placeholder="验证码" v-model="verifycode">
          <div>
            <dfn><img :src="codeSrc" alt=""></dfn>
            <b @click="getVerifycode">
              <em>看不清</em>
              <i>换一张</i>
            </b>
          </div>
        </div>
      </div>

      <div class="r-btn">
        <span class="g-btn" @click="exchange">兑换</span>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      exchangecode: '', // 兑换码
      verifycode: '', // 验证码
      codeSrc: '' // 验证码图片
    }
  },
  created () {

  },
  mounted () {
    this.getVerifycode()
  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    // 获取验证码
    async getVerifycode () {
      try {
        let code = await Api.getVerifycode()
        Res(code, data => {
          this.codeSrc = data
        })
      } catch (err) {
        Toast(err.message || '获取验证码失败')
      }
    },

    // 兑换
    async exchange () {
      try {
        let va = new Va()
        va.add(this.exchangecode, [{ rule: 'isEmpty', msg: '兑换码不能为空' }])
        va.add(this.verifycode, [{ rule: 'isEmpty', msg: '验证码不能为空' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }

        let userInfo = {
          exchange_code: this.exchangecode,
          verifycode: this.verifycode
        }
        let resObj = await Api.hongbaoExchange(userInfo)
        Res(resObj, data => {
          Toast('兑换成功')
        })
      } catch (err) {
        Toast(err.message || '登录失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.exchange {
  z-index: 9;
}

.e-com{
  overflow: hidden;
  padding: 0.1rem;
  & > div{
    .flex;
    height: 0.5rem;
    margin-bottom: 0.1rem;
    input{
      .hlh(0.5rem);
      .bg(#fff);
      padding: 0.05rem 0.1rem;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      flex-grow: 1;
    }
    div{
      .flex;
      .wh(1.7rem, 0.5rem);
      .bg(#fff);
      border-radius: 4px;
      margin-left: 0.1rem;
      dfn{
        .flex;
        width: 0.6rem;
        img{
          .wh(100%, auto);
        }
      }
      b{
        margin-left: 0.1rem;
        *{
          .hlh(0.2rem);
          font-size: 0.12rem;
          display: block;
        }
        i{
          color: @c-blue;
        }
      }
    }
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
