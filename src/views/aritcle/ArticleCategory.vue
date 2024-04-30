<script lang="ts" setup>
import { ref } from 'vue';
import {
  Delete,
  Edit,
  Tickets,
  Document,
} from '@element-plus/icons-vue'
import { articleCategoryListService,
    articleCategoryAddService,
    articleCategoryUpdateService,
    articleCategoryDeleteService
 } from '@/api/article';
import { ElMessage,ElMessageBox } from 'element-plus';
import { usePageStore } from '@/stores/currentPage';
import router from '@/router';


const categoryListData = ref([
  {
    id: '2016-05-03',
    categoryName: 'Tom',
    categoryAlias: 'No. 189, Grove St, Los Angeles',
  }
])
//声明异步函数
//寻找所有分类列表
const articleCategoryList = async ()=>{
    
    let result = await articleCategoryListService();
    categoryListData.value=result.data;
}
articleCategoryList();

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    id:'',
    categoryName:'',
    categoryAlias:''
})
//添加分类表单校验
const rules = {
    categoryName:[
        {required: true, message: '请输入分类名字', trigger: 'blur'}
    ],
    categoryAlias:[
        {required: true, message: '请输入分类别名', trigger: 'blur'}
    ]
}
//调用添加接口
const categoryAdd = async ()=>{
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success('操作成功' ?'添加成功':result.message);

    //调用所有文章分类的函数
    articleCategoryList();

    dialogVisible.value=false;
}

//调用更新接口
const categoryUpdate = async ()=>{
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.message?result.message:'修改成功');
    //重新加载所有列表
    articleCategoryList();

    dialogVisible.value=false;
}

//定义标题变量控制弹窗的展示
const title = ref('')

//触发弹窗的函数
const showAddVisible = ()=>{
    dialogVisible.value=true;
    title.value='添加分类';
    //清除categoryModel数据
    categoryModel.value.id='';
    categoryModel.value.categoryName='';
    categoryModel.value.categoryAlias='';
}
const showEditVisible = (row)=>{
    dialogVisible.value=true;
    title.value='编辑分类';
    //拷贝数据
    categoryModel.value.id=row.id;
    categoryModel.value.categoryName=row.categoryName;
    categoryModel.value.categoryAlias=row.categoryAlias;
}

//删除分类
//弹窗


const categoryDelete = (row) => {
  ElMessageBox.confirm(
    '您确认要删除这个文章分类吗？',
    '这是一个删除!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await articleCategoryDeleteService(row.id);
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      //刷新列表
      articleCategoryList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

//刷新后页面继续保持当前页
const pushStore = usePageStore()
pushStore.setPage('/article/category')
router.push(pushStore.page)
</script>

<template>
    <el-card style="height: 100%;">
    <template #header>
        <div style="display: flex;justify-content: space-between;">
            <span>文章分类</span>
            <div>
                <el-button @click="showAddVisible()" type="primary">添加分类</el-button>
            </div>
        </div>
    </template>
    <el-table :data="categoryListData" style="width: 100%">
    <el-table-column prop="id" label="序号" width="100" >
        </el-table-column>
    <el-table-column prop="categoryName" label="分类名称">
        </el-table-column>
        <el-table-column prop="categoryAlias" label="分类别名">
        </el-table-column>
    <el-table-column label="操作" width="100">
        <template #default="{row}">
        <el-button type="primary" :icon="Edit" circle plain @click="showEditVisible(row)" />
        <el-button type="danger" :icon="Delete" circle plain @click="categoryDelete(row)"/>
        </template>
</el-table-column>

<template #empty>
    <el-empty description="没有数据"/>
</template>
  </el-table>
<!-- 弹窗 -->
  <el-dialog v-model="dialogVisible" :title="title" width="500">
    <el-form :model="categoryModel" :rules="rules">
      <el-form-item prop="categoryName">
        <el-input :prefix-icon="Tickets" placeholder="分类名" v-model="categoryModel.categoryName" autocomplete="off" minlength="1" maxlength="10"/>
      </el-form-item>
      <el-form-item prop="categoryAlias">
        <el-input :prefix-icon="Document" placeholder="分类别名" v-model="categoryModel.categoryAlias" autocomplete="off" minlength="1" maxlength="15"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="title=='添加分类'?categoryAdd():categoryUpdate()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  </el-card>
</template>