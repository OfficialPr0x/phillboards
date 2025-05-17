# Phillboards - AR Content Platform

Phillboards is a cross-platform application that allows users to discover and create AR content in the real world. The app works on iOS, Android, and web browsers.

## Features

- 🗺️ Interactive world map to find nearby Phillboards
- 📱 AR creation tools for mobile devices 
- 🏆 Gamification with points and levels
- 🔍 Browse and search for Phillboards
- 📊 Leaderboards to see top users

## Platform Support

- ✅ **iOS** - via Expo Go or native build
- ✅ **Android** - via Expo Go or native build
- ✅ **Web** - Full web deployment with responsive design

## Development Setup

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For mobile: iOS/Android emulator or physical device

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/phillboards.git
   cd phillboards
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

#### Mobile Development (Expo)

```bash
# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

#### Web Development (Standalone)

```bash
# Start web development server with hot reloading
npm run web:dev
```

This will open a browser window with the app running at http://localhost:8080.

### Building for Production

#### Web Build

```bash
# Build the web version
npm run web:build

# Serve the production build locally
npm run web:serve
```

The web build will be available in the `web-build` directory, ready for deployment to any static hosting service.

#### Mobile Build

Follow the Expo documentation for creating production builds for iOS and Android:
- [Building for iOS](https://docs.expo.dev/distribution/building-standalone-apps/#build-for-ios)
- [Building for Android](https://docs.expo.dev/distribution/building-standalone-apps/#build-for-android)

## Architecture

Phillboards is built with a shared codebase approach using:

- React Native for mobile (iOS/Android)
- React Native Web for the browser version
- Expo for simplified mobile development
- Custom webpack configuration for web optimization

### Directory Structure

```
phillboards/
├── assets/            # Images, icons, and other static files
├── components/        # Reusable UI components
├── context/           # React context providers
├── screens/           # App screens
├── theme/             # Styling constants
├── utils/             # Utility functions
├── web-mocks/         # Web-specific mocks for native modules
├── web-build.js       # Production web build script
├── web-dev-server.js  # Development web server
├── web-server.js      # Production web server
└── webpack.config.js  # Webpack configuration
```

## Deployment

### Web Deployment

The web version can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages:

1. Build the web version: `npm run web:build`
2. Deploy the `web-build` directory to your hosting service

### Mobile Deployment

Follow the Expo documentation for deploying to the App Store and Google Play:
- [Deploying to App Store](https://docs.expo.dev/distribution/app-stores/#deploying-to-app-stores)
- [Deploying to Google Play](https://docs.expo.dev/distribution/app-stores/#deploying-to-app-stores)

## Environment Setup Guides

For platform-specific setup instructions, see:

- [EXPO_GO_SETUP.md](./EXPO_GO_SETUP.md) - Setup for Expo Go
- [IOS_EMULATOR_SETUP.md](./IOS_EMULATOR_SETUP.md) - iOS emulator setup
- [ANDROID_EMULATOR_SETUP.md](./ANDROID_EMULATOR_SETUP.md) - Android emulator setup
- [NIANTIC_SETUP.md](./NIANTIC_SETUP.md) - Niantic Lightship AR setup
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase backend setup

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please reach out to [your-email@example.com](mailto:your-email@example.com).

## MVP Web Version

This repository contains a minimal viable product (MVP) version of Phillboards that works on web, Android, and iOS platforms.

### Running the Web Version

To run the web version of the application:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run web
   ```

3. Build for production:
   ```
   npm run web:build
   ```

4. Serve the production build:
   ```
   npm run web:serve
   ```

### Mobile Development

For mobile development, please refer to the platform-specific guides:

- [Android Emulator Setup](ANDROID_EMULATOR_SETUP.md)
- [Android Setup](ANDROID_SETUP.md)
- [iOS Emulator Setup](IOS_EMULATOR_SETUP.md)
- [iOS Connection Guide](IOS_CONNECTION_GUIDE.md)
- [Expo Go Setup](EXPO_GO_SETUP.md)
- [Niantic Setup](NIANTIC_SETUP.md)

## Project Structure

- `/src` - Main application entry point for web
- `/components` - Reusable UI components
- `/screens` - Application screens
- `/assets` - Images, animations, and other static assets
- `/web-mocks` - Web-specific mock implementations for native modules
- `/public` - Static assets for the web version

## Web Implementation

The web version provides a simplified experience compared to the mobile app. Some AR features are simulated or disabled in the web version.

For the best AR experience, we recommend using the mobile application.
