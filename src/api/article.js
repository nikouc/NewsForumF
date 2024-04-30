import { useTokenStore } from '@/stores/token';
import request from '@/utils/request.js'

//查询所有分类
export const articleCategoryListService = ()=>{
    //const tokenStore = useTokenStore();
    //在pinia中定义的数据不用.value
    //return request.get('/category',{headers:{'Authorization':tokenStore.token}});
    return request.get('/category');
}

//添加分类
export const articleCategoryAddService = (categoryData)=>{
    return request.post('/category',categoryData)
}

//文章分类修改
export const articleCategoryUpdateService = (categoryData)=>{
    return request.put('category',categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (categoryData)=>{
    return request.get('/category/delete?id='+categoryData);
}

//文章列表查询
export const articleListService = (articleData)=>{
    return request.get('/article',{params:articleData})
}

//添加文章
export const articleAddService = (articleData)=>{
    return request.post('/article',articleData)
}

//更新文章
export const articleUpdateService = (articleData)=>{
    return request.put('/article',articleData)
}

//删除文章
export const articleDeleteService = (articleData)=>{
    return request.get('/article/delete?id='+articleData)
}