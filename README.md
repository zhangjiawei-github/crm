# axios使用
1 .安装axios插件

> npm install --save axios vue-axios

2 . main.js文件启用插件

```
    import axios from 'axios'           // 引入axios
    Vue.prototype.$axios = axios;
    axios.defaults.timeout = 5000;                        //响应时间
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
    axios.defaults.baseURL = 'http://localhost:8001';   //配置接口地址
```

3 . 


