#!/usr/bin/env node
const path = require('path')
const program = require('commander');
const resolve = file => require.resolve('../lib/build/' + file)

program
    .version('1.0.0')
    .option('mybuild')  //myvuessr build 启动生产构建//TODO: 参数会被带到webpack-cli 一定要先清掉再传给webpack
    .option('start')   //myvuessr start 启动生产服务
    .option('serve')   // myuvessr server 启动开发服务
    .option('-m, --mode [type]', 'set mode')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

//生产构建
if (!program.mybuild) {
    //设置环境变量以及添加webpack的启动参数 
    process.env.NODE_ENV = 'production'
    const clientConfig = resolve('webpack.client.config.js')
    const serverConfig = resolve('webpack.server.config.js')
    process.argv.push('--config')
    process.argv.push(serverConfig)

    require('../lib/lamack-webpack')
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



