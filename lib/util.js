const fs = require('fs')
const path = require('path')
const fileExit = filePath => {
    try {
        const stat = fs.statSync(filePath)
        return stat.isFile()
    } catch (e) {
        return false
    }

}
const getOutPath = filePath => path.resolve(process.cwd(), filePath)
const getHtmlTempPath = () => {
    const htmlTemplatePath = path.resolve(__dirname, 'index.template.html')
    const outpath = getOutPath('index.template.html')
    const outTtmlExit = fileExit(outpath)
    return outTtmlExit ? outpath : htmlTemplatePath
}


const rmDir = pathUrl => {
    try {
        fs.accessSync(pathUrl, fs.constants.R_OK | fs.constants.W_OK);
        fs.rmSync(pathUrl, { recursive: true })
    } catch (err) { }
}
const checkDir = (dir) => {
    try {
        fs.accessSync(dir, fs.constants.f_OK);
    } catch (err) {
        fs.mkdirSync(dir)
    }
}
module.exports = {
    fileExit, //判断文件是否存在
    getOutPath, //获取脚手架执行目录下的文件路径
    getHtmlTempPath, //获取外部html模板
    rmDir, //删除某个文件夹,
    checkDir, //验证并创建文件夹
}