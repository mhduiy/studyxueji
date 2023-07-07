<template>
    <div id="header-container">
        <div id="left">
            <img src="../assets/element-plus-logo.svg" alt="logo">
            <span>长江大学学籍管理系统</span>
        </div>
        <div id="right">
            <span>{{currentUser.name}}</span>
            <a href="#">退出</a>
        </div>
    </div>
</template>

<script setup>
    import {getCurrentInstance} from "vue";

    const { proxy } = getCurrentInstance();
    let currentUser = proxy.$currentUser;
</script>

<style scoped>
    /*#left {*/
    /*    display: flex;*/
    /*}*/
    #left > img {
        width: 100px;
    }
    /*#left > span {*/
    /*    align-items: center;*/
    /*    font-size: 20px;*/
    /*}*/
    #header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    #left > *, #right > * {
        margin: 7px;
        vertical-align: middle;
    }
</style>