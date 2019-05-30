require('dotenv').config();
const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dev = Boolean(process.env.NODE_ENV === 'production');
let client_api = 'http://localhost:3000/api';
if (!dev) {
  client_api_url = process.env.__CLIENT_API_URL__;
}

module.exports = {
  entry: './src/app.js',
  mode: dev ? 'developement' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin,
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(client_api_url),
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};