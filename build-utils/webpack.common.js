/* Shared config for all environments */
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")

module.exports = isDevelopment => ({
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        // look for scss modules
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        // look for regular scss stylesheets
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".scss"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../", "dist"),
  },
})
