<script lang="ts" setup>
import { userAvatarUpdateService } from '@/api/user';
import { usePageStore } from '@/stores/currentPage';
import { useTokenStore } from '@/stores/token';
import { useUserInfoStore } from '@/stores/userinfo';
import { 
    Plus,
    Upload,
 } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//头像地址
const userInfo = useUserInfoStore()
const imgUrl = ref(userInfo.info.userPic)
const imgUrl2 = '/src/img/avatar1.png'
const token = useTokenStore()

//图片上传成功回调
const uploadSuccess = (result)=>{
     imgUrl.value = result.data
}
const uploadRef = ref()

//修改头像
const updateAvatar = async ()=>{
    let result = await userAvatarUpdateService(imgUrl.value)
    ElMessage.success(result.message?result.message:'修改成功')
    //更新全局数据
    userInfo.info.userPic=imgUrl.value
}


//刷新后页面继续保持当前页
const router = useRouter()
const pushStore = usePageStore()
pushStore.setPage('/user/avatar')
router.push(pushStore.page)
</script>
<template>
    <el-card style="height: 100%;">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row style="height: 500px;">
            <el-col :span="12">
                <el-upload
                ref="uploadRef"
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="true"
                action="/api/fileUpload/upload"
                name="file"
                :headers="{'Authorization':token.token}"
                :on-success="uploadSuccess"
                >
<!-- <el-image style="width: 500px; height: 500px;" :src="imgUrl" fit="contain" alt="avatar"/> -->
                <img v-if="imgUrl" :src="imgUrl" alt="avatar" style="width: 100%;min-width: 278px; height: 500px;object-fit: contain;"/>
                <img v-else :src="imgUrl2" width="278" alt="avatar2" style="width: 500px; height: 500px;object-fit: contain;"/>
                
            </el-upload>
                <br>
                <div style="width: 500px;">
                <el-button type="primary" :icon="Plus" size="large" @click="uploadRef.$el.querySelector('input').click()">上传头像</el-button>

<el-button class="ml-3" :icon="Upload" size="large" type="success" @click="updateAvatar">
    确认修改头像
    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<style scoped>

/* div .row-upload{
  position: relative;

 width: 100%;
  height: 0;
  padding-bottom: 50%;
  img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
} */

.avatar-uploader{
    height: 500px;
}
</style>