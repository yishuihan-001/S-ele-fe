<template>
  <div class="container search">
    <Header back="true" title="搜索" noRight="true"/>

    <div class="main">
      <div class="s-top bf flex">
        <input type="text" class="g-input" placeholder="请输入商家或美食名称" v-model="keyword">
        <span class="g-btn" @click="searchShop()">提交</span>
      </div>
      <div class="s-wrap pa">
        <div class="s-history"  v-if="showHistory">
          <div class="sh-title c6">搜索历史</div>
          <ul class="bf oh">
            <li v-for="(item, index) in shopHistory" :key="index">
              <p @click="searchShop(item)">{{item}}</p>
              <span @click="removeItem(item)"><SvgIcon class="icon-style" iconName="close" /></span>
            </li>
          </ul>
          <div v-if="shopHistory.length" class="sh-clean tac f16 bf" @click="cleanPlace">清除搜索历史</div>
          <div v-else class="sh-clean tac f16 bf">暂无搜索历史</div>
        </div>
        <div class="s-searchResult" v-else>
          <div class="bf">
            <ShopList :shopList="shopList" :lat="latitude" :lng="longitude"/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import Footer from '@src/components/footer'
import ShopList from '@src/components/shopList'

export default {
  data () {
    return {
      shopList: [], // 商铺列表
      latitude: 0, // 经度
      longitude: 0, // 纬度
      cityId: 3, // 城市id
      keyword: '', // 搜索关键词
      shopHistory: [], // 搜索历史
      showHistory: true // 显示历史搜索记录
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
    ...mapState(['currCity', 'cityAddress'])
  },
  methods: {
    // 清除历史记录
    cleanPlace () {
      Util.removeStore('shopHistory')
      this.initData()
    },

    async initData () {
      // 获取历史商铺搜索记录
      let shopHistory = Util.getStore('shopHistory')
      if (shopHistory) {
        this.shopHistory = JSON.parse(shopHistory)
      } else {
        this.shopHistory = []
      }
      try {
        // 获取商铺列表
        /**
         * 鉴于此处必须使用到id，所以cityAddress弃用
         */
        /* if (this.cityAddress) {
          this.latitude = this.cityAddress.location.lat
          this.longitude = this.cityAddress.location.lng
        } else  */
        if (this.currCity) {
          this.latitude = this.currCity.latitude
          this.longitude = this.currCity.longitude
          this.cityId = this.currCity.id
        } else {
          let res1 = await Api.getCity({ type: 'guess' })
          Res(res1, data => {
            this.latitude = data.latitude
            this.longitude = data.longitude
            this.cityId = data.id
          })
        }
      } catch (err) {
        Toast(err.message || '初始化失败')
      }
    },

    // 搜索
    async searchShop (k) {
      if (k) {
        this.keyword = k
      }
      try {
        if (Ju.isEmpty(this.keyword)) {
          throw new Error('请输入商品或商铺名称')
        }

        // 准备写入搜索历史
        let historyList = Util.getStore('shopHistory')
        if (historyList) {
          historyList = JSON.parse(historyList)
        } else {
          historyList = []
        }
        let flag = true
        historyList.forEach(it => {
          if (it === this.keyword) {
            flag = false
          }
        })
        if (flag) {
          historyList.push(this.keyword)
          Util.setStore('shopHistory', historyList)
        }

        this.showHistory = false
        let searchList = await Api.shopSearch({ cityId: this.cityId, keyword: this.keyword, lng: this.longitude, lat: this.latitude })
        Res(searchList, data => {
          this.shopList = data
        })
      } catch (err) {
        Toast(err.message || '搜索失败')
      }
    },

    // 删除该条
    removeItem (key) {
      /**
       * 明天做
       */
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../lib/style/util");

  .search {

  }
  .s-top{
    .border(solid, #ccc, 0, 0, 1px, 0);
    padding: 0.1rem;
    span{
      width: 0.8rem;
      margin-left: 0.1rem;
    }
  }

  .s-wrap{
    top: 0.55rem;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    overflow: auto;
  }

  .s-history{
    .sh-title{
      .hlh(0.36rem);
      padding: 0 0.1rem;
    }
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      .hlh(0.38rem);
      .flex;
      padding: 0 0.1rem;
      p{
        flex-grow: 1;
        .ellipsis;
      }
      span{
        .flex;
        .wh(0.3rem, 0.38rem);
        .icon-style{
          .wh(0.15rem);
        }
      }
    }
  }

  .sh-clean{
    .hlh(0.38rem);
    color: @c-blue;
  }
</style>
