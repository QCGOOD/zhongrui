// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ToastPlugin, LoadingPlugin, VuxComponentListData } from 'vux'
import VueScroller from 'vue-scroller'
import App from './App'
import router from './router'
import store from './store'
import Qc from "./components/Common/qc";
import wxSdk from "./util/wxSdk";
const FastClick = require('fastclick')
import http from "./api/http";
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueScroller)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(require('vue-wechat-title'))
Vue.component(Qc.name, Qc)
Vue.prototype.$http = http
Vue.prototype.$wxSdk = wxSdk
Vue.prototype.imgHost = 'http://athena-1255600302.cosgz.myqcloud.com'
Vue.prototype.imgCut = 'http://athena-1255600302.picgz.myqcloud.com'
Vue.prototype.cutParam1 = '?imageView2/1/w/200/h/164'
Vue.prototype.toast = function (text) {
  this.$vux.toast.show({
    text: text,
    type: 'text',
    time: 2000
  })
};
/* eslint-disable no-new */

Vue.filter('formatDate', (v) => {
  return v.replace(/^(.{16})(.*)/g, '$1')
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
