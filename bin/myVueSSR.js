#!/usr/bin/env node
const { fork } = require('child_process')
const fs = require('fs')
const path = require('path')
const program = require('commander');

program
    .version('1.0.0')
    .option('build')  //myvuessr build 启动生产构建//TODO: 参数会被带到webpack-cli 一定要先清掉再传给webpack
    .option('start')   //myvuessr start 启动生产服务
    .option('serve')   // myuvessr server 启动开发服务
    .option('-m, --mode [type]', 'set mode')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);


let DIST_DIR = path.resolve('./lib/dist')
//生产构建
if (program.build) {
    try {
        fs.accessSync(DIST_DIR, fs.constants.R_OK | fs.constants.W_OK);
        fs.rmSync(DIST_DIR, { recursive: true })
    } catch (err) {
        console.log("file: myVueSSR.js ~ line 26 ~ err", err)
    }
    //无需设置argv 子进程是新的干净的程序
    // process.argv.splice(2)
    const serverChild = fork('./children/serverChild.js')
    const clientChild = fork('./children/clientChild.js')
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



