/* Webpack settings for development */

module.exports = webpack => {
  return {
    // sets process.env.NODE_ENV = 'development'
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      port: 3000,
      hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  }
}
