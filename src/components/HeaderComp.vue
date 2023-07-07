<template>
    <div id="header-container">
        <div id="left">
            <img src="../assets/element-plus-logo.svg" alt="logo">
            <span>长江大学学籍管理系统</span>
        </div>
        <div id="right">
            <span>王先生</span>
            <a href="#">退出</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeaderComp"
}
</script>

<style scoped>
    #left > img {
        width: 100px;
    }
    #header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    #left > *, #right > * {
        margin: 7px;
    }
</style>