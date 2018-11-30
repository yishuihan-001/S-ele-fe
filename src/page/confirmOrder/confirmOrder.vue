<template>
  <div class="container confirmOrder">
    <Header title="确认订单" back="true">
      <router-link slot="right" class="f16 cf c-right" to="/food" v-if="isLogin">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf c-right" to="/food" v-else>登录/注册</router-link>
    </Header>

    <div class="main">
      <div class="c-address">
        <div>
          <div class="ca-left"><SvgIcon class="icon-style" iconName="site" /></div>
          <div class="ca-right" v-if="false">
            <h3><span class="f16 fwb">slient</span><em>先生</em><dfn>15000000000</dfn></h3>
            <p><i>家</i>富力城</p>
          </div>
          <div class="ca-right" v-else>请添加一个收获地址</div>
        </div>
        <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
      </div>

      <div class="c-arriveTime">
        <span class="f18 fwb c0">送达时间</span>
        <div>
          <p>尽快送达 | 预计 18:48</p>
          <p><span>蜂鸟专送</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'

export default {
  data () {
    return {
      isLogin: true
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

  .confirmOrder {

  }
  .c-right{
    padding-right: 0.1rem;
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
</style>
