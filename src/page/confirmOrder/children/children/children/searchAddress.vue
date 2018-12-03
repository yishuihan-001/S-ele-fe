<template>
  <div class="container searchAddress">
    <Header back="true" title="搜索" noRight="true" class="r-header"/>

    <div class="main">
      <div class="s-search bf f18 flex">
        <input type="text" class="g-input" placeholder="请输入小区/写字楼/学校等">
        <span class="g-btn">搜索</span>
      </div
      >
      <div class="s-empty">
        <p>找不到地址？</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号等）可稍后输入哦</p>
      </div>

      <ul class="bf">
        <li>
          <h3>老曹饭店</h3>
          <p>北京市顺义区赵各庄村通商路43号</p>
        </li>
        <li>
          <h3>老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店老曹饭店v</h3>
          <p>北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号北京市顺义区赵各庄村通商路43号</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../../../../components/header'

export default {
  data () {
    return {
      sex: ''
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
  @import url("../../../../../../lib/style/util");

  .searchAddress{
    z-index: 15;
  }

  .s-search{
    padding: 0.1rem;
    justify-content: flex-start;
    input{

    }
    span{
      width: 0.7rem;
      flex-shrink: 0;
      margin-left: 0.1rem;
    }
  }

  .s-empty{
    padding: 2rem 0;
    p{
      font-size: 0.12rem;
      text-align: center;
      color: #999;
    }
  }

  ul{
    position: absolute;
    top: 0.55rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 0 0.1rem;
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      padding: 0.1rem 0;
      h3{
        line-height: 0.25rem;
      }
      p{
        line-height: 0.2rem;
        color: #666;
      }
    }
  }

</style>
