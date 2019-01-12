<template>
  <div class="container useCart">
    <Header back="true" title="兑换会员" noRight="true"/>

    <div class="main">
      <div class="u-title">
        <p v-if="userInfo">成功兑换后将关联到当前帐号： <span class="fwb">{{userInfo.username}}</span></p>
        <p v-else>登录后才能兑换会员哦~</p>
      </div>

      <div class="u-info">
        <input type="text" placeholder="请输入10位卡号" v-model="cardNum">
        <input type="password" placeholder="请输入6位卡密" v-model="cardPassword">
      </div>

      <div class="r-btn">
        <span class="g-btn" @click="exchange">兑换</span>
      </div>

      <div class="u-tip">
        <h3 class="tac">——温馨提示——</h3>
        <p>新兑换的会员服务，权益以「会员说明」为准。</p>
        <p>月卡：30次减免配送费。</p>
        <p>季卡：90次减免配送费。</p>
        <p>年卡：360次减免配送费。</p>
        <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Header from '@src/components/header'

export default {
  data () {
    return {
      cardNum: '', // 卡号
      cardPassword: '' // 卡密
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
    ...mapState(['userInfo'])
  },
  methods: {
    // 兑换会员
    exchange () {
      try {
        let va = new Va()
        va.add(this.cardNum, [{ rule: 'isEmpty', msg: '卡号不能为空' }, { rule: 'minLength:10', msg: '卡号只能是10位数哦' }, { rule: 'maxLength:10', msg: '卡号只能是10位数哦' }])
        va.add(this.cardPassword, [{ rule: 'isEmpty', msg: '卡密不能为空' }, { rule: 'minLength:6', msg: '卡密只能是6位数哦' }, { rule: 'maxLength:6', msg: '卡密只能是6位数哦' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }
        let flag = Math.floor(Math.random() * 20 + 1) % 2 === 0
        if (flag) {
          Toast('兑换成功')
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        } else {
          throw new Error('您输入的卡号或卡密有误')
        }
      } catch (err) {
        Toast(err.message || '兑换失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.useCart {
  z-index: 9;
}

.u-title{
  padding: 0 0.1rem;
  p{
    .hlh(0.35rem);
    span{
      margin: 0 0.05rem;
    }
  }
}

.u-info{
  .bg(#fff);
  input{
    .hlh(0.5rem);
    .border(solid, #eee, 0, 0, 1px, 0);
    width: 100%;
    padding: 0 0.1rem;
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-green);
    .border(solid, #ccc, 1px);
  }
}

.u-tip{
  padding: 0.5rem 0.35rem 0;
  h3,p{
    .hlh(0.2rem);
    color: #999;
    font-size: 0.12rem;
  }
}

</style>
