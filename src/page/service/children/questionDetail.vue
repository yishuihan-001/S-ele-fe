<template>
  <div class="container questionDetail">
    <Header back="true" :title="title" noRight="true"/>

    <div class="main">
      <div class="q-con">
        <p v-for="(item, index) in list" :key="index">{{item}}</p>
      </div>
    </div>
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
      id: 0, // 问题id
      title: '', // 标题
      list: [] // 问答
    }
  },
  created () {
    this.id = this.$route.params.id
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
        let info = await Api.getExplainDetail(this.id)
        Res(info, data => {
          this.title = data.title
          this.list = data.content.split('###')
          this.list = this.list.slice(1)
        })
      } catch (err) {
        Toast(err.message || '详情获取失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.questionDetail {
  z-index: 9;
  .main{
    overflow: auto;
  }
}

.q-con{
  .bg(#fff);
  padding: 0.2rem;
  p{
    line-height: 0.3rem;
  }
}
</style>
