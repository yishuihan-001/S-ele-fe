<template>
  <div class="container remark">
    <Header back="true" title="订单备注" noRight="true" class="r-header"/>

    <div class="main">
      <div class="r-quick bf">
        <h3 class="f18">快速备注</h3>
        <div class="oh">
          <span><i>不要辣</i><em class="active">少点辣</em><dfn>多点辣</dfn></span>
          <span><em class="active">不要香菜</em></span>
          <span><em>不要洋葱</em></span>
          <span><em>多点醋</em></span>
          <span><em>多点葱</em></span>
          <span><em>去冰</em><dfn>少冰</dfn></span>
        </div>
      </div>

      <div class="r-other bf">
        <h3 class="f18">其他备注</h3>
        <textarea class="g-input" placeholder="请输入备注内容(可不填)"></textarea>
      </div>

      <div class="r-btn bf">
        <span class="g-btn">确定</span>
      </div>
    </div>
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

  .remark {
    .bg(#f1f1f1);
    z-index: 9;
  }

  .r-quick{
    margin: 0.1rem 0;
    padding: 0 0.1rem 0.2rem;
    h3{
      .hlh(0.45rem);
    }
    span{
      .border(solid, @c-blue, 1px);
      float: left;
      margin: 0 0.15rem 0.1rem 0;
      border-radius: 5px;
      i,em,dfn{
        .disib;
        padding: 0.05rem 0.1rem;
      }
      i{
        .border(solid, @c-blue, 0, 1px, 0, 0);
      }
      dfn{
        .border(solid, @c-blue, 0, 0, 0, 1px);
      }
      i.active,em.active,dfn.active{
        .bg(@c-blue);
        color: #fff;
      }
    }
  }

  .r-other{
    padding: 0 0.1rem 0.2rem;
    h3{
      .hlh(0.45rem);
    }
    textarea{
      height: 1.2rem;
    }
  }

  .r-btn{
    padding: 0.1rem;
    span{
      .hlh(0.4rem);
      .bg(@c-green);
      .border(solid, @c-green, 1px);
    }
  }
</style>
