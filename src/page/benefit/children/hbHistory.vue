<template>
  <div class="container hbHistory">
    <Header back="true" title="历史红包" noRight="true"/>

    <div class="main">
      <ul>
        <li v-for="(item, index) in redPacketList" :key="index"><RedPacket :info="item"/></li>
      </ul>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import RedPacket from '@src/components/redPacket'

export default {
  data () {
    return {
      redPacketList: [] // 红包列表
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    RedPacket
  },
  computed: {

  },
  methods: {
    async initData () {
      try {
        let list = await Api.hongbaoDue({ offset: 0, limit: 20 })
        Res(list, data => {
          this.redPacketList = data
        })
      } catch (err) {
        Toast(err.message || '获取红包列表失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.hbHistory {
  z-index: 9;
  .main{
    overflow: auto;
  }
}

ul{
  padding: 0.2rem 0.1rem 0;
  li{
    margin-bottom: 0.1rem;
  }
}

</style>
