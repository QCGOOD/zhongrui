<template>
  <div class="summary-detail" :style="{ 'height': `${height}px`},{'background':`url(${require('../../../static/image/summary-bg.png')}) no-repeat`}">
    <div class="box" :style="{ 'height': `${height}px`}">
      <div class="item-box my">
        <div class="info">
          <div class="left">
            <div class="img">
              <img v-if="feel.headImage" :src="feel.headImage" alt="">
            </div>
            <p>{{feel.name}}</p>
          </div>
          <div class="right">
            <div class="title">
              <span>学习力：{{feel.experienceAmount }} | {{feel.levelName}}</span>
              <div class="rank">
                <img class="dai" src="static/image/dai.png" alt="">
                <div class="hua">
                  <img src="static/image/study.png" alt="">
                  <span>{{feel.level}}</span>
                </div>
              </div>
            </div>
            <p class="text">
              我在加速商学院学习，超过{{feel.studyDays}}天啦，你也快来试试吧~
            </p>
          </div>
        </div>
        <div class="content white">
          <span class="jian"></span>
          <p class="c-text">
            <span>我的课后感&nbsp;：</span>
            <span v-if="feel.content">{{feel.content}}</span>
            <span v-else>{{feel.shortSentence}}</span>
          </p>
          <div class="c-img-box" v-if="feel.imgUrl">
            <div class="img" v-for="(item, i) in feel.imgUrl" :key="i" v-if="item">
              <img :src="imgHost+item" alt="" @click="previewImage(imgHost+item, feel.imgUrl)">
            </div>
          </div>
        </div>
        <div class="btn">
          <!-- <transition  name="fade"> -->
            <p v-show="isLike" @click="apiAddLike(searchData.sourceId)">
              <i class="iconfont icon-zan"></i>
            </p>
          <!-- </transition> -->
          <p v-show="!isLike" style="opacity:.4;" @click="apiDelLike(searchData.sourceId)">
              <i class="iconfont icon-zan"></i>
            </p>
          <div class="footer-zan" v-if="like.list.length > 0">
            <i class="iconfont icon-zan"></i>
            <span class="user-zan" v-for="i in like.list" :key="i">{{i.memberName}}，</span>
            <span class="user-zan">等{{like.total}}人</span>
          </div>
          <!-- <p>
            <i class="iconfont icon-pingluncu"></i>
            <span>32</span>
          </p> -->
        </div>
      </div>
      <!-- v-if="couponId && couponId != '' && !isShare" -->
      <div class="item-box shiting-box" style="backgroun:#fff;" v-if="!isShare && couponId && couponId != ''" >
        <div class="text vux-1px-b">
          <div class="zi">
            <p>本课程附带试听券哦~</p>
            <p>赶紧把学习机会分享给好友们吧！</p>
          </div>
          <button @click="close(true)">立即分享</button>
        </div>
        <div class="yingxiang">
          <div class="left">
            <span>已领（{{couponDetail.receivedMemberQuantity || 0}}）</span>
          </div>
          <div class="right">
            <!-- <span class="iconfont icon-jiantou"></span> -->
            <!-- <span>第12323名 ></span> -->
          </div>
        </div>
      </div>
      <!-- <div class="item-box comment">
        <div class="zan">
          <i class="iconfont icon-zan"></i>
          <span>上的飞机，发神经，似空间，的撒娇等10人</span>
        </div>
        <div class="lun vux-1px-t">
          <div class="l-item" v-for="(item, i) in 4" :key="i">
            <span>胜多负少：</span>
            <span>送的就发生都是金发第三都十分谨慎圣诞节佛教大煞风景</span>
          </div>
        </div>
      </div> -->
      <div class="item-box intro" v-if="review.content">
        <!-- <p class="title">{{review.title}}</p> -->
        <div class="html content" v-html="review.content"></div>
        <!-- <div class="kehougan">
          <span class="jian"></span>
          <p class="k-title vux-1px-b">课后感</p>
          <div class="gan-item" :class="[i > 0 ? 'vux-1px-t' : '']" v-for="(item, i) in 4" :key="i">
            <div class="left">
              <img src="static/image/132.jpg" alt="">
            </div>
            <div class="right">
              <div class="top">
                <p class="name">
                  <span>哈妹</span>
                  <span>企成科技 | 前端</span>
                </p>
                <p class="time">2小时前</p>
              </div>
              <p class="text">d啊富婆ask京东方破碎的咯发票到放假啊 就打算就哦书法家哦都加上哦时点击发送</p>
            </div>
          </div>
          <p class="more vux-1px-t">更多 ></p>
        </div> -->
      </div>
      <div class="item-box receive" v-if="isShare && couponId && couponId != ''">
          <div class="text">
            <div class="zi">
              <p>本课程附带试听券哦~</p>
              <p>
                赶紧把学习机会，分享给好友们吧！
              </p>
            </div>
            <button v-if="couponDetail.available" @click="apiGetCoupon">{{couponDetail.unavailableMessage || '立即领取'}}</button>
            <button v-else style=" opacity: .4;">{{couponDetail.unavailableMessage || '已领完'}}</button>
          </div>
          <div class="yiling">
            <div class="left">
              <span>已领（{{couponDetail.receivedMemberQuantity || 0}}）</span>
            </div>
            <div class="right">
              <div class="img" v-for="i in couponDetail.receivedMembers" :key="i">
                <img :src="i.headImage" alt="">
              </div>
            </div>
            <!-- <i class="iconfont icon-jiantou"></i> -->
          </div>
        </div>
    </div>
    <!-- <div class="send white vux-1px-t" id="input">
      <input class="input"  type="text">
      <span>发送</span>
    </div>
    <div class="receive-popup" v-if="isPopup">
      <div class="receive-box white">
        <p class="title">请输入以下信息</p>
        <div class="input-box">
          <div class="i-item">
            <i class="iconfont icon-wode1"></i>
            <input type="text" placeholder="请输入姓名">
          </div>
          <div class="i-item">
            <i class="iconfont icon-shouji"></i>
            <input type="text" placeholder="请输入手机">
          </div>
          <div class="i-item">
            <i class="iconfont icon-mima"></i>
            <input class="width" type="text" placeholder="请输入验证码">
            <div class="houqu">
              <span>获取</span>
            </div>
          </div>
          <x-button type="primary">确定</x-button>
        </div>
      </div>
      <div class="close">
        <i class="iconfont icon-guanbi1" @click="close(false)"></i>
      </div>
    </div> -->
    <!-- <previewer ref="previewer" :list="previewerList"></previewer> -->
    <div class="popup">
      <x-dialog v-model="isPopup" :dialog-style="{ 'max-width': '100%', width: '100%', height: '100%','background-color': 'transparent'}">
        <img class="shareImg1" src="../../../static/image/shareImg1.png" alt="">
        <img class="shareImg2" src="../../../static/image/shareImg2.png" @click="close(false)">
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XButton, Previewer, XDialog } from 'vux'
import { setTimeout } from 'timers';

export default {
  components: {
    XButton,
    Previewer,
    XDialog
  },
  data () {
    return {
      height: 0,
      isLike: true,
      isPopup: false,
      couponId: null,
      // 是否是通过分享进来的
      isShare: false,
      searchData: {
        sourceId: '',
        pageNum:1,
        pageSize: 6
      },
      user: {},
      like: {
        list: []
      },
      feel: {},
      review: {},
      previewerList: [],
      couponDetail: [],
      isGetCoupon: false,
    }
  },
  created() {
    // this.apiGetUser()
    this.getlessonFeel()
    if(this.$route.query.isShare) this.isShare = true
  },
  mounted () {
    this.getHeight()
    window.onresize = () => {
      this.getHeight()
    }
  },
  methods: {
    getHeight () {
      this.height = window.innerHeight
    },
    close (state) {
      this.isPopup = state
    },
    jumpPage(url) {
      this.$router.push(url);
    },
    previewImage(path, paths) {
      let imgList = []
      paths.map(item => {
        imgList.push(this.imgHost+item)
      })
      this.$wxSdk.previewImage(path, imgList)
      // this.previewerList = imgList
    },
    apiLikeList() {
      this.$http.get('/praise/page', this.searchData).then(res => {
        console.log(res.data.data)
        this.like = res.data.data
        alert(JSON.stringify(res.data.data))
      })
    },
    apiAddLike(id) {
      this.$http.post('/praise/insert', {sourceId: id, sourceType: 1}).then(res => {
        this.isLike = false
        this.apiLikeList()
        alert(JSON.stringify(res.data.data))
      })
    },
    apiDelLike(id) {
      this.$http.post('/praise/delete', {sourceId: id}).then(res => {
        this.isLike = true
        this.apiLikeList()
        alert(JSON.stringify(res.data.data))
      })
    },
    // 领取优惠券
    apiGetCoupon() {
      // if(this.isGetCoupon) return;
      this.$http.post('/coupon', {ruleId: this.couponId}).then(res => {
        // alert(JSON.stringify(res.data))
        if(res.data.code == 20000){
          this.isGetCoupon = true
          setTimeout(() => {
            this.jumpPage(`/order/couponSuccess`)
          }, 500)
        }else{
          this.$vux.toast.text(res.data.message)
        }
        
      })
    },
    apiCouponDetail(id) {
      this.$http.get('/coupon_rule/get', {id: id}).then(res => {
        this.couponDetail = res.data.data
        // alert('优惠券详情', JSON.stringify(res.data.data))
      })
    },
    apiGetUser() {
      this.$http.get("/my/myMsg").then(res => {
        this.user = res.data.data;
      });
    },
    getlessonFeel() {
      this.$http.get('/partakeSenseTemp/get', {id: this.$route.query.id}).then(res => {
        // alert(JSON.stringify(res.data.data))
        console.log('课后感=====',res.data.data)
        this.review = res.data.data.reviewSummary
        this.feel = res.data.data.partakeSense
        this.feel.imgUrl = JSON.parse(this.feel.imgUrl)
        this.searchData.sourceId = res.data.data.reviewSummary.id

        // 获取点赞
        this.apiLikeList()
        // 分享
        let shareUrl = `http://x.wego168.com/zhongrui/mobile/POUND/user/summaryDetail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}`
        if(this.$route.query.actId) shareUrl = `http://x.wego168.com/zhongrui/mobile/POUND/user/summaryDetail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}&actId=${this.$route.query.actId}&isShare=true`
        this.$wxSdk.onMenuShare(
          "中睿企业管理",
          `中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。`,
          shareUrl,
          this.imgHost+this.feel.iconUrl
        )
        // 获取活动
        if(this.$route.query.actId) this.getActi()
      })
    },
    // 获取h活动
    getActi(){
      this.$http.get('/activity/get', {id: this.$route.query.actId}).then(res => {
        if(res.data.data.couponRuleId && res.data.data.couponRuleId != '') {
          this.couponId = res.data.data.couponRuleId
          // 获取优惠券详情
          this.apiCouponDetail(res.data.data.couponRuleId)

          // 分享 -- 试听券
          this.$wxSdk.onMenuShare(
            "中睿企业管理",
            `中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。`,
            `http://x.wego168.com/zhongrui/mobile/POUND/user/summaryDetail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}&actId=${this.$route.query.actId}&isShare=true`,
            'http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/008cef2ea40a4143be2aab3113b5d7cb.jpg'
          );
        }
      })
    },
  },
  
  destroyed() {
    this.$wxSdk.onMenuShare(
      "中睿企业管理",
      "中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。",
      "http://x.wego168.com/zhongrui/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1",
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/008cef2ea40a4143be2aab3113b5d7cb.jpg"
    );
  }
}
</script>

<style lang="less" scoped>

.popup{
  .shareImg1, .shareImg2{
    display: block;
    margin:0 auto;
    margin-bottom:25vw;
  }
  .shareImg1{
    width:80vw;
    margin-top:10vw;
  }
  .shareImg2{
    width:25vw;
  }
}

.summary-detail {
  background: url('../../../static/image/summary-bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .box {
    overflow-y: auto;
    padding: 0 4vw;
    .item-box {
      border-radius: 2.2vw;
      margin-bottom: 4vw;
      &:first-child {
        margin-top: 4vw;
      }

    }
    .my {
      padding: 3vw;
      // background-color: rgb(247, 247, 247);
      background-color: #f2f2f2;
      .info {
        display: flex;
        .left {
          flex-shrink: 0;
          margin-right: 3vw;
          width: 15vw;
          .img {
            width: 15vw;
            height: 15vw;
            border-radius: 50%;
            overflow: hidden;
          }
          p {
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 3.9vw;
            line-height: 1.2;
            margin-top: 1vw;
          }
        }
        .right {
          font-size: 4vw;
          .title {
            position: relative;
            padding-top: 1vw;
            display: inline-block;
            .rank {
              position: absolute;
              right: -7vw;
              top: -5vw;
              text-align: center;
              .dai {
                width: 4.5vw;
                height: 2vw;
                margin-bottom: -2vw;
              }
              .hua {
                width: 6vw;
                height: 6vw;
                position: relative;
                span {
                  position: absolute;
                  font-weight: bold;
                  font-size: 2.9vw;
                  text-align: center;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  line-height: normal;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
          .text {
            margin-top: 2vw;
          }
        }
      }
      .content {
        margin-top: 3vw;
        border: 1px solid @active-color;
        border-radius: 2vw;
        padding: 3vw;
        font-size: 4vw;
        position: relative;
        .jian {
          position: absolute;
          top: -2.2vw;
          left: 8vw;
          transform: scaleX(0.7);
          &:before {
            content: '';
            position: absolute;
            top: 0vw;
            left: 0vw;
            width: 4vw;
            height: 4vw;
            border: 1px solid @active-color;
            background-color: #fff;
            transform: rotateZ(45deg);
          }
          &:after {
            content: '';
            position: absolute;
            top: 2vw;
            left: -2vw;
            width: 8vw;
            height: 3.2vw;
            background-color: #fff;
          }
        }
        .c-text {
          span {
            &:first-child {
              color: @theme-color;
            }
          }
        }
        .c-img-box {
          margin-top: 2vw;
          display: flex;
          flex-wrap: wrap;
          .img {
            width: 24.4vw;
            height: 24.4vw;
            flex-shrink: 0;
            margin-right: 3vw;
            overflow: hidden;
            img{
              width:100%;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
      .btn {
        display: flex;
        // align-items: center;
        // justify-content: center;
        flex-direction: column;
        margin-top: 3vw;
        p {
          width:11vw;
          height:11vw;
          background: @red-color;
          border-radius:50%;
          text-align: center;
          line-height: 11vw;
          margin:0 auto;
          i {
            color: #fff;
            font-size: 6vw;
          }
        }
        .footer-zan{
          font-size:3.8vw;
          color:#777;
          margin-top:1vw;
          i{
            color:@red-color;
            font-size:4vw;
          }
          .user-zan{
            // padding-left:2vw;
          }
        }
        
      }
    }
    .shiting-box {
      border-radius: 2vw;
      overflow: hidden;
      // border: 1px solid @active-color;
      .text {
        background-color: #fff;
        text-align: center;
        .zi {
          padding: 3vw 0;
          text-align: center;
          font-size: 3.8vw;
          p {
            &:first-child {
              color: rgb(114, 14, 0);
            }
          }
        }
        button {
          background-color: @red-color;
          color: #fff;
          font-size: 4vw;
          outline: none;
          border: 0;
          padding: 0 7vw;
          border-radius: 5vw;
          margin-bottom: 3vw;
          height: 10vw;
        }
      }
      .yingxiang {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 12vw;
        font-size:3.9vw;
        padding: 0 3vw;
        background-color: rgb(247, 247, 247);
        position: relative;
        .right {
          // color: @red-color;
          color:@light-color;
        }
        i {
          position: absolute;
          right: 3vw;
          color: @light-color;
        }
      }
    }
    .comment {
      background-color: #fff;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        border-left: 2vw solid transparent;
        border-right: 2vw solid transparent;
        border-bottom: 3vw solid #fff;
        top: -2.8vw;
        right: 7vw;
      }
      .zan {
        font-size: 4vw;
        padding: 2vw 4vw;
        i {
          color: @red-color;
          font-size: 6vw;
        }
      }
      .lun {
        padding: 2vw 4vw;
        .l-item {
          &:not(:last-child) {
            margin-bottom: 1vw;
          }
          span {
            font-size: 4vw;
            &:last-child {
              color: @dark-color;
            }
          }
        }
      }
    }
    .intro {
      background-color: #fff;
      padding: 4vw;
      .title {
        font-size: 4vw;
        margin-bottom: 2vw;
      }
      img {
        margin-bottom: 6vw;
      }
      .context {
        .jieshao {
          .j-title {
            text-align: center;
            color: @yellow-color;
            font-size: 4.4vw;
          }
          .j-img {
            width: 25vw;
            height: 25vw;
            border-radius: 50%;
            overflow: hidden;
            margin: 4vw auto;
          }
          .j-text {
            font-size: 4vw;
            line-height: 2;
            text-indent: 8vw;
            text-align: justify; 
          }
        }
        .jianjie {
          margin-top: 5vw;
          .j-title {
            text-align: center;
            color: @yellow-color;
            font-size: 4.4vw;
            margin-bottom: 4vw;
          }
          .j-text {
            font-size: 4vw;
            line-height: 2;
            text-align: justify; 
            padding-left: 5vw;
          }
        }
      }
      .kehougan {
        border-radius: 2vw;
        // overflow: hidden;
        border: 1px solid @active-color;
        background-color: rgb(247, 247, 247);
        margin-top: 5vw;
        position: relative;
        .jian {
          position: absolute;
          top: -2.2vw;
          left: 8vw;
          transform: scaleX(0.7);
          &:before {
            content: '';
            position: absolute;
            top: 0vw;
            left: 0vw;
            width: 4vw;
            height: 4vw;
            border: 1px solid @active-color;
            background-color: rgb(247, 247, 247);
            transform: rotateZ(45deg);
          }
          &:after {
            content: '';
            position: absolute;
            top: 2.6vw;
            left: -2vw;
            width: 8vw;
            height: 3.2vw;
            background-color: rgb(247, 247, 247);
          }
        }
        .k-title {
          padding: 3vw 4vw;
          font-size: 4vw;
        }
        .gan-item {
          display: flex;
          padding: 3vw 4vw;
          &:before {
            left: 17vw;
          }
          .left{
            width: 10vw;
            height: 10vw;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 3vw;
            flex-shrink: 0;
          }
          .right {
            font-size: 3.9vw;
            .top {
              margin-bottom: 1vw;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .name {
                span:last-child {
                  color: @gray-color;
                }
              }
              .time {
                font-size: 3vw;
                color: @gray-color;
              }
            }
          }
        }
        .more {
          text-align: center;
          line-height: 13vw;
          color: @red-color;
          font-size: 4vw;
          &:before {
            left: 17vw;
          }
        }
      }
    }
  }
  .receive {
    border-radius: 2vw;
    overflow: hidden;
    // border: 1px solid @active-color;
    .text {
      background-color: rgb(237, 228, 216);
      text-align: center;
      .zi {
        padding: 3vw 0;
        text-align: center;
        font-size: 4vw;
        p {
          &:first-child {
            color: rgb(114, 14, 0);
          }
          &:last-child {
            span {
              font-weight: bold;
              margin: 0 -1vw;
            }
          }
        }
      }
      button {
        background-color: @red-color;
        color: #fff;
        font-size: 4vw;
        outline: none;
        border: 0;
        padding: 0 7vw;
        border-radius: 5vw;
        margin-bottom: 3vw;
        height: 10vw;
      }
    }
    .yiling {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 12vw;
      padding: 0 3vw;
      background-color: rgb(247, 247, 247);
      position: relative;
      .right {
        display: flex;
        padding-right: 10vw;
        .img {
          width: 8vw;
          height: 8vw;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ffffff;
          box-sizing: border-box;
          margin-left: -2vw;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 100%;
          }
        }
      }
      i {
        position: absolute;
        right: 3vw;
        color: @light-color;
      }
    }
  }
  .send {
    height: 14vw;
    padding: 0 4vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .input {
      border: 1px solid @light-color;
      border-radius: 1vw;
      font-size: 4vw;
      height: 9vw;
      // outline: none;
      margin: 2.5vw 0;
      width: 80vw;
      padding: 0 2vw;
      box-sizing: border-box;
    }
    span {
      width: 10vw;
      text-align: right;
      display: inline-block;
    }
  }
  .receive-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    .receive-box {
      width: 76vw;
      border-radius: 1vw;
      padding-bottom: 5vw;
      .title {
        font-size: 4vw;
        padding: 4vw 0;
        text-align: center;
      }
      .input-box {
        padding: 0 5vw;
        .i-item {
          border: 1px solid @light-color;
          margin-bottom: 3vw;
          height: 10vw;
          line-height: 10vw;
          padding: 0 2vw;
          display: flex;
          i {
            color: @red-color;
            font-size: 4vw;
            margin-right: 3vw;
          }
          input {
            outline: none;
            border: 0;
            font-size: 3.8vw;
          }
          .width {
            width: 40vw;
          }
          .houqu {
            display: inline-block;
            font-size: 3.6vw;
            color: @red-color;
            width: 12vw;
            text-align: right;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              border-left: 1px solid @red-color;
              left: 0;
              top: 2.5vw;
              bottom: 2.5vw;
            }
          }
        }
      }
    }
    .close {
      text-align: center;
      color: #fff;
      position: relative;
      height: 14vw;
      padding-top: 5vw;
      i {
        font-size: 8vw;
      }
      &:before {
        position: absolute;
        content: '';
        width: 1px;
        border-left: 1px solid #fff;
        left: 50%;
        top: 0vw;
        bottom: 10vw;
      }
    }
  }
}
</style>
