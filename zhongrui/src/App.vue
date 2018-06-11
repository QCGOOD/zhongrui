<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$wxSdk.onMenuShare('中睿企业管理','中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。','http://x.wego168.com/zhongrui/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1','http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/008cef2ea40a4143be2aab3113b5d7cb.jpg')
    if (process.env.NODE_ENV == "development") {
      this.apiLogin();
    } else {
      this.$wxSdk.loadJsapiTicketSign();
      this.$wxSdk.hideMenuItems();
    }
    this.$store.dispatch('userSave')
  },
  methods: {
    apiLogin() {
      this.$http
        .post("/member/login/mobile", { mobile: "18570478526", code: 1024 })
        .then(res => {
          this.apiGetOpenId("ogkuh0rsbAzcO8cHLMPiL50rK9lE");
        });
    },
    apiGetOpenId(openId) {
      this.$http.post("/member/openId", { openId }).then(res => {});
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "//at.alicdn.com/t/font_661600_x46hvvjf6vml5wmi.css";

html,body {
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
.loading-layer, .no-data-text.active{
  display: none;
}
.pull-to-refresh-layer{
  display: none;
}
</style>
