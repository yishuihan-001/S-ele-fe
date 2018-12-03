<template>
  <div class="container payment">
    <Header back="true" title="在线支付" noRight="true" class="r-header"/>

    <div class="main">
      <div class="p-time bf tac">
        <h3 class="f16">支付剩余时间</h3>
        <p class="f30 fwb">00 : 15 : 00</p>
      </div>

      <div class="p-type bf">
        <h3 class="f16">选择支付方式</h3>
        <ul>
          <li @click="payByZfb=true">
            <span><i><SvgIcon class="icon-style" iconName="zfb" /></i>支付宝</span>
            <em><SvgIcon class="icon-style" :iconName="payByZfb ? 'gou-l' : 'gou-h'" /></em>
          </li>
          <li @click="payByZfb=false">
            <span><i><SvgIcon class="icon-style" iconName="wx" /></i>微信</span>
            <em><SvgIcon class="icon-style" :iconName="payByZfb ? 'gou-h' : 'gou-l'" /></em>
          </li>
        </ul>
      </div>

      <div class="r-btn bf">
        <span class="g-btn">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/header'

export default {
  data () {
    return {
      payByZfb: true
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

  .payment{
    z-index: 9;
  }
  .p-time{
    height: 1.5rem;
    padding-top: 0.2rem;
    box-sizing: border-box;
    h3{
      .hlh(0.4rem);
    }
    p{
      .hlh(0.6rem);
    }
  }

  .p-type{
    h3{
      .hlh(0.4rem);
      .bg(#f1f1f1);
      padding: 0 0.1rem;
    }
    ul{
      overflow: hidden;
      padding: 0 0.1rem;
      li{
        .hlh(0.8rem);
        .border(solid, #eee, 0, 0, 1px, 0);
        .flex;
        justify-content: space-between;
        span{
          .flex;
          i{
            .flex;
            .icon-style{
              .wh(0.5rem, auto);
            }
            margin-right: 0.1rem;
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
