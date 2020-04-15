<template>
   <div style="width: 100%;height: 100%; ">
        <el-row :gutter="1">
            <!--左侧菜单-->
            <el-col :span="18">
                <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
                <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="500px">
                    <el-form :model="form">
                        <el-form-item label="用户名" :label-width="formLabelWidth">
                            <el-input v-model="form.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="默认密码" :label-width="formLabelWidth">
                            <el-input v-model="form.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" :label-width="formLabelWidth">
                            <el-input v-model="form.phone_number" autocomplete="off"></el-input>
                        </el-form-item>


                       <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>-->
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addUser">添 加</el-button>
                    </div>
                </el-dialog>
            </el-col>
            <el-col :span="4">
                <el-input
                        placeholder="手机号" icon="el-icon-search"
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
                           prop="username"
                           label="用户名"
                           width="100"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="realName"
                           label="真实姓名"
                           width="100"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="phoneNumber"
                           label="手机号"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="age"
                           label="年龄"
                           width="50"
                           align="center"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="birthDate"
                           label="生日"
                           width="180"
                           align="center"
                           :formatter="dateFormat"
                           show-overflow-tooltip
                   >
                   </el-table-column>

                   <el-table-column
                           prop="sex"
                           label="性别"
                           width="50"
                           align="center"
                           :formatter="formatSex"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="headImg"
                           label="头像"
                           width="80"
                           align="center">
                   </el-table-column>

                   <el-table-column
                           prop="status"
                           label="状态"
                           width="50"
                           align="center"
                           :formatter="formatStatus"
                   >
                   </el-table-column>

                   <el-table-column
                           prop="eMail"
                           label="邮箱"
                           width="200"
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
                                   <el-row :gutter="40">
                                       <el-col :span="11" >
                                           <el-form-item label="用户名" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.username" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="密码" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.password" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="真实姓名" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.real_name" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="手机号" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.phone_number" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="年龄" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.age" autocomplete="off"></el-input>
                                           </el-form-item>
                                       </el-col>
                                       <el-col :span="11" >
                                           <el-form-item label="出生日期" :label-width="formLabelWidth">
                                              <!-- <el-input v-model="editForm.birth_date" autocomplete="off"></el-input>-->
                                               <el-date-picker type="date"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="editForm.birth_date" style="width: 100%;"></el-date-picker>
                                           </el-form-item>
                                           <el-form-item label="性别" :label-width="formLabelWidth">
                                               <!--<el-input v-model="editForm.sex" autocomplete="off"></el-input>-->
                                               <el-select v-model="editForm.sex" placeholder="用户状态">
                                                   <el-option v-for="item in sexOptions"
                                                              :key="item.value"
                                                              :label="item.label"
                                                              :value="item.value"></el-option>
                                               </el-select>
                                           </el-form-item>
                                           <el-form-item label="头像" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.head_img" autocomplete="off"></el-input>
                                           </el-form-item>
                                           <el-form-item label="状态" :label-width="formLabelWidth">
                                               <!--<el-input v-model="editForm.status" autocomplete="off"></el-input>-->
                                               <el-select v-model="editForm.status" placeholder="用户状态">
                                                   <el-option v-for="item in options"
                                                              :key="item.value"
                                                              :label="item.label"
                                                              :value="item.value"></el-option>
                                               </el-select>
                                           </el-form-item>
                                           <el-form-item label="邮箱" :label-width="formLabelWidth">
                                               <el-input v-model="editForm.e_mail" autocomplete="off"></el-input>
                                           </el-form-item>
                                       </el-col>

                                   </el-row>

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
