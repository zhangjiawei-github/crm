import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入vue文件路径，默认主页
import navi from '../components/pages/navi/index'
// 页面路径引入
import demo1 from '../components/pages/demo1/index'
import demo2 from '../components/pages/demo2/index'
import login from '../components/pages/Login/index'
import menuConfiguration from '../components/pages/MenuConfiguration/index'
import userManagement from '../components/pages/permissionsManagement/userManagement/index'
import roleManagement from '../components/pages/permissionsManagement/realManagement/index'
import permissionManagement from '../components/pages/permissionsManagement/permissionManagement/index'


Vue.use(VueRouter)


export default new VueRouter({
    mode: 'history', // 作用：去掉vue路径中的#号
    routes: [
        {
            path: '/',
            component: navi,
            meta: {
                title: '首页',
                type: 'login'  // 是否需要判断登录,这里是需要判断
            },
            children: [
                {
                    path: '/demo1', component: demo1,meta: {title: '主页', type: 'login'}
                },
                {
                    path: '/demo2', component: demo2,meta: {title: '其他', type: 'login'}
                },
                {
                    path: '/menuConfiguration', component: menuConfiguration,meta: {title: '菜单配置', type: 'login'}
                },
                {
                    path: '/userManagement', component: userManagement,meta: {title: '用户管理', type: 'login'}
                },
                {
                    path: '/roleManagement', component: roleManagement,meta: {title: '角色管理', type: 'login'}
                },
                {
                    path: '/permissionManagement', component: permissionManagement,meta: {title: '权限管理', type: 'login'}
                }

            ]
        },

        {
            path: '/login',
            component: login,
            meta: {
                title: '登录',
                type: '' // 不需要鉴权
            }
        }

    ]
})

