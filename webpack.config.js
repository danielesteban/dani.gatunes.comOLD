const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const modulesPath = path.resolve(__dirname, 'node_modules');
const srcPath = path.resolve(__dirname, 'src');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const basename = process.env.BASENAME || '/';

module.exports = {
  mode,
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: `code/${(mode === 'production' ? '[name].[contenthash].js' : '[name].js')}`,
    path: buildPath,
    publicPath: basename,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      ...(mode === 'development' ? [
        {
          test: /\.(js|vue)$/,
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                emitWarning: true,
              },
            },
          ],
          include: srcPath,
          exclude: modulesPath,
        },
      ] : []),
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: [
                ['env', { modules: false }],
                'stage-3',
              ],
            },
          },
        ],
        include: srcPath,
        exclude: modulesPath,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
        include: srcPath,
        exclude: modulesPath,
      },
      {
        test: /\.scss$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: mode !== 'production',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })],
              sourceMap: mode !== 'production',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              sourceMap: mode !== 'production',
            },
          },
        ],
        include: srcPath,
        exclude: modulesPath,
      },
      {
        test: /\.(frag|vert)$/,
        loader: 'raw-loader',
        include: srcPath,
        exclude: modulesPath,
      },
      {
        test: /\.(gif|jpg|png|svg|ttf|woff|mp3|ogg|pdf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `assets/${(mode === 'production' ? '[hash].[ext]' : '[name].[ext]')}`,
            },
          },
        ],
      },
    ],
  },
  devtool: false,
  devServer: { hot: true },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: mode !== 'production',
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: { hints: false },
  stats: { entrypoints: false },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
      __PRODUCTION__: JSON.stringify(mode === 'production'),
    }),
    new HtmlWebpackPlugin({
      csp: (
        `default-src 'self' data: blob:${mode === 'production' ? ' https://www.google-analytics.com/' : " ws://localhost:8080 'unsafe-eval'"};`
        + `style-src 'self'${mode === 'production' ? '' : " 'unsafe-inline'"};`
      ),
      minify: mode === 'production' ? { collapseWhitespace: true } : false,
      template: path.join(srcPath, 'index.ejs'),
      title: 'D.E.N. | C++/GLSL/JS Full-Stack Developer',
    }),
    new VueLoaderPlugin(),
    ...(mode === 'production' ? [
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'code/[name].[contenthash].css',
      }),
      new RobotstxtPlugin({
        policy: [{
          userAgent: '*',
          allow: '/',
        }],
      }),
      new CnameWebpackPlugin({
        domain: 'dani.gatunes.com',
      }),
      ...(process.env.npm_config_report ? ([
        new BundleAnalyzerPlugin(),
      ]) : []),
    ] : [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EvalSourceMapDevToolPlugin(),
    ]),
  ],
};
