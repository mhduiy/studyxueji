<template>
    <login-page v-if="proxy.$currentUser == null"/>
    <layout-comp v-else/>
</template>


<!--加上setup之后， 导入的组件不用手动注册， 导出的时候不需要手动导出-->
<script setup>
    //导入全局代理， 获取全局变量
    import { getCurrentInstance } from "vue";
    // 这两个现在是一个组件， 可以当作标签来使用
    import LoginPage from '@/pages/LoginPage'
    import LayoutComp from "@/components/LayoutComp";

    const { proxy } = getCurrentInstance();
</script>

<style>
</style>
