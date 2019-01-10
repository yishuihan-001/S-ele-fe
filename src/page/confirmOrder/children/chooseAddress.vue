<template>
  <div class="container chooseAddress">
    <Header back="true" title="选择地址" noRight="true"/>

    <div class="main">
      <ul class="c-list pa">
        <li v-for="(item, index) in receiveAddress" :key="index" @click="selectAddress(item)">
          <div class="ca-left"><SvgIcon class="icon-style" iconName="gou-l" v-if="item.is_default"/></div>
          <div class="ca-right">
            <h3><span class="f16 fwb">{{item.name}}</span><em>{{item.sex === 'male' ? '先生' : item.sex === 'female' ? '女士' : ''}}</em><dfn>{{item.phone}}</dfn></h3>
            <p><i>{{item.tag}}</i>{{item.address + item.address_detail}}</p>
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
import { mapState, mapMutations } from 'vuex'
import Header from '@src/components/header'

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
    ...mapState(['receiveAddress'])
  },
  methods: {
    ...mapMutations(['Set_CurrentAddress']),

    // 选择当前收货地址
    selectAddress (item) {
      this.Set_CurrentAddress(item)
      this.$router.back()
    }
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
