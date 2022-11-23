import Vue from 'vue'
import Router  from 'vue-router';  
import Login from './components/Login.vue';
import Home from './components/Home.vue';

Vue.use(Router)

const router =  new Router({
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

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径；from代表从那个路径跳转而来；next是一个函数，表示放行。 next()放行，next('/login')强制跳转到/login路径
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')  // token为空时表示没有登录，强制跳转到/login路径
  next()
})

export default router
