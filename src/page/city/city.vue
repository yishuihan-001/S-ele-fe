<template>
  <div class="container city">
    <Header back="true" :title="currCity && currCity.name">
      <router-link slot="right" class="f16 cf h-right" to="/home">切换城市</router-link>
    </Header>

    <div class="main">
      <div class="c-search bf">
        <input type="text" placeholder="输入学校、商务楼、地址" class="g-input" v-model="searchPlace">
        <span class="g-btn" @click="submit">提交</span>
      </div>

      <div class="c-history oh pa" id="scrollWrap">
        <div class="scroll-wrap">
          <div class="c9" v-if="showHistory">搜索历史</div>
          <ul class="bf">
            <template v-if="showHistory">
              <li v-for="(item, index) in placeHistory" :key="index" @click="goCity(item, 0)">
                <h3>{{item.title}}</h3>
                <p>{{item.address}}</p>
              </li>
            </template>
            <template v-else>
              <li v-for="(item, index) in placeSearch" :key="index" @click="goCity(item, 1)">
                <h3>{{item.title}}</h3>
                <p>{{item.address}}</p>
              </li>
            </template>
            <li v-if="showHistory && placeHistory.length" @click="cleanPlace">
              <h5>清空所有</h5>
            </li>
            <li v-else-if="showHistory && !placeHistory.length">
              <h5>暂无搜索历史</h5>
            </li>
            <li v-else-if="!showHistory && placeSearch.length">
              <h5>没有更多内容了</h5>
            </li>
            <li v-else>
              <h5>未搜索到相关内容</h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Util from '@lib/js/util'
import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      currCity: null, // 当前城市
      searchPlace: '', // 搜索关键词
      placeHistory: [], // 历史搜索记录
      placeSearch: [], // 当前关键词搜索结果
      showHistory: true, // 是否显示历史搜索记录
      scrollObj: null // better-scroll
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: { },
  methods: {
    ...mapMutations(['Set_CityAddress']),

    // 清除历史记录
    cleanPlace () {
      Util.removeStore('placeHistory')
      this.initData()
    },

    async initData () {
      // 获取历史搜索记录
      let historyList = Util.getStore('placeHistory')
      if (historyList) {
        this.placeHistory = JSON.parse(historyList)
      } else {
        this.placeHistory = []
      }
      this.$nextTick(() => {
        /* eslint-disable no-new */
        if (!this.scrollObj) {
          this.scrollObj = new BScroll('#scrollWrap', {
            deceleration: 0.001,
            bounce: true,
            swipeTime: 1800,
            click: true
          })
        } else {
          this.scrollObj.refresh()
        }
      })

      // 获取城市信息
      try {
        let cityInfo = await Api.getCityById(this.$route.params.cityid || 3)
        Res(cityInfo, data => {
          this.currCity = data
        })
      } catch (err) {
        Toast(err.message || '城市信息查找失败')
      }
    },

    // 搜索
    async submit () {
      try {
        if (Ju.isEmpty(this.searchPlace)) {
          throw new Error('请输人搜索内容')
        }
        this.showHistory = false
        let searchList = await Api.searchPlace({ cityId: this.currCity.id, keyword: this.searchPlace })
        Res(searchList, data => {
          this.placeSearch = data
        })
        this.$nextTick(() => {
          /* eslint-disable no-new */
          if (!this.scrollObj) {
            this.scrollObj = new BScroll('#scrollWrap', {
              deceleration: 0.001,
              bounce: true,
              swipeTime: 1800,
              click: true
            })
          } else {
            this.scrollObj.refresh()
          }
        })
      } catch (err) {
        Toast(err.message || '搜索失败')
      }
    },

    // 前往城市
    goCity (item, flag) {
      if (flag) {
        let historyList = Util.getStore('placeHistory')
        if (historyList) {
          historyList = JSON.parse(historyList)
        } else {
          historyList = []
        }
        let flag = true
        historyList.forEach(it => {
          if (JSON.stringify(it.location) === JSON.stringify(item.location)) {
            flag = false
          }
        })
        if (flag) {
          historyList.push(item)
          Util.setStore('placeHistory', historyList)
        }
      }
      this.Set_CityAddress(item)
      this.$router.push('/msite')
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.city {
}
.h-right{
  padding-right: 0.1rem;
}

.c-search{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  padding: 0.12rem 0.2rem;
  margin-top: 0.1rem;
  input{
    margin-bottom: 0.15rem;
  }
}

.c-history{
  top: 1.21rem;
  bottom: 0;
  left: 0;
  right: 0;
  .scroll-wrap{
    div{
      .hlh(0.32rem);
      padding: 0 0.1rem;
    }
    ul{
      .border(solid, #ccc, 1px, 0, 1px, 0);
      li{
        .border(solid, #eee, 0, 0, 1px, 0);
        padding: 0.05rem 0.2rem;
        h3{
          .ellipsis;
          line-height: 0.35rem;
          font-size: 0.16rem;
        }
        p{
          .ellipsis;
          color: #999;
        }
        h5{
          line-height: 0.35rem;
          text-align: center;
          color: #666;
        }
      }
    }
  }
}
</style>
