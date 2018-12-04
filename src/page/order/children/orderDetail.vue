<template>
  <div class="container orderDetail">
    <Header back="true" title="订单详情" noRight="true"/>

    <div class="main">
      <div class="o-digest bf">
        <div><span><img :src="$store.state.placeholderImg" alt=""></span></div>
        <p><dfn class="f20 fwb">等待支付</dfn></p>
        <p><em>再来一单</em></p>
      </div>

      <div class="c-order bf">
        <div class="co-title">
          <i><img :src="$store.state.placeholderImg" alt=""></i>
          <span class="f18">效果演示</span>
        </div>

        <ul>
          <li><i>ussss</i><em>X8</em><dfn>¥20</dfn></li>
          <li><i>ussss</i><em>X8</em><dfn>¥20</dfn></li>
          <li><i>ussss</i><em>X8</em><dfn>¥20</dfn></li>
          <li><i>ussss</i><em>X8</em><dfn>¥20</dfn></li>
        </ul>
        <p><span>配送费</span><dfn>4</dfn></p>
        <div class="co-total">
          <span class="f18">订单 ¥24298</span>
          <em class="f18 fwb">待支付 ¥24298</em>
        </div>
      </div>

      <div class="o-delivery bf">
        <h3>配送信息</h3>
        <p><label>送达时间：</label><span>尽快送达</span></p>
        <p><label>送达地址：</label><span>slient（15000000000）</span></p>
        <p><label>配送方式：</label><span>蜂鸟专送</span></p>
      </div>

      <div class="o-delivery bf">
        <h3>订单信息</h3>
        <p><label>订单号：</label><span>8989</span></p>
        <p><label>支付方式：</label><span>在线支付</span></p>
        <p><label>下单时间：</label><span>2018-11-23 17:58</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/header'

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
@import url("../../../../lib/style/util");

.orderDetail {
  z-index: 9;
}

.main > div{
  margin-bottom: 0.1rem;
}

.o-digest{
  padding: 0.1rem 0;
  div{
    text-align: center;
    span{
      .disib;
      .wh(0.8rem);
      .border(solid, @c-blue, 1px);
      border-radius: 50%;
      overflow: hidden;
      img{
        .wh(100%);
      }
    }
  }
  p{
    .hlh(0.35rem);
    text-align: center;
    em{
      .border(solid, @c-blue, 1px);
      border-radius: 2px;
      color: @c-blue;
      padding: 0.02rem 0.05rem;
    }
  }
}

  /* 订单详情 */
  .c-order{
    margin-bottom: 0.1rem;
    .co-title{
      .hlh(0.7rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: flex-start;
      padding: 0 0.1rem;
      i{
        .wh(0.3rem);
        img{
          .wh(100%, auto);
        }
      }
      span{
        margin-left: 0.1rem;
      }
    }

    ul{
      .border(solid, #eee, 0, 0, 1px, 0);
      overflow: hidden;
      padding: 0.1rem;
      li{
        .hlh(0.4rem);
        .flex;
        justify-content: flex-start;
        i{
          flex-grow: 1;
          overflow: hidden;
        }
        em{
          color: @c-redyellow;
          width: 0.5rem;
          flex-shrink: 0;
          text-align: center;
        }
        dfn{
          width: 0.6rem;
          flex-shrink: 0;
          text-align: center;
        }
      }
    }

    .co-total{
     .hlh(0.6rem);
     .flex;
     justify-content: space-between;
     padding: 0.1rem;
     em{
       color: @c-redyellow;
     }
    }

    p{
      .hlh(0.5rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      .flex;
      justify-content: space-between;
      padding: 0 0.1rem;
      dfn{
        width: 0.6rem;
        text-align: center;
      }
    }
  }

  /* 其他信息 */
  .o-delivery{
    h3{
      .hlh(0.35rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      font-size: 0.18rem;
      padding: 0 0.1rem;
    }
    p{
      .hlh(0.35rem);
      padding: 0 0.1rem;
      label{
        width: 0.9rem;
      }
      *{
        color: #666;
      }
    }
  }

</style>
