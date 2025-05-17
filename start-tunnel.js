#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Get local IP address
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIP = getLocalIPAddress();
console.log(`Your local IP address is: ${localIP}`);
console.log(`Your iOS device should connect to: exp://${localIP}:8081`);
console.log('Make sure your phone and computer are on the same WiFi network!');

// Check for prerequisites
try {
  // Ensure @expo/ngrok is installed at the correct version
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  console.log('Checking ngrok dependency...');
  
  const hasDependency = packageJson.dependencies && 
    (packageJson.dependencies['@expo/ngrok'] || packageJson.dependencies['ngrok']);
  
  if (!hasDependency) {
    console.log('Installing @expo/ngrok...');
    require('child_process').execSync('npm install @expo/ngrok@^4.1.3', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Error checking prerequisites:', error);
}

// Launch expo with LAN option first
console.log('Starting Expo in LAN mode first...');
console.log('This will make your app available over your local network');
console.log('\nINSTRUCTIONS:');
console.log('1. Scan the QR code with your iOS camera app');
console.log('2. If that fails, open Expo Go and enter the URL manually: ' + `exp://${localIP}:8081`);
console.log('3. Make sure your phone and computer are on the same WiFi network');
console.log('4. Some WiFi networks block this connection - try using a mobile hotspot instead\n');

// Start expo with LAN mode
const expoProcess = spawn('npx', ['expo', 'start', '--lan'], {
  stdio: 'inherit'
});

expoProcess.on('error', (error) => {
  console.error('Failed to start Expo:', error);
});

// Handle clean exit
process.on('SIGINT', () => {
  expoProcess.kill('SIGINT');
  process.exit(0);
}); 