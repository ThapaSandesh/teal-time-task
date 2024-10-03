import './bootstrap';
import {createApp} from 'vue'
import App from './src/App.vue';
import router from './src/router/index';
import ToastPlugin from 'vue-toast-notification';
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { createPinia } from 'pinia';

createApp(App)
.use(router)
.use(ToastPlugin)
.use(createPinia())
.component('Bootstrap5Pagination',Bootstrap5Pagination)
.mount("#app")
