export default {
    name: "permissionManagement",
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
            // 分页
            pager: {
                page: 1,  // 当前页
                size: 10, // 当前页有多少条
                total: 0, // 总数据条数
                pages: 0, // 总页数
            },

            // dialog弹框添加
            dialogFormVisible: false,
            form: {
                permission_name: '',
                permission_encoding: '',
            },
            formLabelWidth: '70px',

            // dialog弹框编辑
            dialogFormVisibleEdit: false,
            editForm: {
                id:'',
                permission_name: '',
                add_time: '',
                permission_encoding:0,
            },
        };
    },

    created() {
        let params = {
            'isDelete': 0,
            'pageNum': 1,
            'pageSize': 10,
        };
        // 请求后端的接口
        this.$axios.post('/permission/getPermissionsListPager', params)
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

        // 添加角色
        async addPermission() {
            let addPermissionParams = {
                'permission_name': this.form.permission_name,
                'permission_encoding': this.form.permission_encoding,
            }
            // 请求后端的接口
            await this.$axios.post('/permission/addPermission', addPermissionParams)
                .then(response => {
                    if(response.data.status==0){
                        this.$message({
                            showClose: true,
                            message: '添加成功!',
                            type: 'success'
                        });
                        this.form.permission_name = '';
                        this.form.permission_encoding = '';
                    }else{
                        this.$message({
                            showClose: true,
                            message: '添加失败!',
                            type: 'error'
                        });
                    }
                });
            let params = {
                'isDelete': 0,
                'pageNum': this.pager.page,
                'pageSize': 10,
            };

            // 请求后端的接口
            this.$axios.post('/permission/getPermissionsListPager', params)
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
                    'permission_name': this.input,
                };
            } else {
                params = {
                    'isDelete': 0,
                    'pageNum': page,
                    'pageSize': 10,
                };
            }
            // 请求后端的接口
            this.$axios.post('/permission/getPermissionsListPager', params)
                .then(response => {
                    this.tableData = response.data.data.list; // 给表格赋值
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })
        },

        // 时间戳转换
        dateFormat: function (row, column) {

            let d = new Date(row.addTime);
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            //let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            //let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            //let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            //let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
            let times = d.getFullYear() + '-' + month + '-' + day;
            return times
        },

        // 左侧选择多选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 编辑提交方法
        async editPermission() {
            // 2.将编辑的信息重新提交到后端
            let params = {
                'id': this.editForm.id,
                'permission_name': this.editForm.permission_name,
                'add_time': this.editForm.add_time,
                'permission_encoding': this.editForm.permission_encoding,
            }
            await this.$axios.post('/permission/permissionEdit', params)
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
            this.$axios.post('/permission/getPermissionsListPager', params1)
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
            this.editForm.permission_name = row.permissionName;
            this.editForm.permission_encoding = row.permissionEncoding;


            let d = new Date( row.addTime);
            let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
            let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            let times2=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
            //let times = d.getFullYear() + '-' + month + '-' + day;
            this.editForm.add_time = times2;
        },

        // 删除
        async handleDelete(index, row) {
            // 请求后端的接口
            await this.$axios.post('/permission/deletePermissionById', {'id': row.id})
                .then(response => {
                    if(response.data.status==0){
                        this.$message({
                            showClose: true,
                            message: '删除成功!',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '删除失败!',
                            type: 'error'
                        });
                    }

                });
            let params = {
                'isDelete': 0,
                'pageNum': this.pager.page,
                'pageSize': 10,
            };

            // 请求后端的接口
            this.$axios.post('/permission/getPermissionsListPager', params)
                .then(response => { // 请求成功的回调
                    this.tableData = response.data.data.list;
                    this.pager.total = response.data.data.total; //获取数据行数
                    this.pager.pageNum = response.data.data.pageNum; // 当前页
                })
        }

    }
}
