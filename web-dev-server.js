const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const webpackConfig = require('./webpack.config');
const open = require('open');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Enable hot reloading
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Set development environment
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Configure webpack for development
const devConfig = {
  ...webpackConfig,
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    ...(webpackConfig.plugins || []),
    new webpack.HotModuleReplacementPlugin(),
    // Copy assets to public directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets/images/icon.png'),
          to: path.resolve(__dirname, 'public/favicon.ico')
        },
        {
          from: path.resolve(__dirname, 'assets/images/icon.png'),
          to: path.resolve(__dirname, 'public/apple-touch-icon.png')
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: path.resolve(__dirname, 'assets/images/icon.png'),
      templateParameters: {
        // Provide correct paths to assets (use relative paths)
        appleIcon: 'apple-touch-icon.png',
        ogImage: 'assets/images/icon.png'
      }
    })
  ],
  output: {
    ...webpackConfig.output,
    publicPath: '/'
  }
};

// Configure dev server options
const devServerOptions = {
  static: [
    {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    },
    {
      directory: path.join(__dirname, 'assets'),
      publicPath: '/assets'
    }
  ],
  hot: true,
  host: HOST,
  port: PORT,
  historyApiFallback: true,
  compress: true,
  open: false, // We'll open the browser manually
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    progress: true,
  },
};

// Create compiler and server
const compiler = webpack(devConfig);
const server = new WebpackDevServer(devServerOptions, compiler);

// Print friendly console messages
compiler.hooks.done.tap('PhillboardsDevServer', stats => {
  if (stats.hasErrors()) {
    console.log(chalk.red('❌ Build failed with errors:'));
    const info = stats.toJson();
    const errors = info.errors || [];
    errors.forEach(error => {
      console.error(chalk.red(error.message));
    });
    return;
  }
  
  // Print success message with URLs
  console.log();
  console.log(chalk.green('✅ Phillboards web app compiled successfully!'));
  console.log();
  console.log(chalk.cyan(`   Local:   http://${HOST}:${PORT}`));
  
  // Try to print network URLs
  try {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        if (net.family === 'IPv4' && !net.internal) {
          console.log(chalk.cyan(`   Network: http://${net.address}:${PORT}`));
          break;
        }
      }
    }
  } catch (err) {
    // Silently fail if we can't get network info
  }
  
  console.log();
  console.log(chalk.yellow('📱 Opening browser automatically...'));
  console.log(chalk.yellow('📄 Use Ctrl+C to stop the server'));
  console.log();
});

// Start the server
async function startServer() {
  console.log(chalk.cyan('Starting development server...'));
  console.log(chalk.yellow('This might take a moment...'));
  
  try {
    await server.start();
    
    // Open browser after server starts
    setTimeout(() => {
      open(`http://${HOST}:${PORT}`);
    }, 2000);
    
  } catch (err) {
    console.error(chalk.red('Failed to start development server:'));
    console.error(err);
    process.exit(1);
  }
}

startServer(); 