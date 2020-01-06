/* 
Webpack settings for production env
 */
const TerserPlugin = require('terser-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => ({
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx)$/,
      }),
    ],
  },
  devtool: 'source-map',
  plugins: [
    // minimize the css bundle
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {discardComments: {removeAll: true}}],
      },
      // print messages  to console
      canPrint: true,
    }),
  ],
})
