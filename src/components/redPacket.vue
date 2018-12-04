<template>
    <div class="redpacket">
      <div class="r-left">
        <h3>¥<span>1.0</span></h3>
        <p>满 40 元可用</p>
      </div>
      <div class="r-right">
        <div class="rr-info">
          <h3>分享红包</h3>
          <p>2017-05-23到期</p>
          <p>限收货手机号为 13681711254</p>
        </div>
        <div class="rr-tip">
          <h3>剩3日</h3>
          <span><SvgIcon class="icon-style" iconName="overdue" /></span>
        </div>
      </div>
    </div>
</template>

<script>
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
  @import url("../../lib/style/util");

  .redpacket {
    .border(solid, red, 3px, 0, 0, 0);
    .bg(#fff);
    .flex;
    justify-content: flex-start;
    border-radius: 3px;
    height: 1rem;
    & > div{
      height: 0.7rem;
    }
  }

  .r-left{
    .border(dashed, red, 0, 1px, 0, 0);
    width: 0.94rem;
    padding-left: 0.1rem;
    box-sizing: border-box;
    h3{
      .hlh(0.5rem);
      color: red;
      span{
        color: red;
        font-size: 0.3rem;
        font-weight: bold;
      }
    }
    p{
      color: #666;
      font-size: 0.12rem;
    }
  }

  .r-right{
    .flex;
    flex-grow: 1;
    padding-left: 0.1rem;
    justify-content: flex-start;
    .rr-tip{
      position: relative;
      width: 0.6rem;
      align-self: flex-start;
      h3{
        color: red;
        font-size: 0.18rem;
      }
      span{
        display: none;
        .wh(0.7rem);
        position: absolute;
        top: 0;
        right: 0.15rem;
        .icon-style{
          .wh(0.7rem);
        }
      }
    }
    .rr-info{
      flex-grow: 1;
      h3{
        .hlh(0.3rem);
        font-size: 0.16rem;
      }
      p{
        .hlh(0.2rem);
        font-size: 0.12rem;
        color: #666;
      }
    }
  }

  .redpacket.overdue{
    .border(solid, #999, 3px, 0, 0, 0);
    .r-left{
      h3{
        color: #ccc;
        span{
          color: #ccc;
        }
      }
      p{
        color: #ccc;
      }
    }
    .r-right{
      .rr-info{
        *{
          color: #ccc;
        }
      }
    }
    .rr-tip{
      h3{
        display: none;
      }
      span{
        display: block;
      }
    }
  }
</style>
