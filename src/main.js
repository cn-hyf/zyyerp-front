import Vue from 'vue'
import App from './App'
import router  from './router'; //引入并注册 vue-router

import './assets/css/global.css';//导入全局样式表

import ElementUI from 'element-ui';//导入引入完整的 Element，这是使用element-ui的第一步
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); // 把导入的Button组件注册为全局可用的组件，这是使用element-ui的第二步

import './assets/fonts/iconfont.css'; //导入字体图标，第一步

import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:80/' // 匹配请求的根路径
axios.interceptors.request.use(config=> {   //通过axios请求拦截器添加token，保证拥有获取数据的权限，相当于预处理
  // 为每次axios请求的请求头对象添加token验证的Authorization字段，那么以后有权限的请求就可以调用成功了。
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http=axios   // 每个vue组件都可以通过this直接访问$http，从而发起axios请求

Vue.config.productionTip=false //表示关闭debug

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')