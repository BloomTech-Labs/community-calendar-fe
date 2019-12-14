/* Webpack settings for development */
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = () => ({
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3000,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "My Project",
      template: "./src/index.html",
    }),
  ],
})
