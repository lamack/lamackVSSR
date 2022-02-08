
const resolve = file => require.resolve('../lib/build/' + file)
process.env.NODE_ENV = 'production'
const clientConfig = resolve('webpack.client.config.js')
process.argv.push('--config')
process.argv.push(clientConfig)

require('../lib/lamack-webpack')