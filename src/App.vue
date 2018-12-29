<template>
  <div id="app" class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" class="nokeepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
  @import "../lib/style/reset";
  @import "../lib/style/common";
  @import "../lib/style/self-mint";

  html,
  body,
  .app {
    height: 100%;
    background: pink;
    position: relative;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
</style>
