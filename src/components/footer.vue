<template>
  <div class="footer pf flex">
    <router-link tag="div" to="/msite">
      <span><SvgIcon class="icon-style" :iconName="$route.path.indexOf('msite') > -1 ? 'f-elm-active' : 'f-elm'" /></span>
      <p>外卖</p>
    </router-link>
    <router-link tag="div" to="/search">
      <span><SvgIcon class="icon-style" :iconName="$route.path.indexOf('search') > -1 ? 'f-search-active' : 'f-search'" /></span>
      <p>搜索</p>
    </router-link>
    <router-link tag="div" to="/order">
      <span><SvgIcon class="icon-style" :iconName="$route.path.indexOf('order') > -1 ? 'f-order-active' : 'f-order'" /></span>
      <p>订单</p>
    </router-link>
    <router-link tag="div" to="/profile">
      <span><SvgIcon class="icon-style" :iconName="$route.path.indexOf('profile') > -1 ? 'f-user-active' : 'f-user'" /></span>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
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
@import url("../../lib/style/util");

.footer {
  .bg(#fff);
  .border(solid, #ccc, 1px, 0, 0, 0);
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.5rem;
  box-sizing: border-box;
  padding: 0 0.1rem;
  div{
    .wh(25%, 100%);
    padding-top: 0.08rem;
    box-sizing: border-box;
    text-align: center;
    span{
      .flex;
    }
    p{
      font-size: 0.12rem;
      color: #666;
    }
  }
}

</style>
