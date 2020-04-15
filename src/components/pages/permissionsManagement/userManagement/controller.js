export default {
    name: "userManagement",
    /* // 监听事件
     watch: {
         filterText(val) {
             this.$refs.tree.filter(val);
         }
     },*/

    data() {
        return {
            input: '',
            tableData: [],
            multipleSelection: [],
            // 默认显示第一页
            currentPage: 1,
            // 总个数
            // 分页
            pager: {
                page: 1,  // 当前页
                size: 10, // 当前页有多少条
                total: 0, // 总数据条数
                pages: 0, // 总页数
                //tableData: [],
            },

            // dialog弹框添加
            dialogFormVisible: false,
            form: {
                username: '',
                password: '123456',
                phone_number: '',
            },
            formLabelWidth: '70px',

            // dialog弹框编辑
            dialogFormVisibleEdit: false,
            editForm: {
                id:'',
                username: '',
                password: '',
                real_name: '',
                phone_number: '',
                age: 0,
                birth_date: '',
                sex:0,
                head_img: '',
                status:0,
                e_mail: '',
            },
            sexOptions:[{value:0,label:'未知'},{value: 1,label: '男'},{value:2,label: '女'}],
            options:[{value:0,label:'正常'},{value: 1,label: '禁用'}]


        };
    },

    created() {
        let params = {
            'isDelete': 0,
            'pageNum': 1,
            'pageSize': 10,
        };
        // 请求后端的接口
        this.$axios.post('/user/getUserListPager', params)
            .then(response => { // 请求成功的回调
                this.tableData = response.data.data.list; // 给表格赋值
                this.pager.total = response.data.data.total;//获取数据行数
                this.pager.pageNum = response.data.data.pageNum; // 当前页
            })
    },

    methods: {
        // 搜索
        selectByPhone() {
            let phone_number = this.input;
            // 请求后端的接口
            this.$axios.post('/user/getUserListPager', {'phone_number': phone_number, 'pageNum': 1, 'pageSize': 10,})
                .then(response => { // 请求成功的回调
                    console.info(response)
                    if (response.data.data.list == null || response.data.data.list == undefined) {
                        this.tableData = response.data.data.list;
                        this.pager.total = response.data.data.total; //获取数据行数
                        this.pager.pageNum = response.data.data.pageNum; // 当前页
                    } else {
                        this.tableData = response.data.data.list;
                        this.pager.total = response.data.data.total; //获取数据行数
                        this.pager.pageNum = response.data.data.pageNum; // 当前页
                    }

                })
        },

        // 添加用户
        async addUser() {
            let addUserParams = {
                'phone_number': this.form.phone_number,
                'username': this.form.username,
                'password': this.form.password
            }
            // 请求后端的接口
            await this.$axios.post('/user/addUser', addUserParams)
                .then(response => {
                    this.$message({
                        showClose: true,
                        message: '添加成功!',
                        type: 'success'
                    });
                });
            let params = {
                'isDelete': 0,
                'pageNum': this.pager.page,
                'pageSize': 10,
            };

            // 请求后端的接口
            this.$axios.post('/user/getUserListPager', params)
                .then(response => { // 请求成功的回调
                    this.tableData = response.data.data.list;
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })

            this.dialogFormVisible = false;
        },

        // 翻页
        changePageNum(page) {
            this.pager.page = page;
            let params = {}
            if (this.input != null || this.input != '') {
                params = {
                    'isDelete': 0,
                    'pageNum': page,
                    'pageSize': 10,
                    'phone_number': this.phone_number,
                };
            } else {
                params = {
                    'isDelete': 0,
                    'pageNum': page,
                    'pageSize': 10,
                };
            }
            // 请求后端的接口
            this.$axios.post('/user/getUserListPager', params)
                .then(response => {
                    this.tableData = response.data.data.list; // 给表格赋值
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })
        },

        // 时间戳转换
        dateFormat: function (row, column) {
            let d = new Date(row.birthDate);
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            //let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            //let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            //let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            //let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
            let times = d.getFullYear() + '-' + month + '-' + day;
            return times
        },

        // 性别数字汉字转换
        formatSex(row, column) {
            return row.sex == '1' ? "男" : row.sex == '2' ? "女" : "未知";
        },

        // 状态数字汉字转换
        formatStatus(row, column) {
            console.info(row);
            return row.status == 0 ? "正常" : row.status == 1 ? "禁用" : "正常";
        },

        // 左侧选择多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 编辑提交方法
        async editUser() {
            console.info("编辑信息");
            console.info(this.editForm.status);
            // 2.将编辑的信息重新提交到后端
            let params = {
                'id': this.editForm.id,
                'username': this.editForm.username,
                'password': this.editForm.password,
                'real_name': this.editForm.real_name,
                'phone_number': this.editForm.phone_number,
                'age': this.editForm.age,
                'birth_date': this.editForm.birth_date,
                'sex': this.editForm.sex ,
                'head_img': this.editForm.head_img,
                'status': this.editForm.status,
                'e_mail': this.editForm.e_mail,
            }
            await this.$axios.post('/user/userEdit', params)
                .then(response => {
                    if(response.data.status==0){
                        this.$message({
                            showClose: true,
                            message: '编辑成功!',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '编辑失败!',
                            type: 'success'
                        });
                    }

                });
            // 3.页面刷新
            let params1 = {
                'isDelete': 0,
                'pageNum': this.pager.page,
                'pageSize': 10,
            };

            // 请求后端的接口
            this.$axios.post('/user/getUserListPager', params1)
                .then(response => { // 请求成功的回调
                    this.tableData = response.data.data.list;
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })
            this.dialogFormVisibleEdit = false;

        },

        // 打开编辑dialog框
        handleEdit(index, row) {

            // 1.将row的信息赋值到表单
            this.editForm.id = row.id;
            this.editForm.username = row.username;
            this.editForm.password = row.password;
            this.editForm.real_name = row.realName;
            this.editForm.phone_number = row.phoneNumber;
            this.editForm.age = row.age;
            this.editForm.birth_date = row.birthDate;
            this.editForm.sex = row.sex;
            this.editForm.head_img = row.headImg;
            this.editForm.status = row.status;
            this.editForm.e_mail = row.eMail;

            let d = new Date( row.birthDate);
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            let times2=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
            //let times = d.getFullYear() + '-' + month + '-' + day;
            this.editForm.birth_date = times2;
        },

        // 删除
        async handleDelete(index, row) {
            // 请求后端的接口
            await this.$axios.post('/user/deleteUserById', {'id': row.id})
                .then(response => {
                    this.$message({
                        showClose: true,
                        message: '删除成功!',
                        type: 'success'
                    });
                });
            let params = {
                'isDelete': 0,
                'pageNum': this.pager.page,
                'pageSize': 10,
            };

            // 请求后端的接口
            this.$axios.post('/user/getUserListPager', params)
                .then(response => { // 请求成功的回调
                    this.tableData = response.data.data.list;
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })
        }

    }
}
