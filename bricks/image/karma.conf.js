// karma.conf.js
var webpack = require('webpack');
var path = require("path");

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        plugins: [
          'karma-mocha',
          require('karma-sourcemap-loader'),
          require('karma-chrome-launcher'),
          require('karma-webpack')
        ],
        frameworks: [ 'mocha' ],
        files: [
          "tests.webpack.js"
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'] //tests.webpack.js
        },
        reporters: ['dots'],
        webpack: {
            module: {
                loaders: [
                  {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader', // babel is also a legal name
                    query: {
                      presets: ['es2015', 'react']
                    }
                  },
                  {
                    test: /\.css$/,
                    loader: 'style!css'
                  }
                ]
            },
            plugins: [
              new webpack.ProvidePlugin({
                "$":"jquery",
                "jQuery":"jquery",
                "window.jQuery":"jquery"
              })
            ],
            resolve: {
              // bind version of jquery-ui
              "jquery-ui": "jquery-ui/jquery-ui.js",
              // bind to modules;
              modules: path.join(__dirname, "node_modules")
            },
            watch: true,
            devtool: 'eval-cheap-source-map'
        },
        webpackServer: {
            noInfo: false
        }
    });
};
