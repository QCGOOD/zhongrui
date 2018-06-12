const user = [
  // 签到
  {
    path: '/user/sign',
    component: resolve => require(['@/view/user/sign'], resolve),
    meta: {
      title: '签到'
    }
  },
  {
    path: '/user/signs',
    component: resolve => require(['@/view/user/signs'], resolve),
    meta: {
      title: '签到'
    }
  },
  // 我的活动
  {
    path: '/user/activity',
    component: resolve => require(['@/view/user/activity'], resolve),
    meta: {
      title: '我的活动'
    }
  },
  // 我的优惠券
  {
    path: '/user/coupon',
    component: resolve => require(['@/view/user/coupon'], resolve),
    meta: {
      title: '我的优惠券'
    }
  },
  // 我的日程
  {
    path: '/user/mySchedule',
    component: resolve => require(['@/view/user/mySchedule'], resolve),
    meta: {
      title: '我的日程'
    }
  },
  // 我的日历
  {
    path: '/user/calendar',
    component: resolve => require(['@/view/user/calendar'], resolve),
    meta: {
      title: '日历'
    }
  },
  // 回顾列表
  {
    path: '/user/summary',
    component: resolve => require(['@/view/User/summary'], resolve)
  },
  // 课回顾详情
  {
    path: '/user/summaryDetail',
    component: resolve => require(['@/view/user/summaryDetail'], resolve)
  },
  // 课程小结详情
  {
    path: '/user/receive',
    component: resolve => require(['@/view/user/receive'], resolve)
  },
]
export default user;
