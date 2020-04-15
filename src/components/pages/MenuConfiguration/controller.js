export default {
    name: "menuConfiguration",
    // 监听事件
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    data() {
        return {
            filterText: '',
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },


        };
    },

    methods:{
        // 过滤节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
            console.info(data);
        },

        // 左侧菜单点击事件
        handleNodeClick(data) {
            console.log(data);
        }

    }
}
