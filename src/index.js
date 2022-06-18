import { createApp } from 'vue'
import App from "./App.vue"
import "./index.scss";
import { store } from './store/store.js';


createApp(App).use(store).mount("#app")