<template>
   <div style="width: 100%;height: 100%; ">


        <el-row >
            <!--左侧菜单-->
            <el-col :span="4">
                <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                </el-input>

                <el-tree
                        class="filter-tree"
                        :data="data"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        @node-click="handleNodeClick"
                        ref="tree">
                </el-tree>
            </el-col>


        </el-row>
    </div>
</template>
<script src="./controller.js"/>
