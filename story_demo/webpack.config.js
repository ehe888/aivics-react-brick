var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'lib');
var mainPath = path.resolve(__dirname, 'index.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

console.log(mainPath);

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'cheap-module-source-map', //instead of eval for production
  entry: {
    index: mainPath
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "jquery": "jQuery",
    "jquery-ui": "jQuery",
    "webpack": "Webpack",
    "_": "lodash"
  },

  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',
    publicPath: "/assets/"
  },
  module: {

    loaders: [

    // I highly recommend using the babel-loader as it gives you
    // ES6/7 syntax and JSX transpiling out of the box
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    // Let us also add the style-loader and css-loader, which you can
    // expand with less-loader etc.
    {
      test: /\.css$/,
       loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }

    ]
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
    // ,new Webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
    // ,new Webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     warnings: true
    //   }
    // })
  ]
};

module.exports = config;
