# Android Emulator Setup Guide

Follow these steps to set up an Android emulator for testing your Phillboards app:

## 1. Install Android Studio (if not already installed)

1. Download Android Studio from [the official website](https://developer.android.com/studio)
2. Follow the installation instructions for Windows
3. Make sure to select the following components during installation:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
   - Performance (Intel HAXM)

## 2. Create an Android Virtual Device (AVD)

1. Open Android Studio
2. Click on "More Actions" or the three-dot menu and select "Virtual Device Manager"
3. Click on "Create Virtual Device"
4. Select a phone definition (e.g., Pixel 6) and click "Next"
5. Select a system image:
   - Choose "Recommended" tab
   - Select the latest stable Android version (e.g., Android 13 Tiramisu) 
   - Download it if needed by clicking the "Download" link next to the version
   - Click "Next" after download completes
6. Give your virtual device a name or use the default
7. Click "Finish" to create the AVD

## 3. Start the Emulator

1. In the Android Virtual Device Manager, find your newly created device
2. Click the "Play" button (triangle) to start the emulator
3. Wait for the emulator to fully boot and show the Android home screen

## 4. Run Your App on the Emulator

1. With the emulator running, open a terminal in your project directory
2. Execute:
   ```
   npm run android
   ```
3. The app should build and install on the emulator automatically

## Troubleshooting

If the app fails to install on the emulator:

1. Make sure the emulator is fully booted before running the app
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
   npx react-native run-android
   ```

Remember to always run these commands from your project's root directory.

You can also use the direct expo commands:
```
expo start --android
```

Once your emulator is running and detected by the system, this command should work properly. 