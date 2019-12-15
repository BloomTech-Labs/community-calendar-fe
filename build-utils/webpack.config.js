const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const webpack = require('webpack')
const dotenv = require('dotenv')
const path = require('path')
const configEnvKeys = require('./env_variables.config.js')

module.exports = ({env}) => {
  const isDevelopment = env === 'development'
  // environment specific settings
  const envConfig = require(`./webpack.${isDevelopment ? 'dev' : 'prod'}.js`)

  // prepare environment variables
  const envKeys = configEnvKeys(env, path, dotenv)
  console.log('envkeys', envKeys)
  // merge webpack configs based on current env
  const result = webpackMerge(
    commonConfig(isDevelopment, path, webpack, envKeys),
    envConfig(webpack),
  )
  return result
}
