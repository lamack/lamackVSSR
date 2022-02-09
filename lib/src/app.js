/**
 * 通用启动入口
 */
import Vue from 'vue'
import { createRouter } from './router/'
import VueMeta from 'vue-meta'
import { createStore } from './store'
//外部约定资源
import routerOptions from '../.memory/routerOptions'
import storeOptions from '../.memory/storeOptions'
import App from '../.memory/App.vue'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 海外租车'
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter(routerOptions)
  const store = createStore(storeOptions)
  const app = new Vue({
    router, // 把路由挂载到 Vue 根实例中
    store, // 把容器挂载到 Vue 根实例中
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}
