<template>
  <div class="home">
    <van-row>
      <van-col span="12" offset="6" class="login-image">
        <img src="../assets/logo.png" width="160px" alt="">
      </van-col>
      <van-col span="18" offset="3" class="mgt40">
        <div class="border">
          <van-field v-model="userName"  placeholder="请输入用户名"></van-field>
        </div>
      </van-col>
      <van-col span="18" offset="3" class="mgt10">
        <div class="border">
          <van-field v-model="password"  placeholder="请输入密码"></van-field>
        </div>
      </van-col>
      <van-col span="18" offset="3" class="mgt10">
        <div class="common-btn main-bg-color white" @click="login"> 登录</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {Button, Row, Col, Field, Toast} from 'vant'

export default {
  name: 'loginPage',
  data(){
    return {
      userName: '',
      password: '',
    }
  },
  components: {
    [Button.name] : Button,
    [Row.name] : Row,
    [Col.name] : Col,
    [Field.name] : Field,
    [Toast.name] : Toast,
  },
  methods: {
    login() {
      if(this.userName === '' || this.password === '') {
        return Toast.fail('用户名和密码不为空');
      }
      this.$axios.post('/api/login', {
        name: this.userName,
        password: this.password
      }).then( res => {
        if(res.code === 200) {
          localStorage.setItem('token', res.content);
          localStorage.setItem('token_exp', new Date().getTime());
          this.$router.push('/')
        }else{
          Toast.fail(res.content);
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-image{
    margin-top: 120px;
  }
  .mgt40{
    margin-top: 40px;
  }
</style>

