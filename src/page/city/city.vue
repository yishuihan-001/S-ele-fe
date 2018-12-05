<template>
  <div class="container city">
    <Header back="true" title="北京">
      <router-link slot="right" class="f16 cf h-right" to="/home">切换城市</router-link>
    </Header>

    <div class="main">
      <div class="c-search bf">
        <input type="text" placeholder="输入学校、商务楼、地址" class="g-input">
        <span class="g-btn">提交</span>
      </div>

      <div class="c-history oh">
        <div class="c9">搜索历史</div>
        <ul class="bf">
          <router-link tag="li" to="/msite">
            <h3>朝阳大悦城</h3>
            <p>北京市朝阳区朝阳北路100号</p>
          </router-link>
          <li>
            <h3>朝阳大悦城</h3>
            <p>北京市朝阳区朝阳北路100号</p>
          </li>
          <li>
            <h3>朝阳大悦城</h3>
            <p>北京市朝阳区朝阳北路100号</p>
          </li>
          <li>
            <h5>清空所有</h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'

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
@import url("../../../lib/style/util");

.city {
}
.h-right{
  padding-right: 0.1rem;
}

.c-search{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  padding: 0.12rem 0.2rem;
  margin-top: 0.1rem;
  input{
    margin-bottom: 0.15rem;
  }
}

.c-history{
  div{
    .hlh(0.32rem);
    padding: 0 0.1rem;
  }
  ul{
    .border(solid, #ccc, 1px, 0, 1px, 0);
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      padding: 0.05rem 0.2rem;
      h3{
        .ellipsis;
        line-height: 0.35rem;
        font-size: 0.16rem;
      }
      p{
        .ellipsis;
        color: #999;
      }
      h5{
        line-height: 0.35rem;
        text-align: center;
        color: #666;
      }
    }
  }
}
</style>
