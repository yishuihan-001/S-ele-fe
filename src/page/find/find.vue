<template>
  <div class="container find">
    <Header back="true" title="发现" noRight="true"/>

    <div class="main">
      <h1>没藏好，被你发现了^_^</h1>
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

.find {

}

h1{
  .hlh(0.5rem);
  text-align: center;
  font-size: 0.3rem;
  font-weight: bold;
}
</style>
