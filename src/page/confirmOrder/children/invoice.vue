<template>
  <div class="container invoice">
    <Header back="true" title="选择发票抬头" noRight="true" class="r-header"/>

    <div class="main">
      <div class="i-list bf flex">
        <span>不需要开发票</span>
        <i><i class="flex"><SvgIcon class="icon-style" iconName="gou-l" /></i></i>
      </div>

      <div class="r-btn bf">
        <span class="g-btn">确定</span>
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

  .invoice {
    z-index: 9;
  }
  .i-list{
    .hlh(0.5rem);
    justify-content: space-between;
    padding: 0 0.1rem;
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
