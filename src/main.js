import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
