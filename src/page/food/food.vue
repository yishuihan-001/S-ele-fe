<template>
  <div class="container food">
    <Header back="true" :title="urlQuery.title || '未知'" noRight="true"/>

    <div class="main">
      <div class="f-tab pa bf flex">
        <span @click="showTab('class')" :class="[activeTab === 'class' ? 'ft-active': 'ft-noactive']">
          <em>分类</em>
          <i v-if="activeTab==='class'"><SvgIcon class="icon-style" iconName="down-active" /></i>
          <i v-else><SvgIcon class="icon-style" iconName="down" /></i>
        </span>
        <span @click="showTab('sort')" :class="[activeTab === 'sort' ? 'ft-active': 'ft-noactive']">
          <em>排序</em>
          <i v-if="activeTab==='sort'"><SvgIcon class="icon-style" iconName="down-active" /></i>
          <i v-else><SvgIcon class="icon-style" iconName="down" /></i>
        </span>
        <span @click="showTab('filter')" :class="[activeTab === 'filter' ? 'ft-active': 'ft-noactive']">
          <em>筛选</em>
          <i v-if="activeTab==='filter'"><SvgIcon class="icon-style" iconName="down-active" /></i>
          <i v-else><SvgIcon class="icon-style" iconName="down" /></i>
        </span>
      </div>

      <transition name="fshadow-fade" mode="out-in">
        <div class="f-shadow pa" v-if="showFshadow" @click="hideShadow"></div>
      </transition>

      <div :class="['f-class', 'pa', 'bf', 'flex', activeTab === 'class' ? 'showClass' : 'hideClass']">
        <ul class="fc-large">
          <li :class="{active: activeCategoryId === 0}" @click="targetCategory(0)">
            <span><em>全部</em></span>
            <span><dfn>999+</dfn></span>
          </li>
          <li v-for="(item, index) in shopCategoryList" :key="index" :class="[activeCategoryId === item.id ? 'active' : '']" @click="targetCategory(item.id)">
            <span><i><img :src="$store.state.placeholderImg" alt=""></i><em>{{item.title}}</em></span>
            <!-- <span><dfn>{{Math.floor(Math.random() * 1000)}}</dfn><b><SvgIcon class="icon-style" iconName="arrow-right" /></b></span> -->
            <!-- 下次dom更新时候，会重新随机数字，所以此处不可用随机数 -->
            <span><dfn>{{item.id}}</dfn><b><SvgIcon class="icon-style" iconName="arrow-right" /></b></span>
          </li>
        </ul>
        <ol class="fc-small">
          <li v-for="(item, index) in menuList" :key="index" @click="getShopList"><span>{{item.name}}</span><em>{{Math.floor(Math.random() * 500)}}</em></li>
        </ol>
      </div>

      <ul :class="['f-sort', 'pa', 'bf', activeTab === 'sort' ? 'showSort' : 'hideSort']">
        <li @click="sortType(0)" :class="[sortBy === 0 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="sort" /></i>
          <span><em>智能排序</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(4)" :class="[sortBy === 4 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="site" /></i>
          <span><em>距离最近</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(3)" :class="[sortBy === 3 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="fire" /></i>
          <span><em>销量最高</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(1)" :class="[sortBy === 1 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="price" /></i>
          <span><em>起送价最低</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(5)" :class="[sortBy === 5 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="time" /></i>
          <span><em>配送速度最快</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(2)" :class="[sortBy === 2 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="star" /></i>
          <span><em>评分最高</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
      </ul>

      <div :class="['f-filter', 'pa', activeTab === 'filter' ? 'showFilter' : 'hideFilter']">
        <p>配送方式</p>
        <ul>
          <li v-for="(item, index) in deliveryList" :key="index" @click="delivery(item.id)" :class="[deliveryArr.indexOf(item.id) > -1 ? 'active' : '']">
            <i><SvgIcon class="icon-style" iconName="bird" /></i>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>{{item.text}}</span>
          </li>
        </ul>
        <p>商家属性（可以多选）</p>
        <ol>
          <li v-for="(item, index) in labelList" :key="index" @click="shopNature(item.id)" :class="[shopNatureArr.indexOf(item.id) > -1 ? 'active' : '']">
            <dfn>{{item.icon_name}}</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>{{item.name}}</span>
          </li>
        </ol>
        <div>
          <span class="g-btn ff-clean" @click="cleanFilter">清空</span>
          <span class="g-btn" @click="confirmFilter">确定<em class="cf" v-if="selectLen > 0">（{{selectLen}}）</em></span>
        </div>
      </div>

      <div class="f-con pa" id="scrollWrap">
        <div class="bf">
          <ShopList :shopList="shopList"/>
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
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import ShopList from '@src/components/shopList'

export default {
  data () {
    return {
      showFshadow: false, // 是否显示遮罩
      activeTab: '', // 当前显示的tab
      sortBy: 0,
      deliveryArr: [],
      shopNatureArr: [],
      selectLen: 0,

      shopCategoryList: [],
      urlQuery: {},
      deliveryList: [],
      labelList: [],
      activeCategoryId: 0,
      menuList: [],
      offset: 0,
      limit: 20,
      shopList: [],
      scrollObj: null,
      isPullUpLoad: false,
      nomore: false
    }
  },
  created () {
    this.urlQuery = this.$route.query
    try {
      let va = new Va()
      va.add(this.urlQuery.id, [{ rule: 'isEmpty', msg: '商铺id参数缺失' }])
      va.add(this.urlQuery.lat, [{ rule: 'isEmpty', msg: '纬度参数缺失' }])
      va.add(this.urlQuery.lng, [{ rule: 'isEmpty', msg: '经度参数缺失' }])
      let vaResult = va.start()
      if (vaResult) {
        throw new Error(vaResult)
      }
      this.activeCategoryId = +this.urlQuery.id
    } catch (err) {
      Toast(err.message || '参数错误')
    }
  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    ShopList
  },
  computed: {

  },
  methods: {
    // 点击tab
    showTab (tar) {
      if (this.activeTab === tar) {
        this.activeTab = ''
        this.showFshadow = false
        return
      }
      if (!this.showFshadow) {
        this.showFshadow = true
      }
      this.activeTab = tar
    },

    // 排序
    sortType (num) {
      this.sortBy = num
      this.getShopList()
    },

    // 配送方式
    delivery (num) {
      let index = this.deliveryArr.indexOf(num)
      if (index < 0) {
        this.deliveryArr.push(num)
      } else {
        this.deliveryArr.splice(index, 1)
      }
      this.selectLen = this.deliveryArr.length + this.shopNatureArr.length
    },

    // 商家属性
    shopNature (num) {
      let index = this.shopNatureArr.indexOf(num)
      if (index < 0) {
        this.shopNatureArr.push(num)
      } else {
        this.shopNatureArr.splice(index, 1)
      }
      this.selectLen = this.deliveryArr.length + this.shopNatureArr.length
    },

    // 清空筛选
    cleanFilter () {
      this.deliveryArr = []
      this.shopNatureArr = []
      this.selectLen = 0
    },

    // 点击遮罩隐藏
    hideShadow () {
      this.activeTab = ''
      this.showFshadow = false
    },

    // 确认筛选条件
    confirmFilter () {
      this.getShopList()
    },

    async initData () {
      try {
        this.getShopCategoryAll()
        this.getDeliveryList()
        this.getLabelList()
        this.targetCategory(0, true)
        this.getShopList()
      } catch (err) {
        Toast(err.message || '初始化失败')
      }
    },

    // 获取商铺种类
    async getShopCategoryAll () {
      try {
        let allShopCategory = await Api.shopCategoryAll()
        Res(allShopCategory, data => {
          this.shopCategoryList = data
        })
      } catch (err) {
        Toast(err.message || '获取商铺分类失败')
      }
    },

    // 获取商铺配送方式列表
    async getDeliveryList () {
      try {
        let deliveryList = await Api.shopDeliveryAll()
        Res(deliveryList, data => {
          this.deliveryList = data
        })
      } catch (err) {
        Toast(err.message || '商铺配送方式获取失败')
      }
    },

    // 获取商家属性列表
    async getLabelList () {
      try {
        let labelList = await Api.shopLabelAll()
        Res(labelList, data => {
          this.labelList = data
        })
      } catch (err) {
        Toast(err.message || '商铺属性获取失败')
      }
    },

    // 获取目标种类下的分类
    async targetCategory (id, flag) {
      let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      try {
        let menuList = await Api.menuList(id)
        Res(menuList, data => {
          if (id === 0) {
            this.menuList = data
          } else {
            let num = Math.floor(Math.random() * 10)
            let temp = []
            for (let i = 0; i < num; i++) {
              temp.push({ name: arr[Math.floor(Math.random() * 10)] })
            }
            this.menuList = [].concat(temp, data)
          }
          if (!flag) {
            this.activeCategoryId = id
          }
        })
      } catch (err) {
        Toast(err.message || '获取分类失败')
      }
    },

    // 获取商铺列表
    async getShopList () {
      this.offset = 0
      this.limit = 20
      let filter = {
        category_id: this.activeCategoryId,
        latitude: +this.urlQuery.lat,
        longitude: +this.urlQuery.lng,
        offset: this.offset,
        limit: this.limit,
        order_by: this.sortBy,
        delivery_mode: this.deliveryArr,
        labels: this.shopNatureArr
      }
      let shopList = await Api.shopList(filter)
      this.hideShadow()
      Res(shopList, data => {
        this.shopList = data
        this.$nextTick(() => {
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
          this.pullUpLoad()
        })
      })
    },

    // 上拉加载更多
    pullUpLoad () {
      if (!this.scrollObj) return
      this.scrollObj.on('pullingUp', async () => {
        if (this.nomore) return
        if (this.isPullUpLoad) return
        this.isPullUpLoad = true
        let filter = {
          category_id: this.activeCategoryId,
          latitude: +this.urlQuery.lat,
          longitude: +this.urlQuery.lng,
          offset: this.offset,
          limit: this.limit,
          order_by: this.sortBy,
          delivery_mode: this.deliveryArr,
          labels: this.shopNatureArr
        }
        let shopList = await Api.shopList(filter)
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

  .food {

  }
  .f-tab{
    .hlh(0.41rem);
    .border(solid, #ccc, 0, 0, 1px, 0);
    box-sizing: border-box;
    left: 0;
    right: 0;
    z-index: 9;
    span{
      .flex;
      position: relative;
      width: 33.33%;
      text-align: center;
      i{
        .flex;
        .icon-style{
          .wh(0.1rem);
          margin: 0 0.05rem;
        }
      }
      &:nth-last-child(n+2)::after{
        .bg(#ccc);
        content: '';
        position: absolute;
        top: 0.1rem;
        bottom: 0.1rem;
        right: 0;
        width: 0.01rem;
      }
    }
  }

  /* 遮罩 */
  .f-shadow{
    .bg(#000);
    z-index: 3;
    opacity: 0.3;
    top: 0.41rem;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* 分类 */
  .f-class{
    opacity: 0;
    height: 0;
    .border(solid, #ccc, 0, 0, 1px, 0);
    top: 0.41rem;
    left: 0;
    right: 0;
    justify-content: space-between;
    z-index: 6;
    // height: 3.78rem;
    .fc-large{
      .wh(1.8rem, 100%);
      .bg(#f1f1f1);
      overflow: auto;
      li{
        .hlh(0.44rem);
        .flex;
        justify-content: space-between;
        padding: 0 0.1rem 0 0.05rem;
        span{
          .flex;
          *{
            font-size: 0.12rem;
            color: #666;
          }
          em{
            .ellipsis;
            max-width: 0.8rem;
          }
          i{
            .disib;
            .wh(0.35rem, 0.44rem);
            padding: 0.08rem 0;
            box-sizing: border-box;
            img{
              .wh(auto, 100%);
            }
          }
          dfn{
            .bg(#ccc);
            .disib;
            .hlh(0.2rem);
            .ellipsis;
            color: #fff;
            max-width: 0.4rem;
            border-radius: 0.1rem;
            padding: 0 0.05rem;
            box-sizing: border-box;
          }
          b{
            .flex;
            .icon-style{
              .wh(0.15rem);
            }
          }
        }
      }
      li.active{
        .bg(#fff);
      }
    }
    .fc-small{
      height: 100%;
      flex-grow: 1;
      overflow: auto;
      padding-left: 0.12rem;
      li{
        .flex;
        .border(solid, #eee, 0, 0, 1px, 0);
        .hlh(0.44rem);
        justify-content: space-between;
        *{
          color: #666;
          font-size: 0.12rem;
        }
        em{
          margin-right: 0.1rem;
        }
      }
    }
  }

  /* 排序 */
  .f-sort{
    opacity: 0;
    height: 0;
    .border(solid, #eee, 0, 0, 1px, 0);
    top: 0.41rem;
    left: 0;
    right: 0;
    // height: 3.5rem;
    overflow: auto;
    z-index: 6;
    li{
      .flex;
      .hlh(0.58rem);
      justify-content: flex-start;
      padding-left: 0.05rem;
      i{
        .flex;
        .wh(0.36rem, 100%);
      }
      span{
        .flex;
        .border(solid, #eee, 0, 0, 1px, 0);
        justify-content: space-between;
        flex-grow: 1;
        color: #666;
        padding-right: 0.1rem;
        dfn{
          display: none;
        }
      }
    }
    li.active{
      em{
        color: @c-blue;
      }
      dfn{
        display: block;
      }
    }
  }

  /* 筛选 */
  .f-filter{
    opacity: 0;
    height: 0;
    .border(solid, #eee, 0, 0, 1px, 0);
    .bg(#f1f1f1);
    top: 0.41rem;
    left: 0;
    right: 0;
    overflow: auto;
    // height: 2.61rem;
    z-index: 6;
    p{
      .hlh(0.3rem);
      .bg(#fff);
      font-size: 0.12rem;
      padding-left: 0.1rem;
    }
    ul,ol{
      .bg(#fff);
      overflow: hidden;
      padding-left: 0.1rem;
      li{
        .wh(1.1rem, 0.34rem);
        .border(solid, #eee, 1px);
        .flex;
        justify-content: flex-start;
        border-radius: 2px;
        line-height: 0.34rem;
        float: left;
        margin-right: 0.08rem;
        margin-bottom: 0.1rem;
        i,em{
          .flex;
          .wh(0.22rem);
          margin: 0 0.02rem;
        }
        em{
          display: none;
        }
        dfn{
          .border(solid, @c-blue, 1px);
          .wh(0.2rem);
          line-height: 0.2rem;
          border-radius: 2px;
          margin: 0 0.02rem;
          color: @c-blue;
          text-align: center;
        }
      }
      li.active{
        i,dfn{
          display: none;
        }
        em{
          display: flex;
        }
        span{
          color: @c-blue;
        }
      }
    }
    div{
      .bg(#f1f1f1);
      .flex;
      justify-content: space-between;
      padding: 0.1rem;
      span{
        width: 48%;
      }
      .ff-clean{
        .bg(#fff);
        color: #333;
      }
    }
  }

  /* 列表 */
  .f-con{
    top: 0.41rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f0f0f0;
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

  /* 分类样式 */
  .showClass{
    animation: showClass 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes showClass{
    0%{
      opacity: 0;
      height: 0;
    }
    100%{
      opacity: 1;
      height: 3.78rem;
    }
  }
  .hideClass{
    animation: hideClass 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes hideClass{
    0%{
      opacity: 1;
      height: 3.78rem;
    }
    100%{
      opacity: 0;
      height: 0;
    }
  }
  /* 排序样式 */
  .showSort{
    animation: showSort 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes showSort{
    0%{
      opacity: 0;
      height: 0;
    }
    100%{
      opacity: 1;
      height: 3.5rem;
    }
  }
  .hideSort{
    animation: hideSort 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes hideSort{
    0%{
      opacity: 1;
      height: 3.5rem;
    }
    100%{
      opacity: 0;
      height: 0;
    }
  }
  /* 筛选样式 */
  .showFilter{
    animation: showFilter 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes showFilter{
    0%{
      opacity: 0;
      height: 0;
    }
    100%{
      opacity: 1;
      height: 2.61rem;
    }
  }
  .hideFilter{
    animation: hideFilter 0.3s linear;
    animation-fill-mode: forwards;
  }
  @keyframes hideFilter{
    0%{
      opacity: 1;
      height: 2.61rem;
    }
    100%{
      opacity: 0;
      height: 0;
    }
  }
  /* 遮罩样式 */
  .fshadow-fade-enter-active,
  .fshadow-fade-leave-active {
    transition: opacity 0.3s;
  }
  .fshadow-fade-enter,
  .fshadow-fade-leave-active {
    opacity: 0;
  }

  /* 移除样式 */
  .ft-active{
    em{
      color: @c-blue;
    }
    i{
      animation: rotate 0.3s linear;
      animation-fill-mode: forwards;
    }
  }
  @keyframes rotate{
    0%{
      transform:rotate(0);
    }
    100%{
      transform:rotate(180deg);
    }
  }
  .ft-noactive{
    em{
      color: #333;
    }
    i{
      animation: norotate 0.3s linear;
      animation-fill-mode: forwards;
    }
  }
  @keyframes norotate{
    0%{
      transform:rotate(180deg);
    }
    100%{
      transform:rotate(0);
    }
  }
</style>
