<template>
  <div class="container setusername">
    <Header back="true" title="修改用户名" noRight="true" class="r-header"/>

    <div class="main">
      <div class="s-con bf">
        <input type="text" class="g-input" placeholder="请输入用户名">
        <p class="c6 f12">用户名只能修改一次（5-24字符之间）</p>
      </div>

      <div class="r-btn">
        <span class="g-btn">确认修改</span>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../../../components/header'

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
@import url("../../../../../lib/style/util");

.setusername {
  z-index: 12;
}

.s-con{
  padding: 0.1rem;
  p{
    .hlh(0.3rem);
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-blue);
    .border(solid, @c-blue, 1px);
  }
}
</style>
