<template>
  <div class="container shopSafe">
    <Header back="true" title="食品监督安全公示" noRight="true"/>
    <div class="main">
      <div class="s-notice">
        <h3><span>食品监督安全公示</span></h3>
        <div class="sn-tip">
          <div class="snt-left"><img :src="$store.state.placeholderImg" alt=""></div>
          <div class="snt-right">
            <p>监督检查结果：{{grade[Math.floor(Math.random() * grade.length)]}}</p>
            <p>检查日期：2018-08-08</p>
          </div>
        </div>
      </div>

      <div class="s-info">
        <h3><span>工商登记信息</span></h3>
        <p><span>工商执照注册号</span>1</p>
        <p><span>注册资本</span>2</p>
        <p><span>注册地址</span>3</p>
        <p><span>属地监管所</span>4</p>
        <p><span>法定代表人</span>5</p>
        <p><span>经营范围</span>6</p>
      </div>

      <div class="s-info">
        <h3><span>餐饮许可证</span></h3>
        <p><span>营业范围</span>7</p>
        <p><span>许可证有效期</span>8</p>
        <p><span>许可证号</span>9</p>
        <p><span>发证时间</span>10</p>
        <p><span>发证机关</span>11</p>
      </div>

      <div class="s-credential">
        <h3>许可证书</h3>
        <div>
          <img :src="$store.state.placeholderImg" alt="">
          <img :src="$store.state.placeholderImg" alt="">
          <img :src="$store.state.placeholderImg" alt="">
          <img :src="$store.state.placeholderImg" alt="">
          <img :src="$store.state.placeholderImg" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Header from '../../../../components/header'
export default {
  data () {
    return {
      grade: ['优秀', '良好', '合格', '不合格', '整改中', '已吊销营业执照']
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
  @import url("../../../../../lib/style/util");

  .shopSafe {
    z-index: 12;
    .main{
      overflow: auto;
    }
  }
  .main > div{
    .bg(#fff);
    margin-bottom: 0.12rem;
    h3{
      .hlh(0.45rem);
      .flex;
      .border(solid, #ccc, 0, 0, 1px, 0);
      justify-content: space-between;
      padding: 0 0.1rem;
      span{
        .flex;
        font-size: 0.16rem;
        i{
          .flex;
          .wh(0.2rem);
        }
      }
    }
  }

  .sn-tip{
    .flex;
    padding: 0.2rem 0.1rem;
    justify-content: space-between;
    .snt-left{
      .wh(0.5rem);
      border-radius: 50%;
      overflow: hidden;
      img{
        .wh(100%, auto);
      }
    }
    .snt-right{
      flex-grow: 1;
      padding-left: 0.1rem;
      p{
        color: #666;
      }
    }
  }

  .s-info{
    p{
      .flex;
      .hlh(0.5rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      justify-content: flex-start;
      margin: 0 0.1rem;
      span{
        .ellipsis;
        color: #666;
        width: 1.2rem;
      }
      i{
        .flex;
      }
    }
  }

  .s-credential{
    h3{
      .hlh(0.45rem);
      .border(solid, #ccc, 0, 0, 1px, 0);
      padding: 0 0.1rem;
    }
    div{
      padding: 0.1rem;
      overflow: hidden;
      img{
        .wh(1.4rem, auto);
        margin: 0 0.1rem 0.1rem 0;
      }
    }
  }
</style>
