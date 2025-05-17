import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';

// Try to import the context providers
let NianticARProvider, TempARProvider, ARProvider, useTempAR;
try {
  const ARContexts = require('./context/ARContext');
  ARProvider = ARContexts.ARProvider;
} catch (error) {
  console.warn("Failed to import ARContext:", error.message);
  ARProvider = ({ children }) => <>{children}</>;
}

try {
  const TempARContexts = require('./context/TempARContext');
  TempARProvider = TempARContexts.TempARProvider;
  useTempAR = TempARContexts.useTempAR;
} catch (error) {
  console.warn("Failed to import TempARContext:", error.message);
  TempARProvider = ({ children }) => <>{children}</>;
  useTempAR = () => ({
    isInitialized: true,
    isInitializing: false,
    initializationError: null,
    retryInitialization: () => {}
  });
}

try {
  const NianticContexts = require('./context/NianticARContext');
  NianticARProvider = NianticContexts.NianticARProvider;
} catch (error) {
  console.warn("Failed to import NianticARContext:", error.message);
  NianticARProvider = ({ children }) => <>{children}</>;
}

// Import UI components
let ui;
try {
  ui = require('./components/ui');
  console.log("UI components loaded successfully:", Object.keys(ui));
} catch (error) {
  console.warn("Failed to import UI components:", error.message);
  ui = {};
}

// Try to import screens, fall back to placeholders if they fail
let WorldMapScreen, TempPlacePhillboardScreen, BrowsePhillboardsScreen;
let ProfileScreen, LeaderboardScreen, ARExperienceScreen, TempARSetupGuide;

try {
  WorldMapScreen = require('./screens/WorldMapScreen').default;
} catch (error) {
  console.warn("Failed to import WorldMapScreen:", error.message);
  WorldMapScreen = (props) => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>Map Screen</Text>
      <Text>This is a placeholder for the World Map screen.</Text>
    </View>
  );
}

try {
  TempPlacePhillboardScreen = require('./screens/TempPlacePhillboardScreen').default;
} catch (error) {
  console.warn("Failed to import TempPlacePhillboardScreen:", error.message);
  TempPlacePhillboardScreen = (props) => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>Create AR Content</Text>
      <Text>This is a placeholder for the AR content creation screen.</Text>
    </View>
  );
}

try {
  BrowsePhillboardsScreen = require('./screens/BrowsePhillboardsScreen').default;
} catch (error) {
  console.warn("Failed to import BrowsePhillboardsScreen:", error.message);
  BrowsePhillboardsScreen = () => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>Browse</Text>
      <Text>This is a placeholder for the Browse screen.</Text>
    </View>
  );
}

try {
  ProfileScreen = require('./screens/ProfileScreen').default;
} catch (error) {
  console.warn("Failed to import ProfileScreen:", error.message);
  ProfileScreen = (props) => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>Profile</Text>
      <Text>This is a placeholder for the Profile screen.</Text>
      <Text>User Level: {props.userLevel || 1}</Text>
      <Text>User Points: {props.userPoints || 0}</Text>
    </View>
  );
}

try {
  LeaderboardScreen = require('./screens/LeaderboardScreen').default;
} catch (error) {
  console.warn("Failed to import LeaderboardScreen:", error.message);
  LeaderboardScreen = (props) => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>Leaderboard</Text>
      <Text>This is a placeholder for the Leaderboard screen.</Text>
      <Text>Your Level: {props.userLevel || 1}</Text>
    </View>
  );
}

try {
  ARExperienceScreen = require('./screens/ARExperienceScreen').default;
} catch (error) {
  console.warn("Failed to import ARExperienceScreen:", error.message);
  ARExperienceScreen = () => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>AR Experience</Text>
      <Text>This is a placeholder for the AR Experience screen.</Text>
    </View>
  );
}

try {
  TempARSetupGuide = require('./components/TempARSetupGuide').default;
} catch (error) {
  console.warn("Failed to import TempARSetupGuide:", error.message);
  TempARSetupGuide = ({ onRetryInitialization }) => (
    <View style={styles.screenPlaceholder}>
      <Text style={styles.screenTitle}>AR Setup Guide</Text>
      <Text>This is a placeholder for the AR Setup Guide.</Text>
      <Text style={styles.retryButton} onPress={onRetryInitialization}>
        Retry Initialization
      </Text>
    </View>
  );
}

// Try to import theme
let theme;
try {
  theme = require('./theme').default;
} catch (error) {
  console.warn("Failed to import theme:", error.message);
  theme = {
    colors: {
      primary: '#FF5E3A',
      secondary: '#2089DC',
      white: '#FFFFFF',
      black: '#000000',
      grey: '#888888',
      lightGrey: '#DDDDDD',
      veryLightGrey: '#F5F5F5',
      darkGrey: '#555555',
      success: '#4CAF50',
      warning: '#FFEB3B',
      error: '#F44336',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    typography: {
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
      },
      fontWeight: {
        regular: 'normal',
        medium: '500',
        bold: 'bold',
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.8,
      },
    },
  };
}

// Level thresholds - points needed for each level
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  500,    // Level 2
  1500,   // Level 3
  3000,   // Level 4
  6000,   // Level 5
  10000,  // Level 6
  15000,  // Level 7
  25000,  // Level 8
  40000,  // Level 9
  60000   // Level 10
];

// Flag to use new AR implementation instead of Niantic or TempAR
const USE_NEW_AR = true;
const USE_TEMP_AR = !USE_NEW_AR;

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Web Version of Create Screen
const WebCreateScreen = ({ userPoints, setUserPoints }) => {
  return (
    <View style={styles.webContainer}>
      <View style={styles.webContent}>
        <Text style={styles.webTitle}>AR Phillboard Creation</Text>
        <Text style={styles.webSubtitle}>This feature requires mobile device capabilities</Text>
        <Image 
          source={require('./assets/images/icon.png')}
          style={styles.webLogo}
          resizeMode="contain"
        />
        <Text style={styles.webDescription}>
          AR Phillboards can only be created on mobile devices with camera and location access.
          Please install the mobile app to use this feature.
        </Text>
      </View>
    </View>
  );
};

// Tab Navigator
const TabNavigator = ({ isWeb = false }) => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);

  // Update user level based on points
  useEffect(() => {
    // Determine level from points
    const calculateLevel = (points) => {
      let level = 1;
      for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (points >= LEVEL_THRESHOLDS[i]) {
          level = i + 1;
        } else {
          break;
        }
      }
      return level;
    };
    
    const newLevel = calculateLevel(userPoints);
    setUserLevel(newLevel);
  }, [userPoints]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.darkGrey,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.veryLightGrey,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Map') {
            return <MaterialIcons name="map" size={size} color={color} />;
          } else if (route.name === 'Create') {
            return <FontAwesome5 name="camera" size={size} color={color} />;
          } else if (route.name === 'Browse') {
            return <MaterialIcons name="search" size={size} color={color} />;
          } else if (route.name === 'Leaderboard') {
            return <MaterialIcons name="leaderboard" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <MaterialIcons name="person" size={size} color={color} />;
          } else if (route.name === 'AR') {
            return <MaterialIcons name="view-in-ar" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Map">
        {(props) => <WorldMapScreen {...props} userPoints={userPoints} setUserPoints={setUserPoints} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Create" 
        options={{ tabBarLabel: 'Create' }}
      >
        {(props) => isWeb 
          ? <WebCreateScreen {...props} userPoints={userPoints} setUserPoints={setUserPoints} />
          : <TempPlacePhillboardScreen {...props} userPoints={userPoints} setUserPoints={setUserPoints} />
        }
      </Tab.Screen>
      <Tab.Screen name="Browse" component={BrowsePhillboardsScreen} />
      {USE_NEW_AR && (
        <Tab.Screen 
          name="AR" 
          component={ARExperienceScreen}
          options={{ tabBarLabel: 'AR' }}
        />
      )}
      <Tab.Screen 
        name="Leaderboard" 
        options={{ tabBarLabel: 'Ranks' }}
      >
        {(props) => <LeaderboardScreen {...props} userLevel={userLevel} userPoints={userPoints} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
      >
        {(props) => <ProfileScreen {...props} userPoints={userPoints} userLevel={userLevel} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Web-specific version of the app
const WebAppContent = ({ isWeb = true }) => {
  return (
    <ARProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {(props) => <TabNavigator {...props} isWeb={isWeb} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ARProvider>
  );
};

// Native App Content
const AppContent = () => {
  const tempAR = useTempAR();
  const { isInitialized, isInitializing, initializationError, retryInitialization } = tempAR;
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // Check if the setup guide should be shown
  useEffect(() => {
    if (!isInitializing && initializationError) {
      setShowSetupGuide(true);
    } else {
      setShowSetupGuide(false);
    }
  }, [isInitializing, initializationError]);
  
  const handleRetryInitialization = () => {
    retryInitialization();
    setShowSetupGuide(false);
  };

  if (showSetupGuide) {
    return <TempARSetupGuide onRetryInitialization={handleRetryInitialization} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App
export default function App(props) {
  const isWeb = Platform.OS === 'web' || props?.isWeb;
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);

  // Prepare app and keep splash screen visible
  useEffect(() => {
    async function prepare() {
      try {
        // Keep splash screen visible while we prepare resources
        await SplashScreen.preventAutoHideAsync();
        
        // Load resources, setup state, etc.
        // Simulate a resource loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn('Error preparing app:', e);
      } finally {
        // Tell the app that we're ready to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide splash screen once resources are loaded
  useEffect(() => {
    if (appIsReady) {
      // Hide the splash screen
      SplashScreen.hideAsync().catch(e => {
        // Fallback for when automatic hiding fails
        console.warn('Could not hide splash screen:', e);
        setSplashVisible(false);
      });
    }
  }, [appIsReady]);

  // Show splash screen manually on web (since expo-splash-screen may not work well there)
  const WebSplashScreen = () => (
    <View style={[styles.container, styles.splashContainer]} id="splash-screen">
      <Image
        source={require('./assets/images/splash.png')}
        style={styles.splashImage}
        resizeMode="contain"
      />
    </View>
  );

  // Hide web splash screen after a delay with fade animation
  useEffect(() => {
    if (isWeb && appIsReady) {
      // Fade out animation instead of instant switch
      const timer = setTimeout(() => {
        // Adding fade animation for smoother transition
        const fadeOutDuration = 500; // milliseconds
        
        // Create animation style element for fade transition
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          #splash-screen {
            animation: fadeOut ${fadeOutDuration}ms ease-out forwards;
          }
        `;
        document.head.appendChild(style);
        
        // Add id to splash container for targeting with CSS
        const splashElement = document.getElementById('splash-screen');
        if (splashElement) {
          // After animation completes, hide splash
          setTimeout(() => {
            setSplashVisible(false);
            // Clean up the style
            style.remove();
          }, fadeOutDuration);
        } else {
          // Fallback if DOM element not found
          setSplashVisible(false);
        }
      }, 2000); // Wait 2 seconds before starting fade
      
      return () => clearTimeout(timer);
    }
  }, [isWeb, appIsReady]);

  // Show a loading screen until app is ready
  if (!appIsReady) {
    if (isWeb) {
      return <WebSplashScreen />;
    }
    // For native platforms, expo-splash-screen is handling this
    return null;
  }

  if (isWeb) {
    return (
      <SafeAreaProvider>
        {splashVisible ? (
          <WebSplashScreen />
        ) : (
          <WebAppContent isWeb={true} />
        )}
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      {USE_NEW_AR ? (
        <ARProvider>
          <AppContent />
        </ARProvider>
      ) : USE_TEMP_AR ? (
        <TempARProvider>
          <AppContent />
        </TempARProvider>
      ) : (
        <NianticARProvider>
          <AppContent />
        </NianticARProvider>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  webContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  webTitle: {
    fontSize: theme.typography.fontSize.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  webSubtitle: {
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.spacing.lg,
  },
  webLogo: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.lg,
  },
  webDescription: {
    fontSize: theme.typography.fontSize.md,
    textAlign: 'center',
    maxWidth: 500,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.darkGrey,
  },
  screenPlaceholder: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  screenTitle: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 8,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  splashContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '80%',
    height: '80%',
  },
});
