const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, '../dist'),
    port: 3000,
    devMiddleware: {
      writeToDisk: true
    }
  },
});
