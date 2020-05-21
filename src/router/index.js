import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'

import allpaper from '../views/allpaper.vue'
import paperDtail from '../views/paperDtail.vue'
import myTest from '../views/myTest.vue'
import result from '../views/result.vue'
import analysis from '../views/analysis.vue'
import my from '../views/my.vue'


import history_ct  from "../views/history_ct"



import feedback from "../views/feedback"
import login from "../views/login"
import congfig from "../views/congfig"
import login_ma from "../views/login_ma"
import find from "../views/find"
import find_config from '../views/find_config'
import practice from '../views/practice'
import swiper from '../views/swiper'

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      login:true
    }
  }, 
  {
    path: '/items',
    name: 'items',
    component: Items
  },      
    {
        path: '/practice',
        name: 'practice',
        component: practice,
        meta: {
            keepAlive: true
        }
    },
    {
    path: '/paperDtail',
    name: 'paperDtail',
    component: paperDtail
  },  
  {
    path: '/myTest',
    name: 'myTest',
    component: myTest
  },
    {
        path: '/swiper',
        name: 'swiper',
        component: swiper
    },
    {
    path: '/result',
    name: 'result',
    component: result
  },   
  {
    path: '/analysis',
    name: 'analysis',
    component: analysis
  },
  {
    path: '/my',
    name: 'my',
    component: my
  }, 

  {
    path: '/my/history_ct',
    name: 'history_ct',
    component: history_ct
  },   

  {
    path: '/allpaper',
    name: 'allpaper',
    component: () => import('../views/allpaper.vue')
  },
  { 
    path: '/feedback',
    name: 'feedback',
    component: feedback
  },
  { 
    path: '/login',
    name: 'login',
    component: login
  },
  { 
    path: '/congfig',
    name: 'congfig',
    component: congfig
  },
  { 
    path: '/login_ma',
    name: 'login_ma',
    component: login_ma
  },
  { 
    path: '/find',
    name: 'find',
    component: find
  },
  { 
    path: '/find_config',
    name: 'find_config',
    component:find_config
  }                        
]

const router = new VueRouter({
     routes
});


router.beforeEach((to,from,next) => {
   let bl = to.matched.some((item) => {
      return item.meta.login;
   })
   if(bl){
      let vm = router.app;
      // console.log(vm.$local);
      next();
   }else{
      next();
   }
})


export default router
