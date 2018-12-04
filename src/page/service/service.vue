<template>
  <div class="container service">
    <Header back="true" title="服务中心" noRight="true"/>

    <div class="main">
      <div class="s-contact">
        <div>
          <span><SvgIcon class="icon-style" iconName="service-o" /></span>
          <p>在线客服</p>
        </div>
        <div>
          <span><SvgIcon class="icon-style" iconName="service-p" /></span>
          <p>电话客服</p>
        </div>
      </div>

      <h3 class="f18">热门问题</h3>

      <ul>
        <router-link tag="li" to="/service/questionDetail">
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </router-link>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>超级会员权益说明</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
        <li>
          <span>签到规则</span>
          <i><SvgIcon class="icon-style" iconName="arrow-right" /></i>
        </li>
      </ul>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from '../../components/header'

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
@import url("../../../lib/style/util");

.service {

}

.s-contact{
  .flex;
  .bg(#fff);
  justify-content: space-between;
  height: 0.95rem;
  div{
    .wh(50%, 0.95rem);
    .border(solid, #eee, 0, 1px, 0, 0);
    padding-top: 0.25rem;
    text-align: center;
    box-sizing: border-box;
    span{
      .icon-style{
        .wh(0.35rem);
      }
    }
    p{
      color: #666;
    }
  }
}

h3{
  .hlh(0.5rem);
  padding: 0 0.1rem;
}
ul{
  .bg(#fff);
  overflow: hidden;
  li{
    .hlh(0.5rem);
    .flex;
    .border(solid, #eee, 0, 0, 1px, 0);
    justify-content: space-between;
    padding: 0 0.1rem;
    span{
      color: #666;
    }
  }
}
</style>
