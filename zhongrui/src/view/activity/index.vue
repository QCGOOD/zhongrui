<template>
  <div>
    <swiper :list="imgList"></swiper>
    <div class="act-type-scroller white">
      <div v-if="categorys.length == 0">
        <skeleton-block></skeleton-block>
      </div>
      <scroller v-else lock-y :scrollbar-x="false">
        <div class="type-box" :style="{ 'width': `${typeWidth}vw`}">
          <div class="item" v-for="item in categorys" :key="item.id" @click="jumpPage(`/activity/list?id=${item.id}`)">
            <img :src="`${imgHost}${item.iconUrl}`" alt="">
            <div class="text" v-if="item.name.length == 4">{{item.name}}</div>
            <div class="text" v-else style="padding: 0 4vw">{{item.name}}</div>
          </div>
        </div>
      </scroller> 
    </div>
    <div class="lately-act white">
      <p class="title">
        <span>近期活动</span>
        <span @click="jumpPage('/activity/list')">全部
          <i class="iconfont icon-jiantou"></i>
        </span>
      </p>
      <div v-if="list.length == 0">
        <list-skeleton v-for="i in 3" :key="i"></list-skeleton>
      </div>
      <div v-else>
        <act-item v-for="(item, i) in list" :key="i" :item="item" @click.native="jumpPage(`/activity/detail?id=${item.id}`)"></act-item>
      </div>
    </div>
    <qc></qc>
  </div>
</template>

<script>
import { Scroller, Swiper } from "vux";
// import Swiper from "@/components/Common/Swiper";
import ActItem from "@/components/Common/actItem";
import listSkeleton from "@/components/skeleton/list-skeleton";
import skeletonBlock from "@/components/skeleton/block";

export default {
  components: {
    Scroller,
    ActItem,
    Swiper,
    listSkeleton,
    skeletonBlock
  },
  data() {
    return {
      imgList: [{ img: "static/image/3.jpg" }, { img: "static/image/4.jpg" }],
      list: [],
      categorys: [],
      typeWidth: 0,
    };
  },
  created() {
    this.$wxSdk.onMenuShare(
      "中睿企业管理",
      "中睿企业管理通过游学、拓展、企业咨询的方式，致力于为在企业管理中遇到瓶颈和难题的企业提供专业有效的解决方案，为更多企业带来新的目标和希望。",
      "http://x.wego168.com/zhongrui/mobile/POUND/activity?wo=1&wot=2&woacm=1&mpl=1",
      "http://athena-1255600302.cosgz.myqcloud.com/attachments/activity/008cef2ea40a4143be2aab3113b5d7cb.jpg"
    );
    this.apiGetCategorys();
    this.apiGetActives();
  },
  mounted() {
    window.onresize = () => {
      this.typeWidth = this.categorys.length * 24 - 4;
    };
  },
  methods: {
    apiGetCategorys() {
      this.$http
        .get("/category/listByTypeAndParent", {
          type: 3,
          parentId: "40914b72bc094ae18646f607e1cbb2fd"
        })
        .then(res => {
          this.categorys = res.data.data;
          this.typeWidth = this.categorys.length * 24 - 4;
        });
    },
    apiGetActives() {
      this.$http.get("/activity/recentPage").then(res => {
        this.list = res.data.data.list;
      });
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less" scoped>
.act-type-scroller {
  .type-box {
    display: flex;
    // width: 210vw;
    width: 100%;
    padding: 4vw;
    .item {
      flex-shrink: 0;
      width: 20vw;
      height: 20vw;
      margin-right: 4vw;
      border-radius: 2vw;
      overflow: hidden;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .text {
        color: #fff;
        width: 20vw;
        height: 20vw;
        position: relative;
        font-size: 4vw;
        padding: 0 5vw;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        text-align: center;
      }
    }
  }
}
.lately-act {
  margin-top: 5vw;
  .title {
    padding: 10px 0 10px 5vw;
    font-size: 4.2vw;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    span:last-child {
      font-size: 4vw;
      color: #a56801;
      padding: 1vw 3vw;
      border-top-left-radius: 5vw;
      border-bottom-left-radius: 5vw;
      line-height: 1;
      i {
        font-size: 3.8vw;
      }
    }
    &:before {
      position: absolute;
      content: "";
      top: 3vw;
      bottom: 3vw;
      left: 0;
      border-left: 5px solid @primary-color;
    }
  }
}
</style>
