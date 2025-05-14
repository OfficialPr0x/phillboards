# Phillboards - AR Billboard App

Phillboards is an interactive AR (Augmented Reality) application that allows users to place virtual billboards in the real world. It's designed for small business owners, side hustlers, and creative individuals looking for a unique marketing approach.

## Features

- **AR Billboard Creation**: Create and place virtual billboards in the real world
- **Multiple Billboard Templates**: Choose from classic, neon, retro, business, and playful designs
- **Interactive UI**: Modern, gamified interface with points and levels
- **Social Features**: View and interact with billboards placed by others
- **Leaderboard**: Compete with other users for the most popular billboards

## Getting Started

### Prerequisites

- Node.js (14.x or higher)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/phillboards.git
   cd phillboards
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Android Setup

For Android development, you need to set up the Android SDK:

1. Run the Android setup script:
   ```
   npm run setup:android
   ```

2. Follow the prompts to install Android Studio and configure the environment.

3. To build and run the app on Android:
   ```
   npm run build:android
   ```

For detailed instructions, see [ANDROID_SETUP.md](./ANDROID_SETUP.md).

## Usage

### Creating a Billboard

1. Navigate to the "Create" tab
2. Enter your billboard content (title and message)
3. Choose a template style
4. Position your device where you want to place the billboard
5. Tap "Place" to create your billboard

### Viewing Billboards

1. Use the "Map" tab to see billboards on a map
2. Use the AR view to see billboards in your surroundings
3. Interact with billboards by tapping on them

### Earning Points

- Earn points by creating billboards
- Get additional points when others view or like your billboards
- Level up to unlock new features and templates

## Tech Stack

- React Native
- Expo
- React Navigation
- Expo Camera for AR functionality
- React Native Maps for map integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed for professional small business owners and creative marketers
- Built with a focus on user experience and modern UI design

## Temporary AR Implementation

This app currently uses a temporary AR implementation instead of Niantic's Lightship SDK. This provides basic AR functionality while allowing the app to work on Android devices without requiring Niantic's API keys.

### Limitations of Temporary AR

- Simplified surface detection
- Limited persistent anchors (resets on app restart)
- No shared AR experiences
- Basic AR visualization

## Switching to Niantic (Future)

To switch back to using Niantic's Lightship SDK:

1. Set the `USE_TEMP_AR` flag to `false` in `App.js`
2. Ensure you have valid Niantic API keys configured in `config/nianticConfig.js`

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Technologies Used
- React Native
- Expo
- React Native Maps
- Expo Camera and Location
- Niantic Lightship SDK for AR features
  - Surface detection and meshing
  - Semantic understanding
  - Persistent anchors
  - Shared AR experiences

## Troubleshooting

### Camera Permission Issues
Make sure your device has granted camera and location permissions to the app.

### AR Not Functioning
- Ensure you have a supported device for AR functionality
- Check that your Niantic API key is correctly configured
- Make sure you have adequate lighting for surface detection

## Future Updates
- Social features: friends, messaging, and social sharing
- More customization options for billboards
- AR filters and effects
- Group challenges and events
- In-app rewards and virtual items

## License

This project is licensed under the MIT License - see the LICENSE file for details.

- In-app rewards and virtual items #   p h i l l b o a r d s 
 
 #   p h i l l b o a r d s 
 
 