<script setup>

import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import {
    User,
    Lock
} from '@element-plus/icons-vue'

const isRegister = ref(false);
const url = '/src/img/loginImg.png'
const registerData = ref({
    username: '',
    password: '',
    rePassword: '',
})

//校验密码函数
const checkaPassword = (rule,value,callback)=>{
    
    if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error("请确保两次输入的密码相同"))
  } else {
    callback()
  }
}

//定义表单校验规则
const rules = {
    username:[      
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '请输入用户名', trigger: 'blur' },
  ],
  password:[
  { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern:/^\S{5,16}$/, message: '请输入5-16的非空字符串密码', trigger: 'blur' },
  ],
  rePassword:[
    {validator:checkaPassword,trigger:'blur'}
  ],
}

//调用接口，完成注册
import { userRegisterService,userLoginService } from '@/api/user.js';
const register = async () => {
    if(!registerData.value.password.search(/^\S{5,16}$/)){
    if(registerData.value.password===registerData.value.rePassword){
    let result = await userRegisterService(registerData.value);
//     // if(result.code===0){
//     //     alert(result.message ? result.message : "注册成功");
//     // }else{
//     //     alert(result.message ? result.message : "注册失败");
//     // }
//     //alert(result.message);
    ElMessage.success(result.message ? result.message : "注册成功");

    isRegister.value=false; }
}
}

//登录复用注册数据
//登录函数
import {useRouter} from 'vue-router';
import { useTokenStore } from '@/stores/token';

const router = useRouter()
const loginTokenStore = useTokenStore()
const login = async ()=>{
    if(registerData.value.username===''||registerData.value.password===''){
        return ElMessage.error("密码或用户名不能为空");
    }
    let result = await userLoginService(registerData.value);
    // if(result.code===0){
    //     alert(result.message ? result.message : "登录成功");
    // }else{
    //     alert("登录失败");
    // }
    //alert(result.message);
    ElMessage.success("登录成功");
    //获取的token放到store里
    loginTokenStore.setToken(result.data);
    //转跳首页
    router.push('/home');
}

//登录或注册时要清空表单
const cleanRegisterData = ()=>{
    registerData.value={
        username: '',
    password: '',
    rePassword: '',
    }
}
</script>
<template>
    <el-row class="login-el-row">
        <el-col v-if="!isRegister" :span="12" class="grid-content">
            <el-card class="login-card el-card__body" shadow="always">
            <el-image style="width: 100%; height: 100%;background-color: #2A85CE;" :src="url" fit="cover" />
            </el-card>
        </el-col>
        
            <el-col :span="6" :offset="3" class="grid-content" >
                
  <el-form class="form" ref="form" size="large" autocapitalize="off" v-if="isRegister" :model="registerData" :rules="rules">
           <!-- 注册表单 -->     
    <el-form-item style="margin-left: 40%;">
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"/>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"/>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">注册</el-button>
                </el-form-item>
                <el-form-item >
                    <el-link type="info" :underline="false" @click="isRegister=false;cleanRegisterData()">返回=></el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form class="form" ref="form" size="large" autocomplete="off" v-if="!isRegister" :model="registerData" :rules="rules">
                <el-form-item style="margin-left: 40%;">
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"/>
                </el-form-item>
                <el-form-item>
                    <div style="width: 100%;">
                        <span>
                            <el-checkbox>记住我</el-checkbox>
                            
                        <el-link style="float: right;" type="primary" :underline="false">忘记密码?</el-link>
                    </span>
                        
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" @click="login" auto-insert-space>登录</el-button>
                </el-form-item>
                <el-form-item >
                    <el-link type="info" :underline="false" @click="isRegister=true;cleanRegisterData()"><=注册</el-link>
                </el-form-item>
            </el-form>
                
            
          
        
        </el-col>
        <el-col v-if="isRegister" :span="12" class="grid-content">
            <el-card class="login-card2 el-card__body" shadow="always">
            <el-image style="width: 100%; height: 100%;background-color: #BF287F;" :src="url" fit="cover" />
            </el-card>
        </el-col>
        
    </el-row>
    

        
    <!-- <el-row :align="middle">
<el-col :span="24" class="grid-content">
<div style="height: 50vh;">11111111</div>
</el-col>

    </el-row> -->

</template>

<style lang="scss">
.login-el-row{
    .el-col-offset-3{
        margin-right: 12.5%;
    }
    
}

.el-card.login-card{
    --el-card-border-radius:30px;
    --el-card-padding:0px;
    height: 100%;
    border: 0px solid rgb(232, 232, 232);
    .el-card__body{
    height: 100%;
}
}

.el-card.is-always-shadow.login-card{
    box-shadow:0px 0px 50px rgba(50, 83, 229, 0.651);
}

.el-card.login-card2{
    --el-card-border-radius:30px;
    --el-card-padding:0px;
    height: 100%;
    border: 0px solid rgb(232, 232, 232);
    .el-card__body{
    height: 100%;
}
}
.el-card.is-always-shadow.login-card2{
    box-shadow:0px 0px 50px rgba(229, 48, 157, 0.651);
}


.form{
margin-top: 25vh;
    // display: flex;
    // justify-content: space-evenly;
}


.el-row {
    margin-bottom: 20px;
    height: 100vh;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>