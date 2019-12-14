/* Shared config for all environments */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = isDevelopment => ({
  entry: {
    app: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // run eslint before compiling
        use: ["babel-loader", "eslint-loader"],
      },
      {
        // look for css/sass modules
        test: /\.(sa|sc|c)ss$/,
        include: /\.module\.(sa|sc|c)ss$/,
        // loaders to transform files. Loaders are executed in opposite order of declarationc
        loader: [
          // last loader
          // MiniCss plugin extracts css to separate file for production
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            // resolve url() and @import in CSS
            loader: "css-loader",
            options: {
              // use module rules on @import resources
              importLoaders: 1,
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            // apply prefixes and minimize
            loader: "postcss-loader",
            options: {
              sourceMap: isDevelopment,
              config: {
                path: path.resolve(
                  __dirname,
                  "../",
                  "build-utils/postcss.config.js",
                ),
              },
            },
          },
          {
            // first loader. convert SASS to CSS
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              implementation: require("node-sass"),
            },
          },
        ],
      },
      {
        // look for standard css/sass stylesheets
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        // loaders to transform files. Loaders are executed in opposite order of declarationc
        loader: [
          // last loader
          // MiniCss plugin extracts css to separate file for production
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            // resolve url() and @import in CSS
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            // apply prefixes and minimize
            loader: "postcss-loader",
            options: {
              sourceMap: isDevelopment,
              config: {
                path: path.resolve(
                  __dirname,
                  "../",
                  "build-utils/postcss.config.js",
                ),
              },
            },
          },
          {
            // first loader. convert SASS to CSS
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              implementation: require("node-sass"),
            },
          },
        ],
      },
      {
        // Process images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      "*",
      ".js",
      ".jsx",
      ".scss",
      ".sass",
      ".css",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".svg",
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My Project",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../", "dist"),
  },
});
