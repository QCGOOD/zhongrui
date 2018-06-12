<template>
  <!-- <div :style="{'height':`${height}px`}"> -->
    <!-- lock-x height="-60px" -->
    <!-- <scroller v-if="courseList.length > 0" :on-infinite="loadMore" :on-rsefresh="refresh" ref="myscroller">
      
    </scroller> -->
    <!-- <div v-else class="null">暂无数据</div> -->
    <!-- <img style="width: 78%;position: absolute;top: 50%;transform: translate(-50%,-50%);left: 50%;" src="static/image/bg.png" alt="" srcset=""> -->
  <!-- </div> -->
  <!-- <div :style="{'height':`${height}px`}"> -->
    <scroller v-if="courseList.length > 0" :on-infinite="loadMore" :on-refresh="refresh" ref="myscroller">
      <course-item class="course-item" v-for="(item, i) in courseList" :key="i" @click.native="toDetail(item.id)" :item="item"></course-item>
    </scroller>
    <div v-else class="null">暂无数据</div>
  <!-- </div> -->
</template>

<script>
import CourseItem from '@/components/Common/courseItem'
import { Tab, TabItem } from "vux";
export default {
  components: {
    CourseItem,
    Tab,
    TabItem
  },
  data () {
    return {
      height:0,
      noData: true,
      courseList: [],
      searchData: {
        pageNum: 1
      }
    }
  },
  created () {
    // this.getLessonList()
  },
  mounted () {
    this.getHeight()
    window.onresize = () => {
      this.getHeight();
    }
  },
  methods: {
    getHeight() {
      this.height = window.innerHeight;
    },
    toDetail (id) {
      this.$router.push(`/curriculum/detail?id=${id}`)
    },
    getLessonList () {
      this.$http
      .get('/course/page')
      .then(res => {
        console.log('课程',res)
        this.courseList = res.data.data.list
      })
    },
    loadMore(done) {
      console.log('上拉')
      if(this.noData) {
        this.$nextTick(() => {
          this.$refs.myscroller.finishInfinite(2);
        })
        return;
      }
      
      // let self = this;
      // let start = this.list.length;
      // let list = this.list,
      //     page = this.searchData.pageNum,
      //     size = this.searchData.pageSize;
      // 总页数
      // let totalPage = total % size == 0 ? total / size : Math.ceil(total / size) ;
      // // console.log(original,list,resData)
      // if(page == 1) list = [];
      
      // if(page >= totalPage){
  //       this.arr = list.concat(resData);
  //       this.noData = true;
      // }else{
  //       this.arr = list.concat(resData);
  //       this.noData = false;
  //       this.searchData.pageNum = page + 1;
      // }
      setTimeout(() => {
        // let item = {date: '2018.05.28 08:00-09:00', lesson: '《一不小心进了艺术圈》曹启泰的10唐艺术课堂'};
        // for(let i = start + 1; i < start + 10; i++) {
        //   self.list.push(item)
        // }
        // if(start > 30) {
        //   self.noData = true;
        // }
        self.$refs.myscroller.resize();
        done()
      }, 1500)
    },
    refresh(done) {
      console.log('下拉');
      this.searchData.pageNum = 1;
      this.getLessonList()
      let timeOut = setTimeout(()=>{
        // 停止下拉刷新
        // this.$refs.myscroller.finishPullToRefresh()
        done() 
      }, 500)
    },
  },
}
</script>
<style lang="less" scoped>

.null{
  text-align: center;
  color: #808080;
  font-size: 15px;
  padding-top: 45vh;
}

</style>