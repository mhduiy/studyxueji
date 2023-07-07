import {createApp, reactive} from 'vue'
import App from './App.vue'

let app = createApp(App)
app.config.globalProperties.$currentUser = reactive(null)
app.mount('#app')