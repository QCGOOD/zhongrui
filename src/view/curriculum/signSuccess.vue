<template>
  <div class="sign-success">
    <div class="success white">
      <div class="gou">
        <i class="iconfont icon-chenggong"></i>
        <p>您已经成功购买该活动</p>
        <p class="desc">您的学习力+10，保持努力哦~</p>
      </div>
      <div class="sum">
        <div class="item">
          <p>已参加活动</p>
          <p><span>11</span>个</p>
        </div>
        <div class="item">
          <p>待参加活动</p>
          <p><span>11</span>个</p>
        </div>
      </div>
      <div class="qrcode">
        <div class="left">
          <p>长按识别二维码关注</p>
          <p>加速商学院</p>
          <p>在这里，收获您的知识与梦想！</p>
        </div>
        <div class="right">
          <img src="static/image/zanwei.jpg" alt="">
        </div>
      </div>
    </div>
    <qc style="position: fixed;width: 100%;bottom: 0;"></qc>
  </div>
</template>

<script>
import Qc from '../Common/qc'

export default {
  components: {
    Qc
  }
}
</script>

<style lang="less" scoped>
.sign-success {
  .success {
    margin: 10vw 5vw 5vw 5vw;
    border-radius: 1vw;
    position: relative;
    .user {
      position: absolute;
      left: 0;
      right: 0;
      top: -7vw;
      text-align: center;
      .img {
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
      }
      p {
        font-size: 4vw;
        margin-top: 1vw;
      }
    }
    .gou {
      padding: 10vw 0;
      text-align: center;
      color: rgb(104, 192, 0);
      i {
        font-size: 14vw;
        margin-right: 3vw;
      }
      span {
        font-size: 4.5vw;
        line-height: 15vw;
      }
    }
    .sum {
      margin: 5vw 0;
      padding: 0 8vw;
      display: flex;
      justify-content: space-around;
      line-height: 1.2;
      .item {
        text-align: center;
        p {
          font-size: 4vw;
          &:last-child {
            font-size: 3.2vw;
            color: @gray-color;
            span {
              color: rgb(51, 51, 51);
              font-weight: bold;
              font-size: 12vw;
            }
          }
        }
      }
    }
    .desc {
      margin-top: 1vw;
      text-align: center;
      height: 10vw;
      line-height: 10vw;
      color: @gray-color;
      font-size: 3.8vw;
    }
    .qrcode {
      // height: 35vw;
      background-color: rgb(104, 192, 0);
      color: #fff;
      display: flex;
      padding: 4vw 3vw;
      border-bottom-left-radius: 2vw;
      border-bottom-right-radius: 2vw;
      .left {
        display: inline-flex;
        flex-flow: column;
        justify-content: center;
        align-content: center;
        p {
          text-align: center;
          font-size: 3.6vw;
          &:first-child {
            letter-spacing: 1.2vw;
          }
          &:nth-child(2) {
            padding: 1vw 0;
            font-size: 7vw;
            font-weight: bold;
            letter-spacing: 2vw;
          }
        }
      }
      .right {
        width: 30vw;
        height: 30vw;
        flex-shrink: 0;
        margin-left: 2vw;
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>
