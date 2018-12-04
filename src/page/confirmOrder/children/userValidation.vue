<template>
  <div class="container userValidation">
    <Header back="true" title="用户手机验证" noRight="true"/>

    <div class="main">
      <p class="p-title bf f18">收不到短信？使用<span>语音验证码</span></p>
      <div class="p-operate flex bf">
        <input type="text" class="g-input" placeholder="验证码">
        <span class="g-btn disable">获取验证码</span>
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

  .userValidation{
    z-index: 9;
  }
  .p-title{
    .hlh(0.5rem);
    padding: 0 0.1rem;
    span{
      color: @c-redyellow;
      font-size: 0.18rem;
      margin-left: 0.05rem;
    }
  }

  .p-operate{
    justify-content: space-between;
    padding: 0.1rem;
    span{
      width: 0.8rem;
      flex-shrink: 0;
      margin-left: 0.1rem;
      &.disable{
        .bg(#f1f1f1);
        .border(solid, #f1f1f1, 1px);
        color: #999;
      }
    }
    input{
      flex-grow: 1;
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
