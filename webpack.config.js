'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    // set root directory
    context: path.join(__dirname, 'frontend'),
    entry: {
        libs: './libs/index.js',
        pApp: './p-app/index.js'
    },
    output: {
        // set ABSOLUTE path to directory (because we use `context` parameter)!!!
        path: path.join(__dirname, 'public', 'js'),
        filename: '[name].js',
        library: '[name]'
    },

    // live rebuild (only for development)
    watch: NODE_ENV === 'development',

    // boost-up rebuild
    watchOptions: {
        // wait xxx ms after change before start rebuild
        aggregateTimeout: 100
    },

    // simplify debugging (only for development)
    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,


    // plugins:
    plugins: [
        // prevent creating corrupted build (when errors occurred)
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],

    // modules resolve options
    resolve: {
        modulesDirectories: ['node_modules', 'public/vendor'],
        extensions: ['', '.js']
    },

    // loader modules resolve options
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        // include loaders
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'frontend'),
                loader: 'babel?presets[]=es2015'
            }
        ],
        noParse: [
            /angular\/angular.js/,
            /lodash\/lodash.min.js/,
            /jquery\/dist\/jquery.min.js/,
            /bootstrap\/dist\/js\/bootstrap.min.js/,
            /restangular\/dist\/restangular.min.js/
        ]
    }
};

// add minification for production
if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable data
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}