<template>
  <div class="container points">
    <Header back="true" title="我的积分" noRight="true"/>

    <div class="main">
      <div class="b-wrap">
        <div class="b-money">
          <h3>
            <span>当前积分</span>
            <router-link tag="span" to="/points/pointsDetail">
              <i><SvgIcon class="icon-style" iconName="wen" /></i>
              <em>积分说明</em>
            </router-link>
          </h3>
          <p><span class="f30 fwb">0</span>分</p>
          <div class="r-btn bf">
            <span class="g-btn">积分兑换商品</span>
          </div>
        </div>
      </div>

      <div class="b-record">
        <p>最近30天积分记录</p>
        <div class="br-list">
          <span><SvgIcon class="icon-style" iconName="empty" /></span>
          <p>最近30天无积分记录</p>
          <p class="f12 c9">快去下单赚取大量积分吧</p>
        </div>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from '../../components/header'

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
@import url("../../../lib/style/util");

.points {

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
