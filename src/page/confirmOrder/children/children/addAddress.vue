<template>
  <div class="container addAddress">
    <Header back="true" title="添加地址" noRight="true"/>

    <div class="main">
      <ul class="a-field bf">
        <li>
          <label for="">联系人</label>
          <div>
            <input type="text" placeholder="你的名字">
            <p>
              <span><i><SvgIcon class="icon-style" iconName="gou-l" /></i>先生</span>
              <span><i><SvgIcon class="icon-style" iconName="gou-h" /></i>女士</span>
            </p>
          </div>
        </li>
        <li>
          <label for="">联系电话</label>
          <div>
            <input type="text" placeholder="你的手机号">
            <dfn><SvgIcon class="icon-style" iconName="add" /></dfn>
            <input type="text" placeholder="备选电话">
          </div>
        </li>
        <li>
          <label for="">送餐地址</label>
          <div>
            <router-link tag="input" to="/confirmOrder/chooseAddress/addAddress/searchAddress" type="text" placeholder="小区/写字楼/学校等"></router-link>
            <input type="text" placeholder="详细地址（如门牌号等）">
          </div>
        </li>
        <li>
          <label for="">标签</label>
          <div>
            <input type="text" placeholder="无/家/学校/公司">
          </div>
        </li>
      </ul>

      <div class="r-btn bf">
        <span class="g-btn">确定</span>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from '../../../../components/header'

export default {
  data () {
    return {
      sex: ''
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
        dfn{
          position: absolute;
          right: 0;
          top: 0.2rem;
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
