import { createSSRApp } from 'vue'
import App from './App.vue'
import './style.css'

import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import { createSSRi18n } from './language/i18'
import { createSSRouter } from './router'
import { createPinia } from 'pinia'
import { ID_INJECTION_KEY } from 'element-plus'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createSSRouter()
  const i18n = createSSRi18n()

  app.config.globalProperties.$message = ElMessage
  app.use(pinia)
  app.use(router)

  app.use(ElementPlus)
  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  app.use(i18n)
  return { app, router, pinia }
}
