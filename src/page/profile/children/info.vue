<template>
  <div class="container info">
    <Header back="true" title="账户信息" noRight="true" class="r-header"/>

    <div class="main">
      <ul>
        <li>
          <label for="">头像</label>
          <span><em><img :src="$store.state.placeholderImg" alt=""></em><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </li>
        <li>
          <label for="">用户名</label>
          <span><dfn>15000000000</dfn><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </li>
        <li>
          <label for="">收货地址</label>
          <span><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </li>
        <li class="title">
          <label for="">账号绑定</label>
        </li>
        <li>
          <label for="">手机</label>
          <span><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </li>
        <li class="title">
          <label for="">安全设置</label>
        </li>
        <li>
          <label for="">登录密码</label>
          <span><dfn>修改</dfn><i><SvgIcon class="icon-style" iconName="arrow-right" /></i></span>
        </li>
      </ul>

      <div class="r-btn">
        <span class="g-btn">退出登录</span>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
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

.info {
  z-index: 9;
}

ul{
  .bg(#fff);
  .border(solid, #ccc, 1px, 0, 0, 0);
  margin-top: 0.1rem;
  overflow: hidden;
  li{
    .hlh(0.58rem);
    .border(solid, #ccc, 0, 0, 1px, 0);
    .flex;
    justify-content: flex-start;
    padding: 0 0.1rem;
    label{
      width: 0.9rem;
    }
    span{
      .flex;
      justify-content: flex-end;
      flex-grow: 1;
      em{
        .wh(0.5rem);
        border-radius: 50%;
        overflow: hidden;
        img{
          .wh(100%, auto);
        }
      }
      dfn{
        color: #999;
      }
      i{
        .flex;
      }
    }
  }
  li.title{
    .hlh(0.35rem);
    .bg(#f0f0f0);
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(red);
    .border(solid, red, 1px);
  }
}

</style>
