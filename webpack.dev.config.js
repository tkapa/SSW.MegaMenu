const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",
  plugins: [new HtmlWebpackPlugin({}),
    new MiniCssExtractPlugin({
    filename: 'megamenu.css'
  })],
  target: "web",
  //entry: './src/components/megamenu/megamenu.js',
 // entry: './src/megamenu.js',
  entry: {
      app: './index.js',
      megamenu: './src/megamenu.js',
     },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: 'MegaMenu',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    open: true,
    port: 9000
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