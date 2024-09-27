import './bootstrap';
import {createApp} from 'vue'
import App from './src/App.vue';
import router from './src/router/index';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
createApp(App)
.use(router)
.use(ToastPlugin)
.mount("#app")
