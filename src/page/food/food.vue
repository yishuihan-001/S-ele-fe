<template>
  <div class="container food">
    <Header back="true" title="甜品饮品" noRight="true"/>

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
          <li>
            <span><em>异国料理</em></span>
            <span><dfn>833</dfn></span>
          </li>
          <li class="active">
            <span><i><img :src="$store.state.placeholderImg" alt=""></i><em>快餐便当</em></span>
            <span><dfn>833</dfn><b><SvgIcon class="icon-style" iconName="arrow-right" /></b></span>
          </li>
        </ul>
        <ol class="fc-small">
          <li><span>川湘菜</span><em>123</em></li>
          <li><span>川湘菜</span><em>123</em></li>
        </ol>
      </div>

      <ul :class="['f-sort', 'pa', 'bf', activeTab === 'sort' ? 'showSort' : 'hideSort']">
        <li @click="sortType(1)" :class="[sortBy === 1 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="sort" /></i>
          <span><em>智能排序</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(2)" :class="[sortBy === 2 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="site" /></i>
          <span><em>距离最近</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(3)" :class="[sortBy === 3 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="fire" /></i>
          <span><em>销量最高</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(4)" :class="[sortBy === 4 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="price" /></i>
          <span><em>起送价最低</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(5)" :class="[sortBy === 5 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="time" /></i>
          <span><em>配送速度最快</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
        <li @click="sortType(6)" :class="[sortBy === 6 ? 'active' : '']">
          <i><SvgIcon class="icon-style" iconName="star" /></i>
          <span><em>评分最高</em><dfn><SvgIcon class="icon-style" iconName="correct" /></dfn></span>
        </li>
      </ul>

      <div :class="['f-filter', 'pa', activeTab === 'filter' ? 'showFilter' : 'hideFilter']">
        <p>配送方式</p>
        <ul>
          <li @click="delivery(1)" :class="[deliveryArr.indexOf(1) > -1 ? 'active' : '']">
            <i><SvgIcon class="icon-style" iconName="bird" /></i>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>蜂鸟专送</span>
          </li>
          <li @click="delivery(2)" :class="[deliveryArr.indexOf(2) > -1 ? 'active' : '']">
            <i><SvgIcon class="icon-style" iconName="bird" /></i>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>达达</span>
          </li>
          <li @click="delivery(3)" :class="[deliveryArr.indexOf(3) > -1 ? 'active' : '']">
            <i><SvgIcon class="icon-style" iconName="bird" /></i>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>京东到家</span>
          </li>
        </ul>
        <p>商家属性（可以多选）</p>
        <ol>
          <li @click="shopNature(1)" :class="[shopNatureArr.indexOf(1) > -1 ? 'active' : '']">
            <dfn>平</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>品牌商家</span>
          </li>
          <li @click="shopNature(2)" :class="[shopNatureArr.indexOf(2) > -1 ? 'active' : '']">
            <dfn>保</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>外卖保</span>
          </li>
          <li @click="shopNature(3)" :class="[shopNatureArr.indexOf(3) > -1 ? 'active' : '']">
            <dfn>准</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>准时达</span>
          </li>
          <li @click="shopNature(4)" :class="[shopNatureArr.indexOf(4) > -1 ? 'active' : '']">
            <dfn>新</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>新店</span>
          </li>
          <li @click="shopNature(5)" :class="[shopNatureArr.indexOf(5) > -1 ? 'active' : '']">
            <dfn>付</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>在线支付</span>
          </li>
          <li @click="shopNature(6)" :class="[shopNatureArr.indexOf(6) > -1 ? 'active' : '']">
            <dfn>票</dfn>
            <em><SvgIcon class="icon-style" iconName="correct" /></em>
            <span>开发票</span>
          </li>
        </ol>
        <div>
          <span class="g-btn ff-clean" @click="cleanFilter">清空</span>
          <span class="g-btn" @click="confirmFilter">确定<em class="cf" v-if="selectLen > 0">（{{selectLen}}）</em></span>
        </div>
      </div>

      <div class="f-con pa bf">
        <ShopList/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'
import ShopList from '../../components/shopList'

export default {
  data () {
    return {
      showFshadow: false, // 是否显示遮罩
      activeTab: '', // 当前显示的tab
      sortBy: 1,
      deliveryArr: [],
      shopNatureArr: [],
      selectLen: 0
    }
  },
  created () {

  },
  mounted () {
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
      this.activeTab = ''
      this.showFshadow = false
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
      this.activeTab = ''
      this.showFshadow = false
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
