<template>
    <div class="item-content">
        <div class="flex-fs">
            <div class="flex-fs">
                <img :src="require('../assets/'+url + '.png')" alt="">
                <div class="mgl4 title">{{title}}</div>
            </div>
            <div class="mgl4">{{content}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'titleItem',
    data() {
        return {
            url: this.imgUrl,
            title: this.titleContent,
            content: this.msgContent,
        }
    },
    props:{
        imgUrl: String,
        titleContent: String,
        msgContent: String,
    }
}
</script>

<style scoped>
    .item-content{
        line-height: 30px;
    }
    .item-content .title{
        font-size: 14px;
        font-weight: 600;
    }
    .item-content img{
        width: 18px;
    }
</style>

