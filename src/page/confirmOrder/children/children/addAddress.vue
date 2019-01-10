<template>
  <div class="container addAddress">
    <Header back="true" title="添加地址" noRight="true"/>

    <div class="main">
      <ul class="a-field bf">
        <li>
          <label for="">联系人</label>
          <div>
            <input type="text" placeholder="你的名字" v-model="receiverName">
            <p>
              <span @click="receiverSex = 'male'"><i><SvgIcon class="icon-style" :iconName="receiverSex === 'male' ? 'gou-l' : 'gou-h'" /></i>先生</span>
              <span @click="receiverSex = 'female'"><i><SvgIcon class="icon-style" :iconName="receiverSex === 'male' ? 'gou-h' : 'gou-l'" /></i>女士</span>
            </p>
          </div>
        </li>
        <li>
          <label for="" @click="testFn">联系电话</label>
          <div>
            <input class="phone" type="text" placeholder="你的手机号" style="border-bottom: none;" v-model="receiverPhone"/>
            <dfn class="tac cf" @click="checkPhone">验证手机号</dfn>
            <!-- <input type="text" placeholder="备选电话"> -->
          </div>
        </li>
        <li>
          <label for="">送餐地址</label>
          <div>
            <!-- <router-link tag="input" to="/confirmOrder/chooseAddress/addAddress/searchAddress" type="text" placeholder="小区/写字楼/学校等" v-model="locationAddress"></router-link> -->
            <input type="text" placeholder="小区/写字楼/学校等" v-model="locationAddress" @click="$router.push('/confirmOrder/chooseAddress/addAddress/searchAddress')"/>
            <input type="text" placeholder="详细地址（如门牌号等）" v-model="receiverDetailAddress">
          </div>
        </li>
        <li>
          <label for="">标签</label>
          <div>
            <p>
              <span @click="receiverTag = '家'"><i><SvgIcon class="icon-style" :iconName="receiverTag === '家' ? 'gou-l' : 'gou-h'" /></i>家</span>
              <span @click="receiverTag = '公司'"><i><SvgIcon class="icon-style" :iconName="receiverTag === '公司' ? 'gou-l' : 'gou-h'" /></i>公司</span>
              <span @click="receiverTag = '学校'"><i><SvgIcon class="icon-style" :iconName="receiverTag === '学校' ? 'gou-l' : 'gou-h'" /></i>学校</span>
            </p>
          </div>
        </li>
        <li>
          <label for="">设为默认</label>
          <div>
            <p>
              <span @click="receiverDefault = true"><i><SvgIcon class="icon-style" :iconName="receiverDefault ? 'gou-l' : 'gou-h'" /></i>是</span>
              <span @click="receiverDefault = false"><i><SvgIcon class="icon-style" :iconName="!receiverDefault ? 'gou-l' : 'gou-h'" /></i>否</span>
            </p>
          </div>
        </li>
      </ul>

      <div class="r-btn bf">
        <span class="g-btn" @click="confirmAdd">确定</span>
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
      receiverSex: 'male', // 收货人性别
      receiverPhone: '', // 收货人电话
      receiverDetailAddress: '', // 详细收货地址
      receiverTag: '家', // 标签
      receiverDefault: true // 是否设为默认收货地址
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
    ...mapState(['isVerifyPhone', 'locationAddress'])
  },
  methods: {
    ...mapMutations(['Set_ReceiveAddress']),

    // 验证手机号码
    checkPhone () {
      try {
        let va = new Va()
        va.add(this.receiverPhone, [{ rule: 'isEmpty', msg: '手机号不能为空' }, { rule: 'regexpPhone', msg: '手机号格式有误' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }
        this.$router.push('/confirmOrder/chooseAddress/addAddress/userValidation')
      } catch (err) {
        Toast(err.message || '验证失败')
      }
    },

    // 添加收货地址
    async confirmAdd () {
      try {
        let va = new Va()
        va.add(this.receiverName, [{ rule: 'isEmpty', msg: '收货人姓名不能为空' }])
        va.add(this.receiverSex, [{ rule: 'isEmpty', msg: '请选择收货人性别' }])
        va.add(this.receiverPhone, [{ rule: 'isEmpty', msg: '收货人联系电话不能为空' }])
        va.add(String(this.isVerifyPhone), [{ rule: 'equal:true', msg: '收货人联系电话尚未验证' }])
        va.add(this.locationAddress, [{ rule: 'isEmpty', msg: '收货地址不能为空' }])
        va.add(this.receiverDetailAddress, [{ rule: 'isEmpty', msg: '详细地址不能为空' }])
        va.add(this.receiverTag, [{ rule: 'isEmpty', msg: '请选择标签' }])
        va.add(this.receiverDefault, [{ rule: 'isEmpty', msg: '请选择是否设为默认' }])
        let vaResult = va.start()
        if (vaResult) {
          throw new Error(vaResult)
        }
        let addressInfo = {
          address: this.locationAddress,
          address_detail: this.receiverDetailAddress,
          name: this.receiverName,
          phone: this.receiverPhone,
          sex: this.receiverSex,
          tag: this.receiverTag,
          is_default: this.receiverDefault
        }
        let resObj = await Api.addressCreate(addressInfo)
        Res(resObj, data => {
          this.updateReceiveAddress()
        })
      } catch (err) {
        Toast(err.message || '添加失败')
      }
    },

    // 更新收货地址列表
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
    },

    // 测试
    testFn () {
      console.log(this.isVerifyPhone)
      console.log(this.locationAddress)
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../../lib/style/util");

  .addAddress{
    z-index: 12;
  }

  .a-field{
    padding: 0 0.1rem;
    li{
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: space-between;
      label{
        .hlh(0.58rem);
        align-self: flex-start;
        width: 0.98rem;
        flex-shrink: 0;
        font-size: 0.16rem;
      }
      div{
        flex-grow: 1;
        position: relative;
        input{
          .hlh(0.58rem);
          .border(solid, #eee, 0, 0, 1px, 0);
          width: 100%;
        }
        p{
          .hlh(0.58rem);
          .flex;
          justify-content: flex-start;
          span{
            .flex;
            margin-right: 0.2rem;
            i{
              .flex;
              margin-right: 0.1rem;
            }
          }
        }
        input.phone{
          padding-right: 1rem;
          box-sizing: border-box;
        }
        dfn{
          .hlh(0.3rem);
          .bg(@c-blue);
          width: 0.85rem;
          position: absolute;
          right: 0;
          top: 0.15rem;
          border-radius: 0.05rem;
        }
      }
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
