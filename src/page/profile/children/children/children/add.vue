<template>
  <div class="container add">
    <Header back="true" title="新增地址" noRight="true"/>

    <div class="main">
      <ul>
        <li>
          <input type="text" class="g-input" placeholder="请填写你的姓名" v-model="receiverName">
        </li>
        <router-link tag="li" to="/profile/info/address/add/addDetail">
          <input type="text" class="g-input" placeholder="小区/写字楼/学校等" v-model="locationAddress">
        </router-link>
        <li>
          <input type="text" class="g-input" placeholder="请填写详细送餐地址" v-model="receiverDetailAddress">
        </li>
        <li>
          <input type="text" class="g-input" placeholder="请填写能够联系到您的手机号" v-model="receiverPhone">
        </li>
        <li>
          <input type="text" class="g-input" placeholder="备用联系电话（选填）" v-model="receiverPhonebp">
        </li>
      </ul>

      <div class="r-btn">
        <span class="g-btn" @click="createNewAddress">新增地址</span>
      </div>

    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Va from '@lib/js/validator'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      receiverName: '', // 收货人姓名
      receiverDetailAddress: '', // 详细收货地址
      receiverPhone: '', // 收货人电话
      receiverPhonebp: '' // 备用电话
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
    ...mapState(['locationAddress'])
  },
  methods: {
    ...mapMutations(['Set_ReceiveAddress']),

    // 新增地址
    async createNewAddress () {
      try {
        let va = new Va()
        va.add(this.receiverName, [{ rule: 'isEmpty', msg: '收货人姓名不能为空' }])
        va.add(this.receiverPhone, [{ rule: 'isEmpty', msg: '手机号不能为空' }, { rule: 'regexpPhone', msg: '手机号格式有误' }])
        va.add(this.locationAddress, [{ rule: 'isEmpty', msg: '收货地址不能为空' }])
        va.add(this.receiverDetailAddress, [{ rule: 'isEmpty', msg: '详细地址不能为空' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }
        let addressInfo = {
          address: this.locationAddress,
          address_detail: this.receiverDetailAddress,
          name: this.receiverName,
          phone: this.receiverPhone
        }
        let resObj = await Api.addressCreate(addressInfo)
        Res(resObj, data => {
          this.updateReceiveAddress()
        })
      } catch (err) {
        Toast(err.message || '地址创建失败')
      }
    },

    // 更新地址列表
    async updateReceiveAddress () {
      try {
        let list = await Api.addressList()
        Res(list, data => {
          this.Set_ReceiveAddress(data)
          Toast('地址添加成功')
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        })
      } catch (err) {
        Toast(err.message || '地址列表更新失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../../../../lib/style/util");

.add {
  z-index: 15;
}

ul{
  .bg(#fff);
  overflow: hidden;
  padding: 0.1rem;
  margin-top: 0.1rem;
  li{
    margin-bottom: 0.1rem;
  }
}

.r-btn{
  padding: 0.2rem 0.1rem;
  span{
    .hlh(0.4rem);
    .bg(@c-green);
    .border(solid, @c-green, 1px);
  }
}
</style>
