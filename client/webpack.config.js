const path = require( 'path' ),
   Webpack = require( 'webpack' ),
   HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
   { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ),
   FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' ),
   MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
   OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' ),
   UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );

const PATHS = {
   src    : path.join( __dirname, 'src' ),
   dist   : path.join( __dirname, 'dist' ),
   assets : path.join( __dirname, '..', 'assets' )
};

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
   
   entry : PATHS.src,
   
   output : {
      path       : PATHS.dist,
      filename   : devMode ? '[name].js' : '[name].[hash].js',
      publicPath : '/'
   },
   
   devServer : {
      host               : 'localhost',
      port               : 8080,
      proxy              : [ {
         context      : [ '/api', '/assets' ],
         target       : 'http://localhost:8081',
         pathRewrite  : { '^/api' : '' },
         changeOrigin : true
      } ],
      historyApiFallback : true,
      hot                : true,
      open               : true,
      contentBase        : PATHS.dist,
      compress           : true,
      overlay            : {
         warnings : devMode,
         errors   : devMode
      }
   },
   
   devtool : 'source-map',
   
   module : {
      rules : [
         {
            test    : /\.js$/,
            exclude : /node_modules/,
            use     : [ 'babel-loader' ]
         },
         {
            test    : /.(s[ac]ss|css)$/,
            exclude : /node_modules/,
            use     : [
               {
                  loader  : MiniCssExtractPlugin.loader,
                  options : {
                     hmr       : devMode,
                     reloadAll : devMode
                  }
               },
               'css-loader',
               'postcss-loader',
               'sass-loader'
            ]
         },
         {
            test   : /\.(png|jpe?g|gif)$/i,
            loader : 'file-loader'
         },
         {
            // Fonts
            test   : /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader : 'file-loader'
         }
      ]
   },
   
   optimization : {
      minimizer : [
         new OptimizeCSSAssetsPlugin(),
         new UglifyJsPlugin()
      ]
   },
   
   plugins : [
      new FaviconsWebpackPlugin( path.join( PATHS.src, '/templates/favicon.png' ) ),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin( {
         filename : devMode ? '[name].css' : '[name].[hash].css'
      } ),
      new HtmlWebpackPlugin( {
         template : './src/index.html',
         filename : 'index.html',
         minify   : {
            useShortDoctype               : !devMode,
            removeStyleLinkTypeAttributes : !devMode,
            removeScriptTypeAttributes    : !devMode,
            collapseWhitespace            : !devMode,
            removeComments                : !devMode,
            removeRedundantAttributes     : !devMode
         }
      } ),
      new Webpack.HotModuleReplacementPlugin()
   ]
};