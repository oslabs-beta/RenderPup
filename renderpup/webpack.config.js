const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    // 'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
        {
         test: /\.(png|j?g|svg|gif)?$/,
         loader: 'file-loader',
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: {
      directory: './build'
    },
    proxy: { '/': 'http://localhost:3000'}
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};

module.exports = config;