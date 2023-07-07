import {createApp, reactive} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from "@/components/router";

// 这是一个插件， 下方使用app。use()进行挂载
import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from "axios";

let app = createApp(App)
app.config.globalProperties.$currentUser = reactive({name: "张三"})
app.use(ElementPlus)
app.use(router)

// 设置在全局上
app.config.globalProperties.$axios = axios
//  全局注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')