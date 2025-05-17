#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
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
console.log('==== MOBILE HOTSPOT MODE ====');
console.log(`Your local IP address is: ${localIP}`);
console.log('Follow these steps to connect:');
console.log('1. Enable your mobile hotspot on a second phone or tablet');
console.log('2. Connect both your development computer AND testing iOS device to this hotspot');
console.log('3. Scan the QR code with your iOS camera');
console.log(`4. Or manually enter: exp://${localIP}:8081 in Expo Go`);

// Start expo with LAN mode
console.log('\nStarting Expo in LAN mode...');
console.log('This should work reliably on a mobile hotspot connection\n');

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