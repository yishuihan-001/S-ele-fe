<template>
  <div class="container shop">
    <transition name="scon-fade">
      <div class="s-shadow pa" v-show="showShadow"></div>
    </transition>
    <div class="s-header pr">
      <div class="sh-back pa" @click="$router.back()"><SvgIcon class="icon-style" iconName="arrow-left"/></div>
      <router-link tag="div" to="/shop/shopDetail" class="sh-shopDetail flex">
        <div class="shh-info">
          <span><img :src="$store.state.placeholderImg" alt=""></span>
          <div>
            <h3 class="f18 cf">{{shopInfo.name}}</h3>
            <h5 class="f12 cf">商家配送／{{Math.floor(Math.random() * 50)}}分钟送达／配送费¥{{shopInfo.float_delivery_fee}}</h5>
            <p class="f12 cf">{{shopInfo.description}}</p>
            <p class="f12 cf">{{shopInfo.promotion_info}}</p>
          </div>
        </div>
        <i><SvgIcon class="icon-style" iconName="arrow-right-white" /></i>
      </router-link>
      <div class="sh-activity flex">
        <p><dfn>减</dfn>满30减5，满60减8（APP专享）</p>
        <span><em>1个活动</em><i><SvgIcon class="icon-style" iconName="arrow-right-white" /></i></span>
      </div>
    </div>

    <div class="s-tab bf flex">
      <span :class="{active: showProduct}" @click="switchTab('product')">商品</span><span :class="{active: !showProduct}" @click="switchTab('comment')">评价</span>
    </div>

    <div class="s-con pr">
      <transition name="scon-fade" mode="out-in">
        <div class="sc-product" v-if="showProduct" key="sc-product">
          <div class="sc-large pa">
            <ul>
              <li v-for="(item, index) in menuList" :key="index" class="active">
                <span>{{item.name}}</span>
                <em><img :src="$store.state.placeholderImg" alt=""></em>
                <i><SvgIcon class="icon-style" iconName="sort" /></i>
              </li>
              <!-- <li>
                <span>面条</span>
                <em><img :src="$store.state.placeholderImg" alt=""></em>
                <i><SvgIcon class="icon-style" iconName="sort" /></i>
              </li> -->
            </ul>
          </div>
          <div class="sc-small pa">
            <dl v-for="(item, index) in menuList" :key="index">
              <dt>
                <p><i>{{item.name}}</i><em>{{item.description}}</em></p>
                <dfn>···</dfn>
              </dt>
              <dd>
                <ul>
                  <router-link v-for="(it, id) in item.foods" :key="id" to="/shop/foodDetail" tag="li">
                    <b><SvgIcon class="icon-style" iconName="new" /></b>
                    <span><img :src="$store.state.placeholderImg" alt=""></span>
                    <div>
                      <h3>{{it.name}}<i v-for="(t, d) in it.attributes" :key="d">{{t.name}}</i></h3>
                      <p class="scs-des">{{it.description}}</p>
                      <p class="scs-com">月售{{it.month_sales}}份 好评率{{((it.rating/5)*100).toFixed()}}%</p>
                      <p class="scs-pri">
                        <span><i>¥</i><em>{{it.is_multi ? '1010' : it.single_spec.current_price}}</em></span>
                        <span>
                          <transition name="slide-fade">
                            <strong v-show="singleNum > 0" @click.stop="reduce('single')">
                              <SvgIcon class="icon-style" iconName="reduce"/>
                            </strong>
                          </transition>
                          <b v-show="singleNum > 0">{{singleNum}}</b>
                          <strong  @click.stop="add('single')">
                            <SvgIcon class="icon-style add" iconName="add"/>
                          </strong>
                        </span>
                      </p>
                    </div>
                  </router-link>
                  <!-- 多规格demo -->
                  <!-- <router-link to="/shop/foodDetail" tag="li">
                    <b><SvgIcon class="icon-style" iconName="new" /></b>
                    <span><img :src="$store.state.placeholderImg" alt=""></span>
                    <div>
                      <h3>秘制凉皮<i>新品</i></h3>
                      <p class="scs-des">食品介绍3</p>
                      <p class="scs-com">月售966份 好评率53%</p>
                      <p class="scs-pri">
                        <span><i>¥</i><em>20</em></span>
                        <span>
                          <transition name="slide-fade">
                            <strong v-show="multiNum > 0" @click.stop="reduce('multi')">
                              <SvgIcon class="icon-style" iconName="reduce"/>
                            </strong>
                          </transition>
                          <b v-show="multiNum > 0">{{multiNum}}</b>
                          <dfn @click.stop="add('multi')">选规格</dfn>
                        </span>
                      </p>
                    </div>
                  </router-link> -->
                </ul>
              </dd>
            </dl>
          </div>
          <div class="sc-cart pa">
            <BuyCart :showShadow.sync="showShadow" ref="buyCart"/>
          </div>
        </div>

        <div class="sc-comment" v-else key="sc-comment">
          <div class="scc-digest">
            <div class="sccd-left">
              <h3>5</h3>
              <h5>综合评价</h5>
              <p>高于周边商家76.9%</p>
            </div>
            <div class="sccd-right">
              <p><span>服务态度</span><i><Rate value="4.5" size='10px'></Rate></i><em>4.7</em></p>
              <p><span>菜品评价</span><i><Rate value="4.5" size='10px'></Rate></i><em>4.9</em></p>
              <p><span>送达时间</span><dfn>25分钟</dfn></p>
            </div>
          </div>

          <div class="scc-label bf">
            <span class="active">全部(500)</span>
            <span>满意(452)</span>
            <span>不满意(20)</span>
            <span class="active">有图(102)</span>
            <span>味道好(499)</span>
            <span class="active">送货快(475)</span>
            <span>分量足(299)</span>
            <span>包装精美(305)</span>
            <span class="active">干净卫生(109)</span>
            <span>食材新鲜(500)</span>
            <span>服务不错(209)</span>
          </div>

          <ul class="ssc-comment">
            <li>
              <div class="sscc-left"><span><img :src="$store.state.placeholderImg" alt=""></span></div>
              <div class="sscc-right">
                <p class="r-title"><span>易水寒</span><em>2018-11-29</em></p>
                <p class="r-rate"><i><Rate value="4.5" size='10px'></Rate></i><em>按时送达</em></p>
                <div class="r-img">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                </div>
                <div class="r-tip">
                  <span>超级至尊比萨-铁盘</span>
                  <span>韩式浓情风味鸡（标准份）</span>
                </div>
              </div>
            </li>
            <li>
              <div class="sscc-left"><span><img :src="$store.state.placeholderImg" alt=""></span></div>
              <div class="sscc-right">
                <p class="r-title"><span>易水寒</span><em>2018-11-29</em></p>
                <p class="r-rate"><i><Rate value="4.5" size='10px'></Rate></i><em>按时送达</em></p>
                <div class="r-img">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                  <img :src="$store.state.placeholderImg" alt="">
                </div>
                <div class="r-tip">
                  <span>超级至尊比萨-铁盘</span>
                  <span>韩式浓情风味鸡（标准份）</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Rate from 'vue-tiny-rate'
import BuyCart from '@src/components/buyCart'

export default {
  data () {
    return {
      showShadow: false,
      showProduct: true,
      singleNum: 0,
      multiNum: 0,
      shopId: 0,
      shopInfo: {},
      menuList: []
    }
  },
  created () {
    this.shopId = this.$route.params.shopid
  },
  mounted () {
    this.initData()
  },
  components: {
    Rate,
    BuyCart
  },
  computed: {
    // getMinPrice (arr) {
    //   return function (arr) {
    //     let compare = function (pro) {
    //       return function (obj1, obj2) {
    //         var val1 = obj1[pro]
    //         var val2 = obj2[pro]
    //         if (val1 > val2) {
    //           return 1
    //         } else if (val1 < val2) {
    //           return -1
    //         } else {
    //           return 0
    //         }
    //       }
    //     }
    //     arr = arr.sort(compare('current_price'))
    //     let str = arr[0].current_price
    //     if (arr.length > 1) {
    //       str += '~' + arr[arr.length - 1].current_price
    //     }
    //     return 100
    //   }
    // }
  },
  methods: {
    // tab切换
    switchTab (tar) {
      this.showProduct = tar === 'product'
    },
    // 删减商品
    reduce (type) {
      if (type === 'single') {
        this.singleNum--
      } else {
        this.multiNum--
      }
    },
    // 添加商品
    add (type) {
      if (type === 'single') {
        this.singleNum++
      } else {
        this.multiNum++
      }
      this.$refs.buyCart.addToCart()
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
        })
      } catch (err) {
        Toast(err.message || '获取商铺详情失败')
      }
    },

    // 属性排序方式
    compare (pro) {
      return function (obj1, obj2) {
        var val1 = obj1[pro]
        var val2 = obj2[pro]
        if (val1 > val2) {
          return 1
        } else if (val1 < val2) {
          return -1
        } else {
          return 0
        }
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
    .bg(#f1f1f1);
    flex-grow: 1;
    & > div{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: auto;
    }
    /* 商品 */
    .sc-product{
      .sc-large{
        top: 0;
        bottom: 0;
        left: 0;
        width: 0.9rem;
        overflow: auto;
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
        overflow: auto;
        padding-bottom: 1rem;
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
            .bg(#fff);
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
    .sc-comment{
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
  z-index: 6;
}

/* 遮罩 */
.s-shadow{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.3;
  z-index: 3;
}

</style>
