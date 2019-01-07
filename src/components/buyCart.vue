<template>
  <div class="buycart">
    <div class="b-digest">
      <div class="bd-info">
        <h3><i>¥</i> <em>{{totalPrice}}</em></h3>
        <p>配送费¥{{float_delivery_fee}}</p>
      </div>
      <div :class="['bd-topay', float_minimum_order_amount - totalPrice > 0 ? '' : 'active']">
        <em v-if="float_minimum_order_amount - totalPrice > 0">还差{{float_minimum_order_amount - totalPrice}}起送</em>
        <router-link v-else tag="span" to="/confirmOrder">去结算</router-link>
      </div>
      <div :class="['bd-cart', 'pa', bounce ? 'bounce' : '', manifest.length ? 'active' : '']" @click="showList">
        <i><SvgIcon class="icon-style" iconName="cart"/></i>
      </div>
    </div>

    <transition name="toggle-cart">
      <div class="b-productList pa" v-show="showShadow">
        <div class="bp-title">
          <span class="c6">购物车</span><em><i><SvgIcon class="icon-style" iconName="delete" /></i><dfn class="f14 c9" @click="cleanManifest">清空</dfn></em>
        </div>
        <div class="bg-listWrap" id="scrollWrap">
          <ul class="bp-list">
            <li v-for="(item, index) in manifest" :key="index">
              <div class="bpl-left">
                <span>{{item.name}}<dfn v-if="item.label">({{item.label}})</dfn></span><em>¥{{item.price}}</em>
              </div>
              <div class="bpl-right">
                <i @click="reduce(item)"><SvgIcon class="icon-style" iconName="reduce"/></i>
                <b>{{item.quantity}}</b>
                <i @click="add(item)"><SvgIcon class="icon-style add" iconName="add"/></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      bounce: false,
      totalPrice: 0,
      scrollObj: null
    }
  },
  created () {

  },
  mounted () {

  },
  props: ['showShadow', 'manifest', 'float_delivery_fee', 'float_minimum_order_amount'],
  components: {

  },
  computed: {

  },
  methods: {
    // 是否显示清单
    showList () {
      if (!this.manifest.length) {
        return Toast('您的购物车空空如也哦~')
      }
      this.$emit('update:showShadow', !this.showShadow)
    },

    // 添加到购物车
    addToCart () {
      this.bounce = true
      setTimeout(() => {
        this.bounce = false
      }, 500)
    },

    // 重置
    resetData () {
      let price = 0
      this.manifest.forEach(item => {
        price += item.price * item.quantity
      })
      this.totalPrice = price.toFixed(2)

      this.$nextTick(() => {
        if (!this.scrollObj) {
          /* eslint-disable no-new */
          this.scrollObj = new BScroll('#scrollWrap', {
            deceleration: 0.001,
            bounce: true,
            swipeTime: 1800,
            click: true
          })
        } else {
          this.scrollObj.refresh()
        }
      })
    },

    // 从购物车删除
    reduce (item) {
      this.$emit('reduceManifest', item)
    },

    // 从购物车添加
    add (item) {
      this.$emit('addManifest', item)
    },

    // 从购物车清空
    cleanManifest () {
      this.$emit('cleanManifest')
    }
  },
  watch: {
    // manifest (value) {
    //   console.log(value)
    // }
    manifest: {
      handler (newValue, oldValue) {
        this.manifest = newValue
        this.resetData()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  @import url("../../lib/style/util");

  .buycart{
    height: 0.5rem;
    position: relative;
  }
  .b-digest {
    .flex;
    .bg(#3d3d3f);
    height: 0.5rem;
    justify-content: space-between;
    position: relative;
    z-index: 3;
    .bd-info{
      padding-left: 0.8rem;
      h3 *{
        font-size: 0.18rem;
        font-weight: bold;
        color: #fff;
      }
      p{
        color: #fff;
      }
    }
    .bd-topay{
      .hlh(0.5rem);
      .bg(#535356);
      text-align: center;
      width: 1.2rem;
      em{
        color: #fff;
        font-size: 0.18rem;
        font-weight: bold;
      }
      span{
        display: none;
      }
    }
    .bd-topay.active{
      .bg(@c-green);
      em{
        display: none;
      }
      span{
        display: block;
        color: #fff;
        font-size: 0.18rem;
        font-weight: bold;
      }
    }
    .bd-cart{
      .wh(0.58rem);
      .border(solid, #444444, 5px);
      .bg(#3d3d3f);
      .flex;
      box-sizing: border-box;
      left: 0.1rem;
      bottom: 0.1rem;
      border-radius: 50%;
      overflow: hidden;
      i{
        .flex;
        .icon-style{
          .wh(0.28rem);
        }
      }
    }
    .active.active{
      .bg(@c-blue);
    }
  }

  /* 购物车列表 */
  .b-productList{
    .bg(#fff);
    bottom: 0.5rem;
    left: 0;
    right: 0;
    height: auto;
    .bp-title{
      .bg(#eceff1);
      .flex;
      .hlh(0.48rem);
      padding: 0 0.1rem;
      justify-content: space-between;
      em{
        .flex;
      }
      i{
        .flex;
        .icon-style{
          .wh(0.3rem);
        }
      }
    }
    .bg-listWrap{
      .bg(#ccc);
      height: auto;
      max-height: 5rem;
      overflow: hidden;
      .bp-list{
        .bg(#fff);
        li{
          .hlh(0.52rem);
          .flex;
          justify-content: space-between;
          padding-left: 0.1rem;
          .bpl-left{
            .flex;
            flex-grow: 1;
            justify-content: space-between;
            span{
              font-size: 0.16rem;
              font-weight: bold;
            }
            em{
              color: @c-redyellow;
              font-weight: bold;
            }
          }
          .bpl-right{
            .flex;
            width: 1rem;
            b{
              margin: 0 0.05rem;
            }
            i{
              .flex;
            }
            .icon-style.add{
              .wh(0.18rem);
            }
          }
        }
      }
    }
  }

  /* 是否显示购物车列表 */
  .toggle-cart-enter-active, .toggle-cart-leave-active {
      transition: all .3s ease-out;
  }
  .toggle-cart-enter, .toggle-cart-leave-active {
      transform: translateY(100%);
  }

  /* 购物车跳动 */
  .bounce {
    animation: bounce-in .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
