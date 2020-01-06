/* Webpack settings for development */

module.exports = webpack => {
  return {
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './public',
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  }
}
