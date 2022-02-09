
const path = require('path')
const { getOutPath } = require('../util')
const { transFile } = require('./pipe')
const routerOptionsPath = getOutPath('store/index.js')
//预留babel编译转换类入口
const pipe = transFile()

module.exports.storePipe = async () => {
    try {
        await pipe(routerOptionsPath, path.resolve(__dirname, '../.memory/storeOptions.js'))
    } catch (e) {
        return new Promise.reject(e)
    }
}