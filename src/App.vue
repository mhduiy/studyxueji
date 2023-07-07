<template>
    <login-page v-if=""/>
</template>

<script>
// 这两个现在是一个组件， 可以当作标签来使用
    import LoginPage from '@/pages/LoginPage'
    import LayoutComp from "@/components/LayoutComp";
export default {
    components: {LoginPage}
}

</script>

<style>
</style>
