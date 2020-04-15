<template>

    <div class="body">

        <div class="line"></div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#303133"
                text-color="#fff"
                active-text-color="#409EFF"
                >
            <!--上边框导航标签信息-->
            <el-menu-item index="1"  v-model="isCollapse">
                <i class="el-icon-menu"></i>
            </el-menu-item>
            <el-menu-item index="2" >主页</el-menu-item>
            <el-menu-item index="3" >其他</el-menu-item>
            <el-menu-item index="4" >消息中心</el-menu-item>
            <!--导航登录成功个人信息操作-->
            <span class="demonstration" style="float:right;margin-right:1%;margin-top: 20px;cursor:pointer;">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:white">
                        admin
                      <img src="#" width="16px" height="16px"/>
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width: 100px">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <span @click="quitLogin"><el-dropdown-item>退出登录</el-dropdown-item></span>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
            <!--导航输入框-->
            <el-input v-model="input" placeholder="请输入内容"  prefix-icon="el-icon-search" style="
                        float: right;width: 200px;margin-top:10px;margin-right:15px"></el-input>
        </el-menu>

        <!--下框导航栅格-->
        <el-row :gutter="24" >
            <!--左侧导航-->

            <el-col :span="2.5">
                <el-scrollbar style="height:100%">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @select = "selectMenu"
                        :collapse="isCollapse"
                        background-color="#303133"
                        text-color="#fff"
                        active-text-color="#409EFF"
                        style="height: 660px"
                >

                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-opportunity"></i>
                            <span slot="title">权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">用户管理</el-menu-item>
                            <el-menu-item index="1-2">角色管理</el-menu-item>
                            <el-menu-item index="1-3">权限管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">会员管理</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-notebook-1"></i>
                        <span slot="title">菜单配置</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-s-tools"></i>
                        <span slot="title">设置</span>
                    </el-menu-item>
                   <!-- <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>-->


                </el-menu>
                </el-scrollbar>
            </el-col>

            <!--右侧页面信息-->
            <el-col :span="20">
                <!--<br>
                <el-page-header @back="goBack" content="菜单配置">
                </el-page-header>
                <br>-->

                <div style="margin-top:10px;width: 100%;height:100%">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>







    </div>

</template>

<script src="./controller.js"/>
<style src="./style.less"></style>

