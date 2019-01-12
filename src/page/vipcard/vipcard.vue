<template>
  <div class="container vipcard">
    <Header back="true" title="会员中心" noRight="true"/>

    <div class="main">
      <div class="v-title">
        <p v-if="userInfo">为账号<span class="fwb">{{userInfo.username}}</span>购买会员</p>
        <p v-else>登录后才能购买会员哦~</p>
      </div>

      <div class="v-explain bf">
        <router-link tag="h3" to="/vipcard/vipDescription" class="ve-title">
          <span>会员特权</span>
          <span><em>会员说明</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </router-link>
        <div class="ve-fee">
          <span><SvgIcon class="icon-style" iconName="sheng" /></span>
          <div>
            <h3>减免配送费</h3>
            <p>每月减免30单，每日可减免3单，每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </div>
        <div class="ve-fee">
          <span><SvgIcon class="icon-style" iconName="jian" /></span>
          <div>
            <h3>减免配送费</h3>
            <p>每月减免30单，每日可减免3单，每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </div>
        </div>
      </div>

      <div class="v-buyVip bf">
        <h3>开通会员</h3>
        <p><span>1个月<em>¥20</em></span><router-link tag="dfn" to="/confirmOrder/payment/hy">购买</router-link></p>
        <!-- this.$router.push('' + data) -->
      </div>

      <router-link tag="h3" to="/vipcard/useCart"  class="ve-title ve-other">
        <span>兑换会员</span>
        <span><em>使用卡号卡密</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
      </router-link>

      <router-link tag="h3" to="/vipcard/invoiceRecord" class="ve-title ve-other">
        <span>购买记录</span>
        <span><em>开发票</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
      </router-link>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@src/components/header'

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
    ...mapState(['userInfo'])
  },
  methods: {

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.vipcard {

}

.v-title{
  padding: 0 0.1rem;
  p{
    .hlh(0.35rem);
    span{
      margin: 0 0.05rem;
    }
  }
}
.v-explain{
  margin-bottom: 0.1rem;
}
.ve-fee{
  .border(solid, #eee, 1px, 0, 0, 0);
  .flex;
  justify-content: flex-start;
  padding: 0.1rem 0.1rem 0.1rem 0;
  margin-left: 0.2rem;
  span{
    .flex;
    .icon-style{
      .wh(0.5rem);
    }
  }
  div{
    flex-grow: 1;
    padding-left: 0.1rem;
    h3{
      .hlh(0.35rem);
    }
    p{
      .hlh(0.2rem);
      color: #666;
      font-size: 0.12rem;
    }
  }
}
.ve-title{
  .hlh(0.48rem);
  .bg(#fff);
  .flex;
  justify-content: space-between;
  padding: 0 0.1rem;
  span{
    .flex;
    font-size: 0.16rem;
    em{
      color: #666;
    }
    i{
      .flex;
      .icon-style{
        .wh(0.15rem);
      }
    }
  }
}
.ve-other{
  margin-top: 0.1rem;
}

.v-buyVip{
  padding: 0 0.1rem;
  h3{
    .hlh(0.48rem);
    .border(solid, #eee, 0, 0, 1px, 0);
  }
  p{
    .hlh(0.6rem);
    .flex;
    justify-content: space-between;
    em{
      font-weight: bold;
      color: @c-redyellow;
      margin-left: 0.05rem;
    }
    dfn{
      .wh(0.7rem, 0.3rem);
      .border(solid, @c-redyellow, 1px);
      line-height: 0.3rem;
      text-align: center;
      border-radius: 2px;
      color: @c-redyellow;
    }
  }
}

</style>
