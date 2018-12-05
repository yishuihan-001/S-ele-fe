<template>
  <div class="container commend">
    <Header back="true" title="推荐有奖" noRight="true"/>

    <div class="main">
      <div class="c-channel">
        <div class="cc-img">
          <img :src="redPacketImg" alt="">
        </div>
        <div class="cc-type bf">
          <div>
            <span><SvgIcon class="icon-style" iconName="c-wechat" /></span>
            <p>邀请微信好友</p>
          </div>
          <div>
            <span><SvgIcon class="icon-style" iconName="c-qq" /></span>
            <p>邀请QQ好友</p>
          </div>
          <div>
            <span><SvgIcon class="icon-style" iconName="c-qrcode" /></span>
            <p>面对面邀请</p>
          </div>
        </div>
      </div>

      <div class="c-invite">
        <div class="ci-tab">
          <div class="cit-one">
            <p>累积收益</p>
            <p>0元</p>
          </div>
          <div>
            <p>成功邀请</p>
            <p>0人</p>
          </div>
        </div>
      </div>

      <div class="c-record">
        <p>-收益明细-</p>
        <div class="br-list">
          <span><SvgIcon class="icon-style" iconName="empty" /></span>
          <p>还不赶紧去邀请好友</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../../../components/header'

export default {
  data () {
    return {
      redPacketImg: 'http://cangdu.org:8001/elm/static/img/activity.png'
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

.commend {
  z-index: 9;
}

.c-channel{
  overflow: hidden;
  .cc-img{
    overflow: hidden;
    margin-bottom: 0.1rem;
    img{
      .wh(100%, auto);
    }
  }
  .cc-type{
    .flex;
    height: 1.36rem;
    div{
      width: 33.33%;
      text-align: center;
      .icon-style{
        .wh(0.6rem);
      }
      p{
        .hlh(0.2rem);
        color: #666;
        // font-size: 0.12rem;
      }
    }
  }
}

.c-invite{
  padding-top: 0.15rem;
  .ci-tab{
    .flex;
    & > div{
      .wh(50%, 0.5rem);
      padding-top: 0.1rem;
      text-align: center;
      box-sizing: border-box;
      p{
        color: #666;
      }
    }
    div.cit-one{
      .border(solid, #ccc, 0, 1px, 0, 0);
    }
  }
}

.c-record{
  padding: 0.1rem;
  & > p{
    line-height: 0.3rem;
    color: #666;
    font-size: 0.12rem;
    text-align: center;
  }
  .br-list{
    text-align: center;
    span{
      .disib;
      .icon-style{
        .wh(1rem);
      }
    }
    p{
      .hlh(0.35rem);
      color: #666;
      font-size: 0.12rem;
    }
  }
}
</style>
