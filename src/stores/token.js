import { defineStore } from 'pinia'
import {ref} from 'vue'

//定义全局的数据
export const useTokenStore = defineStore('token', () => {
    //定义描述token
    const token = ref('');

    //定义修改token的方法
    const setToken = (NewToken)=>{
        token.value=NewToken
    }

    //定义移除token的方法
    const removeToken = ()=>{
        token.value=''
    }
  
    return { token,setToken,removeToken }
  },
{
    persist:true
}
)