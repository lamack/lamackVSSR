/**
 * 通用启动入口
 */
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/'
import VueMeta from 'vue-meta'
import { createStore } from './store'

//need delete TODO:
import Home from '@/pages/Home'
import axios from 'axios'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 海外租车'
  }
})
let storeObj = {
  state: () => ({
    posts: []
  }),

  mutations: {
    setPosts(state, data) {
      state.posts = data
    }
  },

  actions: {
    // 在服务端渲染期间务必让 action 返回一个 Promise
    async getPosts({ commit }) {
      // return new Promise()
      const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
      commit('setPosts', data.data)
    }
  }
}
let routerObj = {
  mode: 'history', // 兼容前后端
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: 'about' */'@/pages/About')
    },
    {
      path: '/posts',
      name: 'post-list',
      component: () => import(/* webpackChunkName: 'post' */'@/pages/Posts')
    },
    {
      path: '*',
      name: 'error404',
      component: () => import(/* webpackChunkName: '404' */'@/pages/404')
    }
  ]
}
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter(routerObj)
  const store = createStore(storeObj)
  const app = new Vue({
    router, // 把路由挂载到 Vue 根实例中
    store, // 把容器挂载到 Vue 根实例中
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}
