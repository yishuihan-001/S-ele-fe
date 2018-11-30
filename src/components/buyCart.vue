<template>
  <div class="buycart">
    <div class="b-digest">
      <div class="bd-info">
        <h3><i>¥</i> <em>0.00</em></h3>
        <p>配送费¥5</p>
      </div>
      <div class="bd-topay">
        <em>还差20起送</em>
        <span>去结算</span>
      </div>
      <div :class="['bd-cart', 'pa', bounce ? 'bounce' : '']" @click="showList">
        <i><SvgIcon class="icon-style" iconName="cart"/></i>
      </div>
    </div>

    <transition name="toggle-cart">
      <div class="b-productList pa" v-show="showProductList">
        <div class="bp-title">
          <span class="c6">购物车</span><em><i><SvgIcon class="icon-style" iconName="delete" /></i><dfn class="f14 c9">清空</dfn></em>
        </div>
        <ul class="bp-list">
          <li>
            <div class="bpl-left">
              <span>肯德基</span><em>¥20</em>
            </div>
            <div class="bpl-right">
              <i><SvgIcon class="icon-style" iconName="reduce"/></i>
              <b>123</b>
              <i><SvgIcon class="icon-style add" iconName="add"/></i>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showProductList: false,
      bounce: false
    }
  },
  created () {

  },
  mounted () {

  },
  components: {

  },
  computed: {

  },
  methods: {
    showList () {
      this.showProductList = !this.showProductList
      this.$emit('update:showShadow', this.showProductList)
    },
    addToCart () {
      this.bounce = true
      setTimeout(() => {
        this.bounce = false
      }, 500)
    }
  },
  watch: {

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
    .bd-cart.bounce{
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
