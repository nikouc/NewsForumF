<script lang="ts" setup>
import { ref } from 'vue';
import {
    Delete,
  Edit,
  Tickets,
  Document,
} from '@element-plus/icons-vue'
import { useUserInfoStore } from '@/stores/userinfo';
import { userInfoUpdateService } from '@/api/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { usePageStore } from '@/stores/currentPage';
import { useRouter } from 'vue-router';

const router = useRouter()

//获取用户个人信息
const useInfoStore = useUserInfoStore()
//基本信息表单模型
const userInfo = ref({
    ...useInfoStore.info
    // id:'',
    // username:'',
    // nickname:'',
    // email:''
})
//表单规则
const rules = {
    nickname:[
        {required: true, message: '请输入昵称', trigger: 'blur'},
        {pattern:/^\S{2,10}$/,message:'昵称必须为2~10位非空字符串',trigger:'blur'}
    ],
    email:[
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type:'email',message:'邮箱格式不正确',trigger:'blur'}
    ],
}

//修改个人信息
const updateUserInfo = async ()=>{
    ElMessageBox.confirm(
    '您确认要修改用户信息吗？',
    '修改信息!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await userInfoUpdateService(userInfo.value)
      ElMessage({
        type: 'success',
        message: result.message?result.message:'修改成功',
      });
      useInfoStore.setInfo(userInfo.value)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改',
      })
    })
    
}

//刷新后页面继续保持当前页
const pushStore = usePageStore()
pushStore.setPage('/user/info')
router.push(pushStore.page)
</script>
<template>
    <el-card style="height: 100%;">
      <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
    <el-form :model="userInfo" :rules="rules" label-width="auto">
      <el-form-item label="用户名">
        <el-input :prefix-icon="Tickets" placeholder="用户名" v-model="userInfo.username" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input :prefix-icon="Document" placeholder="昵称" v-model="userInfo.nickname" minlength="2" maxlength="10"/>
        </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
        <el-input :prefix-icon="Document" placeholder="邮箱地址" v-model="userInfo.email"/>
        </el-form-item>
    </el-form>
    
      <div class="dialog-footer">
        
        <el-button type="primary" @click="updateUserInfo">
          确认
        </el-button>
      </div>

  </el-card>
</template>

<style scoped>
</style>