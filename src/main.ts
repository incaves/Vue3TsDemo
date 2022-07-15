import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册并挂载
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
