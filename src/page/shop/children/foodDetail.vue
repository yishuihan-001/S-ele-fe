<template>
  <div class="container foodDetail">
    <Header back="true" :title="foodInfo.name" noRight="true"/>
    <div class="main">
      <div class="f-img"><img :src="foodInfo.image_path || $store.state.placeholderImg" alt=""></div>
      <div class="f-info">
        <h3 class="f20 fwb">{{foodInfo.name}}</h3>
        <p class="fi-one"><span>评分</span><i><Rate :value="foodInfo.rating || (Math.random() * 5).toFixed(1)" size='10px'/></i><em>{{foodInfo.rating}}</em></p>
        <p class="fi-two"><i>月售 {{foodInfo.month_sales}}单</i><em>售价 ¥{{foodInfo.is_multi ? getMultiPrice(foodInfo.multi_spec) : foodInfo.single_spec && foodInfo.single_spec.current_price}}</em></p>
        <p class="fi-three"><i>评论数 {{foodInfo.rating_count}}</i><em>好评率 {{((foodInfo.rating / foodInfo.rating_count) * 100).toFixed(2)}}%</em></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Rate from 'vue-tiny-rate'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      foodId: '',
      foodInfo: {}
    }
  },
  created () {
    this.foodId = this.$route.params.id
  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    Rate
  },
  computed: {
    // 多规格商品价格区间
    getMultiPrice (arr) {
      return function (arr) {
        let temp = []
        let str
        arr.forEach(item => {
          if (temp.indexOf(item.current_price) < 0) {
            temp.push(item.current_price)
          }
        })
        str = Math.min.apply(null, temp)
        if (temp.length > 1) {
          str += '~' + Math.max.apply(null, temp)
        }
        return str
      }
    }
  },
  methods: {
    async initData () {
      try {
        let foodInfo = await Api.foodDetail(this.foodId)
        Res(foodInfo, data => {
          this.foodInfo = data
        })
      } catch (err) {
        Toast(err.message || '商品详情获取失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
  @import url("../../../../lib/style/util");

  .foodDetail {
    z-index: 9;
  }
  .f-img{
    overflow: hidden;
    img{
      .wh(100%, auto);
    }
  }
  .f-info{
    padding: 0 0.1rem;
    h3{
      .hlh(0.3rem);
    }
    p{
      .flex;
      justify-content: flex-start;
      em{
        color: @c-redyellow;
        margin-left: 0.1rem;
      }
    }
  }
</style>
