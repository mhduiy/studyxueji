<template>
    <el-menu>
        <el-menu-item v-for="(item, index) in menuDatas" :key="index">
<!--            <el-icon :class="item.icon"></el-icon>-->
            <el-icon><User/></el-icon>
            <span>{{item.label}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import {reactive} from "vue";
import { User } from '@element-plus/icons-vue'
let menuDatas = reactive([{
    label: '学生信息录入',
    path: '/student',
    icon: 'el-icon-user'
}, {
    label: '教师信息录入',
    path: '/teacher',
    icon: 'el-icon-user'
}, {
    label: '课程信息录入',
    path: '/project',
    icon: 'el-icon-user'
}])

</script>

<style scoped>

</style>