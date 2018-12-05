<template>
  <div class="container search">
    <Header back="true" title="搜索" noRight="true"/>

    <div class="main">
      <div class="s-top bf flex">
        <input type="text" class="g-input" placeholder="请输入商家或美食名称">
        <span class="g-btn">提交</span>
      </div>

      <div class="s-history">
        <div class="sh-title c6">搜索历史</div>
        <ul class="bf oh">
          <li>
            <p>魏家凉皮</p>
            <span><SvgIcon class="icon-style" iconName="close" /></span>
          </li>
          <li>
            <p>魏家凉皮</p>
            <span><SvgIcon class="icon-style" iconName="close" /></span>
          </li>
        </ul>
        <div class="sh-clean tac f16 bf">清除搜索历史</div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../../components/header'
import Footer from '../../components/footer'

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
    Header,
    Footer
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

  .search {

  }
  .s-top{
    .border(solid, #ccc, 0, 0, 1px, 0);
    padding: 0.1rem;
    span{
      width: 0.8rem;
      margin-left: 0.1rem;
    }
  }

  .s-history{
    .sh-title{
      .hlh(0.36rem);
      padding: 0 0.1rem;
    }
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      .hlh(0.38rem);
      .flex;
      padding: 0 0.1rem;
      p{
        flex-grow: 1;
        .ellipsis;
      }
      span{
        .flex;
        .wh(0.3rem, 0.38rem);
        .icon-style{
          .wh(0.15rem);
        }
      }
    }
  }

  .sh-clean{
    .hlh(0.38rem);
    color: @c-blue;
  }
</style>
