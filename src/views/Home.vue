<template>
  <div class="home">
    <router-view/>
    <van-tabbar class="tab-bar" v-model="active" active-color="#f46d00">
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/goods-waybill" icon="manager-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {Button, Row, Col, Field, Tabbar, TabbarItem } from 'vant';

export default {
  name: 'home',
  data(){
    return {
      active:  0,
      userInfo: ''
    }
  },
  methods: {
    changeActive(index) {
      this.data.active = index;
    },
    getUserInfo() {
      this.$axios.get('/api/userInfo').then(res => {
        this.userInfo = res;
      })
    }
  },
  components: {
    [Button.name] : Button,
    [Row.name] : Row,
    [Col.name] : Col,
    [Field.name] : Field,
    [Tabbar.name] : Tabbar,
    [TabbarItem.name] : TabbarItem,
  },
  created() {
    // this.getUserInfo();
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

