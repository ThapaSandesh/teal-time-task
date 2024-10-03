import './bootstrap';
import {createApp} from 'vue'
import App from './src/App.vue';
import router from './src/router/index';
import ToastPlugin from 'vue-toast-notification';
import { Bootstrap5Pagination } from "laravel-vue-pagination";

import 'vue-toast-notification/dist/theme-bootstrap.css';
createApp(App)
.use(router)
.use(ToastPlugin)
.component('Bootstrap5Pagination',Bootstrap5Pagination)
.mount("#app")
