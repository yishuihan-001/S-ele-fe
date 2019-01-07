<template>
  <div class="container home">
    <Header>
      <div slot="left" class="f16 cf h-logo" @click="reload">ele.me</div>
      <router-link slot="right" class="f16 cf c-right" to="/profile" v-if="userInfo">
        <i class="flex"><SvgIcon class="icon-style" iconName="user"/></i>
      </router-link>
      <router-link slot="right" class="f16 cf h-right" to="/login" v-else>登录/注册</router-link>
    </Header>
    <div class="main" id="scrollWrap">
      <div class="scroll-wrap">
        <div class="h-curr bf">
          <div class="flex">
            <span class="c6">当前定位城市：</span>
            <span class="c9">定位不准时，请在城市列表中选择</span>
          </div>
          <router-link tag="div" :to="'/city/' + (currCity && currCity.id)" class="flex">
            <span class="hc-site f16">{{currCity && currCity.name}}</span>
            <span class="hc-arrow flex">
              <SvgIcon class="icon-style" iconName="arrow-right" />
            </span>
          </router-link>
        </div>

        <div class="h-hot bf">
          <p class="c6">热门城市</p>
          <ul class="oh">
            <li v-for="(item, index) in cityHot" :key="index" @click="setCityGo(item)">{{item.name}}</li>
          </ul>
        </div>

        <ul class="h-all oh">
          <li v-for="(item, index) in cityGroup" :key="index">
            <p>{{index}}<span v-if="index === 0">（按字母排序）</span></p>
            <div>
              <span v-for="(it, i) in item" :key="i" @click="setCityGo(it)">{{it.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Api from '@src/service/api'
import Res from '@src/service/res'
import Header from '@src/components/header'

export default {
  data () {
    return {
      cityHot: [], // 热门城市
      cityGroup: [], // 城市列表
      scrollObj: null
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
    ...mapState([ 'userInfo', 'currCity' ])
  },
  methods: {
    ...mapMutations([ 'Set_UserInfo', 'Set_CurrCity' ]),

    // 设置当前城市并前往
    setCityGo (item) {
      this.Set_CurrCity(item)
      this.$router.push('/city/' + item.id)
    },

    async initData () {
      try {
        // 获取当前城市
        let res1 = await Api.getCity({ type: 'guess' })
        Res(res1, data => {
          this.Set_CurrCity(data)
        })

        // 获取热门城市
        let res2 = await Api.getCity({ type: 'cityHot' })
        Res(res2, data => {
          this.cityHot = data
        })

        // 获取城市列表
        let res3 = await Api.getCity({ type: 'cityGroup' })
        Res(res3, data => {
          let sortobj = {}
          for (let i = 65; i <= 90; i++) {
            if (data[String.fromCharCode(i)]) {
              sortobj[String.fromCharCode(i)] = data[String.fromCharCode(i)]
            }
          }
          this.cityGroup = sortobj
          this.$nextTick(() => {
            if (!this.scrollObj) {
              /* eslint-disable no-new */
              this.scrollObj = new BScroll('#scrollWrap', {
                deceleration: 0.001,
                bounce: true,
                swipeTime: 1800,
                click: true
              })
            } else {
              this.scrollObj.refresh()
            }
          })
        })
      } catch (err) {
        Toast(err.message || '初始化数据失败')
      }
    },

    async reload () {
      // window.location.reload()
      try {
        let resObj = await Api.userSignout()
        Res(resObj, () => {
          this.Set_UserInfo(null)
          Toast('您已退出登录')
        })
      } catch (err) {
        Toast(err.message || '退出登录失败')
      }
    }
  },
  watch: {

  }
}
</script>

<style lang="less" scoped>
@import url("../../../lib/style/util");

.home {

}
.c-right{
  margin-right: 0.1rem;
}
.h-logo {
  .hlh(0.45rem);
  padding: 0 0.1rem;
}
.h-right {
  padding-right: 0.1rem;
}

.h-curr {
  .border(solid, #ccc, 0, 0, 1px, 0);
  margin-bottom: 0.15rem;
  & > div {
    .hlh(0.4rem);
    .border(solid, #eee, 0, 0, 1px, 0);
    padding: 0 0.1rem;
    justify-content: space-between;
    .hc-site{
      color: @c-blue;
    }
    .hc-arrow {
      .wh(0.4rem);
    }
  }
}

.h-hot{
  .border(solid, #ccc, 1px, 0, 1px, 0);
  margin-bottom: 0.15rem;
  p{
    .hlh(0.36rem);
    padding: 0 0.1rem;
  }
  li{
    .wh(25%, 0.36rem);
    .ellipsis;
    .border(solid, #eee, 1px, 1px, 0, 0);
    float: left;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.36rem;
    color: @c-blue;
    font-size: 0.16rem;
  }
}

.h-all{
  .bg(#f0f0f0);
  li{
    .bg(#fff);
    .border(solid, #ccc, 1px, 0, 1px, 0);
    margin-bottom: 0.15rem;
    p{
      .hlh(0.32rem);
      .border(solid, #eee, 0, 0, 1px, 0);
      padding: 0 0.1rem;
      color: #666;
      span{
        font-size: 0.12rem;
        color: #999;
      }
    }
    div{
      overflow: hidden;
      span{
        .wh(25%, 0.36rem);
        .ellipsis;
        .border(solid, #eee, 0, 1px, 1px, 0);
        line-height: 0.36rem;
        color: #666;
        float: left;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
