export default {
    name: "login",

    data() {
        return {
            form: {
                username: '',
                password: ''
            },

            // 表单验证，需要在 el-form-item 元素中增加 prop 属性
            rules: {
                username: [
                    {required: true, message: '账号不可为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'}
                ]
            },

            // 对话框显示和隐藏
            dialogVisible: false
        }
    },
    methods: {
        /*登录，表单提交*/
        onSubmit(formName) {
            // 为表单绑定验证功能
            this.$refs[formName].validate((valid) => {
                console.info("valid:"+valid);
                if (valid) {
                    //---------------------发送请求，验证账号密码   开始----------------------------
                    console.info(this.form.username);
                    this.$axios.post("/login",{'phone_number':this.form.username,'password':this.form.password}).then(res =>{
                        if(res.data.status==1){
                            this.$message({
                                showClose: true,
                                message: '账号或密码错误！',
                                type: 'error'
                            });

                        }
                        if(res.data.status==0){
                            this.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            sessionStorage.setItem("token",res.data.data.token);
                            sessionStorage.setItem("userId",res.data.data.user.id);
                            this.$router.push("/demo1");
                        }
                    })

                    /*if(this.form.username=='123'&&this.form.password=='123'){
                        // 使用 vue-router 路由到指定页面，该方式称之为编程式导航

                        this.$message({
                            showClose: true,
                            message: '登录成功！',
                            type: 'success'
                        });

                    }else{
                        this.$message({
                            showClose: true,
                            message: '账号或密码错误',
                            type: 'error'
                        });
                        return false;
                    }*/
                    //---------------------发送请求，验证账号密码   结束----------------------------

                } else {
                    this.$message({
                        showClose: true,
                        message: '账号或密码为空！',
                        type: 'error'
                    });
                    return false;
                }
            });
        },

    }

}
