#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.cyan('🌐 Setting up Phillboards web dependencies...'));

// Define required dependencies
const dependencies = [
  'express',
  'compression',
  'morgan'
];

const devDependencies = [
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'html-webpack-plugin',
  'copy-webpack-plugin',
  'terser-webpack-plugin',
  'babel-loader',
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
  '@babel/preset-flow',
  'babel-plugin-react-native-web',
  'file-loader',
  'crypto-browserify',
  'stream-browserify',
  'buffer',
  'process',
  'util',
  'chalk',
  'open',
  'cross-env'
];

// Create directories if they don't exist
const dirs = [
  path.resolve(__dirname, 'public'),
  path.resolve(__dirname, 'web-mocks')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(chalk.yellow(`Creating directory: ${dir}`));
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Install dependencies
try {
  console.log(chalk.yellow('Installing production dependencies...'));
  execSync(`npm install --save ${dependencies.join(' ')}`, { stdio: 'inherit' });
  
  console.log(chalk.yellow('Installing development dependencies...'));
  execSync(`npm install --save-dev ${devDependencies.join(' ')}`, { stdio: 'inherit' });
  
  console.log(chalk.green('✅ Dependencies installed successfully!'));
} catch (error) {
  console.error(chalk.red('❌ Failed to install dependencies:'));
  console.error(error.message);
  process.exit(1);
}

// Create basic web mock files if they don't exist
const webMocks = [
  { 
    path: 'web-mocks/expo-location.js',
    content: `// Mock implementation of expo-location for web
const mockLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  altitude: 0,
  accuracy: 10,
  altitudeAccuracy: 5,
  heading: 0,
  speed: 0,
  timestamp: Date.now(),
};

// Mock methods
const requestForegroundPermissionsAsync = async () => ({ status: 'granted' });
const getCurrentPositionAsync = async (options) => ({ 
  coords: mockLocation,
  timestamp: Date.now(), 
});
const watchPositionAsync = async (options, callback) => {
  const id = setTimeout(() => callback({ coords: mockLocation }), 100);
  return {
    remove: () => clearTimeout(id),
  };
};
const hasServicesEnabledAsync = async () => true;
const getLastKnownPositionAsync = async () => ({
  coords: mockLocation,
  timestamp: Date.now() - 1000,
});

// Mock constants
const Accuracy = {
  Balanced: 3,
  High: 4,
  Highest: 5,
  Low: 1,
  Lowest: 0,
};

export {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  hasServicesEnabledAsync,
  getLastKnownPositionAsync,
  Accuracy,
};

export default {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  hasServicesEnabledAsync,
  getLastKnownPositionAsync,
  Accuracy,
};` 
  },
  { 
    path: 'web-mocks/expo-camera.js',
    content: `// Mock implementation for expo-camera for web
import React from 'react';
import { View, Text } from 'react-native';

class Camera extends React.Component {
  static isAvailableAsync = async () => true;
  static requestCameraPermissionsAsync = async () => ({ status: 'granted' });
  
  render() {
    const { children, style } = this.props;
    return (
      <View 
        style={[{ 
          backgroundColor: '#000', 
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }, style]}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Camera not available in web version
        </Text>
        {children}
      </View>
    );
  }
}

// Constants
Camera.Constants = {
  Type: {
    front: 'front',
    back: 'back',
  },
  FlashMode: {
    on: 'on',
    off: 'off',
    auto: 'auto',
    torch: 'torch',
  },
  AutoFocus: {
    on: 'on',
    off: 'off',
  },
  WhiteBalance: {
    auto: 'auto',
    sunny: 'sunny',
    cloudy: 'cloudy',
    shadow: 'shadow',
    fluorescent: 'fluorescent',
    incandescent: 'incandescent',
  },
};

export { Camera };
export default { Camera };`
  },
  {
    path: 'web-mocks/expo-vector-icons.js',
    content: `// Mock implementation for @expo/vector-icons for web
import React from 'react';
import { Text, View } from 'react-native';

const createIconSet = (glyphMap, fontFamily, fontFile) => {
  const Icon = ({ name, size = 24, color = 'black', style = {}, ...props }) => {
    return (
      <View 
        style={[
          { 
            width: size, 
            height: size, 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden'
          }, 
          style
        ]} 
        {...props}
      >
        <Text 
          style={{ 
            color, 
            fontSize: size * 0.8, 
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  Icon.defaultProps = {
    allowFontScaling: false,
  };

  return Icon;
};

// Create mock implementations for each icon set
const MaterialIcons = createIconSet({}, 'MaterialIcons');
const FontAwesome = createIconSet({}, 'FontAwesome');
const Ionicons = createIconSet({}, 'Ionicons');
const MaterialCommunityIcons = createIconSet({}, 'MaterialCommunityIcons');
const Feather = createIconSet({}, 'Feather');
const AntDesign = createIconSet({}, 'AntDesign');
const Entypo = createIconSet({}, 'Entypo');
const FontAwesome5 = createIconSet({}, 'FontAwesome5');
const Foundation = createIconSet({}, 'Foundation');
const Octicons = createIconSet({}, 'Octicons');
const SimpleLineIcons = createIconSet({}, 'SimpleLineIcons');
const Zocial = createIconSet({}, 'Zocial');

export {
  createIconSet,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
  FontAwesome5,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Zocial
};

export default {
  createIconSet,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
  FontAwesome5,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Zocial
};`
  }
];

// Create mock files
webMocks.forEach(mock => {
  const filePath = path.resolve(__dirname, mock.path);
  if (!fs.existsSync(filePath)) {
    console.log(chalk.yellow(`Creating mock file: ${mock.path}`));
    fs.writeFileSync(filePath, mock.content);
  }
});

console.log(chalk.green('✅ Setup complete!'));
console.log();
console.log(chalk.cyan('Getting started:'));
console.log(chalk.yellow('1. Run the web development server:'));
console.log(chalk.white('   npm run web:dev'));
console.log();
console.log(chalk.yellow('2. Build for production:'));
console.log(chalk.white('   npm run web:build'));
console.log();
console.log(chalk.yellow('3. Serve production build:'));
console.log(chalk.white('   npm run web:serve'));
console.log(); 