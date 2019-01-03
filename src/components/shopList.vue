<template>
  <ul class="shopList oh">
    <router-link tag="li" :to="'/shop/' + item.id" v-for="(item, index) in shopList" :key="index">
      <div class="s-left"><img :src="imgList[Math.floor(Math.random() * 20)]" alt=""></div>
      <!-- <div class="s-left"><img :src="$store.state.placeholderImg" alt=""></div> -->
      <div class="s-right">
        <div class="sr-one">
          <span><i v-if="item.labels.length">{{item.labels[item.labels.length - 1].icon_name}}</i><b>{{item.name}}</b></span>
          <span><dfn>保准票</dfn></span>
        </div>
        <div class="sr-two flex">
          <span class="srt-left">
            <i><Rate :value="item.rating" size='10px'></Rate></i>
            <em>{{item.rating}}</em>
            <dfn>月销{{item.recent_order_num}}单</dfn>
          </span>
          <span class="srt-right">
            <i v-if="item.delivery_mode.length">{{item.delivery_mode[0].text}}</i>
            <em v-if="item.labels.length">{{item.labels[0].name}}</em>
          </span>
        </div>
        <div class="sr-three flex">
          <span class="srt-left f12">¥{{item.float_minimum_order_amount}}起送 / 配送费约¥{{item.float_delivery_fee}}</span>
          <span class="srt-right f12">{{item.distanceText}} / <em>{{item.durationText}}</em></span>
        </div>
      </div>
    </router-link>
  </ul>
</template>

<script>
import Rate from 'vue-tiny-rate'

export default {
  data () {
    return {
      imgList: [
        'https://fuss10.elemecdn.com/d/e8/73972a0237f055e8858c6c6e80730jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/b/8d/4fe5f66a88e8fac360e19ad566a93jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/6/8e/1fdd53fa0d491d504b000b3968f1bjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/4/77/7d00c92aec56e956abb53859ae17ajpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/b/df/202119862d031ce6270608bf720f7jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/a/75/a742c9afaf9c67ac41103012892e1jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/1/3d/f33028822817d5cd41bcde22da38ejpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/2/99/2da7a5469fd89644994217b7c054cjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/a/4b/b335e375e1c29cfad3fd95bbc52ebjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/6/d2/1bd003d49c8e5b57d69879e2283d6jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/8/99/9b4af813927fbd1fdb0e48823e5f4jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/2/f3/67c89ed871862f4e981cee74b4e61jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/e/49/02f781f2d5ae231b12b641e6019ecjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/c/7c/4c3792e16f721f23e7f5e9035e42bjpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/8/fb/b683173ed29a093aa48f651430e7ejpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/6/35/677e163c73e410fc0f9d7de19a2d0jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/2/05/693f718e3f853eb90157fde649e8cpng.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/9/2a/38635340ae2ccbdcc2fa23754858ajpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        'https://fuss10.elemecdn.com/5/44/705abf68c1c6e5ff705c21fc22ba3png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
      ]
    }
  },
  created () {

  },
  props: ['shopList'],
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
