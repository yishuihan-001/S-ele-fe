<template>
  <div class="container orderDetail">
    <Header back="true" title="订单详情" noRight="true"/>

    <div class="main">
      <div class="o-digest bf" v-if="orderInfo">
        <div><span><img :src="$store.state.placeholderImg" alt=""></span></div>
        <p><dfn class="f20 fwb">{{alreadyPay ? '支付成功' : efficacy ? '等待支付' : '支付超时'}}</dfn></p>
        <p v-if="efficacy"><router-link tag="em" :to="'/confirmOrder/payment/' + orderInfo.id">去支付(还剩{{showTime}})</router-link></p>
        <p v-else><em @click="byAgain">再来一单</em></p>
      </div>

      <div class="c-order bf" v-if="orderInfo">
        <div class="co-title">
          <i><img :src="$store.state.placeholderImg" alt=""></i>
          <span class="f18">{{orderInfo.restaurant_name}}</span>
        </div>

        <ul>
          <li v-for="(item, index) in orderInfo.manifest" :key="index"><i>{{item.name + (item.label ? '('+ item.label +')' : '')}}</i><em>X{{item.quantity}}</em><dfn>¥{{item.price}}</dfn></li>
          <li><i>{{orderInfo.extra.name}}</i><em>X{{orderInfo.extra.quantity}}</em><dfn>¥{{orderInfo.extra.price}}</dfn></li>
          <li><i>打包费</i><dfn>¥{{getPackingFee(orderInfo.manifest)}}</dfn></li>
        </ul>
        <p><span>配送费</span><dfn>{{orderInfo.deliver_fee}}</dfn></p>
        <p><span>红包（随机立减）</span><dfn>-{{orderInfo.hongbao}}</dfn></p>
        <div class="co-total">
          <span class="f18">订单 ¥{{orderInfo.total_price.toFixed(2)}}</span>
          <em class="f18 fwb">待支付 ¥{{orderInfo.total_price.toFixed(2)}}</em>
        </div>
      </div>

      <div class="o-delivery bf" v-if="addressInfo">
        <h3>配送信息</h3>
        <p><label>送达时间：</label><span>尽快送达</span></p>
        <p><label>接收人：</label><span>{{addressInfo.name + '（' + addressInfo.phone + '）'}}</span></p>
        <p><label>送达地址：</label><span>{{addressInfo.address + addressInfo.address_detail}}</span></p>
        <!-- <p>{{orderInfo.delivery_mode.length}}</p> -->
        <p><label>配送方式：</label><span v-for="(it, id) in orderInfo.delivery_mode" :key="id">{{it.text + ((id === orderInfo.delivery_mode.length - 1) ? '' : '/')}}</span></p>
      </div>

      <div class="o-delivery bf" v-if="orderInfo">
        <h3>订单信息</h3>
        <p><label>订单号：</label><span>{{orderInfo.id}}</span></p>
        <p><label>支付方式：</label><span>{{orderInfo.pay_type === 1 ? '在线支付' : '货到付款'}}</span></p>
        <p><label>下单时间：</label><span>{{getCreateTime(orderInfo.create_time)}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'timestamp-format'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      orderId: '', // 订单id
      alreadyPay: false, // 是否已支付
      dueTime: 0, // 逾期时间
      orderInfo: null, // 订单信息
      addressInfo: null, // 收货地址信息
      efficacy: false, // 是否可支付
      showTime: '' // 显示
    }
  },
  created () {
    this.orderId = Util.getQueryString(window.location.href, 'id')
    this.alreadyPay = Util.getQueryString(window.location.href, 'alreadyPay') === 'true'
    this.dueTime = Number(Util.getQueryString(window.location.href, 'due'))
  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: {
    ...mapState(['currCity']),

    getPackingFee (arr) {
      return function (arr) {
        let packetFee = 0
        arr.forEach(item => {
          packetFee += item.packing_fee || 0
        })
        return packetFee
      }
    },

    getCreateTime (t) {
      return function (t) {
        return format('yyyy-MM-dd hh:mm:ss', t)
      }
    }
  },
  methods: {
    async initData () {
      try {
        if (Ju.isEmpty(this.orderId)) {
          throw new Error('订单id参数错误')
        }
        let orderInfo = await Api.orderDetail(this.orderId)
        Res(orderInfo, data => {
          this.orderInfo = data
          this.getAddress(data.address_id)
          if (this.alreadyPay) return
          this.countDownTime(data.due_time)
        })
      } catch (err) {
        Toast(err.message || '订单信息获取失败')
      }
    },

    // 获取地址信息
    async getAddress (id) {
      try {
        let addressInfo = await Api.addressDetail(id)
        Res(addressInfo, data => {
          this.addressInfo = data
        })
      } catch (err) {
        Toast(err.message || '地址信息获取失败')
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

    // 再来一单
    byAgain () {
      this.$router.push('/shop?id=' + this.orderInfo.restaurant_id + '&lat=' + this.currCity.latitude + '&lng=' + this.currCity.longitude + '&ti=35分钟')
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.orderDetail {
  z-index: 9;
  .main{
    overflow: auto;
  }
}

.main > div{
  margin-bottom: 0.1rem;
}

.o-digest{
  padding: 0.1rem 0;
  div{
    text-align: center;
    span{
      .disib;
      .wh(0.8rem);
      .border(solid, @c-blue, 1px);
      border-radius: 50%;
      overflow: hidden;
      img{
        .wh(100%);
      }
    }
  }
  p{
    .hlh(0.35rem);
    text-align: center;
    em{
      .border(solid, @c-blue, 1px);
      border-radius: 2px;
      color: @c-blue;
      padding: 0.02rem 0.05rem;
    }
  }
}

  /* 订单详情 */
  .c-order{
    margin-bottom: 0.1rem;
    .co-title{
      .hlh(0.7rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: flex-start;
      padding: 0 0.1rem;
      i{
        .wh(0.3rem);
        img{
          .wh(100%, auto);
        }
      }
      span{
        margin-left: 0.1rem;
      }
    }

    ul{
      .border(solid, #eee, 0, 0, 1px, 0);
      overflow: hidden;
      padding: 0.1rem;
      li{
        .hlh(0.4rem);
        .flex;
        justify-content: flex-start;
        i{
          flex-grow: 1;
          overflow: hidden;
        }
        em{
          color: @c-redyellow;
          width: 0.5rem;
          flex-shrink: 0;
          text-align: center;
        }
        dfn{
          width: 0.6rem;
          flex-shrink: 0;
          text-align: center;
        }
      }
    }

    .co-total{
     .hlh(0.6rem);
     .flex;
     justify-content: space-between;
     padding: 0.1rem;
     em{
       color: @c-redyellow;
     }
    }

    p{
      .hlh(0.5rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: space-between;
      padding: 0 0.1rem;
      dfn{
        width: 0.6rem;
        text-align: center;
      }
    }
  }

  /* 其他信息 */
  .o-delivery{
    h3{
      .hlh(0.35rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      font-size: 0.18rem;
      padding: 0 0.1rem;
    }
    p{
      .hlh(0.35rem);
      padding: 0 0.1rem;
      label{
        width: 0.9rem;
      }
      *{
        color: #666;
      }
    }
  }

</style>
