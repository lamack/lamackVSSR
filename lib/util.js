const fs = require('fs')
const path = require('path')
const fileExit = filePath => {
    console.log("file: util.js ~ line 4 ~ filePath", filePath)
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
module.exports = {
    fileExit, //判断文件是否存在
    getOutPath, //获取脚手架执行目录下的文件路径
    getHtmlTempPath,
}