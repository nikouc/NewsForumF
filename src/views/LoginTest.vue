<script lang="ts" setup>

import { ref } from 'vue';

const size = ref(100)
const size2 = ref(0)
const width = ref('width: ' + size.value + 'px;')
const left = ref('left:' + size2.value + '%;')
const widthMethod = () => {
    console.log(size2.value);
    console.log(left.value);
    size.value = size.value == 100 ? 200 : 100;
    width.value = 'width: ' + size.value + 'px;';
    size2.value = size2.value == 0 ? 50 : 0;
    left.value = 'left:' + size2.value + '%;';
}

</script>

<template>
    <!-- 大滑块 -->
    <div style="min-width: 1024px;min-height: 100vh;">
        <div style="position:fixed;z-index: 2020;transition: all 1s;width: 50%;height: 100%;" :style="left">
            <el-card style="width: 100%;height: 100%;">
                
            </el-card>
        </div>
        <div style="position:fixed;z-index: 2010;left: 0%;">

            <el-button @click="widthMethod" :style="width" style="transition: 1s;" type="primary">Primary</el-button>

        </div>
        <div style="position:fixed;z-index: 2010;right: 0%;">

            <el-button @click="widthMethod" :style="width" style="transition: 1s;" type="primary">Primary</el-button>

        </div>

    </div>



<div class="common-layout">
    <el-container>
<!-- 注册表单 -->
        <el-main>Main</el-main>
        
<!-- 登录表单 -->
        <el-main>Main</el-main>
    </el-container>
  </div>


</template>

<style></style>