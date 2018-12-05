<template>
  <div class="container order">
    <Header back="true" title="订单列表" noRight="true"/>

    <div class="main">
      <ul>
        <li>
          <router-link tag="div" to="/order/orderDetail" class="o-info">
            <div class="oi-left"><img :src="$store.state.placeholderImg" alt=""></div>
            <div class="oi-right">
              <div class="oir-title">
                <div>
                  <span><em class="f16">效果演示</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
                  <dfn class="c6">等待支付</dfn>
                </div>
                <p class="f12 c6">2018-12-01 17:17</p>
              </div>
              <div class="oir-product">
                <span class="c6">肉夹馍等50件商品</span><dfn>¥24298.00</dfn>
              </div>
            </div>
          </router-link>
          <div class="o-status">
            <span>去支付(还剩13分58秒)</span>
            <!-- <dfn>再来一单</dfn> -->
          </div>
        </li>
        <li>
          <div class="o-info">
            <div class="oi-left"><img :src="$store.state.placeholderImg" alt=""></div>
            <div class="oi-right">
              <div class="oir-title">
                <div>
                  <span><em class="f16">效果演示</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
                  <dfn class="c6">等待支付</dfn>
                </div>
                <p class="f12 c6">2018-12-01 17:17</p>
              </div>
              <div class="oir-product">
                <span class="c6">肉夹馍等50件商品</span><dfn>¥24298.00</dfn>
              </div>
            </div>
          </div>
          <div class="o-status">
            <span>去支付(还剩13分58秒)</span>
            <!-- <dfn>再来一单</dfn> -->
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
import Header from '../../components/header'
import Footer from '../../components/footer'

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
    Header,
    Footer
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

.order {

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
        .border(solid, @c-redyellow, 1px);
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
