
import axios from 'axios'
export default {
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