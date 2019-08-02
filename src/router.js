import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GoodsWaybill from './views/GoodsWaybill.vue'
import Mine from './views/Mine.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true},
      children:[
        {
          path: '/',
          name: 'GoodsWaybill',
          component: GoodsWaybill,
          meta: {requireAuth: true},
        },
        {
          path: '/goods-waybill',
          name: 'Mine',
          component: Mine
        }
      ]
    },
    {
      path: '/login',
      name: 'loginPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LoginPage.vue')
    },
    {
      path: '/newGoodsWaybill',
      name: 'newGoodsWaybill',
      component: () => import('./views/AddGoodsWaybill.vue')
    }
  ]
})
