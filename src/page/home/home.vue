<template>
  <div class="container home">
    <Header>
      <div slot="left" class="f16 cf h-logo" @click="reload">ele.me</div>
      <router-link slot="right" class="f16 cf c-right" to="/profile" v-if="isLogin">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf h-right" to="/login" v-else>登录/注册</router-link>
    </Header>
    <div class="main">
      <div class="h-curr bf">
        <div class="flex">
          <span class="c6">当前定位城市：</span>
          <span class="c9">定位不准时，请在城市列表中选择</span>
        </div>
        <router-link tag="div" to="/city/3" class="flex">
          <span class="hc-site f16">北京</span>
          <span class="hc-arrow flex">
            <SvgIcon class="icon-style" iconName="arrow-right" />
          </span>
        </router-link>
      </div>

      <div class="h-hot bf">
        <p class="c6">热门城市</p>
        <ul class="oh">
          <li>北京</li>
          <li>上海</li>
          <li>西安</li>
          <li>广州</li>
          <li>深圳</li>
          <li>成都</li>
          <li>杭州</li>
          <li>宝鸡</li>
        </ul>
      </div>

      <ul class="h-all oh">
        <li>
          <p>A<span>（按字母排序）</span></p>
          <div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
          </div>
        </li>
        <li>
          <p>B</p>
          <div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'

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
    Header
  },
  computed: {

  },
  methods: {
    reload () {
      window.location.reload()
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.home {

}
.c-right{
  margin-right: 0.1rem;
}
.h-logo {
  .hlh(0.45rem);
  padding: 0 0.1rem;
}
.h-right {
  padding-right: 0.1rem;
}

.h-curr {
  .border(solid, #ccc, 0, 0, 1px, 0);
  margin-bottom: 0.15rem;
  & > div {
    .hlh(0.4rem);
    .border(solid, #eee, 0, 0, 1px, 0);
    padding: 0 0.1rem;
    justify-content: space-between;
    .hc-site{
      color: @c-blue;
    }
    .hc-arrow {
      .wh(0.4rem);
    }
  }
}

.h-hot{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  margin-bottom: 0.15rem;
  p{
    .hlh(0.36rem);
    padding: 0 0.1rem;
  }
  li{
    .wh(25%, 0.36rem);
    .ellipsis;
    .border(solid, #eee, 1px, 1px, 0, 0);
    float: left;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.36rem;
    color: @c-blue;
    font-size: 0.16rem;
  }
}

.h-all{
  .bg(#f0f0f0);
  li{
    .bg(#fff);
    .border(solid, #ccc, 1px, 0, 1px, 0);
    margin-bottom: 0.15rem;
    p{
      .hlh(0.32rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      padding: 0 0.1rem;
      color: #666;
      span{
        font-size: 0.12rem;
        color: #999;
      }
    }
    div{
      overflow: hidden;
      span{
        .wh(25%, 0.36rem);
        .ellipsis;
        .border(solid, #eee, 0, 1px, 1px, 0);
        line-height: 0.36rem;
        color: @c-blue;
        float: left;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
