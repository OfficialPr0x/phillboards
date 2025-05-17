# Running Your App on iOS with Expo Go

You can test your app on a physical iOS device without a Mac by using the Expo Go app from the App Store.

## 1. Install Expo Go on Your iOS Device

1. Open the App Store on your iPhone or iPad
2. Search for "Expo Go"
3. Download and install the Expo Go app

## 2. Run Your App in Development Mode

1. On your Windows PC, open a terminal in your project directory
2. Run:
   ```
   npm run expo-go
   ```
3. This will start the Metro bundler with tunnel mode and display a QR code in the terminal

## 3. Connect Your iOS Device

1. Make sure your iOS device is on the same WiFi network as your development computer
2. Open the Camera app on your iOS device
3. Point it at the QR code in your terminal
4. Tap the notification that appears to open the project in Expo Go

## Alternative Connection Methods

If scanning the QR code doesn't work:

1. Open the Expo Go app on your iOS device
2. Create/sign in to an Expo account if prompted
3. On your development computer, sign in to the same Expo account:
   ```
   expo login
   ```
4. After starting your app with `npm run expo-go`, your project should appear in the "Projects" tab in the Expo Go app

## Troubleshooting

### Connection Timeout (Error 504)

If you see a "Connection Timed Out" error:

1. Try the alternative tunnel command:
   ```
   npm run tunnel
   ```

2. If that doesn't work, try installing the global Expo CLI and running:
   ```
   npm install -g expo-cli
   npx expo-cli start --tunnel
   ```

3. Make sure you have the latest @expo/ngrok package:
   ```
   npm uninstall @expo/ngrok
   npm install @expo/ngrok@^4.1.3
   ```

4. If using Windows, try temporarily disabling Windows Defender Firewall:
   - Open Windows Security
   - Go to Firewall & network protection
   - Click on each active network and turn off Microsoft Defender Firewall
   - Try connecting again, then re-enable the firewall when done

5. Try using a mobile hotspot from your phone instead of your WiFi

### Web UI Issues

If you're getting errors in the web UI:

1. Make sure all required assets exist by creating placeholder files:
   ```
   mkdir -p assets/images
   ```

2. If favicon errors persist, try the web version without the tunnel:
   ```
   npm run web
   ```

## Using Expo Development Client

For more reliable testing, consider using the Expo Development Client:

1. Install the development client:
   ```
   npx expo install expo-dev-client
   ```

2. Build your development client:
   ```
   npx expo prebuild
   npx expo run:android
   ```

This method provides a more stable experience but requires more setup.

## Development Workflow

1. Make changes to your code
2. Save the changes
3. The app will automatically reload with your changes on the device

This method is great for testing the UI and basic functionality, but some native features might require additional setup or may not work exactly the same as on a production build. 