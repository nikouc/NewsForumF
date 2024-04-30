<script lang="ts" setup>
import { ref } from 'vue'
import {
    Delete,
    Edit,
    Download, 
    Plus, 
    ZoomIn,
} from '@element-plus/icons-vue';

//文章分类模型
const categorysModel = ref([
    {
        "id":3,
        "categoryName":"美食",
        "categoryAlilas":"food",
        "createTime":"1212:2121",
        "updateTime":"fiowhg:545:64546"
    },
    {
        "id":4,
        "categoryName":"美食4",
        "categoryAlilas":"food4",
        "createTime":"1212:2121",
        "updateTime":"fiowhg:545:64546"
    },{
        "id":5,
        "categoryName":"美食3",
        "categoryAlilas":"food3",
        "createTime":"1212:2121",
        "updateTime":"fiowhg:545:64546"
    },{
        "id":12,
        "categoryName":"美食2",
        "categoryAlilas":"food2",
        "createTime":"1212:2121",
        "updateTime":"fiowhg:545:64546"
    },
])

//文章搜索模型
const searchPageModel = ref({
    categoryId:'',
    state:''
})

const tableData = ref([
{
                "id": 1,
                "title": "bbbbb",
                "content": "ghwogbegoeiwgew1few65gf168ewf14we6g165erh56werg",
                "coverImg": "https://fjiweghgdfoiwe.com",
                "state": "草稿",
                "categoryId": 2,
                "createUserid": 6,
                "createTime": "2024-04-01T22:39:48",
                "updateTime": "2024-04-01T22:39:48"
            },
            {
                "id": 2,
                "title": "bbbbb",
                "content": "ghwogbegoeiwgew1few65gf168ewf14we6g165erh56werg",
                "coverImg": "dsfdsf",
                "state": "草稿",
                "categoryId": 2,
                "createUserid": 6,
                "createTime": "2024-04-01T22:41:00",
                "updateTime": "2024-04-01T22:41:00"
            },
            {
                "id": 3,
                "title": "dfefgj",
                "content": "6666661111111",
                "coverImg": "https://fiwhghgewg.com",
                "state": "已发布",
                "categoryId": 2,
                "createUserid": 6,
                "createTime": "2024-04-01T22:48:08",
                "updateTime": "2024-04-07T02:39:41"
            },
]);





//控制分页栏
const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(1)

const onSizeChange = (num)=>{
    pageSize.value = num;
    articleList();
}
const onSCurrentChange = (num)=>{
    currentPage.value = num;
    articleList();
}


//刷新后页面继续保持当前页
import { usePageStore } from '@/stores/currentPage';
import { useRouter } from 'vue-router';
const router = useRouter()
const pushStore = usePageStore()
pushStore.setPage('/article/manage')
router.push(pushStore.page)


//调用接口
//显示文章分类
import {articleAddService, articleCategoryListService,articleDeleteService,articleListService, articleUpdateService} from '@/api/article.js'
import { ElMessage, ElMessageBox } from 'element-plus';
const articleCategoryList = async ()=>{
    let result = await articleCategoryListService()
    categorysModel.value=result.data
}
articleCategoryList()
//获取文章列表数据
const articleList = async ()=>{
    let params = {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        categoryId: searchPageModel.value.categoryId?searchPageModel.value.categoryId:null,
        state: searchPageModel.value.state?searchPageModel.value.state:null,
    };
    let result = await articleListService(params);
    //接收数据
    total.value=result.data.total;
    tableData.value=result.data.items;

//把分类名加入文章列表内
    for(let i=0;i<tableData.value.length;i++){
    let article=tableData.value[i];
    for(let j=0;j<categorysModel.value.length;j++){
        if(article.categoryId===categorysModel.value[j].id){
            console.log('article.categoryName')
            //报错不用管
            article.categoryName=categorysModel.value[j].categoryName;
        }
        
    }
}
}
articleList()

//添加文章
const addArticle = ref(false)
//添加文章的数据模型
const addArticleModel = ref({
    id:null,
    title:'',
    categoryId:null,
    coverImg:'',
    content:'',
    state:''
})
//表单校验规则
const rulesAddArticle = {
    title:[
        {required: true, message: '请输入标题', trigger: 'blur'},
        { min: 1, max: 10, message: '输入的字数要求为1~10个', trigger: 'blur' },
    ],
    categoryId:[
        {required: true, message: 'Please input Activity name', trigger: 'blur'}
    ],
    coverImg:[
        {required: true, message: 'Please input Activity name', trigger: 'blur'}
    ],
    content:[
        {required: true, message: 'Please input Activity name', trigger: 'blur'}
    ]
}

//上传文章封面
import type { UploadFile } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
//获取token
import { useTokenStore } from '@/stores/token'

const token = useTokenStore()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabledUpload = ref(false)
const coverImg = ref([])

const uploadSuccess = (result)=>{
    addArticleModel.value.coverImg=result.data
    console.log(result.data)
}

const handlePictureCardPreview=(uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
  console.log(uploadFile.url)
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

// const handleRemove= (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles)
// }

//富文本编辑器
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css'


//清除添加文章的模型数据
const cleanArticleData = ()=>{
    addArticleModel.value.id=null;
    addArticleModel.value.title='';
    addArticleModel.value.categoryId=null;
    addArticleModel.value.coverImg='';
    addArticleModel.value.content='';
    addArticleModel.value.state='';
    coverImg.value=[];
}

//添加文章到数据库
const addArticleData = async (artState)=>{
    addArticleModel.value.state=artState

    //调用接口
    if(addArticleModel.value.id){
        
        //更新文章
        let result = await articleUpdateService(addArticleModel.value)
    ElMessage.success(result.message?result.message:'修改成功')
    }else{
        //添加文章
        let result = await articleAddService(addArticleModel.value)
    ElMessage.success('上传成功')
    }
    

    //收起抽屉
    addArticle.value=false
    cleanArticleData()
    //刷新文章列表
    articleList()
}

//文章修改
const updateArticle = (row)=>{
    //文件名替换成分类id
    for(let i=0;i<categorysModel.value.length;i++){
        if(categorysModel.value[i].categoryName===row.categoryName){
            addArticleModel.value.categoryId=categorysModel.value[i].id
        }
    }
    addArticleModel.value.id=row.id;
    addArticleModel.value.title=row.title;
    addArticleModel.value.coverImg=row.coverImg;
    addArticleModel.value.content=row.content;
    coverImg.value=[{name:row.tile,url:row.coverImg}];
    //弹窗
    addArticle.value=true
}

//删除
const deleteArticle = async (row)=>{
    ElMessageBox.confirm(
    '您确认要删除这个文章吗？',
    '这是一个删除!',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await articleDeleteService(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      //刷新列表
      articleList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>

<template>
    <el-card style="width: 100%;min-width: 875px;height: 100%;">

        <div class="card-header">
            <span>文章管理</span>
            <el-button type="primary" @click="cleanArticleData();addArticle=true">添加文章</el-button>
        </div>
        <div style="margin-top: 10px;margin-bottom: 20px;"><hr></div>
        <!-- 分类表单 -->
        <el-form :inline="true" :model="searchPageModel" class="demo-form-inline">
            <el-form-item label="文章分类：">
                <el-select v-model="searchPageModel.categoryId" placeholder="请选择" clearable>
                    <el-option v-for="c in categorysModel" :key="c.id" :label="c.categoryName" :value="c.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="文章状态：">
                <el-select v-model="searchPageModel.state" placeholder="请选择" clearable>
                    <el-option label="已发布" value="已发布" />
                    <el-option label="草稿" value="草稿" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="searchPageModel.categoryId='';searchPageModel.state='';articleList()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table :data="tableData" style="width: 100%;" stripe max-height="700">
            <el-table-column prop="id" label="序号"/>
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="categoryName" label="分类id"/>
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="coverImg" label="图片" />
            <el-table-column prop="state" label="状态" />
            <el-table-column prop="createTime" label="创建时间" width="160"/>
            <el-table-column prop="updateTime" label="更新时间" width="160"/>
            <el-table-column label="操作" width="180" fixed="right">
                
                <template #default="{row}">
                    
                    <el-button type="primary" :icon="Edit" round plain @click="updateArticle(row)"/>
                    <el-button type="danger" :icon="Delete" round plain @click="deleteArticle(row)"/>
                    
                   </template> 
                
            
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class="el-p" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 40]" :small="small" :disabled="disabled" :background="background"
            layout="jumper,total, sizes, prev, pager, next" :total="total" @size-change="onSizeChange"
            @current-change="onSCurrentChange" />

    </el-card>
<!-- 添加文章抽屉 -->
    <el-drawer v-model="addArticle" direction="rtl" size="50%" style="min-width: 400px;">
    <template #header>
      <h4>添加文章</h4>
    </template>
    <template #default>
      <div>
        <el-form
    ref="ruleFormRef"
    :model="addArticleModel"
    :rules="rulesAddArticle"
    label-width="auto"
    size="default"
    status-icon
  >
    <el-form-item label="文章名字" prop="title">
      <el-input v-model="addArticleModel.title" />
    </el-form-item>
    <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="addArticleModel.categoryId" placeholder="请选择" clearable style="width: 50%;">
                    <el-option v-for="c in categorysModel" :key="c.id" :label="c.categoryName" :value="c.id" />
                </el-select>
    </el-form-item>

    <el-form-item label="文章封面" prop="coverImg">
        <el-upload 
        v-model:file-list="coverImg"
        action="/api/fileUpload/upload" 
        name="file"
        list-type="picture-card" 
        :auto-upload="true"
        :headers="{'Authorization':token.token}"
        :on-success="uploadSuccess"
        :on-preview="handlePictureCardPreview"
        >
            <!-- <img v-if="addArticleModel.coverImg" :src="addArticleModel.coverImg" /> -->
    <el-icon><Plus /></el-icon>

    <!-- <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="图片找不到" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabledUpload"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabledUpload"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template> -->
  </el-upload>
  <!-- 上传的图片预览 -->
  <el-dialog v-model="dialogVisible">
    <el-image :src="dialogImageUrl" alt="Preview Image"/>
  </el-dialog>
    </el-form-item>
<!-- 富文本编辑器 -->
    <el-form-item label="文章内容" prop="content" style="height: 100%;">
      <div class="editor">
        <quill-editor theme="snow" v-model:content="addArticleModel.content" content-type="html">
        </quill-editor>
      </div>
    </el-form-item>
</el-form>

      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button type="info" @click="addArticleData('草稿')">草稿</el-button>
        <el-button type="primary" @click="addArticleData('已发布')">发布</el-button>
      </div>
    </template>
  </el-drawer>

</template>

<style scoped lang="scss">

.card-header{
    display: flex;
    justify-content: space-between;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.el-p {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.editor{
    width: 100%;
    height: 200px;
    
}
</style>
