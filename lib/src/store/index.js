import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const createStore = (storeObj) => {
  return new Vuex.Store(storeObj)
}
