<template>
    <div class="goods-waybill">
        <van-nav-bar class="main-bg-color" :fixed="true" title="首页"  right-text="新建"  @click-right="addGoodsWaybill"></van-nav-bar>
       <loadingandrefresh :isLoading="loading" :isFinished="finished" :isRefresh="isLoading" v-on:onLoad="onLoad" v-on:onRefresh="onRefresh">
           <div style="min-height:80vh" v-if="goodsWaybillList.length > 0">
                <div class="list-item" v-for="item in goodsWaybillList" :key="item._id" >
                   <div class="item-header flex-sb">
                       <div class="flex-fs">
                           <img src="../assets/oddNumbers.png" alt="">
                           <div class="mgl4">单号: {{item['waybillNo']}}</div>
                       </div>
                       <div class="status main-bg-color">待执行</div>
                   </div>
                    <titleitem imgUrl="up" titleContent="上级公司:" :msgContent="item.company"></titleitem>
                    <titleitem imgUrl="t-route" titleContent="线路名称:" :msgContent="item.routeName"></titleitem>
                    <titleitem imgUrl="t-weight" titleContent="预装货量:" :msgContent="item['perWeight'] + '吨'"></titleitem>
                    <titleitem imgUrl="t-unloading" titleContent="卸货地点:" :msgContent="item.address"></titleitem>
                    <titleitem imgUrl="t-goods" titleContent="" :msgContent="item['goodsName'] + item['goodsWeight'] + '吨'"></titleitem>

                </div>
           </div>
           <div class="no-message" v-if="goodsWaybillList.length == 0">暂无数据</div>
       </loadingandrefresh>
    </div>
</template>

<script>
import {Row,Col, Cell, NavBar, } from 'vant'
import LoadingAndRefresh from '../components/LoadingAndRefresh.vue'
import TitleItem from '../components/TitleItem.vue'
export default {
    name: 'GoodsWaybill',
    data() {
        return {
            loading: false,
            finished:false,
            isLoading: false,
            goodsWaybillList: [],
            page : 1,
            size : 10,

        }
    },
    components: {
        [Cell.name] : Cell,
        loadingandrefresh : LoadingAndRefresh,
        [Row.name] : Row,
        [Col.name] : Col,
        [NavBar.name] : NavBar,
        titleitem : TitleItem,
    },
    methods: {
        addGoodsWaybill() {
            this.$router.push('/newGoodsWaybill')
        },
        getGoodsWaybill(success){
            this.$axios.get(`/api/getGoodsWaybillList?page=${this.page}&size=${this.size}`).then(success);
        },
        onLoad() {
            const that = this;
            if(that.page == 1){
                return;
            }
            that.loading = true;
            that.getGoodsWaybill(res => {
                 that.loading = false;
                if(res.code === 200 && res.content.length > 0){
                    that.page ++;
                    that.goodsWaybillList = that.goodsWaybillList.concat(res.content);
                }
                if(res.content.length == 0) {
                    that.finished = true;
                }
            })
        },
        onRefresh() {
            this.isLoading = true;
            this.finished = false;
            this.page = 1;
            this.getGoodsWaybill(res => {
                if(res.code === 200){
                    this.page++;
                    this.goodsWaybillList = [];
                    this.goodsWaybillList = res.content;
                    this.isLoading = false;
                }
            })
        }
    },
    created() {
        this.onLoad()
        this.page = 1;
        this.goodsWaybillList = [];
        this.getGoodsWaybill(res => {
            if(res.code === 200 && res.content.length > 0){
                this.page ++;
                this.goodsWaybillList = res.content;
            }
        });
    }
}
</script>

<style scoped>
 .goods-waybill{
    background-color: #f2f2f2;
    min-height: 100vh;
 }
 .tab-bar{
    position: fixed;
    left: 0;
    top:0;
    z-index: 1000;
    width: 100vw;
 }
 .list-item{
  background-color: #fff;
  box-shadow: 2px 2px #ccc;  
  padding: 10px; 
  font-size: 14px;
  margin-top: 10px;
 }
 .list-item img{
     width: 20px;
 }
 .item-header{
     padding-bottom: 10px;
     border-bottom:1px solid #ccc;
     margin-bottom: 4px;
 }
 .item-content{
     line-height: 30px;
 }
 .item-content .title{
     font-size: 14px;
     font-weight: 600;
 }
 .status{
    padding: 4px 6px;
    border-radius: 4px;
    color: #fff;
 }
 
</style>
