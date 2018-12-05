<template>
  <div class="container hbHistory">
    <Header back="true" title="历史红包" noRight="true"/>

    <div class="main">
      <ul>
        <li><RedPacket :overdue="true"/></li>
        <li><RedPacket :overdue="true"/></li>
        <li><RedPacket :overdue="true"/></li>
        <li><RedPacket :overdue="true"/></li>
        <li><RedPacket :overdue="true"/></li>
        <li><RedPacket :overdue="true"/></li>
      </ul>
    </div>

  </div>
</template>

<script>
import Header from '../../../components/header'
import RedPacket from '../../../components/redPacket'

export default {
  data () {
    return {
      showRedPacket: true
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    Header,
    RedPacket
  },
  computed: {

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.hbHistory {
  z-index: 9;
}

ul{
  padding: 0.2rem 0.1rem 0;
  li{
    margin-bottom: 0.1rem;
  }
}

</style>
