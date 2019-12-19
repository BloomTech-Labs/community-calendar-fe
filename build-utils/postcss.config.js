module.exports = {
  plugins: [require('autoprefixer'), require('postcss-nested')],
  sourceMap: process.env.NODE_ENV === 'development',
}
