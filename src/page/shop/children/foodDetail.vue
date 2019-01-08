<template>
  <div class="container foodDetail">
    <Header back="true" title="肯德基" noRight="true"/>
    <div class="main">
      <div class="f-img"><img :src="$store.state.placeholderImg" alt=""></div>
      <div class="f-info">
        <h3 class="f20 fwb">肯德基</h3>
        <p class="fi-one"><span>评分</span><i><Rate value="4.5" size='10px'/></i><em>4.9</em></p>
        <p class="fi-two"><i>月售 540单</i><em>售价 ¥20</em></p>
        <p class="fi-three"><i>评论数 673</i><em>好评率 19%</em></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Rate from 'vue-tiny-rate'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    Rate
  },
  computed: {

  },
  methods: {
    async initData () {
      // try {
      //   let foodInfo = await Api.
      // } catch (err) {
      //   Toast(err.message || '商品详情获取失败')
      // }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../lib/style/util");

  .foodDetail {
    z-index: 9;
  }
  .f-img{
    overflow: hidden;
    img{
      .wh(100%, auto);
    }
  }
  .f-info{
    padding: 0 0.1rem;
    h3{
      .hlh(0.3rem);
    }
    p{
      .flex;
      justify-content: flex-start;
      em{
        color: @c-redyellow;
        margin-left: 0.1rem;
      }
    }
  }
</style>
