<template>
  <div class="container remark">
    <Header back="true" title="订单备注" noRight="true"/>

    <div class="main">
      <div class="r-quick bf">
        <h3 class="f18">快速备注</h3>
        <ul class="oh">
          <li v-for="(item, index) in remarkList" :key="index">
            <span v-for="(it, id) in item" :key="id" @click="addRemove(it.id)" :class="[selectRemarkList.indexOf(it.id) > -1 ? 'active' : '']">{{it.label}}</span>
          </li>
        </ul>
      </div>

      <div class="r-other bf">
        <h3 class="f18">其他备注</h3>
        <textarea class="g-input" placeholder="请输入备注内容(可不填)" v-model="selfRemarks"></textarea>
      </div>

      <div class="r-btn bf">
        <span class="g-btn" @click="confirmRemark">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      remarkList: [],
      selectRemarkList: [],
      selfRemarks: ''
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
    ...mapMutations(['Set_RemarkIdList', 'Set_SelfRemarks']),

    async initData () {
      try {
        let list = await Api.shopRemarkAll()
        Res(list, data => {
          this.remarkList = data
        })
      } catch (err) {
        Toast(err.message || '备注信息获取失败')
      }
    },

    // 添加或者移除该项备注
    addRemove (id) {
      let index = this.selectRemarkList.indexOf(id)
      if (index > -1) {
        this.selectRemarkList.splice(index, 1)
      } else {
        this.selectRemarkList.push(id)
      }
    },

    // 确认提交备注
    confirmRemark () {
      this.Set_RemarkIdList(this.selectRemarkList)
      this.Set_SelfRemarks(this.selfRemarks)
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../lib/style/util");

  .remark {
    z-index: 9;
  }

  .r-quick{
    margin: 0.1rem 0;
    padding: 0 0.1rem 0.2rem;
    h3{
      .hlh(0.45rem);
    }
    li{
      .border(solid, @c-blue, 1px);
      border-right: solid transparent 1px;
      overflow: hidden;
      float: left;
      margin: 0 0.15rem 0.1rem 0;
      border-radius: 5px;
    }
    span{
      .disib;
      .border(solid, @c-blue, 0, 1px, 0, 0);
      padding: 0.05rem 0.1rem;
    }
    span.active{
      .bg(@c-blue);
      color: #fff;
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
