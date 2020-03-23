const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: 'megamenu.css',
    chunkFilename: '[id].[contenthash].css',
  })],
  target: "node",
  mode: 'production',
  //entry: './src/components/megamenu/megamenu.js',
  entry: './src/megamenu.js',
  output: {
    path: path.resolve('dist'),
    filename: 'megamenu.js',
    library: 'MegaMenu',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: ['file-loader']
      }
    ]
  }
};