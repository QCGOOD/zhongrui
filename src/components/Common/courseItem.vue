<template>
  <div class="course-item white">
    <div class="img">
      <img :src="imgHost+item.iconUrl" alt="">
    </div>
    <p class="title">
      {{item.title}}
    </p>
    <p class="type" v-if="item.typeText">
      <span>{{item.typeText}}</span>
      <!-- <span>经济经济学经济学学</span>
      <span>经济经济学学</span>
      <span>经济经济学学</span> -->
    </p>
    <div class="price-sign">
      <p class="price" v-if="item.price">
        <span>学费：</span>
        <span>￥{{item.price}}</span>
      </p>
      <!-- <p class="sign">已报名：
        <span>7</span>
        <span>/</span>
        <span>20</span>
      </p> -->
    </div>
    <!-- <p class="time">开课时间：
      <span v-if="item.startTime">{{item.startTime | dateFormat}}</span>
    </p> -->
    <p class="time">学制：
      <span>{{item.eductionalSystme}}</span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  filters: {
    'dateFormat'(str) {
      str = str.substr(0,10)
      let arr = str.split('-')
      // arr[1] = '年'
      // arr[3] = '月'
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
.course-item {
  padding: 5vw 5vw 0 5vw;
  &:last-child {
    padding-bottom: 0;
  }
  .img{
    width:100%;
    height:40vw;
    overflow:hidden;
    img {
      width: 100%;
    }
  }
  
  .title {
    font-size: 4.5vw;
    margin-top:1vw;
  }
  .type {
    margin-bottom: 1vw;
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
</style>

