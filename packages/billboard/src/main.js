import 'reset-css'
import 'normalize.css'
import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/packages/theme-chalk/src/index.scss'
// import '@/assets/scss/element-ui.scss'

import 'animate.css'

import './assets/scss/common.scss'
import './assets/scss/element-ui.scss'

import './service/vue-devtools'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import locale from 'element-plus/lib/locale'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import App from './App.vue'
import router from './router'
import store from './store'

locale.use(lang)

const app = createApp(App)

app.config.globalProperties.$formatSlashedDate = datetime => dayjs(datetime).format('mm/dd/yyyy')

app.use(store).use(router).use(ElementPlus, { locale: lang, size: 'small', zIndex: 20210326 })

app.mount('#app')
