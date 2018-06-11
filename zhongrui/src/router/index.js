import Vue from 'vue'
import Router from 'vue-router'
import activity from "./activity";
import user from "./user";
import curriculum from "./curriculum";
Vue.use(Router)
const BASE = '/accelerator/mobile'

export default new Router({
  // mode: 'history',
  // base: BASE,
  routes: [
    {
      path: '/',
      redirect: '/activity',
      component: resolve => require(['@/components/tabbar'], resolve),
      children: [
        // 活动
        {
          path: '/activity',
          component: resolve => require(['@/view/activity/index'], resolve),
          meta: {
            title: '中睿企业管理'
          }
        },
        // 课程
        {
          path: '/curriculum',
          component: resolve => require(['@/view/curriculum/index'], resolve)
        },
        // 我的
        {
          path: '/user',
          component: resolve => require(['@/view/user/index'], resolve),
          meta: {
            title: '个人中心'
          }
        },
      ]
    },
    // 活动的路由
    ...activity,
    // 课程路由
    ...curriculum,
    // 用户的路由
    ...user,
    // 订单确认
    {
      path: '/order/confirm',
      component: resolve => require(['@/view/order/confirm'], resolve),
      meta: {
        title: '活动报名'
      }
    },
    // 课程报名成功
    {
      path: '/order/success',
      component: resolve => require(['@/view/order/success'], resolve)
    },
    // 试听券领取成功
    {
      path: '/order/couponSuccess',
      component: resolve => require(['@/view/order/couponSuccess'], resolve)
    },
    // 帮助
    {
      path: '/user/help',
      component: resolve => require(['@/components/User/help'], resolve)
    },
    // 历史
    {
      path: '/user/history',
      component: resolve => require(['@/components/User/history'], resolve)
    },
    // 班级
    {
      path: '/user/class',
      component: resolve => require(['@/components/User/class'], resolve)
    },
    // 收藏
    {
      path: '/user/collect',
      component: resolve => require(['@/components/User/collect'], resolve)
    },

    // 排行
    {
      path: '/user/rank',
      component: resolve => require(['@/components/User/rank'], resolve)
    },
    // 领券
    {
      path: '/receiveSuccess',
      component: resolve => require(['@/components/receiveSuccess'], resolve)
    },
    // 适用活动
    {
      path: '/user/coupon/apply',
      component: resolve => require(['@/components/User/apply'], resolve)
    },
  ],

})
