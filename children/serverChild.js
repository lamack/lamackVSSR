
const resolve = file => require.resolve('../lib/build/' + file)
process.env.NODE_ENV = 'production'
const serverConfig = resolve('webpack.server.config.js')
process.argv.push('--config')
process.argv.push(serverConfig)

require('../lib/lamack-webpack')