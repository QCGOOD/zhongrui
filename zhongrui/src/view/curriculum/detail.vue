<template>
  <div class="detail">
    <div class="context">
      <div class="img">
        <img :src="imgHost+detail.iconUrl" alt="">
      </div>
      
      <div class="title-box white">
        <div class="title-top vux-1px-b">
          <p class="title">{{detail.title}}</p>
          <p class="type" v-if="detail.typeText">
            <span>{{detail.typeText}}</span>
            <!-- <i class="iconfont icon-shoucang"></i> -->
          </p>
          <div class="price-sign">
            <p class="price" v-if="detail.price">
              <span>学费：</span>
              <span>￥{{detail.price}}</span>
            </p>
            <!-- <p class="sign">已报名：
              <span>7</span>
              <span>/</span>
              <span>20</span>
            </p> -->
          </div>
          <!-- <p class="time">开课时间：
            <span v-if="detail.startTime">{{detail.startTime | dateFormat}}</span>
          </p> -->
          <p class="time">学制：
            <span>{{detail.eductionalSystme}}</span>
          </p>
        </div>
        <!-- <div class="address">
          <div class="item">
            <p class="iconfont icon-laiyuan1">2018年7月-2019年4月</p>
          </div>
          <div class="item">
            <p class="iconfont icon-laiyuan1">的设计费设计哦i发哦i哦啊时空法卡刷饭卡泡芙拍卡牌是分开就</p>
          </div>
        </div>
      </div>
      <div class="sign-up-box white">
        <div class="item sign-up vux-1px-b">
          <div class="left">
            <i class="iconfont icon-baoming"></i>
            <span>已报名 （7/65）</span>
          </div>
          <div class="right">
            <div class="img" v-for="i in 5" :key="i">
              <img src="static/image/132.jpg" alt="">
            </div>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </div>
        <div class="item">
          <i class="iconfont icon-pinglun"></i>
          <span>评论 （3）</span>
          <i class="iconfont icon-jiantou"></i>
        </div>-->
      </div> 
      <div class="intro white">
        <p class="title iconfont icon-jianjie vux-1px-b">课程详情</p>
        <div  v-if="detail.content" class="html" v-html="detail.content"></div>
      </div>
    </div>
    <div class="bottom-sign vux-1px-t">
      <div class="left" @click="$router.go(-1)">
        <i class="iconfont icon-kecheng2"></i>
        <p>更多课程</p>
      </div>
      <!-- 微信中 #mp.weixin.qq.com  -->
      <a class="right" :href="`tel:${detail.contactPhone}`">
        我要咨询
        <!-- <div class="right">
          我要咨询
        </div> -->
      </a>
    </div>
    <div>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div style="padding:15px;">
          <x-button type="primary">show toast</x-button>
        </div>
        <div @click="showToast=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XDialog, XButton } from 'vux'

export default {
  components: {
    Group, Cell, XDialog, XButton
  },
  data () {
    return {
      showToast: '',
      detail: { 
        // id: 'fssdfssdf', 
        // title: '到附近披萨叫批发商佛啊手机费怕视频地方', 
        // iconUrl: 'static/image/3.jpg', 
        // typeText: '经济学', 
        // startTime: 'dsfsfsdfdsfd', 
        // price: 2432 ,
        // content: '<h3>课程详情</h3>'
      },
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    test () {
      var reads= new FileReader()
      let f = document.getElementById('btn_file').files[0]
      console.log(f)
    },
    getDetail() {
      console.log('==============',this.$route.query.id)
      this.$http
      .get('/course/get', {id: this.$route.query.id})
      .then(res => {
        console.log('详情', res)
        this.detail = res.data.data
        this.detail.content = this.detail.content.replace(/width: 100%;/g, '')
      })
    }
  },
  filters: {
    'dateFormat'(str) {
      str = str.substr(0,10)
      let arr = str.split('-')
      // arr[1] = '年'
      // arr[2] = '月'
      // arr[5] = '日'
      arr.splice(1,0,'年')
      arr.splice(3,0,'月')
      arr.splice(5,0,'日')
      str = arr.join('')
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.white {
  background-color: white;
}
.detail {
  .context {
    margin-bottom: 15vw;
    .img {
      width:100%;
      height:40vw;
      line-height: 0;
      overflow:hidden;
      img {
        width: 100%;
      }
    }
    .title-box {
      .title-top {
        padding: 2vw 4vw;
        .title {
          font-size: 4.5vw;
        }
        .type {
          margin-bottom: 1vw;
          position: relative;
          padding-right: 5vw;
          span {
            background-color: rgb(211, 194, 165);
            display: inline-block;
            padding: 0 2vw;
            color: #fff;
            border-radius: 1vw;
            font-size: 3.4vw;
            height: 5vw;
            line-height: 5vw;
            margin-right: 2vw;
            &:last-child {
              margin-right: 0;
            }
          }
          .icon-shoucang {
            position: absolute;
            right: 0;
            color: @light-color;
            font-size: 5vw;
          }
        }
        .price-sign {
          font-size: 3.6vw;
          display: flex;
          justify-content: space-between;
          .price {
            span:nth-child(2) {
              color: @theme-color;
            }
            span:last-child {
              color: @dark-color;
              text-decoration: line-through;
            }
          }
          .sign {
            color: @gray-color;
            span:first-child {
              color: #000;
            }
          }
        }
        .time {
          font-size: 3.6vw;
          span {
            color: @dark-color;
          }
        }
      }
      .address {
        padding: 2vw;
      }
    }
    .sign-up-box {
      margin-top: 4vw;
      padding-left: 4vw;
      .item {
        padding: 3vw 0;
        position: relative;
        .iconfont {
          font-size: 5vw;
          color: @red-color;
          margin-right: 2vw;
        }
        span {
          font-size: 4vw;
        }
        .icon-jiantou {
          position: absolute;
          right: 2vw;
          top: 50%;
          transform: translateY(-50%);
          color: @gray-color;
          font-size: 4vw;
        }
      }
      .sign-up {
        display: flex;
        justify-content: space-between;
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
      }
    }
    .intro {
      margin-top: 4vw;
      .title {
        padding: 3vw 4vw;
        font-size: 4vw;
        display: flex;
        align-items: center;
        &:before {
          font-size: 5vw;
          margin-right: 4vw;
          color: @red-color;
        }
      }
      .html {
        padding: 3vw;
      }
    }
  }
  .bottom-sign {
    height: 15vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    .left {
      width: 35vw;
      background-color: rgb(248, 248, 248);
      color: @theme-color;
      display: inline-flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 4.5vw;
      }
      p {
        font-size: 3.6vw;
      }
    }
    .right { 
      width: 65vw;
      background-color: @theme-color;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 4.5vw;
      color: #fff;
    }
  }
}
</style>
