import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;


router.beforeEach((to, from, next)=>{
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token');
    const token_exp = localStorage.getItem('token_exp');
    const now_time = new Date().getTime();
    if(token && now_time - token_exp <= 1000 * 60 * 60 * 2) {
      next();
    }else {
      next('/login')
    }
  }else{
    next();
  }
})

//axios 请求拦截器处理请求数据
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
})

//axios 响应拦截器处理响应数据
axios.interceptors.response.use(res => {
  return res.data;
}, err => {
  return Promise.reject(err);
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')