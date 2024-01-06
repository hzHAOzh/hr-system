import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import VueRouter from "./route";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3"
import "animate.css/animate.min.css";


createApp(App).use(createPinia()).use(ElementPlus).use(VueRouter).use(Particles).mount('#app')
