const fs = require('fs')
//导出拷贝加转换功能函数

exports.transFile = (transFn) => {
    return (input, output) => {
        return new Promise((resolve, reject) => {
            let readStream = fs.createReadStream(input)
            let writeStream = fs.createWriteStream(output)
            if (transFn) {
                readStream
                    .pipe(transFn(input))
                    .pipe(writeStream)
            } else {
                readStream
                    .pipe(writeStream)
            }
            readStream.on('end', resolve)
            readStream.on('error', () => reject(`${input}文件的导入失败`))
        })

    }
}
