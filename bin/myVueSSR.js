#!/usr/bin/env node
const { fork } = require('child_process')
const program = require('commander');
const path = require('path')
const { getOutPath, rmDir, checkDir } = require('../lib/util')
const { routerPipe, storePipe, appVuePipe } = require('../lib/pipe')
program
    .version('1.0.0')
    .option('build')  //myvuessr build 启动生产构建// 参数会被带到webpack-cli 一定要先清掉再传给webpack 或者使用干净的子进程
    .option('start')   //myvuessr start 启动生产服务
    .option('serve')   // myuvessr server 启动开发服务
    .option('-m, --mode [type]', 'set mode')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);


let DIST_DIR = getOutPath('dist')
//生产构建
if (program.build) {
    rmDir(DIST_DIR) //先删除dist
    rmDir(path.resolve(__dirname, '../lib/.memory')) //先删除暂存文件夹
    checkDir(path.resolve(__dirname, '../lib/.memory')) //再新建
    Promise.all([routerPipe(), storePipe(), appVuePipe()]).then(() => {

        //执行打包
        //无需设置argv 子进程是新的干净的程序
        // process.argv.splice(2)
        const serverChild = fork(path.resolve(__dirname, '../children/serverChild.js'))
        const clientChild = fork(path.resolve(__dirname, '../children/clientChild.js'))
    }, error => {
        console.log(error)
    })


}
// 启动生产服务
if (program.start) {
    process.env.NODE_ENV = 'production'
    require('../lib/server')
}
// 启动开发服务
if (program.serve) {
    require('../lib/server')
}



