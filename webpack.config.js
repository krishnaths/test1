const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./src/index.js",
    home: "./src/home.js",
    product: "./src/products.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. injects the JS code into as a <style> tag
          "css-loader", // 2. converts the .css files into JS code
          "sass-loader", // 1. converts the scss/sass files into .css files
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./home.html",
      chunks: ["main", "home"],
      filename: "./home.html",
    }),
    new HtmlWebpackPlugin({
      template: "./product.html",
      chunks: ["main", "product"],
      filename: "./product.html",
    }),
  ],
  output: {
    filename: [].js,
    path: path.resolve(__dirname, "dist"),
  },
};
