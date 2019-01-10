<template>
  <div class="container address">
    <Header back="true" title="编辑地址">
      <span slot="right" class="f16 cf c-right" @click="ableDelete = !ableDelete">{{ableDelete ? '完成' : '编辑'}}</span>
    </Header>

    <div class="main">
      <div class="a-con pa">
        <ul>
          <li v-for="(item, index) in addressList" :key="index">
            <div>
              <p>{{item.address}}</p>
              <p>{{item.phone}}</p>
            </div>
            <span v-show="ableDelete" @click="removeAddress(item)"><SvgIcon class="icon-style" iconName="close" /></span>
          </li>
        </ul>

        <router-link tag="div" to="/profile/info/address/add" class="a-new">
          <span>新增地址</span>
          <span><SvgIcon class="icon-style" iconName="arrow-right" /></span>
        </router-link>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      ableDelete: false, // 可删除状态
      addressList: [] // 地址列表
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header
  },
  computed: {

  },
  methods: {
    async initData () {
      try {
        let list = await Api.addressList()
        Res(list, data => {
          this.addressList = data
        })
      } catch (err) {
        Toast(err.message || '获取地址列表失败')
      }
    },

    // 删除地址
    removeAddress (item) {
      MessageBox.confirm('确认要删除该地址吗？').then(() => {
        /**
         * @todo 待完成
         */
      }).catch(() => {

      })
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../../lib/style/util");

.address {
  z-index: 12;
}

.c-right{
  margin-right: 0.1rem;
}

.a-con{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
ul{
  .border(solid, #ccc, 1px, 0, 0, 0);
  .bg(#fff);
  margin-top: 0.1rem;
  overflow: hidden;
  li{
    .border(solid, #ccc, 0, 0, 1px, 0);
    .flex;
    padding: 0.1rem;
    div{
      flex-grow: 1;
      p{
        line-height: 0.2rem;
      }
    }
    span{
      .flex;
    }
  }
}

.a-new{
  .hlh(0.30rem);
  .bg(#fff);
  .border(solid, #ccc, 1px, 0, 1px, 0);
  .flex;
  justify-content: space-between;
  padding: 0.1rem;
  margin-top: 0.2rem;
  span{
    .flex;
  }
}

</style>
