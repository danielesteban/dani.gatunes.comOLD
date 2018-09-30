const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const meta = require('./data/meta');

const buildPath = path.resolve(__dirname, 'dist');
const modulesPath = path.resolve(__dirname, 'node_modules');
const dataPath = path.resolve(__dirname, 'data');
const srcPath = path.resolve(__dirname, 'src');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const basename = process.env.BASENAME || '/';

module.exports = {
  mode,
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: `code/${(mode === 'production' ? '[name].[contenthash]' : '[name]')}.js`,
    path: buildPath,
    publicPath: basename,
  },
  resolve: {
    alias: {
      data: dataPath,
    },
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
              presets: [
                ['@babel/preset-env', { modules: false }],
              ],
            },
          },
        ],
        include: srcPath,
        exclude: modulesPath,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed',
              sourceMap: true,
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
            loader: 'file-loader',
            options: {
              name: `assets/${(mode === 'production' ? '[hash]' : '[name]')}.[ext]`,
            },
          },
        ],
        include: [dataPath, srcPath],
        exclude: modulesPath,
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
        sourceMap: true,
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
  stats: { children: false, entrypoints: false, modules: false },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
      __PRODUCTION__: JSON.stringify(mode === 'production'),
    }),
    new HtmlWebpackPlugin({
      config: meta,
      csp: (
        "default-src 'self'"
        + `${mode === 'production' && meta.analytics ? ' https://www.google-analytics.com/' : ''}`
        + `${mode === 'development' ? " ws://localhost:8080 'unsafe-eval'" : ''};`
        + "img-src 'self' data:;"
        + `style-src 'self'${mode === 'development' ? " 'unsafe-inline'" : ''};`
      ),
      minify: { collapseWhitespace: true },
      template: path.join(srcPath, 'index.ejs'),
    }),
    new VueLoaderPlugin(),
    ...(mode === 'production' ? [
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'code/[name].[contenthash].css',
      }),
      new CnameWebpackPlugin({
        domain: meta.domain,
      }),
      new CopyWebpackPlugin([
        path.join(srcPath, '404.html'),
      ]),
      new RobotstxtPlugin({
        policy: [{
          userAgent: '*',
          allow: '/',
        }],
      }),
      new webpack.SourceMapDevToolPlugin({
        test: /\.js$/,
        filename: 'code/[name].[contenthash].js.map',
        exclude: /(manifest|vendor)/,
      }),
      new webpack.SourceMapDevToolPlugin({
        test: /\.css$/,
        filename: 'code/[name].[contenthash].css.map',
        exclude: 'vendor',
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
