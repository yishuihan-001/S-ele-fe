<template>
  <div class="header flex">
    <slot name="left"></slot>
    <div class="h-back flex" @click="$router.back()" v-if="back">
      <SvgIcon class="icon-style" iconName="arrow-left" />
    </div>

    <div class="h-title cf f16" v-if="title">{{title}}</div>
    <div class="h-emtpyMiddle" v-if="!title"></div>

    <slot name="right"></slot>
    <div class="h-emtpyRight" v-if="noRight"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['back', 'title', 'noRight'],
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

div.header {
  .bg;
  height: 0.45rem;
  justify-content: space-between;
}
.h-back {
  .wh(0.45rem, 0.45rem);
}
.h-emtpyMiddle,
.h-emtpyRight {
  .wh(0.1rem, 0.45rem);
}
</style>
