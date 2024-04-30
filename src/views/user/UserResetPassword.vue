<script lang="ts" setup>
import { userResetPasswordService } from '@/api/user';
import { usePageStore } from '@/stores/currentPage';
import {
    Delete,
  Edit,
  Tickets,
  Document,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//*********************************表单model*********************************************
const resetPasswordModel = ref({
    oldpwd:'',
    newpwd:'',
    repwd:'',
})
//*********************************表单model*********************************************
//===============表单规则函数==================
const checkaRepwd = (rule,value,callback)=>{
    if(value===''){
        callback(new Error("请再输入一遍新密码"))
    }else if(value!==resetPasswordModel.value.newpwd){
        callback(new Error("重复密码和新密码不一致"))
    }else{
        callback()
    }
}
//===============表单规则函数==================

//***********************************表单规则*********************************************
const rules = {
    oldpwd:[
        {required: true, message: '请输入旧密码', trigger: 'blur'},
    ],
    newpwd:[
        {required: true, message: '请输入新密码', trigger: 'blur'},
        {pattern:/^\S{5,16}$/, message: '请输入5~16位数字，字母', trigger: 'change'},
    ],
    repwd:[
        // {required: true, message: '请再输入一遍新密码', trigger: 'blur'},
        {required:true, validator:checkaRepwd, trigger: 'change'},
    ]
}
//***********************************表单规则*********************************************

const resetPassword = async ()=>{
    if(resetPasswordModel.value.oldpwd===''||resetPasswordModel.value.newpwd===''||resetPasswordModel.value.repwd===''
        ||resetPasswordModel.value.newpwd.search(/^\S{5,16}$/)||resetPasswordModel.value.newpwd!==resetPasswordModel.value.repwd
    ){
        ElMessage.error('请检查填写的信息是否完整')
        return;
    }
    ElMessageBox.confirm(
    '您确认要重置密码吗？',
    '重置密码!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {

      let result = await userResetPasswordService(resetPasswordModel.value)
      ElMessage({
        type: 'success',
        message: result.message?result.message:'重置密码成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消重置',
      })
    })
}
//**************************************************************************
//刷新后页面继续保持当前页
const router = useRouter()
const pushStore = usePageStore()
pushStore.setPage('/user/resetpassword')
router.push(pushStore.page)

</script>
<template>
    <el-card style="height: 100%;">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
  <el-form :model="resetPasswordModel" :rules="rules" label-width="auto">
    <el-form-item label="旧密码" prop="oldpwd">
      <el-input :prefix-icon="Tickets" placeholder="旧密码" v-model="resetPasswordModel.oldpwd" autocomplete="off" maxlength="16"/>
    </el-form-item>
    <el-form-item label="新密码" prop="newpwd">
      <el-input :prefix-icon="Document" placeholder="新密码" v-model="resetPasswordModel.newpwd" maxlength="16"/>
      </el-form-item>
  <el-form-item label="重复密码" prop="repwd">
      <el-input :prefix-icon="Document" placeholder="重复密码" v-model="resetPasswordModel.repwd" maxlength="16"/>
      </el-form-item>
  </el-form>
  
    <div class="dialog-footer">
      
      <el-button type="primary" @click="resetPassword">
        确认
      </el-button>
    </div>

</el-card>
</template>
<style scoped>
</style>