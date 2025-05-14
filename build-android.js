#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.blue}=== Phillboards Android Build Script ===${colors.reset}`);

// Check if Android SDK is set up
function checkAndroidSDK() {
  console.log(`${colors.cyan}Checking Android SDK setup...${colors.reset}`);
  
  const androidHome = process.env.ANDROID_HOME || '';
  
  if (!androidHome) {
    console.log(`${colors.red}ANDROID_HOME environment variable is not set.${colors.reset}`);
    console.log(`${colors.yellow}Please run setup-android-env.ps1 to configure your environment.${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}ANDROID_HOME is set to: ${androidHome}${colors.reset}`);
  
  // Check if platform-tools exists
  const platformToolsPath = path.join(androidHome, 'platform-tools');
  if (!fs.existsSync(platformToolsPath)) {
    console.log(`${colors.red}Android platform-tools not found at: ${platformToolsPath}${colors.reset}`);
    console.log(`${colors.yellow}Please install Android SDK platform-tools through Android Studio.${colors.reset}`);
    return false;
  }
  
  // Check if adb exists
  const adbPath = path.join(platformToolsPath, os.platform() === 'win32' ? 'adb.exe' : 'adb');
  if (!fs.existsSync(adbPath)) {
    console.log(`${colors.red}ADB not found at: ${adbPath}${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}Android SDK setup looks good!${colors.reset}`);
  return true;
}

// Check for devices
function checkDevices() {
  try {
    console.log(`${colors.cyan}Checking for connected Android devices...${colors.reset}`);
    const devices = execSync('adb devices').toString();
    const deviceLines = devices.split('\n').filter(line => line && !line.startsWith('List'));
    
    if (deviceLines.length === 0) {
      console.log(`${colors.yellow}No Android devices connected.${colors.reset}`);
      console.log(`${colors.yellow}Please connect a device or start an emulator.${colors.reset}`);
      return false;
    }
    
    console.log(`${colors.green}Found ${deviceLines.length} device(s):${colors.reset}`);
    deviceLines.forEach(line => console.log(`  ${colors.green}${line}${colors.reset}`));
    return true;
  } catch (error) {
    console.log(`${colors.red}Error checking devices: ${error.message}${colors.reset}`);
    return false;
  }
}

// Update dependencies if needed
function checkDependencies() {
  try {
    console.log(`${colors.cyan}Checking project dependencies...${colors.reset}`);
    const packageJson = require('./package.json');
    
    // Check for specific dependencies that should be updated
    const requiredVersions = {
      'expo-camera': '~14.1.3',
      'expo-location': '~16.5.5',
      'react-native': '0.73.6',
      'react-native-maps': '1.10.0'
    };
    
    const outdatedDeps = [];
    
    for (const [dep, version] of Object.entries(requiredVersions)) {
      if (packageJson.dependencies[dep] && packageJson.dependencies[dep] !== version) {
        outdatedDeps.push(`${dep}@${version}`);
      }
    }
    
    if (outdatedDeps.length > 0) {
      console.log(`${colors.yellow}Some dependencies should be updated:${colors.reset}`);
      outdatedDeps.forEach(dep => console.log(`  ${colors.yellow}${dep}${colors.reset}`));
      
      console.log(`${colors.cyan}Updating dependencies...${colors.reset}`);
      execSync(`npx expo install ${outdatedDeps.join(' ')}`, { stdio: 'inherit' });
      console.log(`${colors.green}Dependencies updated successfully!${colors.reset}`);
    } else {
      console.log(`${colors.green}All dependencies are up to date!${colors.reset}`);
    }
    
    return true;
  } catch (error) {
    console.log(`${colors.red}Error checking dependencies: ${error.message}${colors.reset}`);
    return false;
  }
}

// Main function
async function main() {
  // Check Android SDK setup
  if (!checkAndroidSDK()) {
    console.log(`${colors.yellow}Would you like to run the Android setup script now? (y/n)${colors.reset}`);
    process.stdin.once('data', (data) => {
      const input = data.toString().trim().toLowerCase();
      if (input === 'y') {
        try {
          console.log(`${colors.cyan}Running setup-android-env.ps1...${colors.reset}`);
          execSync('powershell -ExecutionPolicy Bypass -File .\\setup-android-env.ps1', { stdio: 'inherit' });
        } catch (error) {
          console.log(`${colors.red}Error running setup script: ${error.message}${colors.reset}`);
          process.exit(1);
        }
      } else {
        console.log(`${colors.yellow}Please set up Android SDK manually and try again.${colors.reset}`);
        process.exit(1);
      }
    });
    return;
  }
  
  // Check dependencies
  checkDependencies();
  
  // Check for connected devices
  const devicesConnected = checkDevices();
  
  if (!devicesConnected) {
    console.log(`${colors.yellow}Would you like to start an Android emulator? (y/n)${colors.reset}`);
    process.stdin.once('data', (data) => {
      const input = data.toString().trim().toLowerCase();
      if (input === 'y') {
        try {
          console.log(`${colors.cyan}Starting Android emulator...${colors.reset}`);
          // This is a simplified approach; you might want to list available emulators first
          execSync('emulator -avd Pixel_3a_API_33_x86_64', { stdio: 'inherit' });
        } catch (error) {
          console.log(`${colors.red}Error starting emulator: ${error.message}${colors.reset}`);
          console.log(`${colors.yellow}You might need to create an emulator in Android Studio first.${colors.reset}`);
          process.exit(1);
        }
      } else {
        console.log(`${colors.yellow}Please connect a device or start an emulator manually and try again.${colors.reset}`);
        process.exit(1);
      }
    });
    return;
  }
  
  // Run the app
  console.log(`${colors.cyan}Starting the app...${colors.reset}`);
  const child = spawn('npx', ['expo', 'start', '--android'], { stdio: 'inherit' });
  
  child.on('error', (error) => {
    console.log(`${colors.red}Error starting the app: ${error.message}${colors.reset}`);
    process.exit(1);
  });
  
  child.on('exit', (code) => {
    if (code !== 0) {
      console.log(`${colors.red}App exited with code ${code}${colors.reset}`);
      process.exit(code);
    }
  });
}

main().catch(error => {
  console.log(`${colors.red}Unexpected error: ${error.message}${colors.reset}`);
  process.exit(1);
});