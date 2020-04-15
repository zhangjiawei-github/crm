import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index' // 引入router路由
import axios from 'axios'           // 引入axios
axios.defaults.timeout = 10000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = 'http://localhost:8001';   //配置接口地址
//axios.defaults.baseURL = 'http://59.110.243.97:8001';   //配置接口地址
Vue.prototype.$axios = axios;

import App from './App'

Vue.use(ElementUI)       // 使用ElementUI组件
Vue.config.productionTip = false

// 这个拦截一定要在new Vue上边
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {

    if (window.sessionStorage.getItem('token')!=null||window.sessionStorage.getItem('token')!=undefined) {
      // ------------获取stoken与浏览器存储比较，正确则可以访问页面--------------
      let params={
        "userId":sessionStorage.getItem("userId"),
        "token":sessionStorage.getItem("token")
      }
      axios.post("/tokenVeryFy",params).then(res =>{
          if(res.data.status==0){
            next();
          }else if(res.data.status==444){
            // session过期
            console.info(res.data.status.msg);
              next('/login')
          }
          else{
            next('/login')
          }
      })
      // ---------------------------

    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
});

new Vue({
    el: '#app',
    // 启用 ElementUI
    render: h => h(App),
    // 启用路由
    router
});






