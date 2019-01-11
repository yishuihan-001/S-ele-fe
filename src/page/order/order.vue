<template>
  <div class="container order">
    <Header back="true" title="订单列表" noRight="true"/>

    <div class="main">
      <ul>
        <li v-for="(item, index) in orderList" :key="index">
          <router-link tag="div" :to="'/order/orderDetail?id=' + item.id + '&alreadyPay=' + item.alreadyPay + '&due=' + item.due_time" class="o-info">
            <div class="oi-left"><img :src="$store.state.placeholderImg" alt=""></div>
            <div class="oi-right">
              <div class="oir-title">
                <div>
                  <span><em class="f16">{{item.restaurant_name}}</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
                  <dfn class="c6">{{item.alreadyPay ? '支付成功' : timerIsEffectivity[item.timerId] ? '等待支付' : '支付超时'}}</dfn>
                </div>
                <p class="f12 c6">{{getCreateTime(item.create_time)}}</p>
              </div>
              <div class="oir-product">
                <span class="c6">{{item.manifest[0].name}}{{item.manifest.length > 1 ? '等' + item.manifest.length + '件商品' : ''}}</span><dfn>¥{{item.total_price.toFixed(2)}}</dfn>
              </div>
            </div>
          </router-link>
          <div class="o-status">
            <router-link v-if="timerIsEffectivity[item.timerId]" tag="span" :to="'/confirmOrder/payment/' + item.id">去支付(还剩{{timerArr[item.timerId]}})</router-link>
            <dfn v-else @click="byAgain(item)">再来一单</dfn>
          </div>
        </li>
      </ul>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import format from 'timestamp-format'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
// import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import Footer from '@src/components/footer'

export default {
  data () {
    return {
      orderList: [], // 订单列表
      timerNum: 1,
      timerObj: {},
      timerArr: {},
      timerIsEffectivity: {}
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState(['currCity']),

    getCreateTime (t) {
      return function (t) {
        return format('yyyy-MM-dd hh:mm:ss', t)
      }
    }
  },
  methods: {
    async initData () {
      try {
        let resObj = await Api.orderList()
        Res(resObj, data => {
          this.orderList = data
          this.orderList.forEach(item => {
            item.timerId = this.timerNum++
            item.remain_time = parseInt((item.due_time - new Date().getTime()) / 1000)
            item.alreadyPay = Math.floor(Math.random() * 20 + 1) % 2 === 0
          })
          this.getDownTime(this.orderList)
        })
      } catch (err) {
        Toast(err.message || '订单列表获取失败')
      }
    },

    // 再来一单
    byAgain (item) {
      this.$router.push('/shop?id=' + item.restaurant_id + '&lat=' + this.currCity.latitude + '&lng=' + this.currCity.longitude + '&ti=35分钟')
    },

    // 开启倒计时
    getDownTime (arr) {
      for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]
        let downTime = item.remain_time || 0
        let that = this
        if (item.alreadyPay) continue
        if (typeof downTime !== 'number' || downTime <= 0) {
          that.timerIsEffectivity[item.timerId] = false
          continue
        }
        let days
        let hours
        let minutes
        let seconds
        let time
        that.timerIsEffectivity[item.timerId] = true
        that.timerObj[item.timerId] = setInterval(() => {
          if (downTime < 1) {
            that.timerIsEffectivity[item.timerId] = false
            that.timerIsEffectivity = Object.assign({}, that.timerIsEffectivity)
            clearInterval(that.timerObj[item.timerId])
          } else {
            downTime--
            days = Math.floor(downTime / (60 * 60 * 24))
            hours = Math.floor((downTime - days * 24 * 60 * 60) / 3600)
            minutes = Math.floor((downTime - days * 24 * 60 * 60 - hours * 3600) / 60)
            seconds = Math.floor(downTime - days * 24 * 60 * 60 - hours * 3600 - minutes * 60)
            time =
              (days > 0 ? `${days}天` : '') +
              (hours > 0 ? `${hours}小时` : '') +
              (minutes > 9 ? `${minutes}分` : `0${minutes}分`) +
              (seconds > 9 ? `${seconds}秒` : `0${seconds}秒`)
            that.timerArr[item.timerId] = time
            that.timerArr = Object.assign({}, that.timerArr)
          }
        }, 1000)
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.order {
  .main{
    overflow: auto;
    padding-bottom: 0.5rem;
  }
}

ul{
  overflow: hidden;
  li{
    .bg(#fff);
    padding: 0.1rem;
    margin-bottom: 0.1rem;
    .o-info{
      .flex;
      justify-content: space-between;
      .oi-left{
        .wh(0.5rem);
        align-self: flex-start;
        img{
          .wh(100%, auto);
        }
      }
      .oi-right{
        flex-grow: 1;
        padding-left: 0.1rem;
        .oir-title{
          .border(solid, #eee, 0, 0, 1px, 0);
          padding-bottom: 0.05rem;
          & > div{
            .flex;
            justify-content: space-between;
            line-height: 0.3rem;
            span,i{
              .flex;
            }
            i > .icon-style{
              .wh(0.15rem);
            }
          }
        }
        .oir-product{
          .flex;
          .hlh(0.28rem);
          .border(solid, #eee, 0, 0, 1px, 0);
          justify-content: space-between;
          padding: 0.05rem 0;
          dfn{
            color: @c-redyellow;
            font-weight: bold;
          }
        }
      }
    }

    .o-status{
      .hlh(0.5rem);
      text-align: right;
      span{
        .disib;
        .wh(1.32rem, 0.23rem);
        .border(solid, @c-redyellow, 1px);
        vertical-align: middle;
        line-height: 0.2rem;
        box-sizing: border-box;
        border-radius: 2px;
        color: @c-redyellow;
        padding: 0.02rem 0.05rem;
        font-size: 0.12rem;
      }
      dfn{
        .border(solid, @c-blue, 1px);
        border-radius: 2px;
        color: @c-blue;
        padding: 0.02rem 0.05rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
