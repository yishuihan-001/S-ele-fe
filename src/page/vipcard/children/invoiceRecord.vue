<template>
  <div class="container invoiceRecord">
    <Header back="true" title="购买记录" noRight="true"/>

    <div class="main flex">
      <div class="i-empty">
        <span><SvgIcon class="icon-style" iconName="empty" /></span>
        <p>没有购买记录</p>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../../components/header'

export default {
  data () {
    return {

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

  },
  methods: {

  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../lib/style/util");

.invoiceRecord {
  z-index: 9;
}

.i-empty{
  margin-top: -2rem;
  span{
    .disib;
    .icon-style{
      .wh(1rem);
    }
  }
  p{
    .hlh(0.35rem);
    color: #666;
  }
}
</style>
