<template>
  <div class="container benefit">
    <Header back="true" title="我的优惠" noRight="true"/>

    <div class="main">
      <div class="b-tab bf flex">
        <span :class="{active: showRedPacket}" @click="showRedPacket=true">红包</span>
        <span :class="{active: !showRedPacket}" @click="showRedPacket=false">商家代金券</span>
      </div>

      <div class="b-con pa">
        <transition name="scon-fade" mode="out-in">
          <div class="bc-redpacket" v-if="showRedPacket" key="redpacket">
            <h3>
              <span>有<em>3</em>个红包即将到期</span>
              <router-link tag="span" to="/benefit/hbDescription">
                <i><SvgIcon class="icon-style" iconName="wen" /></i>
                <em>红包说明</em>
              </router-link>
            </h3>
            <ul>
              <li v-for="(item, index) in redPacketList" :key="index"><RedPacket :info="item"/></li>
            </ul>
            <h4>限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</h4>
            <p><router-link tag="span" to="/benefit/hbHistory">查看历史红包 ></router-link></p>
          </div>

          <div class="bc-ticket" v-else key="ticket">
            <h3>
              <router-link tag="span" to="/benefit/coupon">
                <i><SvgIcon class="icon-style" iconName="wen" /></i>
                <em>商家代金券说明</em>
              </router-link>
            </h3>
            <div class="bct-tip">
              <div class="bctt-icon"><SvgIcon class="icon-style" iconName="empty" /></div>
              <p class="f18 tac">无法使用代金券</p>
              <p class="f12 c9 tac">非客户端或客户端版本过低</p>
              <div class="r-btn">
                <router-link tag="span" to="/download" class="g-btn">下载或升级客户端</router-link>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="b-switch pa bf">
        <router-link tag="span" to="/benefit/exchange" class="bs-one">兑换红包</router-link>
        <router-link tag="span" to="/benefit/commend">推荐有奖</router-link>
      </div>
    </div>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'
import RedPacket from '@src/components/redPacket'

export default {
  data () {
    return {
      showRedPacket: true, // 显示红包
      redPacketList: [] // 红包列表
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  components: {
    Header,
    RedPacket
  },
  computed: {

  },
  methods: {
    async initData () {
      try {
        let list = await Api.hongbaoUsable({ offset: 0, limit: 20 })
        Res(list, data => {
          this.redPacketList = data
        })
      } catch (err) {
        Toast(err.message || '获取红包列表失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.benefit {

}
 /* tab */
.b-tab{
  .border(solid, #ccc, 0, 0, 1px, 0);
  height: 0.55rem;
  justify-content: space-around;
  span.active{
    .border(solid, @c-blue, 0, 0, 2px, 0);
    color: @c-blue;
  }
}

/* 内容区 */
.b-con{
  top: 0.55rem;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  overflow: auto;
}

/* 红包 */
.bc-redpacket{
  overflow: hidden;
  h3{
    .hlh(0.35rem);
    .flex;
    justify-content: space-between;
    padding: 0.1rem;
    span,i{
      .flex;
    }
    i{
      .icon-style{
        .wh(0.15rem);
      }
    }
    em{
      font-size: 0.12rem;
      color: @c-blue;
    }
  }
  ul{
    padding: 0 0.1rem;
    li{
      margin-bottom: 0.1rem;
    }
  }
  h4,p{
    padding: 0.2rem;
    line-height: 0.25rem;
    color: #666;
  }
  p{
    text-align: center;
    span{
      color: #666;
    }
  }
}

/* 商家代金券 */
.bc-ticket{
  overflow: hidden;
  h3{
    .hlh(0.35rem);
    .flex;
    justify-content: flex-end;
    padding: 0.1rem;
    span,i{
      .flex;
    }
    i{
      .icon-style{
        .wh(0.15rem);
      }
    }
    em{
      font-size: 0.12rem;
      color: @c-blue;
    }
  }
  .bct-tip{
    padding-top: 0.8rem;
    text-align: center;
    .icon-style{
      .wh(0.8rem);
    }
    p{
      .hlh(0.3rem);
    }
    .r-btn{
      padding: 0.2rem 0.1rem;
      span{
        .hlh(0.4rem);
        .bg(@c-green);
        .border(solid, @c-green, 1px);
      }
    }
  }
}

/* 底部导航 */
.b-switch{
  .flex;
  .hlh(0.5rem);
  .border(solid, #eee, 1px, 0, 0, 0);
  bottom: 0;
  left: 0;
  right: 0;
  span{
    .wh(50%, 0.5rem);
    text-align: center;
    box-sizing: border-box;
  }
  .bs-one{
    .border(solid, #eee, 0, 1px, 0, 0);
  }
}

  /* 容器内元素过渡 */
.scon-fade-enter-active, .scon-fade-leave-active {
  transition: opacity .3s ease;
}
.scon-fade-enter, .scon-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
