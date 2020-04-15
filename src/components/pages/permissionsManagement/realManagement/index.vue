<template>
   <div style="width: 100%;height: 100%; ">
        <el-row :gutter="1">
            <!--左侧菜单-->
            <el-col :span="18">
                <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
                <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="500px">
                    <el-form :model="form">
                        <el-form-item label="角色名" :label-width="formLabelWidth">
                            <el-input v-model="form.role_name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色编码" :label-width="formLabelWidth">
                            <el-input v-model="form.role_encoding" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addRole">添 加</el-button>
                    </div>
                </el-dialog>
            </el-col>
            <el-col :span="4">
                <el-input
                        placeholder="角色名" icon="el-icon-search"
                        v-model="input"
                        suffix-icon="el-icon-search"
                >
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="selectByPhone">搜索</el-button>
            </el-col>
        </el-row>
       <el-row>

           <template>
               <el-table
                       @selection-change="handleSelectionChange"
                       :data="tableData"
                       style="width: 100%;"
                       :row-style="{height:'40px'}"
                       :cell-style="{padding:'10px 0'}"
               >
                   <el-table-column
                           type="selection"
                           width="55" align="center">
                   </el-table-column>
                   <el-table-column
                           prop="id"
                           label="ID"
                           width="80"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="roleName"
                           label="角色名"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="addTime"
                           label="添加日期"
                           align="center"
                           :formatter="dateFormat"
                           show-overflow-tooltip
                   >
                   </el-table-column>

                   <el-table-column
                           prop="roleEncoding"
                           label="角色编码"
                           align="center">
                   </el-table-column>

                   <el-table-column label="操作" align="center" width="150">
                       <template slot-scope="scope">
                           <el-button
                                   size="mini"
                                   @click="handleEdit(scope.$index, scope.row),dialogFormVisibleEdit = true">编辑</el-button>

                           <!-----------------------------编辑开始---------------------------->
                           <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit" width="700px">
                               <el-form :model="editForm">
                                           <el-form-item label="角色名" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.role_name" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="添加日期" :label-width="formLabelWidth">
                                               <el-date-picker type="date"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="editForm.add_time" style="width: 100%;"></el-date-picker>
                                           </el-form-item>
                                           <el-form-item label="角色编码" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.role_encoding" autocomplete="off"></el-input>
                                           </el-form-item>
                               </el-form>
                               <div slot="footer" class="dialog-footer">
                                   <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                                   <el-button type="primary" @click="editUser">确 定</el-button>
                               </div>
                           </el-dialog>
                           <!-----------------------------编辑结束---------------------------->

                           <el-button
                                   size="mini"
                                   type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                       </template>
                   </el-table-column>
               </el-table>
           </template>


       </el-row>
       <el-row >
           <el-pagination
                   background
                   @current-change="changePageNum"
                   layout="total, prev, pager, next"
                   :page-size="pager.size"
                   :total="pager.total"
                   align="center"
           ></el-pagination>
       </el-row>
    </div>
</template>
<script src="./controller.js"/>
