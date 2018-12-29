<template>
  <div class="container login">
    <Header back="true" title="密码登录" noRight="true"/>

    <div class="main">
      <div class="l-info">
        <p>
          <label for="">账号</label>
          <input type="text" v-model="username">
        </p>
        <p>
          <label for="">密码</label>
          <input type="password" v-model="password">
        </p>
        <p>
          <label for="">验证码</label>
          <input type="text" v-model="verifycode">
          <span>
            <dfn><img :src="codeSrc" alt=""></dfn>
            <b @click="getVerifycode">
              <em>看不清</em>
              <i>换一张</i>
            </b>
          </span>
        </p>
      </div>

      <div class="l-tip">
        <p>温馨提示：未注册过的账号，登录时将自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </div>

      <div class="r-btn">
        <span class="g-btn" @click="login">登录</span>
      </div>

      <p class="l-forget"><router-link tag="span" to="/forget">重置密码？</router-link></p>

    </div>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
// import Util from '@lib/js/util'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      username: '',
      password: '',
      verifycode: '',
      codeSrc: ''
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

    // 登录
    async login () {
      try {
        let va = new Va()
        va.add(this.username, [{ rule: 'isEmpty', msg: '用户名不能为空' }])
        va.add(this.password, [{ rule: 'isEmpty', msg: '密码不能为空' }])
        va.add(this.verifycode, [{ rule: 'isEmpty', msg: '验证码不能为空' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }

        let userInfo = {
          username: this.username,
          password: this.password,
          verifycode: this.verifycode
        }
        let resObj = await Api.userLogin(userInfo)
        Res(resObj, () => {
          Toast('登录成功')
          setTimeout(() => {
            this.$router.push('/msite')
          }, 1500)
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
@import url("../../../lib/style/util");

.login {

}

.l-info{
  padding-top: 0.2rem;
  p{
    .bg(#fff);
    .hlh(0.5rem);
    .flex;
    .border(solid, #eee, 0, 0, 1px, 0);
    padding: 0 0.1rem;
    justify-content: flex-start;
    label{
      width: 0.7rem;
      color: #666;
    }
    input{
      flex-grow: 1;
    }
    span{
      .flex;
      width: 1.5rem;
      dfn{
        .flex;
        width: 0.7rem;
        img{
          .wh(100%, auto);
        }
      }
      b{
        margin-left: 0.1rem;
        *{
          .hlh(0.2rem);
          display: block;
        }
        i{
          color: @c-blue;
        }
      }
    }
  }
}

.l-tip{
  padding: 0.1rem;
  p{
    line-height: 0.2rem;
    color: red;
    font-size: 0.12rem;
  }
}

.l-forget{
  padding: 0 0.1rem;
  text-align: right;
  span{
    color: @c-blue;
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
