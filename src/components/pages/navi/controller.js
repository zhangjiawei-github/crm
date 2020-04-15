export default {
    name: "index.vue",
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            // 导航输入框
            input:'',
            // 侧边导航
            isCollapse: true,
        };
    },
    methods: {
        quitLogin(){
            sessionStorage.clear();
            location.reload()
        },
        handleSelect(key, keyPath) {
            // 是否展开左侧菜单
            if(key==1){
                //debugger
                if(this.isCollapse){
                    this.isCollapse=false;
                }else{
                    this.isCollapse=true;
                }
            }

            // 导航菜单
            if(key==2){
                this.$router.push('/demo1').then(r => {}).catch(() => console.log('promise catch err'));
            }
            // 导航菜单
            if(key==3){
                this.$router.push('/demo2').then(r => {}).catch(() => console.log('promise catch err'));
            }
        },

        // 左侧菜单点击事件
        selectMenu(key , keyPath){
            switch (key) {
                case "1-1": //用户管理
                    this.$router.push('/userManagement').then(r => {}).catch(() => console.log('promise catch err'));
                    break;
                case "1-2": //角色管理
                    this.$router.push('/roleManagement').then(r => {}).catch(() => console.log('promise catch err'));
                    break;
                case "1-3": //权限管理
                    this.$router.push('/permissionManagement').then(r => {}).catch(() => console.log('promise catch err'));
                    break;
                case "3": //权限管理
                    this.$router.push('/menuConfiguration').then(r => {}).catch(() => console.log('promise catch err'));
                    break;
                case "4": //设置
                    this.$router.push('/configuration').then(r => {}).catch(() => console.log('promise catch err'));
                    break;
            }


        },




        // 返回
        goBack() {
            console.log('go back');
        }

    },

}
