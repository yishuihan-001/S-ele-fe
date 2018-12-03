<template>
  <div class="container add">
    <Header back="true" title="新增地址" noRight="true" class="r-header"/>

    <div class="main">
      <ul>
        <li>
          <input type="text" class="g-input" placeholder="请填写你的姓名">
        </li>
        <router-link tag="li" to="/profile/info/address/add/addDetail">
          <input type="text" class="g-input" placeholder="小区/写字楼/学校等">
        </router-link>
        <li>
          <input type="text" class="g-input" placeholder="请填写详细送餐地址">
        </li>
        <li>
          <input type="text" class="g-input" placeholder="请填写能够联系到您的手机号">
        </li>
        <li>
          <input type="text" class="g-input" placeholder="备用联系电话（选填）">
        </li>
      </ul>

      <div class="r-btn">
        <span class="g-btn">新增地址</span>
      </div>

    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from '../../../../../components/header'

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
@import url("../../../../../../lib/style/util");

.add {
  z-index: 15;
}

ul{
  .bg(#fff);
  overflow: hidden;
  padding: 0.1rem;
  margin-top: 0.1rem;
  li{
    margin-bottom: 0.1rem;
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
