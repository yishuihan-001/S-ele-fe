<template>
  <div class="container shopDetail">
    <Header back="true" title="商家详情" noRight="true"/>
    <div class="main">
      <div class="s-activity">
        <h3><span>活动与属性</span></h3>
        <p v-for="(item, index) in shopInfo.activities" :key="index"><i>{{item.keyword}}</i>{{item.description}}</p>
      </div>

      <div class="s-notice">
        <h3><span>食品监督安全公示</span><router-link to="/shop/shopDetail/shopSafe" tag="span"><em class="c6">企业认证详情</em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></router-link></h3>
        <div class="sn-tip">
          <div class="snt-left"><img :src="$store.state.placeholderImg" alt=""></div>
          <div class="snt-right">
            <p>监督检查结果：{{grade[Math.floor(Math.random() * grade.length)]}}</p>
            <p>检查日期：2018-08-08</p>
          </div>
        </div>
      </div>

      <div class="s-info">
        <h3><span>活动与属性</span></h3>
        <p><span>{{shopInfo.name}}</span></p>
        <p><span>地址：{{shopInfo.address}}</span></p>
        <p><span>营业时间：[{{shopInfo.startTime}}/{{shopInfo.endTime}}]</span></p>
        <p><span>营业执照</span><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></p>
        <p><span>餐饮服务许可证</span><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></p>
      </div>

    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      shopId: 0,
      shopInfo: {},
      grade: ['优秀', '良好', '合格', '不合格', '整改中', '已吊销营业执照']
    }
  },
  created () {
    this.shopId = Util.getQueryString(window.location.href, 'id')
  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    async initData () {
      try {
        let shop = await Api.shopDetail(this.shopId)
        Res(shop, data => {
          this.shopInfo = data
        })
      } catch (err) {
        Toast(err.message || '获取商铺详情失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../lib/style/util");

  .shopDetail {
    z-index: 15;
  }
  .main > div{
    .bg(#fff);
    margin-bottom: 0.12rem;
    h3{
      .hlh(0.45rem);
      .flex;
      .border(solid, #ccc, 0, 0, 1px, 0);
      justify-content: space-between;
      padding: 0 0.1rem;
      span{
        .flex;
        font-size: 0.16rem;
        i{
          .flex;
          .wh(0.2rem);
        }
      }
    }
  }

  .s-activity{
    h3{
      margin-bottom: 0.1rem;
    }
    p{
      line-height: 0.3rem;
      padding: 0 0.1rem;
      color: #666;
      i{
        .bg(@c-blue);
        color: #fff;
        padding: 0.01rem 0.02rem;
        border-radius: 2px;
        font-size: 0.12rem;
        margin-right: 0.02rem;
      }
    }
  }

  .sn-tip{
    .flex;
    padding: 0.2rem 0.1rem;
    justify-content: space-between;
    .snt-left{
      .wh(0.5rem);
      border-radius: 50%;
      overflow: hidden;
      img{
        .wh(100%, auto);
      }
    }
    .snt-right{
      flex-grow: 1;
      padding-left: 0.1rem;
      p{
        color: #666;
      }
    }
  }

  .s-info{
    p{
      .flex;
      .hlh(0.5rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      justify-content: space-between;
      margin: 0 0.1rem;
      span{
        color: #666;
      }
      i{
        .flex;
      }
    }
  }

</style>
