# iOS Simulator Setup Guide

Follow these steps to set up an iOS simulator for testing your Phillboards app on macOS:

## 1. Install Xcode (if not already installed)

1. Open the App Store on your Mac
2. Search for "Xcode" and install it (this may take some time as it's a large download)
3. Once installed, open Xcode to complete the installation of additional components

## 2. Install Command Line Tools

1. Open Terminal
2. Run the following command:
   ```
   xcode-select --install
   ```
3. Follow the prompts to complete the installation

## 3. Set up iOS Simulator

1. Open Xcode
2. Go to Xcode > Open Developer Tool > Simulator
3. The default simulator should start (usually an iPhone model)
4. If you want to use a different device:
   - Close the current simulator
   - Go to Xcode > Preferences > Components
   - Download additional simulators if needed
   - In Xcode, go to Xcode > Open Developer Tool > Simulator
   - From the simulator, go to File > Open Simulator > Choose your device

## 4. Run Your App on the Simulator

1. With the simulator running, open a terminal in your project directory
2. Execute:
   ```
   npm run ios
   ```
3. The app should build and install on the simulator automatically

## Troubleshooting

If you encounter issues:

1. Make sure Xcode is fully installed and updated
2. Check that you've installed the correct dependencies:
   ```
   npm install
   ```
3. Try restarting the Metro bundler:
   ```
   npx react-native start --reset-cache
   ```
4. In a separate terminal window, run:
   ```
   npx react-native run-ios
   ```
5. If you get CocoaPods errors, run:
   ```
   cd ios && pod install && cd ..
   ```

Remember that iOS development requires a Mac. This guide won't work on Windows or Linux systems.

You can also use the direct expo commands:
```
expo start --ios
```

Once your simulator is running and properly configured, this command should work correctly. 