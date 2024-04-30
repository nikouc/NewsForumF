//自定义请求实例
import router from "@/router";
import { useTokenStore } from "@/stores/token";
import axios from "axios";
import { ElMessage } from 'element-plus'


const baseURL = '/api';
const instance = axios.create({baseURL});

//请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            config.headers.Authorization = tokenStore.token
        }
        return config;
    },
    (err)=>{
        //请求错误的回调
        Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    result=>{
        console.log('服务数据响应成功');
        //判断业务状态码
        if(result.data.code===0){
            return result.data;
        }
        //alert(result.data.message?result.data.message:"服务操作失败!");
        ElMessage.error(result.data.message?result.data.message:"服务操作失败!")
        return Promise.reject(result.data);
    },
    err=>{
        //如果状态码为401则未登录，转跳登录界面
        if(err.response.status===401){
            ElMessage.error("请先登录！");
            router.push('/');
        }else{
            //alert('服务异常');
        ElMessage.error('服务异常');
        }
        return Promise.reject(err);
        
    }
)

export default instance;