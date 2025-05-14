# Changelog

## [1.0.0] - Android Setup Fix

### Added
- Created `setup-android-env.ps1` script to automatically set up Android SDK environment variables
- Enhanced `build-android.js` script to check for Android SDK and dependencies before running the app
- Added detailed Android setup instructions in `ANDROID_SETUP.md`
- Added new npm scripts in package.json:
  - `npm run setup:android` - Runs the Android SDK setup script
  - `npm run build:android` - Builds and runs the Android app with environment checks

### Fixed
- Fixed Android SDK path issues
- Updated project dependencies to match recommended Expo versions:
  - expo-camera@~14.1.3
  - expo-location@~16.5.5
  - react-native@0.73.6
  - react-native-maps@1.10.0

### How to Use
1. Run `npm run setup:android` to set up Android SDK environment variables
2. Run `npm run build:android` to build and run the Android app

If you encounter any issues, please refer to the `ANDROID_SETUP.md` file for detailed instructions.

# Changes Made to Fix Phillboards App

## Issues Fixed

1. **Removed Niantic Dependencies**
   - Removed `@niantic/lightship-react-native` and `@niantic/lightship-shared-ar-react-native` from package.json
   - These were causing installation failures

2. **Created Temporary AR Implementation**
   - Created `TempARContext.js` with a custom AR implementation that doesn't rely on Niantic
   - Implemented basic AR functionality using Expo Camera

3. **Updated App.js**
   - Added a flag `USE_TEMP_AR` to easily switch between Niantic and temporary AR
   - Modified to conditionally use either Niantic or temporary AR providers

4. **Created Mock Components**
   - Created mock `NianticARContext.js` that exports empty components
   - Created mock `NianticSetupGuide.js` component
   - Created `TempARSetupGuide.js` to explain the temporary mode to users

5. **Fixed WorldMapScreen**
   - Updated to use the temporary AR context instead of Niantic
   - Removed Niantic VPS coverage area imports

6. **Fixed App Configuration**
   - Updated app.json to remove references to missing image files
   - Added proper Android configuration

7. **Added Build Script**
   - Created `build-android.js` to help with Android builds
   - Added EAS configuration for different build profiles

## How to Use

1. The app now uses a temporary AR implementation by default
2. To build for Android, run `node build-android.js` and follow the instructions
3. To switch back to Niantic in the future, set `USE_TEMP_AR = false` in App.js and install the Niantic dependencies

## Limitations of Temporary AR

- Simplified surface detection
- Limited persistent anchors (resets on app restart)
- No shared AR experiences
- Basic AR visualization

The temporary AR implementation provides core functionality while allowing the app to be downloadable on Android without requiring Niantic's API keys. 