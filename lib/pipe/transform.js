const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default
const { Transform } = require('stream')
const fs = require('fs')
const Path = require('path')
const transElem = (source, _src) => {
    const ast = parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'dynamicImport'] // 支持import() 动态导入语法
    })

    traverse(ast, {
        enter(path) {
            //处理不是以@别名的导入
        },
    })
    const { code } = generator(ast, {
        // retainLines: true,
    })
    return code
}


const transResolveFn = (_src) => {
    return new Transform({
        transform: (chunk, encoding, callback) => {
            const input = chunk.toString()
            const output = transElem(input, _src)
            callback(null, output) //node模式 都是错误优先
        }
    })
}
module.exports = {
    transResolveFn
}