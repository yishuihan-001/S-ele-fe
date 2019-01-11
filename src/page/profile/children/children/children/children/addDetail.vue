<template>
  <div class="container addDetail">
    <Header back="true" title="搜索地址" noRight="true"/>

    <div class="main">
      <div class="s-search bf f18 flex">
        <input type="text" class="g-input" placeholder="请输入小区/写字楼/学校等" v-model="keyword">
        <span class="g-btn" @click="searchPlace">搜索</span>
      </div
      >
      <div class="s-empty">
        <p>找不到地址？</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号等）可稍后输入哦</p>
      </div>

      <ul class="bf" v-if="searchResultList.length">
        <li v-for="(item, index) in searchResultList" :key="index" @click="selectAddress(item)">
          <h3>{{item.title}}</h3>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Ju from '@lib/js/judge'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      keyword: '',
      searchResultList: [] // 搜索结果列表
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    Header
  },
  computed: {
    ...mapState(['currCity'])
  },
  methods: {
    ...mapMutations(['Set_LocationAddress']),

    // 搜索地址
    async searchPlace () {
      try {
        if (Ju.isEmpty(this.keyword)) {
          throw new Error('搜索关键词不能为空')
        }
        if (!this.currCity) {
          throw new Error('位置信息获取失败')
        }
        let list = await Api.searchPlace({ cityId: this.currCity.id, keyword: this.keyword })
        Res(list, data => {
          this.searchResultList = data
        })
      } catch (err) {
        Toast(err.message || '搜索失败')
      }
    },

    // 选择地址
    selectAddress (item) {
      this.Set_LocationAddress(item.title)
      this.$router.back()
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../../../../lib/style/util");

  .addDetail{
    z-index: 18;
  }

  .s-search{
    padding: 0.1rem;
    justify-content: flex-start;
    input{

    }
    span{
      width: 0.7rem;
      flex-shrink: 0;
      margin-left: 0.1rem;
    }
  }

  .s-empty{
    padding: 2rem 0;
    p{
      font-size: 0.12rem;
      text-align: center;
      color: #999;
    }
  }

  ul{
    position: absolute;
    top: 0.55rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 0 0.1rem;
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      padding: 0.1rem 0;
      h3{
        line-height: 0.25rem;
      }
      p{
        line-height: 0.2rem;
        color: #666;
      }
    }
  }

</style>
