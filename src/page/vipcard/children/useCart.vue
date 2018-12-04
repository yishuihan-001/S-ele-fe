<template>
  <div class="container useCart">
    <Header back="true" title="兑换会员" noRight="true"/>

    <div class="main">
      <div class="u-title">
        <p>成功兑换后将关联到当前帐号： <span class="fwb">1500000000</span></p>
        <!-- <p>登录后才能兑换会员哦~</p> -->
      </div>

      <div class="u-info">
        <input type="text" placeholder="请输入10位卡号">
        <input type="password" placeholder="请输入6位卡密">
      </div>

      <div class="r-btn">
        <span class="g-btn">兑换</span>
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
import Header from '../../../components/header'

export default {
  data () {
    return {

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
    .bg(#ccc);
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
