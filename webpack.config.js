const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app/app.js',
    admin: './src/app/admin.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: this.mode ? '[name].js' : '[name].min.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        extractComments: true,
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: [
          // this.mode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-transform-object-assign',
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      excludeAssets: [/admin.min.js/]
    }),
    new HtmlWebpackPlugin({
      template: './src/admin.html',
      filename: './admin.html',
      excludeAssets: [/app.min.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin()
    // new MiniCssExtractPlugin({
    //   filename: 'ccs/[name].css',
    //   chunkFilename: '[id].css'
    // })
  ],
  resolve: {
    extensions: ['.js', '.css'],
    modules: [
      'node_modules'
    ]
  }
};