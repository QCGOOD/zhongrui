<template>
  <div class="summary-item white">
    <div class="img">
      <img :src="imgHost+item.iconUrl" alt="">
    </div>
    <div class="info">
      <p class="title">{{item.title}}</p>
      <div class="time-price">
        <span class="time">{{item.createTime.substr(0,16)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  }
}
</script>

<style lang="less" scoped>
.summary-item {
  display: flex;
  padding: 3vw 4vw;
  .img {
    width: 26vw;
    height: 22vw;
    border-radius: 2vw;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 4vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      font-size: 4vw;
      line-height: 1.4;
    }
    .time-price {
      display: flex;
      justify-content: space-between;
      padding-top: 1vw;
      .time {
        color: @gray-color;
        font-size: 3.6vw;
      }
    }
  }
}
</style>

