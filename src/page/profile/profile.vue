<template>
  <div class="container profile">
    <Header back="true" title="我的" noRight="true"/>

    <div class="main">
      <router-link tag="div" :to="userInfo ? '/profile/info' : '/login'" class="p-user">
        <span><img :src="$store.state.placeholderImg" alt=""></span>
        <div>
          <p class="f18 fwb">{{userInfo ? userInfo.username : '登录/注册'}}</p>
          <p><i><SvgIcon class="icon-style" iconName="phone" /></i>暂无绑定手机号</p>
        </div>
        <i><SvgIcon class="icon-style" iconName="arrow-right-white" /></i>
      </router-link>

      <div class="p-info bf">
        <div @click="goTarget('/balance?num=' + myBalance, true)">
          <h3><span>{{userInfo ? myBalance : '0.00'}}</span>元</h3>
          <p>我的余额</p>
        </div>
        <div @click="goTarget('/benefit', true)">
          <h3><span>{{userInfo ? Math.floor(Math.random() * 10) : 0}}</span>个</h3>
          <p>我的优惠</p>
        </div>
        <div @click="goTarget('/points?num=' + myPoint, true)">
          <h3><span>{{userInfo ? myPoint: 0}}</span>分</h3>
          <p>我的积分</p>
        </div>
      </div>

      <ul class="bf">
        <li @click="goTarget('/order', true)">
          <div><i><SvgIcon class="icon-style" iconName="p-order" /></i>我的订单</div>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
        </li>
        <li @click="goTarget('/points')">
          <div><i><SvgIcon class="icon-style" iconName="p-score" /></i>积分商城</div>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
        </li>
        <li @click="goTarget('/vipcard')">
          <div><i><SvgIcon class="icon-style" iconName="p-vip" /></i>饿了么会员卡</div>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
        </li>
      </ul>

      <ul class="bf">
        <li @click="goTarget('/service')">
          <div><i><SvgIcon class="icon-style" iconName="p-service" /></i>服务中心</div>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
        </li>
        <li @click="goTarget('/download')">
          <div><i><SvgIcon class="icon-style" iconName="p-elm" /></i>下载饿了么APP</div>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
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
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Header from '@src/components/header'
import Footer from '@src/components/footer'

export default {
  data () {
    return {
      myBalance: (Math.random() * 80).toFixed(2), // 余额
      myPoint: Math.floor(Math.random() * 120) // 积分
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 前往
    goTarget (url, boo) {
      if (boo && !this.userInfo) {
        return Toast('您还没有登录哦')
      }
      this.$router.push(url)
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.profile {

}

.p-user{
  .bg(@c-blue);
  .flex;
  justify-content: flex-start;
  padding: 0 0.1rem;
  height: 0.9rem;
  span{
    .wh(0.7rem);
    border-radius: 50%;
    overflow: hidden;
    img{
      .wh(100%, auto);
    }
  }
  div{
    padding: 0 0.1rem;
    flex-grow: 1;
    p{
      .flex;
      justify-content: flex-start;
      color: #fff;
      line-height: 0.3rem;
      i{
        .flex;
      }
    }
  }
}

.p-info{
  .flex;
  height: 0.9rem;
  div{
    .border(solid, #eee, 0, 1px, 0, 0);
    .wh(33.33%, 0.9rem);
    box-sizing: border-box;
    text-align: center;
    h3{
      line-height: 0.3rem;
      padding-top: 0.2rem;
      span{
        font-size: 0.18rem;
        font-weight: bold;
        color: @c-redyellow;
      }
    }
    p{
      color: #666;
    }
  }
}

ul{
  overflow: hidden;
  margin-top: 0.1rem;
  li{
    .flex;
    .hlh(0.5rem);
    .border(solid, #eee, 0, 0, 1px, 0);
    justify-content: space-between;
    padding: 0 0.1rem;
    div{
      .flex;
      justify-content: flex-start;
      flex-grow: 1;
      i{
        .flex;
        margin-right: 0.05rem;
      }
    }
    span{
      .flex;
    }
  }
}
</style>
