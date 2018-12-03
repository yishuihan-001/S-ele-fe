<template>
  <div class="container chooseAddress">
    <Header back="true" title="选择地址" noRight="true" class="r-header"/>

    <div class="main">
      <ul class="c-list pa">
        <li>
          <div class="ca-left"><SvgIcon class="icon-style" iconName="gou-l" /></div>
          <div class="ca-right">
            <h3><span class="f16 fwb">slient</span><em>先生</em><dfn>15000000000</dfn></h3>
            <p><i>家</i>富力城</p>
          </div>
        </li>
        <li>
          <div class="ca-left"><SvgIcon class="icon-style" iconName="gou-h" /></div>
          <div class="ca-right">
            <h3><span class="f16 fwb">slient</span><em>先生</em><dfn>15000000000</dfn></h3>
            <p><i>家</i>富力城</p>
          </div>
        </li>
      </ul>
      <router-link tag="div" to="/confirmOrder/chooseAddress/addAddress" class="c-btn pa tac flex">
        <i class="flex"><SvgIcon class="icon-style" iconName="add" /></i>
        <span class="f18">新增收获地址</span>
      </router-link>
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

  .chooseAddress{
    z-index: 9;
  }

  .c-btn{
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.56rem;
    line-height: 0.56rem;
    i{
      margin: 0 0.1rem;
    }
    span{
      color: @c-blue;
    }
  }

  .c-list{
    .bg(#fff);
    top: 0;
    bottom: 0.56rem;
    left: 0;
    right: 0;
    overflow: auto;
    li{
      .flex;
      .border(solid, #eee, 0, 0, 1px, 0);
      flex-grow: 1;
      justify-content: flex-start;
      padding: 0.1rem;
      .ca-left{
        .flex;
        width: 0.3rem;
      }
      .ca-right{
        flex-grow: 1;
        padding-left: 0.1rem;
        h3{
          span,em{
            margin-right: 0.1rem;
          }
        }
        p{
          i{
            .bg(@c-blue);
            border-radius: 2px;
            color: #fff;
            padding: 0.01rem 0.03rem;
            margin-right: 0.05rem;
          }
        }
      }
    }
  }
</style>
