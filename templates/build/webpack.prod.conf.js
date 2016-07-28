var config            = require( '../config' );
var utils             = require( './utils' );
var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var baseWebpackConfig = require( './webpack.base.conf' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = merge( baseWebpackConfig, {
    module : {
        loaders: [
            {
                test  : /\.css/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?importLoaders=1&-url'
                )
            },
            {
                test  : /\.styl/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?importLoaders=2&-url!stylus'
                )
            }
        ]
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output : {
        path         : config.build.assetsRoot,
        filename     : utils.assetsPath( 'js/[name].js' ),
        chunkFilename: utils.assetsPath( 'js/[name].js' )
    },
    plugins: [
        new webpack.DefinePlugin( {
            "process.env": {
                NODE_ENV: JSON.stringify( "production" )
            }
        } ),
        new webpack.optimize.UglifyJsPlugin( {
            compress: {
                sequences   : true,
                dead_code   : true,
                conditionals: true,
                booleans    : true,
                if_return   : true,
                join_vars   : true,
                warnings    : false // ...but do not show warnings in the console (there is a lot of them)
            }
            /*output  : {
             comments: false
             }*/
        } ),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin( utils.assetsPath( 'css/main.css' ), {
            allChunks: true
        } ),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin( {
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'src/index.html',
            inject  : true,
            minify  : { // Minifying it while it is parsed
                removeComments               : true,
                collapseWhitespace           : true,
                removeRedundantAttributes    : true,
                useShortDoctype              : true,
                removeEmptyAttributes        : true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash             : true,
                minifyJS                     : true,
                minifyCSS                    : true,
                minifyURLs                   : true
            }
        } )
    ]
} );
