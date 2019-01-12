<template>
  <div class="container balance">
    <Header back="true" title="我的余额" noRight="true"/>

    <div class="main">
      <div class="b-wrap">
        <div class="b-money">
          <h3>
            <span>当前余额</span>
            <router-link tag="span" to="/balance/balanceDetail">
              <i><SvgIcon class="icon-style" iconName="wen" /></i>
              <em>余额说明</em>
            </router-link>
          </h3>
          <p><span class="f30 fwb">{{balance.toFixed(2)}}</span>元</p>
          <div class="r-btn bf">
            <span class="g-btn" @click="extract">提现</span>
          </div>
        </div>
      </div>

      <div class="b-record">
        <p>交易明细</p>
        <div class="br-list">
          <span><SvgIcon class="icon-style" iconName="empty" /></span>
          <p>暂无明细记录</p>
        </div>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Header from '@src/components/header'

export default {
  data () {
    return {
      balance: 0 // 余额
    }
  },
  created () {
    this.balance = Number(Util.getQueryString(window.location.href, 'num'))
  },
  mounted () {

  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    // 提现
    extract () {
      if (this.balance <= 10) {
        return Toast('余额大于10元才能提现哦')
      } else if (this.balance > 50) {
        return Toast('每次提现限额最大50元')
      }
      Toast('您暂不具备提现资格')
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.balance {

}
.b-wrap{
  .bg(@c-blue);
  padding: 0.1rem;
}
.b-money{
  .bg(#fff);
  border-radius: 5px;
  overflow: hidden;
  padding: 0.1rem;
  h3{
    .hlh(0.4rem);
    .flex;
    justify-content: space-between;
    span,i{
      .flex;
    }
    em{
      font-size: 0.12rem;
      color: @c-blue;
    }
    .icon-style{
      .wh(0.15rem);
    }
  }
  p{
    .hlh(0.5rem);
    span{
      margin-right: 0.05rem;
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

.b-record{
  padding: 0.1rem;
  p{
    .hlh(0.35rem);
    color: #666;
  }
}

.br-list{
  padding-top: 0.8rem;
  text-align: center;
  span{
    .disib;
    .icon-style{
      .wh(1rem);
    }
  }
  p{
    .hlh(0.35rem);
    color: #666;
  }
}
</style>
