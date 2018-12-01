<template>
  <transition name="fade">
    <div class="dialog pa" v-show="show"></div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['show'],
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

  .dialog {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.3;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
