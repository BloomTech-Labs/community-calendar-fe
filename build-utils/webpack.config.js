const webpackMerge = require("webpack-merge")
const commonConfig = require("./webpack.common.js")
module.exports = ({ env }) => {
  console.log("Current env", process.env.NODE_ENV)
  const isDevelopment = process.env.NODE_ENV === "development"
  const envConfig = require(`./webpack.${env}.js`)
  const result = webpackMerge(
    commonConfig(isDevelopment),
    envConfig(isDevelopment),
  )
  return result
}
