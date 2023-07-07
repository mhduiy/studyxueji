<template>
    <el-container id="container">
        <el-header id="header">
            <header-comp></header-comp>
        </el-header>
        <el-main id="main">
            <el-container id="main-container">
                <el-aside id="left-nav">
                    <menu-comp></menu-comp>
                </el-aside>
                <el-main id="content">
                    <router-view/>
                </el-main>
            </el-container>
        </el-main>
        <el-footer id="footer">
            footer
        </el-footer>
    </el-container>
</template>

<script setup>
// import ElemenetPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import HeaderComp from "@/components/HeaderComp";
import MenuComp from "@/components/MenuComp";
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    #container {
        display: flex;
        flex-direction: column;
        height: 98vh;
    }
    #header {
        height: 80px;
    }
    #main #content{
        flex: 1;
        padding: 0;
    }
    #header {
        height: 40px;
        border-bottom: lightgray 1px solid;
    }
    #footer{
        background-color: #eaeaea;
    }
    #main-container {
        display: flex;
    }
    #left-nav {
        border-right: #e7e7e7 1px solid;
        background-color: #ececec;
        width: 200px;
    }
    #main-container {
        height: 100%;
    }
</style>