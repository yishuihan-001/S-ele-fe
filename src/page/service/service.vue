<template>
  <div class="container service">
    <Header back="true" title="服务中心" noRight="true"/>

    <div class="main">
      <div class="s-contact">
        <div>
          <span><SvgIcon class="icon-style" iconName="service-o" /></span>
          <p>在线客服</p>
        </div>
        <div>
          <span><SvgIcon class="icon-style" iconName="service-p" /></span>
          <p>电话客服</p>
        </div>
      </div>

      <h3 class="f18">热门问题</h3>

      <ul>
        <router-link tag="li" v-for="(item, index) in explainList" :key="index" :to="'/service/questionDetail/' + item.id">
          <span>{{item.title}}</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </router-link>
      </ul>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      explainList: [] // 服务列表
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
  computed: {

  },
  methods: {
    async initData () {
      try {
        let list = await Api.getExplainList()
        Res(list, data => {
          this.explainList = data
        })
      } catch (err) {
        Toast(err.message || '服务列表获取失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.service {
  .main{
    overflow: auto;
  }
}

.s-contact{
  .flex;
  .bg(#fff);
  justify-content: space-between;
  height: 0.95rem;
  div{
    .wh(50%, 0.95rem);
    .border(solid, #eee, 0, 1px, 0, 0);
    padding-top: 0.25rem;
    text-align: center;
    box-sizing: border-box;
    span{
      .icon-style{
        .wh(0.35rem);
      }
    }
    p{
      color: #666;
    }
  }
}

h3{
  .hlh(0.5rem);
  padding: 0 0.1rem;
}
ul{
  .bg(#fff);
  overflow: hidden;
  li{
    .hlh(0.5rem);
    .flex;
    .border(solid, #eee, 0, 0, 1px, 0);
    justify-content: space-between;
    padding: 0 0.1rem;
    span{
      color: #666;
    }
  }
}
</style>
