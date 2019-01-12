<template>
  <div class="container msite">
    <Header :title="cityAddress ? cityAddress.title : '请选择地址...'" :titleLink="true">
      <router-link slot="left" class="h-search flex" to="/search">
        <SvgIcon class="icon-style" iconName="search" />
      </router-link>
      <router-link slot="right" class="f16 cf c-right" to="/profile" v-if="userInfo">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf h-right" to="/login" v-else>登录/注册</router-link>
    </Header>

    <div class="main" id="scrollWrap">
      <div class="scroll-wrap">
        <div class="m-carousel bf oh">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in shopCategoryList" :key="index">
              <ul class="mc-panel">
                <router-link tag="li" v-for="(it, id) in item" :key="id" :to="'/food?' + 'id=' + it.id + '&title=' + it.title + '&lat=' + latitude + '&lng=' + longitude">
                  <span><img :src="it.image_url" alt=""></span>
                  <p>{{it.title}}</p>
                </router-link>
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>

        <div class="m-merchant bf oh">
          <h3>
            <i class="flex"><SvgIcon class="icon-style" iconName="shop" /></i>
            <span class="c6">附近商家</span>
          </h3>
          <ShopList :shopList="shopList" :lat="latitude" :lng="longitude"/>
          <div class="mm-loading flex" v-if="isPullUpLoad">
            <i class="flex"><SvgIcon class="icon-style" iconName="loading" /></i>
            <span>...正在加载...</span>
            <i class="flex"><SvgIcon class="icon-style" iconName="loading" /></i>
          </div>
          <div class="mm-nomore tac" v-if="nomore">
            <p>没有更多数据了</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import Footer from '@src/components/footer'
import ShopList from '@src/components/shopList'

export default {
  data () {
    return {
      imgList: [
        'https://fuss10.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/c/7e/76a23eb90dada42528bc41499d6f8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/3/01/c888acb2c8ba9e0c813f36ec9e90ajpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/c/21/e42997b86b232161a5a16ab813ae8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/a/8a/ec21096d528b7cfd23cdd894f01c6jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/e/c7/b7ba9547aa700bd20d0420e1794a8jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/0/1a/314b6da88ab6c7ae9828f91652d40jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/7/d6/6f2631288a44ec177204e05cbcb93jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/e/89/185f7259ebda19e16123884a60ef2jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/5/1a/dc885d2ce022d2ee60495acafb795jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/a/78/0fb469b2da210827ec16896e00420jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/',
        'https://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'
      ],
      shopCategoryList: [], // 商铺分类列表（入口列表）
      shopList: [], // 商铺列表
      latitude: 0, // 经度
      longitude: 0, // 纬度
      offset: 0, // 索引
      limit: 20, // 条数
      scrollObj: null, // 滚动对象
      isPullUpLoad: false, // 正在加载
      nomore: false // 没有更多
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    Footer,
    ShopList
  },
  computed: {
    ...mapState(['userInfo', 'currCity', 'cityAddress'])
  },
  methods: {
    async initData () {
      try {
        // 获取商铺分类
        let allShopCategory = await Api.shopCategoryAll()
        Res(allShopCategory, data => {
          let arr = []
          let temp = []
          for (let i = 0, len = data.length; i < len; i++) {
            data[i].image_url = this.imgList[i]
            temp.push(data[i])
            if ((i !== 0 && (i + 1) % 8 === 0) || i === len - 1) {
              arr.push(temp)
              temp = []
            }
          }
          this.shopCategoryList = arr
        })
        // 获取商铺列表
        if (this.cityAddress) {
          this.latitude = this.cityAddress.location.lat
          this.longitude = this.cityAddress.location.lng
        } else if (this.currCity) {
          this.latitude = this.currCity.latitude
          this.longitude = this.currCity.longitude
        } else {
          let res1 = await Api.getCity({ type: 'guess' })
          Res(res1, data => {
            this.latitude = data.latitude
            this.longitude = data.longitude
          })
        }
        let shopList = await Api.shopList({ latitude: this.latitude, longitude: this.longitude, offset: this.offset, limit: this.limit })
        Res(shopList, data => {
          this.shopList = data
          this.offset += this.limit
        })

        this.$nextTick(() => {
          if (!this.scrollObj) {
            /* eslint-disable no-new */
            this.scrollObj = new BScroll('#scrollWrap', {
              deceleration: 0.001,
              bounce: true,
              swipeTime: 1800,
              click: true,
              pullUpLoad: {
                threshold: -80
              }
            })
          } else {
            this.scrollObj.refresh()
          }
          this.pullUpLoad()
        })
      } catch (err) {
        Toast(err.message || '初始化失败')
      }
    },

    // 上拉加载更多
    pullUpLoad () {
      if (!this.scrollObj) return
      this.scrollObj.on('pullingUp', async () => {
        if (this.nomore) return
        if (this.isPullUpLoad) return
        this.isPullUpLoad = true
        let shopList = await Api.shopList({ latitude: this.latitude, longitude: this.longitude, offset: this.offset, limit: this.limit })
        Res(shopList, data => {
          this.shopList = this.shopList.concat(data)
          this.offset += this.limit
          setTimeout(() => {
            this.isPullUpLoad = false
            this.scrollObj.finishPullUp()
            this.scrollObj.refresh()
            if (data.length < this.limit) {
              this.nomore = true
            }
          }, 1000)
        })
      })
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.demo {
}
.c-right{
  margin-right: 0.1rem;
}
.h-search {
  .wh(0.45rem, 0.45rem);
}
.h-right {
  padding-right: 0.1rem;
}

.m-carousel{
  .border(solid, #ccc, 0, 0, 1px, 0);
  height: 2.01rem;
  box-sizing: border-box;
  margin-bottom: 0.15rem;
  .mc-panel{
    .wh(100%);
    padding: 0 0.1rem 0.1rem;
    box-sizing: border-box;
    li{
      .wh(25%, 0.95rem);
      float: left;
      text-align: center;
      span{
        .wh(0.55rem);
        margin: 0.1rem auto;
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        overflow: hidden;
        img{
          .wh(100%, auto);
        }
      }
    }
    p{
      .hlh(0.2rem);
      .ellipsis;
      text-align: center;
      color: #666;
    }
  }
}

.m-merchant{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  padding-bottom: 0.5rem;
  h3{
    .flex;
    justify-content: flex-start;
    padding: 0.05rem 0.1rem;
    span{
      margin-left: 0.05rem;
    }
  }
  .mm-loading{
    height: 0.5rem;
    i{
      animation: xz 1s linear infinite;
    }
  }
  .mm-nomore{
    .hlh(0.3rem);
  }
}
@keyframes xz{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
