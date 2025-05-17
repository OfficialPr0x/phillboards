# iOS Connection Guide

Connection to your Expo app is failing with "Unknown error: Could not connect to the server" because your phone is trying to connect to a local server (127.0.0.1) that only exists on your computer.

## Quick Solutions

Try these options in sequence until one works:

### Solution 1: LAN Mode (Same WiFi network)

```
npm run lan
```

When the QR code appears, scan it with your iOS camera. Your computer and iPhone MUST be on the same network.

### Solution 2: Hotspot Mode

1. Enable a mobile hotspot on another device
2. Connect both your computer and iPhone to this hotspot
3. Run:
   ```
   npm run hotspot
   ```
4. Scan the QR code

### Solution 3: Manual URL Entry

1. Run `npm run lan` and note the IP address displayed
2. Open Expo Go on your iPhone
3. Tap "Enter URL manually"
4. Enter the URL in the format `exp://192.168.x.x:8081` (using your computer's IP address)

### Solution 4: Older Expo CLI

The legacy Expo CLI sometimes works better:

```
npm install -g expo-cli
npx expo-cli start --lan
```

Then scan the QR code.

## Common Issues

1. **Corporate/School WiFi**: These networks often block the connections needed. Use a mobile hotspot instead.

2. **Firewall Blocking**: Temporarily disable Windows Defender Firewall while testing.

3. **Different Networks**: Ensure both devices are on exactly the same network.

4. **No QR Code Scanning**: If your iOS camera won't scan the QR code, manually enter the URL in Expo Go.

## Checking Your Connection

1. On your iPhone, open Safari and try to visit `http://YOUR_COMPUTER_IP:8081` 
2. If it fails, your network is blocking the connection between devices

## Last Resort: Dev Build

If nothing above works, create a development build:

```
npx expo install expo-dev-client
npx expo prebuild
npx expo run:ios
```

This requires a Mac with Xcode, but gives a much more reliable connection. 