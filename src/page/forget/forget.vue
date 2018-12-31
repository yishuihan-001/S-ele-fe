<template>
  <div class="container forget">
    <Header back="true" title="重置密码" noRight="true"/>

    <div class="main">
      <div class="l-info">
        <p>
          <label for="">账号</label>
          <input type="text" v-model="username">
        </p>
        <p>
          <label for="">旧密码</label>
          <input type="password" v-model="oldpassWord">
        </p>
        <p>
          <label for="">请输入新密码</label>
          <input type="password" v-model="newpassword">
        </p>
        <p>
          <label for="">请确认密码</label>
          <input type="password" v-model="confirmpassword">
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
      <div class="r-btn">
        <span class="g-btn" @click="changePassword">确认修改</span>
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
      username: '',
      oldpassWord: '',
      newpassword: '',
      confirmpassword: '',
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

    // 修改密码
    async changePassword () {
      try {
        let va = new Va()
        va.add(this.username, [{ rule: 'isEmpty', msg: '用户名不能为空' }])
        va.add(this.oldpassWord, [{ rule: 'isEmpty', msg: '原始密码不能为空' }])
        va.add(this.newpassword, [{ rule: 'isEmpty', msg: '新密码不能为空' }])
        va.add(this.confirmpassword, [{ rule: 'isEmpty', msg: '确认新密码不能为空' }, { rule: 'equal:' + this.newpassword, msg: '两次输入的新密码不一致' }])
        va.add(this.verifycode, [{ rule: 'isEmpty', msg: '验证码不能为空' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }

        let changeInfo = {
          username: this.username,
          oldpassWord: this.oldpassWord,
          newpassword: this.newpassword,
          confirmpassword: this.confirmpassword,
          verifycode: this.verifycode
        }
        let resObj = await Api.userChangePassword(changeInfo)
        Res(resObj, data => {
          Toast('密码修改成功!')
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

.forget {

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
      width: 1rem;
      color: #666;
    }
    input{
      flex-grow: 1;
    }
    span{
      .flex;
      width: 2rem;
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

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-green);
    .border(solid, @c-green, 1px);
  }
}
</style>
