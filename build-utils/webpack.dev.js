/* Webpack settings for development */
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {
  const env = dotenv.config().parsed

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      port: 3000,
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
    ],
  }
}
