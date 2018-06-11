<template>
	<div v-if="type">
		<div class="picture" v-if="imgList.length > 0">
			<swiper>
				<swiper-item class="swiper-item-img" v-for="(item, index) in imgList" :key="index" @click.native="goDetail(item.id)">
					<img :src="item.img" width="100%">
					<div class="title">
						<p :style="{width: iconRight + 'px'}">{{item.title}}</p>
					</div>
				</swiper-item>
			</swiper>
		</div>
	</div>
	<div v-else>
		<div class="picture" v-if="imgList.length > 0">
			<swiper loop auto :list="imgList" dots-position="center"></swiper>
		</div>
	</div>
		
</template>

<script>
import { Swiper, SwiperItem } from "vux";
// import api from '../../api/api'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    moduleName: String,
    type: Boolean
  },
  data() {
    return {
      iconRight: 0,
      // imgList: [],
      imgList: [
        { img: "static/image/2.png" },
        { img: 'static/image/3.png' },
      ]
    };
  },
  created() {
    // this.getCarousel()
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: this.moduleName + "Detail",
        params: { id: id }
      });
    },
    getCarousel() {
      let params = {
        categoryId: this.moduleName ? this.moduleName + "Img" : this.moduleName
      };
      api.getCarousel(params).then(res => {
        if (res.data) {
          // console.log(res.data)
          let ImgData = res.data;
          if (this.type) {
            this.imgList = ImgData.map(item => ({
              id: "fisdjafsdfjosadjfoidasfj",
              img: this.img + item.path,
              title:
                "的发生地附近啊士大夫发射点撒地方的发生地附近啊士大夫发射点撒地方"
            }));
          } else {
            this.imgList = ImgData.map(item => ({
              id: "",
              img: this.img + item.path
            }));
          }
          this.iconRight = window.innerWidth - this.imgList.length * 12 - 20;
          this.loading(false);
        } else {
          this.loading(true);
        }
      });
    }
  }
};
</script>

<style lang="less">
.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {
	 background-size: 100% !important;
}
.swiper-item-img {
  position: relative;
  img {
    width: 100%;
  }
  .title {
    position: absolute;
    bottom: 0;
    background: rgba(51, 51, 51, 0.58);
    width: 100%;
    padding: 10px 0 10px 10px;
    color: #fff;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>