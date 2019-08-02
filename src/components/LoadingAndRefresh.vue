<template>
    <div class="list-builder">
        <van-pull-refresh v-model="refresh" @refresh="onRefresh">
            <van-list :immediate-check="false" v-model="loading" :finished="finished" :offset="100" finished-text="没有更多了" @load="onLoad">
                <slot></slot>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import {List, Cell, PullRefresh,} from 'vant'
export default {
    data() {
        return {
            loading: this.isLoading,
            finished: this.isFinished,
            refresh: this.isRefresh,
        }
    },
    props:{
        isLoading: {
            type: Boolean,
            default: false,
        },
        isFinished: {
            type: Boolean,
            default: false,
        },
        isRefresh: {
            type: Boolean,
            default: false,
        },
    },
    watch:{
        isLoading(newVal, oldVal) {
            if(newVal != oldVal) {
                this.loading = this.isLoading;
            }
        },
        isRefresh(newVal, oldVal) {
            if(newVal != oldVal) {
                this.refresh = this.isRefresh;
            }
        },
        isFinished(newVal, oldVal) {
            if(newVal != oldVal) {
                this.finished = this.isFinished;
            }
        }
    },
    components: {
        [List.name] : List,
        [Cell.name] : Cell,
        [PullRefresh.name] : PullRefresh,
    },
    methods: {
        onLoad() {//上拉加载
            this.$emit('onLoad');
        },
        onRefresh() {//下拉刷新
            this.$emit('onRefresh');
        }
    },

}
</script>

<style scoped>
    .list-builder{
        padding: 46px 0 54px 0;
    }
</style>
