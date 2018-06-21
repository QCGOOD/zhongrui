<template>
  <div id="app">
    <div v-if="!isFollow" class="follow" @click="showDialogStyle = true">您还没有关注哦，点击关注~</div>
    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'overflow-y': 'auto'}">
        <div class="img-box">
          <img :src="imgHost+qrUrl" style="max-width:100%">
          <i class="iconfont icon-guanbi1 close" @click="showDialogStyle = false"></i>
        </div>
      </x-dialog>
    </div>
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
import { XDialog, TransferDomDirective as TransferDom } from 'vux';

export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog
  },
  name: "App",
  data() {
    return {
      showDialogStyle: false,
      isFollow: true,
      qrUrl: '',
    };
  },
  name: "App",
  created() {
    this.apiOpenFollow();
    this.$wxSdk.onMenuShare(
      "中睿企业管理",
      "中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。",
      "http://x.wego168.com/zhongrui/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1",
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/008cef2ea40a4143be2aab3113b5d7cb.jpg"
    );
    if (process.env.NODE_ENV == "development") {
      this.apiLogin();
    } else {
      this.$wxSdk.loadJsapiTicketSign();
      this.$wxSdk.hideMenuItems();
    }
    this.$store.dispatch("userSave");
  },
  methods: {
    apiLogin() {
      this.$http
        .post("/member/login/mobile", { mobile: "18570478526", code: 1024 })
        .then(res => {
          // this.apiGetOpenId("ogkuh0rsbAzcO8cHLMPiL50rK9lE");
        });
    },
    apiGetOpenId(openId) {
      this.$http.post("/member/openId", { openId }).then(res => {});
    },
    apiOpenFollow() {
      this.$http.get("/app_wechat_config").then(res => {
        this.qrUrl = res.data.data.wechatSubscribeQrcode
          if(res.data.data.isSubscribeGuidenceEnabled){
            this.apiFollow()
          }
      });
    },
    apiFollow() {
      this.$http.get("/member/subscribe_status").then(res => {
        this.isFollow = res.data.data;
      });
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "//at.alicdn.com/t/font_661600_x46hvvjf6vml5wmi.css";

html,
body {
  background-color: #f2f2f2 !important;
}
img {
  width: 100%;
}
input {
  -webkit-appearance: none;
}
ul {
  list-style: none;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
}
.white {
  background-color: white;
}
.loading-layer,
.no-data-text.active {
  display: none;
}
.pull-to-refresh-layer {
  display: none;
}

.follow {
  position: fixed;
  bottom: 25vw;
  right: 4vw;
  z-index: 999;
  display: inline-block;
  font-size: 3.6vw;
  text-align: center;
  line-height: 2.5;
  color: #fff;
  background-color: rgba(226, 81, 60,.6);
  border-radius: 10vw;
  box-shadow: 1px 1px 3px 0 @red-color;
  padding: 0 4vw;
}
.img-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  background: #fff;
  border-radius: 10vw;
  padding: 3vw;
  box-sizing: border-box;

  .close {
    content: " ";
    position: absolute;
    top: -18vw;
    left: 50%;
    font-size: 8vw;
    color: #fff;
    margin-left: -4vw;
  }
  &::after {
    content: " ";
    position: absolute;
    top: -10vw;
    left: 50%;
    border: 1px solid #fff;
    height: 10vw;
  }
}
</style>
