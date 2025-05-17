const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

console.log('📱 Building Phillboards Web MVP...');

// Create the web-specific build directory
const webBuildDir = path.resolve(__dirname, 'web-build');
if (!fs.existsSync(webBuildDir)) {
  fs.mkdirSync(webBuildDir, { recursive: true });
}

// Copy public directory assets
const publicDir = path.resolve(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Define production environment
process.env.NODE_ENV = 'production';

// Import webpack config
const webpackConfig = require('./webpack.config');

// Enhance webpack config for production
const productionConfig = {
  ...webpackConfig,
  mode: 'production',
  output: {
    path: webBuildDir,
    filename: 'bundle.[contenthash].js',
    publicPath: '/'
  },
  plugins: [
    ...(webpackConfig.plugins || []),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: webBuildDir,
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(webBuildDir, 'assets'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
};

// Run webpack build
webpack(productionConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Build failed with errors:');
    if (err) {
      console.error(err);
    }
    if (stats.hasErrors()) {
      console.error(stats.toString({
        colors: true,
        chunks: false,
        children: false,
      }));
    }
    process.exit(1);
  }

  console.log(stats.toString({
    colors: true,
    chunks: false,
    children: false,
  }));
  
  console.log('✅ Web build completed successfully!');
  console.log(`📂 Output location: ${webBuildDir}`);
  console.log('🚀 To deploy, upload the web-build directory to your web hosting service');
  console.log('🔍 To test locally, run: npx serve -s web-build');
}); 