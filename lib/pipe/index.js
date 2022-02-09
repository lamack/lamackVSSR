
const { routerPipe } = require('./router_pipe')
const { storePipe } = require('./store_pipe')
const { appVuePipe } = require('./vue_app_pipe')

module.exports = {
    routerPipe, //导入Router配置
    storePipe, // 导入容器配置
    appVuePipe //导入App.vue
}