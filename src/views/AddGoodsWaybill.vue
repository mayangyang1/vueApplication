<template>
    <div class="add-goods-waybill">
        <van-nav-bar class="main-bg-color" :fixed="true" title="新建货单" left-text="返回" left-arrow @click-left="goBack" ></van-nav-bar>
        <div class="goods-waybill-content">
            <van-cell-group>
                <van-field
                    v-model="company"
                    required
                    label="上级公司:"
                    placeholder="请输入上级公司"

                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="routeName"
                    required
                    label="线路名称:"
                    placeholder="请输入线路名称"

                />
            </van-cell-group>
            <van-cell-group >
                <van-field
                    v-model="perWeight"
                    required
                    label="预装货量:"
                    placeholder="请输入预装货量"

                />
            </van-cell-group>
            <van-cell-group class="mgt10">
                <van-field
                    v-model="address"
                    required
                    label="卸货地点:"
                    placeholder="请输入卸货地点"

                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="goodsName"
                    required
                    label="货物名称:"
                    placeholder="请输入货物名称"

                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    v-model="goodsWeight"
                    label="货物重量:"
                    placeholder="请输入货物重量"

                />
            </van-cell-group>
        </div>
        <div class="common-btn main-bg-color white" @click="addGoodsWaybill">提交</div>
    </div>
</template>

<script>
import {NavBar, CellGroup, Field, Toast, } from 'vant'

export default {
    name: 'AddGoodsWaybill',
    data() {
        return {
            company: '',
            routeName: '',
            perWeight: '',
            address: '',
            goodsName: '',
            goodsWeight: '',
        }
    },
    components: {
        [NavBar.name] : NavBar,
        [CellGroup.name] : CellGroup,
        [Field.name] : Field,
        [Toast.name] : Toast,
    },
    methods:{
        addGoodsWaybill() {
            const reg = /^[0-9]+(.[0-9]{0,4})?$/;
            if(this.company === '') {
                return Toast('请输入公司名称');
            }
            if(this.routeName === '') {
                return Toast('请输入线路名称');
            }
            if(this.perWeight === '' ){
                return Toast('请输入预装货量');
            }
            if(!reg.test(this.perWeight)) {
                return Toast('预装货量必须为数字');
            }
            if(this.address === '') {
                return Toast('请输入地址');
            }
            if(this.goodsName === '') {
                return Toast('请输入货物名称');
            }
            if(this.goodsWeight != '' && !reg.test(this.goodsWeight)){
                return Toast('货物重量必须为数字');
            }
            let params = {};
            params.company = this.company;
            params.routeName = this.routeName;
            params.perWeight = this.perWeight;
            params.address = this.address;
            params.goodsName = this.goodsName;
            params.goodsWeight = this.goodsWeight;
            this.$axios.post('/api/addGoodsWaybill', params).then(res => {
                if(res.code === 200) {
                    Toast(res.content);
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
                }
            })
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.add-goods-waybill{
    background-color: #f2f2f2;
    min-height: 100vh;
}
 .goods-waybill-content{
    padding: 46px 0 52px 0;
    margin-top: 10px;
 }
 .common-btn{
    width: 94vw;
    margin-left: 3vw;
 }
</style>
