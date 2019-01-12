<template>
  <div class="container download">
    <Header back="true" title="下载" noRight="true"/>

    <div class="main">
      <div class="d-icon"><i><SvgIcon class="icon-style" iconName="p-elm" /></i></div>
      <p class="tac f18">下载饿了么APP</p>
      <div class="r-btn">
        <router-link tag="span" to="/find" class="g-btn">下载</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@src/components/header'

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
@import url("../../../lib/style/util");

.download {

}

.d-icon{
  padding-top: 0.2rem;
  text-align: center;
  .icon-style{
    .wh(1.8rem);
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-green);
    .border(solid, @c-green, 1px);
  }
}

</style>
