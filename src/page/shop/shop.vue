<template>
  <div class="container shop">
    <div class="s-header pr">
      <div class="sh-back pa" @click="$router.back()"><SvgIcon class="icon-style" iconName="arrow-left"/></div>
      <router-link tag="div" to="/shop/shopDetail" class="sh-shopDetail flex">
        <div class="shh-info">
          <span><img :src="$store.state.placeholderImg" alt=""></span>
          <div>
            <h3 class="f18 cf">{{shopInfo.name}}</h3>
            <h5 class="f12 cf">商家配送／{{durationText}}送达／配送费¥{{shopInfo.float_delivery_fee}}</h5>
            <p class="f12 cf">{{shopInfo.description}}</p>
            <p class="f12 cf">{{shopInfo.promotion_info}}</p>
          </div>
        </div>
        <i><SvgIcon class="icon-style" iconName="arrow-right-white" /></i>
      </router-link>
      <div class="sh-activity flex" v-if="shopInfo.activities && shopInfo.activities.length">
        <p><dfn>{{shopInfo.activities[0].keyword}}</dfn>{{shopInfo.activities[0].description}}</p>
        <span v-if="shopInfo.activities.length > 1" @click="showActivity = true"><em>{{shopInfo.activities.length}}个活动</em><i><SvgIcon class="icon-style" iconName="arrow-right-white" /></i></span>
      </div>
    </div>

    <div class="s-tab bf flex">
      <span :class="{active: showProduct}" @click="switchTab('product')">商品</span><span :class="{active: !showProduct}" @click="switchTab('comment')">评价</span>
    </div>

    <div class="s-con pr">
      <!-- <transition name="scon-fade" mode="out-in"> -->
        <div :class="['sc-product', showProduct ? 'showProduct' : '']">
          <div class="sc-large pa" id="scrollWrapLarge" ref="scrollWrapLarge">
            <ul>
              <li v-for="(item, index) in menuList" :key="index" :class="{active: index === currentIndex(index)}" @click="handleGoodsItem(index)">
                <span>{{item.name}}</span>
                <em><img :src="$store.state.placeholderImg" alt=""></em>
                <i><SvgIcon class="icon-style" iconName="sort" /></i>
              </li>
            </ul>
          </div>
          <div class="sc-small pa" id="scrollWrapSmall" ref="scrollWrapSmall">
            <div class="scm_wrap">
              <dl v-for="(item, index) in menuList" :key="index" class="goodsItemHook">
                <dt>
                  <p><i>{{item.name}}</i><em>{{item.description}}</em></p>
                  <dfn>···</dfn>
                </dt>
                <dd class="bf">
                  <ul>
                    <router-link v-for="(it, id) in item.foods" :key="id" to="/shop/foodDetail" tag="li">
                      <b><SvgIcon class="icon-style" iconName="new" /></b>
                      <span><img :src="$store.state.placeholderImg" alt=""></span>
                      <div>
                        <h3>{{it.name}}<i v-for="(t, d) in it.attributes" :key="d">{{t.name}}</i></h3>
                        <p class="scs-des">{{it.description}}</p>
                        <p class="scs-com">月售{{it.month_sales}}份 好评率{{((it.rating/5)*100).toFixed()}}%</p>
                        <p class="scs-pri">
                          <span><i>¥</i><em>{{it.is_multi ? getMultiPrice(it.multi_spec) : it.single_spec.current_price}}</em></span>
                          <span>
                            <transition name="slide-fade">
                              <strong v-show="getProductNum(it) > 0" @click.stop="reduce(it)">
                                <SvgIcon class="icon-style" iconName="reduce"/>
                              </strong>
                            </transition>
                            <b v-show="getProductNum(it) > 0">{{getProductNum(it)}}</b>
                            <strong v-if="!it.is_multi" @click.stop="addSingle(it)">
                              <SvgIcon class="icon-style add" iconName="add"/>
                            </strong>
                            <dfn v-else @click.stop="showMultiModal(it)">选规格</dfn>
                          </span>
                        </p>
                      </div>
                    </router-link>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <!-- <div class="sc-cart pa">
            <BuyCart :showShadow.sync="showShadow" ref="buyCart" :manifest="manifest" :float_delivery_fee="shopInfo.float_delivery_fee" :float_minimum_order_amount="shopInfo.float_minimum_order_amount" @reduceManifest="reduceManifest" @addManifest="addManifest" @cleanManifest="cleanManifest"/>
          </div> -->
        </div>

        <div :class="['sc-comment', showProduct ? 'showProduct' : '']">
          <div class="scc-wrap pa" id="scrollWrapComment">
            <div class="scc-wrap-con">
              <div class="scc-digest" v-if="scoresObj">
                <div class="sccd-left">
                  <h3>{{scoresObj.overall_score.toFixed(1)}}</h3>
                  <h5>综合评价</h5>
                  <p>高于周边商家{{(scoresObj.compare_rating*100).toFixed(1)}}%</p>
                </div>
                <div class="sccd-right">
                  <p><span>服务态度</span><i><Rate value="4.5" size='10px'></Rate></i><em>{{scoresObj.service_score.toFixed(1)}}</em></p>
                  <p><span>菜品评价</span><i><Rate value="4.5" size='10px'></Rate></i><em>{{scoresObj.food_score.toFixed(1)}}</em></p>
                  <p><span>送达时间</span><dfn>{{scoresObj.deliver_time}}分钟</dfn></p>
                </div>
              </div>

              <div class="scc-label bf">
                <span v-for="(item, index) in tagsList" :key="index" :class="[selectTagList.indexOf(item._id) > -1 ? 'active' : '']" @click="selectTag(item)">{{item.name}}({{item.count}})</span>
              </div>

              <ul class="ssc-comment">
                <li v-for="(item, index) in ratingsList" :key="index">
                  <div class="sscc-left"><span><img :src="$store.state.placeholderImg" alt=""></span></div>
                  <div class="sscc-right">
                    <p class="r-title"><span>{{item.username}}</span><em>{{item.rated_at}}</em></p>
                    <p class="r-rate"><i><Rate :value="item.rating_star" size='10px'></Rate></i><em>{{item.time_spent_desc}}</em></p>
                    <div class="r-img">
                      <img :src="$store.state.placeholderImg" alt="" v-for="it in Math.floor(Math.random() * 10)" :key="it">
                    </div>
                    <div class="r-tip">
                      <span v-for="(it, id) in item.item_ratings" :key="id">{{it.food_name}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      <!-- </transition> -->
    </div>

    <!-- 购物车遮罩 -->
    <transition name="scon-fade">
      <div class="s-shadow pa" v-show="showShadow" @click="showShadow = false"></div>
    </transition>
    <!-- 购物车 -->
    <div class="sc-cart pa" v-if="showProduct">
      <BuyCart :showShadow.sync="showShadow" ref="buyCart" :manifest="manifest" :float_delivery_fee="shopInfo.float_delivery_fee" :float_minimum_order_amount="shopInfo.float_minimum_order_amount" @reduceManifest="reduceManifest" @addManifest="addManifest" @cleanManifest="cleanManifest" :shopId="shopId"/>
    </div>

    <!-- 多规格弹窗遮罩 -->
    <Dialog :show="multiSku.length" @click.native="multiSku = []" style="z-index: 9;"/>
    <!-- 多规格弹窗 -->
    <div class="s-multi pa bf" v-show="multiSku.length">
      <h3><span class="f16 fwb">名称：</span><b class="f16 fwb">{{multiFood.name}}</b></h3>
      <h3><span class="f16 fwb">价格：</span><b class="f16 fwb">¥{{selectMultiFood.current_price}}</b></h3>
      <ul class="oh">
        <li v-for="(item, index) in multiSku" :key="index" :class="[selectMultiFood.item_id === item.item_id ?'active' : '']" @click="selectMulti(item)">{{item.label}}</li>
      </ul>
      <p><span @click="multiSku = []">取消</span><span class="active" @click="addMulti">确定</span></p>
    </div>

    <!-- 商铺活动遮罩 -->
    <transition name="scon-fade">
      <div class="s-shadowActivity pa" v-show="showActivity" @click="showActivity = false"></div>
    </transition>
    <!-- 商铺活动 -->
    <div class="s-activity pa" v-if="showActivity">
      <ul class="oh" v-if="shopInfo.activities && shopInfo.activities.length > 1">
        <li v-for="(item, index) in shopInfo.activities" :key="index">
          <h3><span class="f18 fwb">{{index + 1}}.</span><em class="f18 fwb">{{item.keyword}}</em></h3>
          <p class="f18">{{item.description}}</p>
        </li>
      </ul>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
// import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Rate from 'vue-tiny-rate'
import BuyCart from '@src/components/buyCart'

export default {
  data () {
    return {
      durationText: '10分钟', // 用时
      showShadow: false, // 购物车遮罩
      showActivity: false, // 商铺活动遮罩
      showProduct: true, // 是否显示商品
      shopId: 0, // 商铺id
      shopInfo: {}, // 商铺信息
      menuList: [], // 分类列表
      multiFood: {}, // 多规格商品名称
      multiSku: [], // 多规格商品sku
      selectMultiFood: {}, // 当前选择的多规格商品
      manifest: [], // 购物车商品列表
      scrollObjOne: null,
      scrollObjTwo: null,
      scrollObjThree: null,
      scrollY: 0, // 食品列表滚动距离
      listHeight: [], // 高度列表
      ratingsList: [], // 评论列表
      scoresObj: null, // 评分信息
      tagsList: [], // 标签列表
      selectTagList: [] // 选中标签列表
    }
  },
  created () {
    this.shopId = Util.getQueryString(window.location.href, 'id')
    this.durationText = Util.getQueryString(window.location.href, 'ti')
  },
  mounted () {
    this.initData()
  },
  components: {
    Rate,
    BuyCart
  },
  computed: {
    // 多规格商品价格区间
    getMultiPrice (arr) {
      return function (arr) {
        let temp = []
        let str
        arr.forEach(item => {
          if (temp.indexOf(item.current_price) < 0) {
            temp.push(item.current_price)
          }
        })
        str = Math.min.apply(null, temp)
        if (temp.length > 1) {
          str += '~' + Math.max.apply(null, temp)
        }
        return str
      }
    },

    // 获得商品数量
    getProductNum (item) {
      return function (item) {
        let num = 0
        this.manifest.forEach(it => {
          if (item.id === it.food_id) {
            num += it.quantity
          }
        })
        return num
      }
    },

    // 当前激活的menu类
    currentIndex (index) {
      return function (index) {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
            return i
          }
        }
      }
    }
  },
  methods: {
    // 选择当前tag
    selectTag (item) {
      let index = this.selectTagList.indexOf(item._id)
      if (index < 0) {
        this.selectTagList.push(item._id)
      } else {
        this.selectTagList.splice(index, 1)
      }
    },

    // 滚动到目标品类
    handleGoodsItem (index) {
      let goodEle = this.$refs.scrollWrapSmall
      let foodList = goodEle.getElementsByClassName('goodsItemHook')
      let el = foodList[index]
      this.scrollObjTwo.scrollToElement(el, 300)
    },

    // tab切换
    switchTab (tar) {
      this.showProduct = tar === 'product'
    },

    // 删减商品
    reduce (item) {
      if (item.is_multi) {
        return Toast('多规格商品请在购物车中删除')
      }
      let target = this.getProductByIdFromManifest(item.single_spec.item_id)
      if (!target) return
      let index = this.manifest.indexOf(target)
      target.quantity--
      if (!target.quantity) {
        this.manifest.splice(index, 1)
      }
    },

    // 从购物车删除
    reduceManifest (it) {
      let target = this.getProductByIdFromManifest(it.item_id)
      if (!target) return
      let index = this.manifest.indexOf(target)
      target.quantity--
      if (!target.quantity) {
        this.manifest.splice(index, 1)
        if (!this.manifest.length) {
          this.showShadow = false
        }
      }
    },

    // 从购物车清空
    cleanManifest () {
      this.manifest = []
      this.showShadow = false
    },

    // 从购物车获取获取对应id的商品
    getProductByIdFromManifest (id) {
      let target = null
      try {
        this.manifest.forEach(item => {
          if (item.item_id === id) {
            target = item
            throw new Error()
          }
        })
      } catch (err) {

      }
      return target
    },

    // 添加单规格商品
    addSingle (item) {
      let target = this.getProductByIdFromManifest(item.single_spec.item_id)
      if (!target) {
        this.manifest.push({
          food_id: item.id,
          item_id: item.single_spec.item_id,
          name: item.name,
          price: item.single_spec.current_price,
          quantity: 1,
          packing_fee: Math.floor(Math.random() * 10)
        })
      } else {
        target.quantity++
      }
      this.$refs.buyCart.addToCart()
    },

    // 添加多规格商品
    addMulti () {
      let target = this.getProductByIdFromManifest(this.selectMultiFood.item_id)
      if (!target) {
        this.manifest.push({
          food_id: this.multiFood.id,
          item_id: this.selectMultiFood.item_id,
          name: this.multiFood.name,
          price: this.selectMultiFood.current_price,
          quantity: 1,
          packing_fee: Math.floor(Math.random() * 10),
          label: this.selectMultiFood.label
        })
      } else {
        target.quantity++
      }
      this.$refs.buyCart.addToCart()
      this.multiSku = []
    },

    // 从购物车添加
    addManifest (it) {
      let target = this.getProductByIdFromManifest(it.item_id)
      if (!target) return
      target.quantity++
    },

    // 显示多规格商品sku面板
    showMultiModal (item) {
      this.multiFood = item
      this.multiSku = item.multi_spec
      this.selectMultiFood = item.multi_spec[0]
    },

    // 选择多规格食品
    selectMulti (item) {
      this.selectMultiFood = item
    },

    async initData () {
      try {
        let shop = await Api.shopDetail(this.shopId)
        Res(shop, data => {
          this.shopInfo = data
        })

        let menuList = await Api.menuList(0)
        Res(menuList, data => {
          this.menuList = data
          this.$nextTick(() => {
            if (!this.scrollObjOne && !this.scrollObjTwo) {
              /* eslint-disable no-new */
              this.scrollObjOne = new BScroll('#scrollWrapLarge', {
                deceleration: 0.001,
                bounce: true,
                swipeTime: 1800,
                click: true
              })
              this.scrollObjTwo = new BScroll('#scrollWrapSmall', {
                deceleration: 0.001,
                bounce: true,
                swipeTime: 1800,
                click: true,
                probeType: 3
              })
              this.scrollObjTwo.on('scroll', pos => {
                this.scrollY = Math.abs(Math.round(pos.y))
              })
              this.getGoodsHeight()
            } else {
              this.scrollObjOne.refresh()
              this.scrollObjTwo.refresh()
            }
          })
        })

        let rateScoreTag = await Promise.all([await Api.getRatings(this.shopId), await Api.getScores(this.shopId), await Api.getTags(this.shopId)])

        let ratingsList = rateScoreTag[0]
        Res(ratingsList, data => {
          this.ratingsList = data
        })

        let scoresObj = rateScoreTag[1]
        Res(scoresObj, data => {
          this.scoresObj = data
        })

        let tagsList = rateScoreTag[2]
        Res(tagsList, data => {
          this.tagsList = data
        })

        this.$nextTick(() => {
          if (!this.scrollObjThree) {
            /* eslint-disable no-new */
            this.scrollObjThree = new BScroll('#scrollWrapComment', {
              deceleration: 0.001,
              bounce: true,
              swipeTime: 1800,
              click: true
            })
          } else {
            this.scrollObjThree.refresh()
          }
        })
      } catch (err) {
        Toast(err.message || '获取商铺详情失败')
      }
    },

    // 获取并计算高度
    getGoodsHeight () {
      let goodEle = this.$refs.scrollWrapSmall
      let height = 0
      this.listHeight.push(height)
      let foodList = goodEle.getElementsByClassName('goodsItemHook')
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../lib/style/util");

  .shop {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    & > * {
      width: 100%;
    }
  }

  /* 顶部 */
  .s-header{
    min-height: 0.9rem;
    height: auto;
    .bg(@c-blue);
    .sh-back{
      .wh(0.45rem);
      .flex;
      left: 0;
      top: 0;
    }
    .sh-shopDetail{
      height: 0.9rem;
      justify-content: space-between;
      padding: 0 0.1rem;
      .shh-info{
        .flex;
        height: 0.9rem;
        flex-grow: 1;
        span{
          .wh(0.7rem);
          border-radius: 2px;
          overflow: hidden;
          img{
          .wh(100%, auto);
          }
        }
        div{
          width: 2.5rem;
          padding-left: 0.1rem;
          box-sizing: border-box;
          *{
            .ellipsis;
          }
        }
      }
    }
    .sh-activity{
      .hlh(0.34rem);
      justify-content: space-between;
      padding: 0 0.1rem;
      *{
        font-size: 0.12rem;
        color: #fff;
      }
      p{
        width: 2.9rem;
        box-sizing: border-box;
      }
      dfn{
        .bg(red);
        border-radius: 2px;
        padding: 0 0.03rem;
        margin: 0 0.02rem;
      }
      i{
        .disib;
        .icon-style{
          .wh(0.1rem);
        }
      }
    }
  }

  /* tab */
  .s-tab{
    .border(solid, #ccc, 0, 0, 1px, 0);
    height: 0.55rem;
    justify-content: space-around;
    span.active{
      .border(solid, @c-blue, 0, 0, 2px, 0);
      color: @c-blue;
    }
  }

  /* 容器 */
  .s-con{
    flex-grow: 1;
    & > div{
      .bg(#f1f1f1);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    /* 商品 */
    .sc-product.showProduct{
      z-index: 6
    }
    .sc-product{
      .bg(#f0f0f0);
      z-index: 3;
      .sc-large{
        .bg(#f0f0f0);
        top: 0;
        bottom: 0;
        left: 0;
        width: 0.9rem;
        overflow: hidden;
        ul{
          overflow: hidden;
          li{
            .flex;
            .border(solid, #ccc, 0, 0, 1px, 0);
            justify-content: flex-start;
            height: 0.67rem;
            box-sizing: border-box;
            padding-left: 0.1rem;
            span{
              font-size: 0.12rem;
            }
            em{
              .disib;
              .wh(0.18rem);
              margin-left: 0.02rem;
              img{
                .wh(100%, auto);
              }
            }
            i{
              .flex;
              margin-left: 0.02rem;
              .icon-style{
                .wh(0.15rem;)
              }
            }
          }
          li.active{
            .bg(#fff);
            position: relative;
            &::after{
              .bg(@c-blue);
              position: absolute;
              content: '';
              top: 0;
              bottom: 0;
              left: 0;
              width: 0.02rem;
            }
          }
        }
      }
      .sc-small{
        top: 0;
        bottom: 0;
        left: 0.9rem;
        right: 0;
        overflow: hidden;
        padding-bottom: 1rem;
        .scm_wrap{
          padding-bottom: 0.5rem;
        }
        dl{
          overflow: hidden;
          dt{
            .hlh(0.52rem);
            .bg(#f1f1f1);
            .flex;
            justify-content: space-between;
            padding: 0 0.1rem;
            i{
              font-size: 0.14rem;
              font-weight: bold;
            }
            em{
              font-size: 0.12rem;
              margin-left: 0.1rem;
            }
          }
          li{
            .flex;
            .border(solid, #ccc, 0, 0, 1px, 0);
            justify-content: space-between;
            min-height: 1.12rem;
            height: auto;
            padding: 0 0.1rem;
            position: relative;
            & > b{
              position: absolute;
              top: 0;
              left: 0;
            }
            & > span{
              .flex;
              width: 0.6rem;
              img{
                .wh(100%, auto);
              }
            }
            div{
              flex-grow: 1;
              padding-left: 0.05rem;
              h3{
                .hlh(0.24rem);
                font-size: 0.16rem;
                font-weight: bold;
                position: relative;
                i{
                  .border(solid, red, 1px);
                  .hlh(0.15rem);
                  border-radius: 2px;
                  color: red;
                  font-size: 0.12rem;
                  float: right;
                  margin-left: 0.02rem;
                }
              }
              .scs-des{
                .hlh(0.2rem);
                font-size: 0.12rem;
                color: #666;
              }
              .scs-com{
                .hlh(0.2rem);
                font-size: 0.12rem;
              }
              .scs-pri{
                .flex;
                .hlh(0.24rem);
                justify-content: space-between;
                i{
                  font-size: 0.12rem;
                  font-weight: bold;
                  color: red;
                }
                em{
                  font-weight: bold;
                  color: red;
                }
                span{
                  .flex;
                  .add{
                    .wh(0.18rem);
                  }
                  strong{
                    .flex;
                  }
                  b{
                    .wh(0.3rem, 0.2rem);
                    line-height: 0.2rem;
                    text-align: center;
                  }
                  dfn{
                    .bg(@c-blue);
                    .wh(0.5rem, 0.2rem);
                    line-height: 0.2rem;
                    border-radius: 2px;
                    text-align: center;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }

    /* 评价 */
    .sc-comment.showProduct{
      z-index: 3;
    }
    .sc-comment{
      z-index: 6;
      .scc-wrap{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        .scc-wrap-con{
          .bg(#fff);
          /* 概览 */
          .scc-digest{
            .flex;
            .bg(#fff);
            .border(solid, #ccc, 0, 0, 1px, 0);
            justify-content: space-between;
            height: 1.15rem;
            .sccd-left{
              width: 1.6rem;
              text-align: center;
              h3{
                font-size: 0.3rem;
                color: red;
              }
              h5{
                font-size: 0.16rem;
              }
              p{
                font-size: 0.12rem;
                color: #666;
              }
            }
            .sccd-right{
              flex-grow: 1;
              p{
                span{
                  justify-content: flex-start;
                  color: #666;
                  margin-right: 0.05rem;
                }
                i{
                  .disib;
                  transform: scale(0.8);
                }
                em{
                  color: @c-redyellow;
                }
                dfn{
                  margin-left: 0.08rem;
                  color: #999;
                  font-size: 0.12rem;
                }
              }
            }
          }
        }
      }

      /* 标签 */
      .scc-label{
        .bg(#fff);
        overflow: hidden;
        margin-top: 0.15rem;
        padding: 0.1rem;
        span{
          .bg(#ebf5ff);
          color: #666;
          float: left;
          padding: 0.03rem 0.05rem;
          border-radius: 2px;
          margin: 0 0.05rem  0.05rem 0;
        }
        span.active{
          .bg(@c-blue);
          color: #fff;
        }
      }

      /* 评论 */
      .ssc-comment{
        .bg(#fff);
        overflow: hidden;
        height: auto;
        padding: 0 0.1rem;
        li{
          padding-top: 0.1rem;
          .border(solid, #ccc, 1px, 0, 0, 0);
          .flex;
          align-items: flex-start;
          .sscc-left{
            width: 0.38rem;
            span{
              .wh(0.4rem);
              .disib;
              border-radius: 50%;
              overflow: hidden;
              img{
                .wh(100%, auto);
              }
            }
          }
          .sscc-right{
            flex-grow: 1;
            padding-left: 0.1rem;
            .r-title{
              .flex;
              justify-content: space-between;
              padding-left: 0.06rem;
              span{
                font-size: 0.12rem;
                color: #666;
              }
              em{
                font-size: 0.12rem;
                color: #999;
              }
            }
            .r-rate{
              .flex;
              justify-content: flex-start;
              i{
                .disib;
                transform: scale(0.8);
              }
              em{
                font-size: 0.12rem;
                color: #666;
              }
            }
            .r-img{
              overflow: hidden;
              img{
                .wh(auto, 0.7rem);
                margin: 0 0.1rem 0.1rem 0;
              }
            }
            .r-tip{
              overflow: hidden;
              span{
                .disib;
                .wh(0.6rem, 0.3rem);
                .ellipsis;
                .border(solid, #eee, 1px);
                line-height: 0.3rem;
                text-align: center;
                border-radius: 2px;
                margin: 0 0.1rem 0.1rem 0;
                color: #999;
              }
            }
          }
        }
      }
    }
  }

  /* 多规格弹窗 */
  .s-multi{
    .bg(#fff);
    width: 3rem;
    height: auto;
    min-height: 2rem;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
    padding: 0.2rem;
    box-sizing: border-box;
    z-index: 10;
    h3{
      line-height: 0.3rem;
    }
    ul{
      padding: 0.1rem 0;
      li{
        .hlh(0.3rem);
        .border(@c-blue, solid, 1px);
        font-size: 0.16rem;
        text-align: center;
        float: left;
        border-radius: 2px;
        width: auto;
        min-width: 0.5rem;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
      }
      li.active{
        .bg(@c-blue);
        color: #fff;
      }
    }
    p{
      .flex;
      .hlh(0.28rem);
      justify-content: space-around;
      padding-top: 0.1rem;
      span{
        .wh(0.8rem, 0.28rem);
        .border(@c-green, solid, 1px);
        color: #666;
        text-align: center;
        border-radius: 2px;
      }
      span.active{
        .bg(@c-green);
        color: #fff;
      }
    }
  }

  /* 容器内元素过渡 */
  .scon-fade-enter-active, .scon-fade-leave-active {
    transition: opacity .3s ease;
  }
  .scon-fade-enter, .scon-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  /* 购物车区域 */
  .sc-cart{
    .bg(pink);
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5rem;
    z-index: 8;
  }

  /* 遮罩 */
  .s-shadow,.s-shadowActivity{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.3;
    z-index: 7;
  }
  .s-shadowActivity{
    z-index: 9;
  }

  /* 商铺活动 */
  .s-activity{
    .bg(#fff);
    width: 3rem;
    height: auto;
    min-height: 2rem;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
    padding: 0.2rem;
    box-sizing: border-box;
    z-index: 10;
    li{
      margin-bottom: 0.1rem;
      h3{
        line-height: 0.3rem;
        em{
          color: @c-redyellow;
        }
      }
      p{
        line-height: 0.3rem;
      }
    }
  }

</style>
