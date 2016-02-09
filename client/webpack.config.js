var path = require('path');
var webpack = require('webpack');

var config = {
    entry: __dirname + '/index.js',
    output: { path: __dirname + '/dist/', filename: 'bundle.js' },
    alias: {
        'falcor': '../node_modules/falcor/dist/falcor.browser.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: '../node_modules/falcor/dist/falcor.browser.js',
                loader: 'exports?window.falcor'
            }
        ]
    },
    modulesDirectories: ['node_modules']
};


module.exports = config;