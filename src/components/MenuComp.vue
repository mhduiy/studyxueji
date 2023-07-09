<template>
    <el-menu default-active="1" router>
        <el-menu-item v-for="(item, index) in menuDatas" :key="index" :index="item.path">
            <el-icon class="is-loading">
                <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.label }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import {getCurrentInstance, onMounted, reactive} from "vue";
// import { User } from '@element-plus/icons-vue'
// let menuDatas = reactive([{
//     label: '学生信息录入',
//     path: '/student',
//     icon: 'Loading'
// }, {
//     label: '教师信息录入',
//     path: '/teacher',
//     icon: 'Loading'
// }, {
//     label: '课程信息录入',
//     path: '/project',
//     icon: 'Loading'
// }])

const {proxy} = getCurrentInstance()

let menuDatas = reactive([])
onMounted((res) => {
    // 发起 GET 请求
    proxy.$axios.get("http://localhost:9002/menuList").then(response => {
        // 处理响应的逻辑
        console.log(response.data);
        response.data.forEach((item) => {
            menuDatas.push(item)
        })
    });
    console.log(res)
})

</script>

<style scoped>

</style>