import {createApp, reactive} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

// 这是一个插件， 下方使用app。use()进行挂载
import ElementPlus from 'element-plus'

let app = createApp(App)
app.config.globalProperties.$currentUser = reactive({})
app.use(ElementPlus)

app.mount('#app')