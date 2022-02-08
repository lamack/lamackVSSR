import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const createRouter = (routerObj) => {
  const router = new VueRouter(routerObj)

  return router
}
