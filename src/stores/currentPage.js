import { defineStore } from 'pinia'
import {ref} from 'vue'

//存储当前页面地址
export const usePageStore = defineStore('page',()=>{
    const page = ref('')
    const setPage=(p)=>{
        page.value=p
    }
    return {page,setPage}
},
{
    persist:true
}
)