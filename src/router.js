import Vue from 'vue'
import Router  from 'vue-router';  
import Login from './components/Login.vue';
import Home from './components/Home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'   // 当用户访问当前项目时，重定向到/login路径
    },
    {
      path: '/login', component: Login  // 当用户访问/login路径时，展示Login组件，也就是Login.vue页面
    },
    {
      path: '/home', component: Home
    }
  ]
})