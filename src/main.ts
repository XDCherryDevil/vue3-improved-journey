import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';  // 引入 Element Plus 的 CSS

createApp(App).use(store).use(router).use(ElementPlus).mount("#app"); 为什么报错