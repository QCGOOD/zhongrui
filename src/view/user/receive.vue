<template>
  <div class="receive">
    <p class="title">请正确输入以下信息</p>
    <group gutter="0">
      <x-input placeholder="请输入你的姓名" v-model="form.name">
        <i slot="label" class="iconfont icon-xingming" style="padding-right:10px;display:block;" width="30" height="30"></i>
      </x-input>
      <x-input placeholder="请输入你的手机号码" v-model="form.mobile">
        <i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
      </x-input>
      <x-input placeholder="请输入验证码" v-model="form.code">
        <i slot="label" class="iconfont icon-yanzhengma" style="padding-right:10px;display:block;" width="30" height="30"></i>
        <x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
				<x-button class="vcode_btn2" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" >{{number}}</x-button>
      </x-input>
    </group>
    <div class="btn">
      <x-button class="primary-btn" type="primary" :disabled="disabled" @click.native="memberBind">确定</x-button>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'

export default {
  components: {
    Group, XInput, XButton
  },
  data () {
    return {
      form: {
        name: '',
        mobile: '',
        code: ''
      },
      number: 60,
      showBtn: true,
      height: 0,
      disabled: true,
      interval: null
    }
  },
  mounted () {
    this.height = window.innerHeight
    window.onresize = () => {
      this.height = window.innerHeight
    }
  },
  methods: {
    // 获取验证码
    getVcode () {
      let reg = /^1[0-9]{10}$/
      if (!reg.test(this.form.mobile)) {
        this.toast('请输入正确的手机号码')
        return false
      }
      console.log(this.form)
      this.showBtn = false
      this.interval = setInterval(() => {
        if (this.number > 0) {
          this.number--
        } else {
          clearInterval(this.interval)
          this.showBtn = true
          this.number = 60
        }
      }, 1000)
      this.$http.post('distributer/regist/code',{ mobile: this.form.mobile }).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.toast('验证码已发送，请注意查收')
        } else {
          this.toast(res.data.message)
        }
      }).catch(err => {
        clearInterval(this.interval)
        this.showBtn = true
        this.number = 60
      })
    },
    memberBind () {
      this.$http.post('distributer/regist',this.form).then(res => {
        this.toast(res.data.message)
        this.$router.push('/activity')
      })
    }
  },
  watch: {
    form: {
      handler (val) {
        let num = 0
        for (let key in val) {
          if (val[key] === '') {
            num++
          }
        }
        if (num === 0) this.disabled = false
        else this.disabled = true
      },
      deep: true
    },
    'form.mobile' (val) {
      // console.log(val)
      if (!this.showBtn) {
        clearInterval(this.interval)
        this.showBtn = true
        this.number = 60
      }
    }
  }
}
</script>

<style lang="less" scoped>
.receive {
  background-color: #fff;
  height: 100vh;
  .title {
    padding: 3vw;
    font-size: 4vw;
  }
  .vcode_btn {
    width: 20vw;
    height: 8vw;
    background: #e2513c;
    border-radius: 3px;
    &:active {
      background: #e2513c;
    }
  }
  .vcode_btn2 {
    border-radius: 3px;
    width: 20vw;
    height: 8vw;
    color: @primary-color;
    border: 1px solid #e2513c;
    &:active {
      color: @primary-color;
      border: 1px solid #e2513c;
    }
  }
  .btn {
    padding: 10vw 5vw 0 5vw;
    .primary-btn {
      background: #e2513c;
    }
    .primary-btn[disabled='disabled'] {
      background: #f37885;
    }
  }
}
</style>
