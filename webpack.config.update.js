const rootSrc = __dirname + '/src';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IS_DEV = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (config) => {
  config = {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        components: rootSrc + '/components',
        common: rootSrc + '/common',
        assets: rootSrc + '/assets',
        api: rootSrc + '/api',
        model: rootSrc + '/model',
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            colors: false,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
            compilerOptions: {
              module: 'es2015'
            }
          },
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  localIdentName: '[local][hash:base64:6]',
                  modules: true,
                  camelCase: true,
                  sourceMap: IS_DEV
                }
              },
              {
                loader: 'px2rem-loader',
                options: {
                  remUnit: 75,
                  remPrecision: 8,
                }
              },
              {
                loader: 'less-loader'
              }
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'assets/images/[name]_[hash:base64:6].[ext]',
          }
        },
        {
          test: /\.(ttf|otf)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'assets/fonts/[name]_[hash:base64:6].[ext]',
          }
        },
      ]
    },
    plugins: [
      ...config.plugins,
      new ExtractTextPlugin({ filename: 'css/[name].min.css', allChunks: true }),
    ],
  };


  return config;
};