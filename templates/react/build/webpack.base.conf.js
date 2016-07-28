var path = require('path');
var config = require('../config');
var utils = require('./utils');
var projectRoot = path.resolve(__dirname, '../');


var nib = require("nib");
var rupture = require("rupture");
var poststylus = require("poststylus");
var rucksack = require("rucksack-css");
var lost = require("lost");

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css', '.styl'],
        fallback: [path.join(__dirname, '../node_modules')],
        modulesDirectories: ['src', 'node_modules', 'vendor', 'bower_components'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                include: projectRoot,
                exclude: /(node_modules|bower_components|vendor)/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /(node_modules|bower_components|vendor)/
            },
            {
                test: /\.json$/,
                exclude: /(node_modules|bower_components|vendor)/,
                loader: utils.assetsPath('data/[name].[ext]'),
                include: projectRoot
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                include: projectRoot,
                query: {
                    limit: 1000,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'url',
                include: projectRoot,
                query: {
                    limit: 1000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ],
        postLoaders: [
          {
            include: path.join(__dirname, '../node_modules'),
            loader: 'transform/cacheable?brfs'
          }
        ]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    stylus: {
        use: [
            require('nib')(),
            require("rupture")(),
            require("poststylus")([
                require("rucksack-css")({
                    autoprefixer:true,
                    fallbacks:true
                }),
                require("lost")()
            ])
        ],
        import: ['~nib/lib/nib/index.styl', '~rupture/rupture/index.styl']
    },
    target: "web"
};
