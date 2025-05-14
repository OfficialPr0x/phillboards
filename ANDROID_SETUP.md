# Android Development Setup Guide

To run this React Native app on Android, you need to set up the Android development environment:

## 1. Install Android Studio

1. Download Android Studio from [the official website](https://developer.android.com/studio)
2. Run the installer and follow the installation wizard
3. During installation, make sure to check the following components:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
   - Performance (Intel HAXM)

## 2. Install Android SDK Components

1. After installation, open Android Studio
2. Go to Tools > SDK Manager
3. In the SDK Platforms tab, select:
   - Android 13 (Tiramisu) or the latest stable version
   - Android 12 (S)
4. In the SDK Tools tab, select:
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android Emulator
   - Android SDK Platform-Tools
5. Click "Apply" to download and install the selected components

## 3. Set Up Environment Variables

### Automatic Setup (Recommended)

1. Right-click on the Windows Start button and select "Windows PowerShell (Admin)"
2. Navigate to your project directory:
   ```
   cd "C:\Users\Itspr\OneDrive\Documents\Phillboards"
   ```
3. Run the setup script:
   ```
   .\setup-android-env.ps1
   ```
4. Follow the prompts if needed

### Manual Setup

1. Set the ANDROID_HOME environment variable:
   - Press Win + X and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "User variables", click "New"
   - Variable name: ANDROID_HOME
   - Variable value: C:\Users\Itspr\AppData\Local\Android\Sdk (or your SDK path)
   - Click "OK"

2. Add platform-tools to PATH:
   - Under "User variables", select "Path" and click "Edit"
   - Click "New" and add:
     - %ANDROID_HOME%\platform-tools
     - %ANDROID_HOME%\tools
     - %ANDROID_HOME%\tools\bin
   - Click "OK" on all dialogs

## 4. Update Project Dependencies

Run the following command to update your project dependencies to the recommended versions:

```
npx expo install expo-camera@~14.1.3 expo-location@~16.5.5 react-native@0.73.6 react-native-maps@1.10.0
```

## 5. Run the App

After completing the setup:

1. Restart your terminal or IDE
2. Connect an Android device via USB (with USB debugging enabled) or start an emulator
3. Run the app:
   ```
   npm run android
   ```

## Troubleshooting

If you encounter issues:
- Make sure your Android device is properly connected and USB debugging is enabled
- Check that your emulator is running
- Verify that the environment variables are set correctly
- Try restarting your computer after setting environment variables 