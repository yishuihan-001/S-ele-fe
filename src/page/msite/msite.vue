<template>
  <div class="container msite">
    <Header title="朝阳大悦城" :titleLink="true">
      <router-link slot="left" class="h-search flex" to="/search">
        <SvgIcon class="icon-style" iconName="search" />
      </router-link>
      <router-link slot="right" class="f16 cf c-right" to="/profile" v-if="isLogin">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf h-right" to="/login" v-else>登录/注册</router-link>
    </Header>

    <div class="main">
      <div class="m-carousel bf oh">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <ul class="mc-panel">
              <router-link tag="li" to="/food">
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </router-link>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
            </ul>
          </mt-swipe-item>
          <mt-swipe-item>
            <ul class="mc-panel">
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
              <li>
                <span><img :src="$store.state.placeholderImg" alt=""></span>
                <p>abc</p>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <div class="m-merchant bf oh">
        <h3>
          <i class="flex"><SvgIcon class="icon-style" iconName="shop" /></i>
          <span class="c6">附近商家</span>
        </h3>
        <ShopList/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../../components/header'
import Footer from '../../components/footer'
import ShopList from '../../components/shopList'

export default {
  data () {
    return {
      isLogin: false
    }
  },
  created () {

  },
  mounted () {

  },
  components: {
    Header,
    Footer,
    ShopList
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

.demo {
}
.c-right{
  margin-right: 0.1rem;
}
.h-search {
  .wh(0.45rem, 0.45rem);
}
.h-right {
  padding-right: 0.1rem;
}

.m-carousel{
  .border(solid, #ccc, 0, 0, 1px, 0);
  height: 2.01rem;
  box-sizing: border-box;
  margin-bottom: 0.15rem;
  .mc-panel{
    .wh(100%);
    padding: 0 0.1rem 0.1rem;
    box-sizing: border-box;
    li{
      .wh(25%, 0.95rem);
      float: left;
      text-align: center;
      span{
        .wh(0.55rem);
        margin: 0.1rem auto;
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
        overflow: hidden;
        img{
          .wh(100%, auto);
        }
      }
    }
    p{
      .hlh(0.2rem);
      .ellipsis;
      text-align: center;
      color: #666;
    }
  }
}

.m-merchant{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  h3{
    .flex;
    justify-content: flex-start;
    padding: 0.05rem 0.1rem;
    span{
      margin-left: 0.05rem;
    }
  }
}
</style>
