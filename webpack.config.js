const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: '/',
      clean: true,
    },
    devtool: isProduction ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'components'),
            path.resolve(__dirname, 'screens'),
            path.resolve(__dirname, 'web-mocks'),
            /node_modules\/expo/,
            /node_modules\/expo-modules-core/,
            /node_modules\/@expo/,
            /node_modules\/react-native/,
            /node_modules\/react-native-web/,
            /node_modules\/react-navigation/,
            /node_modules\/@react-navigation/,
          ],
          exclude: [
            /node_modules\/(?!(react-native|react-native-web|expo|@expo|react-navigation|@react-navigation)\/).*/,
            /node_modules\/.*\/node_modules/,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
                '@babel/preset-flow',
              ],
              plugins: ['babel-plugin-react-native-web'],
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.web.js', '.js', '.ts', '.web.tsx', '.tsx', '.web.jsx', '.jsx', '.json'],
      alias: {
        'react-native$': 'react-native-web',
        'react-native-maps': 'react-native-web-maps',
        '@reactvision/react-viro': path.resolve(__dirname, 'web-mocks/react-viro.js'),
        '@viro-community/react-viro': path.resolve(__dirname, 'web-mocks/react-viro.js'),
        '@niantic/lightship-react-native': path.resolve(__dirname, 'web-mocks/niantic-lightship-react-native.js'),
        'expo-camera': path.resolve(__dirname, 'web-mocks/expo-camera.js'),
        'react-native-vector-icons': path.resolve(__dirname, 'web-mocks/expo-vector-icons.js'),
        'three': path.resolve(__dirname, 'node_modules/three'),
        'assets': path.resolve(__dirname, 'assets'),
        'components': path.resolve(__dirname, 'components'),
        'screens': path.resolve(__dirname, 'screens'),
        'utils': path.resolve(__dirname, 'utils'),
        'context': path.resolve(__dirname, 'context'),
        'theme': path.resolve(__dirname, 'theme'),
      },
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "process": require.resolve("process/browser"),
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/"),
        "fs": false,
        "tls": false,
        "net": false,
        "http": false,
        "https": false,
        "zlib": false,
        "path": false,
        "dns": false,
        "dgram": false,
        "http2": false,
        "child_process": false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.DefinePlugin({
        __DEV__: !isProduction,
        process: {
          env: {
            NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
          }
        },
        // Define window, document, and navigator with appropriate values for React Native Web
        window: JSON.stringify({
          ethereum: {},
          addEventListener: function() {},
          removeEventListener: function() {},
        }),
        document: JSON.stringify({
          addEventListener: function() {},
          removeEventListener: function() {},
        }),
        navigator: JSON.stringify({
          userAgent: '',
        }),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
        inject: true,
        favicon: path.resolve(__dirname, 'assets/images/icon.png'),
      }),
      new CopyPlugin({
        patterns: [
          { 
            from: 'public/assets', 
            to: 'assets' 
          },
          {
            from: 'assets/images',
            to: 'static/images'
          },
          {
            from: 'assets/images/icon.png',
            to: 'favicon.ico'
          }
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 8090,
      historyApiFallback: true,
      hot: true,
      open: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
  };
};
