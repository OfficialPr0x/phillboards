import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NianticARProvider } from './context/NianticARContext';
import { TempARProvider, useTempAR } from './context/TempARContext';

// Screens
import WorldMapScreen from './screens/WorldMapScreen';
import TempPlacePhillboardScreen from './screens/TempPlacePhillboardScreen';
import BrowsePhillboardsScreen from './screens/BrowsePhillboardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import TempARSetupGuide from './components/TempARSetupGuide';

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

// Flag to use temporary AR implementation instead of Niantic
const USE_TEMP_AR = true;

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
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
    
    // Show level up animation if level increased
    if (newLevel > userLevel) {
      setUserLevel(newLevel);
      
      // Display level up alert
      Alert.alert(
        '🎉 Level Up! 🎉',
        `Congratulations! You've reached Level ${newLevel}!`,
        [{ text: 'Awesome!' }]
      );
    } else {
      setUserLevel(newLevel);
    }
  }, [userPoints]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF5E3A',
        tabBarInactiveTintColor: '#333',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          
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
          }
        },
      })}
    >
      <Tab.Screen name="Map" component={WorldMapScreen} />
      <Tab.Screen 
        name="Create" 
        options={{ tabBarLabel: 'Create' }}
      >
        {(props) => <TempPlacePhillboardScreen {...props} userPoints={userPoints} setUserPoints={setUserPoints} />}
      </Tab.Screen>
      <Tab.Screen name="Browse" component={BrowsePhillboardsScreen} />
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

// Main App Content
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
const App = () => {
  return (
    <SafeAreaProvider>
      {USE_TEMP_AR ? (
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
};

export default App; 