var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: [
            {
                test: /\.css/,
                loader: 'style!css?importLoaders=1&&sourceMap'
            },
            {
                test: /\.styl/,
                loader: 'style!css?importLoaders=2&&sourceMap!stylus'
            }
        ]
    },
    entry: [
        'webpack-hot-middleware/client',
        "./src/index.js"
    ],
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
});
