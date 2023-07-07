// 创建路由

import StudentPage from "@/components/StudentPage";
import TeacherPage from "@/components/TeacherPage";
import ProjectPage from "@/components/ProjectPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";

const router = [
    {
        path: "/student",
        component: StudentPage
    },
    {
        path: "/teacher",
        component: TeacherPage
    },
    {
        path: "/project",
        component: ProjectPage
    },
]

export default createRouter({
    history: createWebHistory(),
    routes:router
})