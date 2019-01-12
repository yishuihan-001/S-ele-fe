<template>
  <div class="container vipDescription">
    <Header back="true" title="我的优惠" noRight="true"/>

    <div class="main">
      <div class="v-des">
        <h2>尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</h2>
        <h3>Q1: 特权介绍</h3>
        <p>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。</p>
        <p>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。</p>
        <p>更多特权，敬请期待！</p>
        <h3>Q2: 资费介绍</h3>
        <p>饿了么会员卡：20元</p>
        <h3>Q3: 使用说明</h3>
        <p>当用户满足以下任一条件，会员服务自动失效：</p>
        <p>自绑定之日起超过31天；</p>
        <p>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</p>
        <h3>Q4: 购卡说明</h3>
        <p>在线购买：饿了么App>我的>饿了么会员卡</p>
        <h3>Q5: 温馨提示</h3>
        <p>用户在当前会员服务失效前，无法购买新卡。</p>
        <p>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</p>
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

.vipDescription {
  z-index: 9;
  .main{
    overflow: auto;
  }
}
.main{
  background: #ffffff!important
}
.v-des{
  padding: 0.2rem;
  h2{
    line-height: 0.28rem;
  }
  h3{
    .hlh(0.5rem);
    font-size: 0.16rem;
    font-weight: bold;
  }
  p{
    color: #666;
  }
}
</style>
