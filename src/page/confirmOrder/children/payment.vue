<template>
  <div class="container payment">
    <Header back="true" title="在线支付" noRight="true"/>

    <div class="main">
      <div class="p-time bf tac" v-if="efficacy">
        <h3 class="f16">支付剩余时间</h3>
        <p class="f30 fwb">{{showTime}}</p>
      </div>
      <div class="p-time bf tac" v-else>
        <h2 class="f24 fwb">{{showText}}</h2>
      </div>

      <div class="p-type bf">
        <h3 class="f16">选择支付方式</h3>
        <ul>
          <li @click="payByZfb=true">
            <span><i><SvgIcon class="icon-style" iconName="zfb" /></i>支付宝</span>
            <em><SvgIcon class="icon-style" :iconName="payByZfb && efficacy ? 'gou-l' : 'gou-h'" /></em>
          </li>
          <li @click="payByZfb=false">
            <span><i><SvgIcon class="icon-style" iconName="wx" /></i>微信</span>
            <em><SvgIcon class="icon-style" :iconName="!payByZfb && efficacy ? 'gou-l' : 'gou-h'" /></em>
          </li>
        </ul>
      </div>

      <div class="r-btn bf">
        <span :class="['g-btn', efficacy ? '' : 'disable']" @click="payOrder">确定</span>
      </div>
    </div>

    <Dialog :show="showShadow" @click.native="showShadow=false"/>
    <div class="p-modal pa flex" v-show="showShadow">
      <div>
        <div id="qrcode"></div>
        <p class="tac">扫码复制加我微信</p>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { Toast } from 'mint-ui'
import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      payByZfb: true,
      orderId: 0, // 订单id
      orderInfo: {}, // 订单信息
      timer: null, // 倒计时
      efficacy: false, // 订单有效
      showTime: '', // 倒计时显示时间
      qrcode: null, // 二维码
      showShadow: false, // 支付遮罩
      showText: '未及时支付，订单已失效' // 显示文案
    }
  },
  created () {
    this.orderId = this.$route.params.id
  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    async initData () {
      try {
        if (Ju.isEmpty(this.orderId)) {
          throw new Error('订单id参数错误')
        }
        // 购买会员卡
        if (this.orderId === 'hy') {
          this.showText = '未及时支付，购买失败'
          return this.countDownTime(new Date().getTime() + 15 * 60 * 1000)
        }
        // 支付订单
        let orderInfo = await Api.orderDetail(this.orderId)
        Res(orderInfo, data => {
          this.countDownTime(data.due_time)
        })
      } catch (err) {
        Toast(err.message || '订单信息获取失败')
      }
    },

    // 倒计时
    countDownTime (endTime = 0) {
      let remainTime = endTime - new Date().getTime()
      if (remainTime <= 0) {
        return (this.efficacy = false)
      }
      remainTime = parseInt(remainTime / 1000)
      this.efficacy = true
      let days
      let hours
      let minutes
      let seconds
      let time
      this.timer = setInterval(() => {
        if (remainTime <= 1) {
          this.efficacy = false
          return clearInterval(this.timer)
        }
        remainTime--
        days = Math.floor(remainTime / (60 * 60 * 24))
        hours = Math.floor((remainTime - days * 24 * 60 * 60) / 3600)
        minutes = Math.floor((remainTime - days * 24 * 60 * 60 - hours * 3600) / 60)
        seconds = Math.floor(remainTime - days * 24 * 60 * 60 - hours * 3600 - minutes * 60)
        time =
          (days > 0 ? `${days}天` : '') +
          (hours > 0 ? `${hours}小时` : '') +
          (minutes > 9 ? `${minutes}分` : `0${minutes}分`) +
          (seconds > 9 ? `${seconds}秒` : `0${seconds}秒`)
        this.showTime = time
      }, 1000)
    },

    // 支付订单
    payOrder () {
      // if (!this.efficacy) {
      //   return false
      // }
      if (!this.qrcode) {
        this.qrcode = new QRCode('qrcode', {
          width: 140,
          height: 140, // 高度
          text: 'yishuihan-001' // 二维码内容
          // render: 'canvas', // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f',
          // foreground: '#ff0'
        })
      } else {
        this.qrcode.makeCode('yishuihan-001')
      }
      this.showShadow = true
    }
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
    h2{
      padding-top: 0.3rem;
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
    span.disable{
      .bg(#ccc);
      .border(solid, #ccc, 1px);
    }
  }

  .p-modal{
    .wh(2rem, 2.2rem);
    .bg(#fff);
    z-index: 3;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1rem;
    border-radius: 5px;
    p{
      padding-top: 0.1rem;
    }
  }
</style>
