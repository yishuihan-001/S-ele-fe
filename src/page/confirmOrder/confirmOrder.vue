<template>
  <div class="container confirmOrder">
    <Header title="确认订单" back="true">
      <router-link slot="right" class="f16 cf c-right" to="/profile" v-if="userInfo">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf c-right" to="/login" v-else>登录/注册</router-link>
    </Header>

    <div class="main">
      <div class="c-address">
        <div @click="goAddress">
          <div class="ca-left"><SvgIcon class="icon-style" iconName="site" /></div>
          <div class="ca-right" v-if="!userInfo || !currentAddress">请添加一个收获地址</div>
          <div class="ca-right" v-else>
            <h3><span class="f16 fwb">{{currentAddress.name}}</span><em>{{item.male === 'male' ? '先生' : item.male === 'female' ? '女士' : ''}}</em><dfn>{{item.phone}}</dfn></h3>
            <p><i>{{item.tag}}</i>{{item.address + item.address_detail}}</p>
          </div>
        </div>
        <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
      </div>

      <div class="c-arriveTime">
        <span class="f18 fwb c0" @click="printData">送达时间</span>
        <div>
          <p>尽快送达 | 预计 18:48</p>
          <p><span>蜂鸟专送</span></p>
        </div>
      </div>

      <div class="c-pay">
        <p @click="showPayType=true"><span>支付方式</span><dfn class="flex"><em class="flex">在线支付</em><i class="flex"><SvgIcon class="icon-style" iconName="arrow-right" /></i></dfn></p>
        <p><span>红包</span><dfn><em>暂时只在饿了么 APP 中支持</em></dfn></p>
      </div>

      <div class="c-order bf" v-if="accountInfo">
        <div class="co-title">
          <i><img :src="$store.state.placeholderImg" alt=""></i>
          <span class="f18">{{accountInfo.restaurant_info.name}}</span>
        </div>

        <ul>
          <li v-for="(item, index) in accountInfo.manifest" :key="index"><i>{{item.name + (item.label ? '('+ item.label +')' : '')}}</i><em>X{{item.quantity}}</em><dfn>¥{{item.price}}</dfn></li>
          <li><i>{{accountInfo.extra.name}}</i><em>X{{accountInfo.extra.quantity}}</em><dfn>¥{{accountInfo.extra.price}}</dfn></li>
          <li><i>打包费</i><dfn>¥{{getPackingFee(accountInfo.manifest)}}</dfn></li>
        </ul>
        <p><span>配送费</span><dfn>{{accountInfo.deliver_fee}}</dfn></p>
        <div class="co-total">
          <span class="f18">订单 ¥{{accountInfo.total_price.toFixed(2)}}</span>
          <em class="f18 fwb">待支付 ¥{{accountInfo.total_price.toFixed(2)}}</em>
        </div>
      </div>

      <div class="c-pay">
        <router-link tag="p" to="/confirmOrder/remark"><span>订单备注</span><dfn class="flex"><em class="flex">口味、偏好等</em><i class="flex"><SvgIcon class="icon-style" iconName="arrow-right" /></i></dfn></router-link>
        <router-link tag="p" to="/confirmOrder/invoice"><span>发票抬头</span><dfn class="flex"><em class="flex">不需要开发票</em><i class="flex"><SvgIcon class="icon-style" iconName="arrow-right" /></i></dfn></router-link>
      </div>

    </div>

    <div class="c-comfirmPay pf">
      <span class="f18 cf" v-if="accountInfo">待支付 ¥{{accountInfo.total_price.toFixed(2)}}</span>
      <router-link class="f18 tac cf" to="/confirmOrder/payment" tag="em">确认下单</router-link>
    </div>

    <Dialog :show="showPayType" @click.native="showPayType=false"/>

    <transition name="slide-fade">
      <div class="c-type pa bf" v-show="showPayType">
        <h3 class="tac f18">支付方式</h3>
        <ul>
          <li>
            <span class="c6">货到付款（商家不支持货到付款）</span>
            <em><i class="flex"><SvgIcon class="icon-style" :iconName="payOnline ? 'gou-h' : 'gou-l'" /></i></em>
          </li>
          <li>
            <span>在线支付</span>
            <em><i class="flex"><SvgIcon class="icon-style" :iconName="payOnline ? 'gou-l' : 'gou-h'" /></i></em>
          </li>
        </ul>
      </div>
    </transition>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      showPayType: false, // 选择支付方式
      payOnline: true, // 在线支付
      accountId: 0, // 结算id
      accountInfo: null // 结算信息
    }
  },
  created () {
    this.accountId = Util.getQueryString(window.location.href, 'id')
  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: {
    ...mapState(['userInfo', 'remarkIdList', 'selfRemarks', 'currentAddress']),

    getPackingFee (arr) {
      return function (arr) {
        let packetFee = 0
        arr.forEach(item => {
          packetFee += item.packing_fee || 0
        })
        return packetFee
      }
    }
  },
  methods: {
    async initData () {
      try {
        let info = await Api.accountDetail(this.accountId)
        Res(info, data => {
          this.accountInfo = data
        })
      } catch (err) {
        Toast(err.message || '获取结算信息失败')
      }
    },

    // 打印数据
    printData () {
      console.log(this.remarkIdList)
      console.log(this.selfRemarks)
    },

    // 地址列表
    goAddress () {
      if (!this.userInfo) {
        return Toast('您还没有登录哦~')
      }
      this.$router.push('/confirmOrder/chooseAddress')
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../lib/style/util");

  .confirmOrder {
    .main{
      overflow: auto;
    }
  }
  .c-right{
    padding-right: 0.1rem;
  }

  .main{
    padding-bottom: 0.7rem;
  }
  /* 地址 */
  .c-address{
    .bg(#fff);
    .border(solid, #ccc, 0, 0, 2px, 0);
    .flex;
    padding: 0 0.1rem;
    justify-content: space-between;
    height: 0.82rem;
    box-sizing: border-box;
    margin-bottom: 0.1rem;
    & > div{
      .flex;
      flex-grow: 1;
      justify-content: flex-start;
      .ca-left{
        .flex;
        width: 0.3rem;
      }
      .ca-right{
        flex-grow: 1;
        padding-left: 0.1rem;
        h3{
          span,em{
            margin-right: 0.1rem;
          }
        }
        p{
          i{
            .bg(@c-blue);
            border-radius: 2px;
            color: #fff;
            padding: 0.01rem 0.03rem;
            margin-right: 0.05rem;
          }
        }
      }
    }
  }

  /* 时间 */
  .c-arriveTime{
    .bg(#fff);
    .border(solid, @c-blue, 0, 0, 0, 5px);
    .flex;
    justify-content: flex-start;
    height: 0.96rem;
    margin-bottom: 0.1rem;
    padding-left: 0.3rem;
    padding-right: 0.15rem;
    div{
      flex-grow: 1;
      p{
        .hlh(0.3rem);
        color: @c-blue;
        text-align: right;
        span{
          .bg(@c-blue);
          border-radius: 2px;
          color: #fff;
          padding: 0 0.05rem;
        }
      }
    }
  }

  /* 支付方式 */
  .c-pay{
    .bg(#fff);
    padding: 0 0.1rem;
    margin-bottom: 0.1rem;
    p{
      .hlh(0.5rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: flex-start;
      span{
        width: 0.9rem;
        flex-shrink: 0;
        color: #666;
      }
      dfn{
        flex-grow: 1;
        text-align: right;
        justify-content: flex-end;
      }
      em{
        color: #999;
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
  .c-comfirmPay{
    .bg(#3c3c3c);
    .flex;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5rem;
    justify-content: space-between;
    span{
      .bg(#3c3c3c);
      flex-flow: 1;
      overflow: hidden;
      padding-left: 0.1rem;
    }
    em{
      .bg(#56d176);
      .wh(1.02rem, 0.5rem);
      line-height: 0.5rem;
      flex-shrink: 0;
    }
  }

  /* 支付方式 */
  .c-type{
    height: 2.4rem;
    bottom: 0;
    left: 0;
    right: 0;
    h3{
      .bg(#f1f1f1);
      .hlh(0.5rem);
    }
    ul{
      overflow: hidden;
      padding: 0 0.1rem;
      li{
        .hlh(0.58rem);
        .flex;
        justify-content: space-between;
        span{
          flex-grow: 1;
        }
        em{
          .flex;
          width: 0.5rem;
          flex-shrink: 0;
        }
      }
    }
  }

  .slide-fade-enter-active, .slide-fade-leave-active{
    transition: all 0.6s;
  }
  .slide-fade-enter, .slide-fade-leave-active{
    opacity: 0;
    transform: translateY(100%);
  }
</style>
