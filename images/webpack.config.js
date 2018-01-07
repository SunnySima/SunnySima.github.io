const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const basepath = path.resolve(__dirname, '..');
console.log('[basepath] is: ', basepath);


const config = {
  entry: {
    index: [path.join(basepath, 'app', 'index.js')]

  },
  output: {
    filename: 'bundle.js', //打包后输出文件的文件名
    path: path.join(basepath, 'public') //打包后的文件存放的地方
  },
  module:{
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                loader: "css-loader",
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }, {
                loader: "postcss-loader"
            }],
        })
    }]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(path.join(basepath, 'build/*.*'), {
      root: basepath,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin("style.css")
  ]
}

module.exports = config;
