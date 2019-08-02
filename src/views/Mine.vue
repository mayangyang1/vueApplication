<template>
    <div class="mine">
        <van-nav-bar class="main-bg-color" :fixed="true" title="个人中心"  ></van-nav-bar>
        <div style="padding:54px 0;margin-top:300px;">
            <van-row>
                <van-col span="18" offset="3">
                    <div class="common-btn main-bg-color white" @click="loginOut">退出</div>
                </van-col>
            </van-row>
        </div>
        
    </div>
</template>
<script>
import {Row, Col, NavBar,} from 'vant'
export default {
    name: 'Mine',
    components: {
        [Row.name] : Row,
        [Col.name] : Col,
        [NavBar.name] : NavBar,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loginOut() {
            localStorage.removeItem('token');
            localStorage.removeItem('token_exp');
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
 .mine{
     min-height: 100%
 }
</style>
