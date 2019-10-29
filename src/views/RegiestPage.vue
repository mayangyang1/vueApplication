<template>
    <div class="regiest">
        <van-row  class="row border-bottom" type="flex" align="center" >
            <van-col span="4">昵称: </van-col>
            <van-col span="20">
                <van-field v-model="name"  placeholder="请输入昵称"></van-field>
            </van-col>
        </van-row>
        <van-row class="row border-bottom" type="flex" align="center" >
            <van-col span="4">手机号: </van-col>
            <van-col span="20">
                <van-field v-model="phone"  placeholder="请输入手机号"></van-field>
            </van-col>
        </van-row>
        
        <van-row class="mgt10 row border-bottom" type="flex" align="center" >
            <van-col span="4">密码: </van-col>
            <van-col span="20">
                <van-field v-model="password"  placeholder="请输入密码"></van-field>
            </van-col>
        </van-row>
        <van-row class="row border-bottom" type="flex" align="center" >
            <van-col span="4">确认密码: </van-col>
            <van-col span="20">
                <van-field v-model="newPassword"  placeholder="请确认密码"></van-field>
            </van-col>
        </van-row>
        <van-col span="18" offset="3" class="mgt40">
            <div class="common-btn main-bg-color white" @click="regiest"> 注册</div>
        </van-col>
    </div>
</template>

<script>
import {Row, Col, Toast, Field, } from 'vant'
export default {
    name: 'regiest',
    data() {
        return {
            phone: '',
            name: '',
            password: '',
            newPassword: '', 
        }
    },
    components:{
        [Row.name] : Row,
        [Col.name] : Col,
        [Field.name] : Field,
        [Toast.name] : Toast,

    },
    methods:{
        regiest() {
            const that = this;
            if(this.phone == '') {
                return Toast.fail('请输入手机号');
            }
            if(this.name == '') {
                return Toast.fail('请输入昵称');
            }
            if(this.password == '') {
                return Toast.fail('请输入密码');
            }
            if(this.newPassword == '') {
                return Toast.fail('请输入确认密码');
            }
            if(this.password !== this.newPassword) {
                return Toast.fail('两次密码不一致');
            }
            let params = {};
            params.phone = this.phone;
            params.name = this.name;
            params.password = this.password;
            this.$axios.post('/api/register', params).then(res =>{
                if(res.code == 200) {
                    Toast.success('注册成功');
                    setTimeout(() => {
                        that.$router.push('/login')
                    }, 1500);
                }
            })
        }

    }
}
</script>

<style  scoped>
    .regiest{
        background-color: #f2f2f2;
        min-height: 100vh;
        padding-top: 10px;
    }
    .row{
        background-color: #fff;
        padding: 0 10px;
    }
    .border-bottom{
        border-bottom: 1px solid #ccc;
    }
    .mgt40{
        margin-top: 40px;
    }
</style>