<template>
  <div class="container address">
    <Header back="true" title="编辑地址" class="r-header">
      <span slot="right" class="f16 cf c-right">编辑</span>
    </Header>

    <div class="main">
      <ul>
        <li>
          <div>
            <p>阳光富力城</p>
            <p>1500000000</p>
          </div>
          <span><SvgIcon class="icon-style" iconName="close" /></span>
        </li>
      </ul>

      <router-link tag="div" to="/profile/info/address/add" class="a-new">
        <span>新增地址</span>
        <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
      </router-link>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>

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

.address {
  z-index: 12;
}

.c-right{
  margin-right: 0.1rem;
}

ul{
  .border(solid, #ccc, 1px, 0, 0, 0);
  .bg(#fff);
  margin-top: 0.1rem;
  overflow: hidden;
  li{
    .border(solid, #ccc, 0, 0, 1px, 0);
    .flex;
    padding: 0.1rem;
    div{
      flex-grow: 1;
      p{
        line-height: 0.2rem;
      }
    }
    span{
      .flex;
    }
  }
}

.a-new{
  .hlh(0.30rem);
  .bg(#fff);
  .border(solid, #ccc, 1px, 0, 1px, 0);
  .flex;
  justify-content: space-between;
  padding: 0.1rem;
  margin-top: 0.2rem;
  span{
    .flex;
  }
}

</style>
