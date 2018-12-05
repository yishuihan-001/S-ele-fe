<template>
  <ul class="shopList oh">
    <router-link tag="li" to="/shop">
      <div class="s-left"><img :src="$store.state.placeholderImg" alt=""></div>
      <div class="s-right">
        <div class="sr-one">
          <span><i>品牌</i><b>效果演示</b></span>
          <span><dfn>保准票</dfn></span>
        </div>
        <div class="sr-two flex">
          <span class="srt-left">
            <i><Rate value="4.5" size='10px'></Rate></i>
            <em>4.9</em>
            <dfn>月送1200单</dfn>
          </span>
          <span class="srt-right">
            <i>蜂鸟专送</i>
            <em>准时达</em>
          </span>
        </div>
        <div class="sr-three flex">
          <span class="srt-left f12">¥20起送 / 配送费约¥5</span>
          <span class="srt-right f12">2104.7公里 / <em>22小时16分钟</em></span>
        </div>
      </div>
    </router-link>
    <li>
      <div class="s-left"><img :src="$store.state.placeholderImg" alt=""></div>
      <div class="s-right">
        <div class="sr-one">
          <span><i>品牌</i><b>效果演示</b></span>
          <span><dfn>保准票</dfn></span>
        </div>
        <div class="sr-two flex">
          <span class="srt-left">
            <i><Rate value="4.5" size='10px'></Rate></i>
            <em>4.9</em>
            <dfn>月送1200单</dfn>
          </span>
          <span class="srt-right">
            <i>蜂鸟专送</i>
            <em>准时达</em>
          </span>
        </div>
        <div class="sr-three flex">
          <span class="srt-left f12">¥20起送 / 配送费约¥5</span>
          <span class="srt-right f12">2104.7公里 / <em>22小时16分钟</em></span>
        </div>
      </div>
    </li>
    <li>
      <div class="s-left"><img :src="$store.state.placeholderImg" alt=""></div>
      <div class="s-right">
        <div class="sr-one">
          <span><i>品牌</i><b>效果演示</b></span>
          <span><dfn>保准票</dfn></span>
        </div>
        <div class="sr-two flex">
          <span class="srt-left">
            <i><Rate value="4.5" size='10px'></Rate></i>
            <em>4.9</em>
            <dfn>月送1200单</dfn>
          </span>
          <span class="srt-right">
            <i>蜂鸟专送</i>
            <em>准时达</em>
          </span>
        </div>
        <div class="sr-three flex">
          <span class="srt-left f12">¥20起送 / 配送费约¥5</span>
          <span class="srt-right f12">2104.7公里 / <em>22小时16分钟</em></span>
        </div>
      </div>
    </li>
    <li>
      <div class="s-left"><img :src="$store.state.placeholderImg" alt=""></div>
      <div class="s-right">
        <div class="sr-one">
          <span><i>品牌</i><b>效果演示</b></span>
          <span><dfn>保准票</dfn></span>
        </div>
        <div class="sr-two flex">
          <span class="srt-left">
            <i><Rate value="4.5" size='10px'></Rate></i>
            <em>4.9</em>
            <dfn>月送1200单</dfn>
          </span>
          <span class="srt-right">
            <i>蜂鸟专送</i>
            <em>准时达</em>
          </span>
        </div>
        <div class="sr-three flex">
          <span class="srt-left f12">¥20起送 / 配送费约¥5</span>
          <span class="srt-right f12">2104.7公里 / <em>22小时16分钟</em></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Rate from 'vue-tiny-rate'

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
    Rate
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
  @import url("../../lib/style/util");

  .shopList {
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: flex-start;
      height: 1.12rem;
      box-sizing: border-box;
      padding: 0.1rem;
      .s-left{
        .wh(0.64rem);
        overflow: hidden;
        img{
          .wh(100%, auto);
        }
      }
      .s-right{
        height: 100%;
        flex-grow: 1;
        padding-left: 0.1rem;
        .sr-one{
          .flex;
          justify-content: space-between;
          height: 0.3rem;
          i{
            .bg(yellow);
            font-size: 0.12rem;
            padding: 0.02rem;
            border-radius: 2px;
            font-weight: bold;
          }
          b{
            font-weight: bold;
            margin-left: 0.05rem;
          }
          dfn{
            .border(solid, #eee, 1px);
            color: #999;
            font-size: 0.12rem;
            border-radius: 2px;
          }
        }
        .sr-two{
          justify-content: space-between;
          height: 0.3rem;
          .srt-left{
            i{
              display: inline-block;
              transform: scale(0.8);
            }
            em,dfn{
              font-size: 0.1rem;
              transform: scale(0.8);
            }
          }
          .srt-right{
            i{
              .bg(@c-blue);
              .border(solid, @c-blue, 1px);
              font-size: 0.1rem;
              color: #fff;
              margin-right: 0.01rem;
              transform: scale(0.8);
              border-radius: 2px;
            }
            em{
              .border(solid, @c-blue, 1px);
              color: @c-blue;
              font-size: 0.1rem;
              box-sizing: border-box;
              transform: scale(0.8);
              border-radius: 2px;
            }
          }
        }
        .sr-three{
          justify-content: space-between;
          height: 0.25rem;
          *{
            color: #999;
          }
          .srt-left{
            color: #666;
          }
          .srt-right{
            em{
              font-size: 0.12rem;
              color: @c-blue;
            }
          }
        }
      }
    }
  }
</style>
