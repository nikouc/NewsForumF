import { createRouter,createWebHistory } from "vue-router";

//导入组件
import Loginvue from '@/views/Login.vue';
import Homevue from '@/views/Home.vue';

import ArticleCategory from "@/views/aritcle/ArticleCategory.vue";
import ArticleManage from "@/views/aritcle/ArticleManage.vue";
import UserAvatar from "@/views/user/UserAvatar.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import UserResetPassword from "@/views/user/UserResetPassword.vue";

//定义路由关系
const routes = [
    {path:'/',component:Loginvue},
    {path:'/home',component:Homevue,
    // redirect:'/article/category',
    children: [
        {path:'/article/category',component:ArticleCategory},
        {path:'/article/manage',component:ArticleManage},
        {path:'/user/avatar',component:UserAvatar},
        {path:'/user/info',component:UserInfo},
        {path:'/user/resetpassword',component:UserResetPassword}
        
    ]},
]

//创建路由
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router;