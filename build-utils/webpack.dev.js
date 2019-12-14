/* Webpack settings for development */
const webpack = require("webpack");

module.exports = () => ({
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3000,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
