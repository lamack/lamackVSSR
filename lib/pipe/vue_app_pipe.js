
const path = require('path')
const { getOutPath, rmDir } = require('../util')
const { transFile } = require('./pipe')
const routerOptionsPath = getOutPath('./App.vue')

//预留babel编译转换类入口
const pipe = transFile()

module.exports.appVuePipe = async () => {
    try {
        await pipe(routerOptionsPath, path.resolve(__dirname, '../.memory/App.vue'))
    } catch (e) {
        return new Promise.reject(e)
    }
}