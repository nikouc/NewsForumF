<script lang="ts" setup>
import { userInfoService } from '@/api/user';
import { usePageStore } from '@/stores/currentPage';
import { useTokenStore } from '@/stores/token';
import { useUserInfoStore } from '@/stores/userinfo';
import {
    UserFilled,
    Remove,
    SwitchButton,
  
  Postcard
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

//刷新后页面继续保持当前页
const pushStore = usePageStore()
const router = useRouter()
if(pushStore.page===''){
  console.log('pushStore为空')
  pushStore.setPage('/article/category')
}
const defaultActive = pushStore.page
console.log(defaultActive)
router.replace(defaultActive);

//获取用户详细信息
const userInfoStore = useUserInfoStore()
const getUserInfo = async ()=>{
  let result = await userInfoService()
  //存储到store中
userInfoStore.setInfo(result.data)
}

getUserInfo()

//const url = "https://newsforum.oss-cn-guangzhou.aliyuncs.com/e2b1ead4-a40e-4166-9050-e668f2a04907.png"
const url = "/src/img/avatar1.png"

//下拉菜单

const usetokenstore = useTokenStore()
const handleCommand = (command)=>{
  if(command==='logout'){
    //退出登录
    ElMessageBox.confirm(
    '您确认要退出登录吗？',
    '退出登录!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      //清空store中个人信息
      usetokenstore.removeToken()
      userInfoStore.removeInfo()
      //跳转登录
      router.push('/')
      ElMessage({
        type: 'success',
        message: '退出登录成功',
      });
      
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
    
  }else{
    //路由
    router.push('/user/'+command)
  }
}
</script>

<template>
    <div class="common-layout">
        <!-- 容器 -->
      <el-container class="container-outside"style="background-color: aqua;">
        <!-- 菜单 -->
        <el-aside width="200px" style="background-color: #545c64;">
            <el-menu
            style="margin-top: 100%;"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        router="true"
      >
      <el-menu-item index="/article/category">
        <el-icon><Collection /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
            <el-icon><Notebook /></el-icon>
          <span>文章管理</span>
        </el-menu-item>

        <el-sub-menu>
          <template #title>
            <el-icon><location /></el-icon>
            <span>个人中心</span>
          </template>
<el-menu-item index="/user/info">
    <el-icon><Postcard /></el-icon>
    <span>基本资料</span>
</el-menu-item>
     <el-menu-item index="/user/avatar">
        <el-icon><UserFilled /></el-icon>
    <span>更换头像</span>
</el-menu-item>
<el-menu-item index="/user/resetpassword">
    <el-icon><Remove /></el-icon>
    <span>重置密码</span>
</el-menu-item>
        </el-sub-menu>
        
      </el-menu>
        </el-aside>
        <!-- 容器2 -->
        <el-container style="background-color: #E8E8E8;">
            <!-- 头部菜单 -->
          <el-header style="background-color: #FFFFFF;display: flex;justify-content: space-between;">
          
          <div style="
          width: 50%;
          box-sizing: border-box;
          padding-top: 20px;
          padding-bottom: 20px;
          ">
          <!-- 报错不用管 -->
            <span class="text-large font-600 mr-3" style="color: rebeccapurple;">当前用户：<strong>{{userInfoStore.info.username}}</strong></span>
          </div>
<div style="
box-sizing: border-box;
          padding-top: 5px;
          padding-bottom: 5px;
  ">
<el-dropdown class="el-dropdown-avatar"  placement="bottom-end" @command="handleCommand">
    
  <span>
      <el-avatar :src="userInfoStore.info.userPic?userInfoStore.info.userPic:url" :size="50" fit="cover">
        <el-icon :size="20" ><UserFilled /></el-icon>
        </el-avatar>
      <el-icon :size="20" ><CaretBottom /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="info" :icon="Postcard">基本资料</el-dropdown-item>
        <el-dropdown-item command="avatar" :icon="UserFilled">更换头像</el-dropdown-item>
        <el-dropdown-item command="resetpassword" :icon="Remove">重置密码</el-dropdown-item>
        <el-dropdown-item command="logout" :icon="SwitchButton" >退出登录</el-dropdown-item>
        
    </el-dropdown-menu>
    </template>
    
  </el-dropdown></div>


        
            
          </el-header>
          <!-- 主页面 -->
          <el-main>
            
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<style>
.common-layout{
    height: 100vh;
}
.container-outside{
    height: 100%;
}
.el-dropdown-avatar{
  

}
</style>

