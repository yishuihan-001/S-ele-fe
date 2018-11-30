<template>
  <svg>
    <use :xlink:href="iconId" />
  </svg>
</template>

<script>
export default {
  props: ['iconName'],
  computed: {
    iconId () {
      return '#icon-' + this.iconName
    }
  }
}
</script>

<style lang="less" scoped>
</style>
