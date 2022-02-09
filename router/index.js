
import Home from '@/pages/Home'
export default {
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