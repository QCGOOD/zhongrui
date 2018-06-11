<template>
  <div class="coupon">
    <div class="tab">
      <tab active-color="#000" bar-active-color="rgb(226, 81, 60)">
        <tab-item selected @on-item-click="onItemClick">可用2</tab-item>
        <tab-item @on-item-click="onItemClick">已用2</tab-item>
        <tab-item @on-item-click="onItemClick">过期2</tab-item>
      </tab>
    </div>
    <div class="list">
      <!-- <coupon-item></coupon-item> -->
      <coupon-item v-for="(item, i) in list" :key="i" :index="i" :item="item" :type="type"></coupon-item>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import CouponItem from '@/components/Common/couponItem'

export default {
  components: {
    Tab, TabItem, CouponItem
  },
  data () {
    return {
      list: [
        { id: '1', price: 50, time: '2018.30.21' },
        { id: '2', price: 50, time: '2018.30.21', checked: false },
        { id: '3', price: 50, time: '2018.30.21', checked: false },
        { id: '4', price: 50, time: '2018.30.21', checked: true },
        { id: '5', price: 50, time: '2018.30.21', checked: false },
        { id: '6', price: 50, time: '2018.30.21', checked: false },
      ],
      typeList: ['keyong', 'yiyong', 'guoqi'],
      type: 'keyong',
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index)
      this.type = this.typeList[index]
    },
  },
}
</script>