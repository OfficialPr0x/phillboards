import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Animated, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useTempAR } from '../context/TempARContext';

const WorldMapScreen = ({ userPoints, setUserPoints }) => {
  const { location, getNearbyPhillboards, isInitialized, isInitializing, initializationError, retryInitialization } = useTempAR();
  const [errorMsg, setErrorMsg] = useState(null);
  const [phillboards, setPhillboards] = useState([]);
  const [vpsLocations, setVpsLocations] = useState([]);
  const [challengeActive, setChallengeActive] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pulseAnim = new Animated.Value(1);

  // Sample challenges
  const challenges = [
    {
      id: 1,
      title: 'Visit 3 Phillboards Today',
      description: 'Find and interact with 3 different Phillboards today',
      reward: 250,
      progress: 0,
      total: 3
    },
    {
      id: 2,
      title: 'Place a Phillboard in a New Location',
      description: 'Create a new Phillboard in an undiscovered location',
      reward: 350,
      progress: 0,
      total: 1
    }
  ];

  // Animation for challenge markers
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // Fetch Phillboards and VPS locations when location changes
  useEffect(() => {
    if (location) {
      fetchNearbyPhillboards();
      fetchVpsLocations();
    } else {
      setIsLoading(false);
    }
  }, [location]);

  // Watch for initialization status changes
  useEffect(() => {
    if (!isInitializing && location) {
      fetchNearbyPhillboards();
    }
  }, [isInitializing, isInitialized]);

  // Fetch nearby phillboards using Temp AR implementation
  const fetchNearbyPhillboards = async () => {
    setIsLoading(true);
    try {
      const nearbyPhillboards = await getNearbyPhillboards(500); // 500 meters radius
      
      // If no real phillboards yet, add some sample ones for demo
      if (nearbyPhillboards.length === 0) {
        const samplePhillboards = generateSamplePhillboards();
        setPhillboards(samplePhillboards);
      } else {
        setPhillboards(nearbyPhillboards);
      }
    } catch (error) {
      console.error('Error fetching phillboards:', error);
      
      // Fallback to sample data if API fails
      const samplePhillboards = generateSamplePhillboards();
      setPhillboards(samplePhillboards);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate sample phillboards near user's location for demo purposes
  const generateSamplePhillboards = () => {
    if (!location) return [];
    
    const sampleData = [
      {
        id: 1,
        title: 'Downtown Phillboard',
        points: 100,
        visitors: 23,
        type: 'regular',
      },
      {
        id: 2,
        title: 'Park Board',
        points: 150,
        visitors: 15,
        type: 'challenge',
      },
      {
        id: 3,
        title: 'District Board',
        points: 75,
        visitors: 8,
        type: 'bonus',
      }
    ];
    
    return sampleData.map(board => ({
      ...board,
      latitude: location.coords.latitude + (Math.random() - 0.5) * 0.02,
      longitude: location.coords.longitude + (Math.random() - 0.5) * 0.02,
    }));
  };

  // Fetch VPS locations for AR anchoring
  const fetchVpsLocations = async () => {
    try {
      // For the temporary AR implementation, we'll simulate VPS locations
      const mockVpsLocations = [
        {
          id: 'vps-1',
          name: 'City Center',
          latitude: location?.coords.latitude + 0.001 || 0,
          longitude: location?.coords.longitude - 0.002 || 0,
        },
        {
          id: 'vps-2',
          name: 'Park Entrance',
          latitude: location?.coords.latitude - 0.002 || 0,
          longitude: location?.coords.longitude + 0.001 || 0,
        }
      ];
      
      setVpsLocations(mockVpsLocations);
    } catch (error) {
      console.error('Error fetching VPS locations:', error);
      setVpsLocations([]);
    }
  };

  const handleMarkerPress = (phillboard) => {
    // If it's a challenge marker, start challenge
    if (phillboard.type === 'challenge') {
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setCurrentChallenge(randomChallenge);
      setChallengeActive(true);
      Alert.alert(
        'Challenge Discovered!',
        `${randomChallenge.title}: ${randomChallenge.description}\n\nReward: ${randomChallenge.reward} points`,
        [
          { 
            text: 'Accept', 
            onPress: () => console.log('Challenge accepted') 
          },
          {
            text: 'Decline',
            onPress: () => {
              setChallengeActive(false);
              setCurrentChallenge(null);
            },
            style: 'cancel',
          },
        ]
      );
    } else {
      // Regular or bonus phillboard interaction
      const pointsEarned = phillboard.type === 'bonus' ? phillboard.points * 2 : phillboard.points;
      setUserPoints(prevPoints => prevPoints + pointsEarned);
      
      Alert.alert(
        'Phillboard Discovered!',
        `You found "${phillboard.title}"\n\nYou earned ${pointsEarned} points!`,
        [{ text: 'Awesome!', onPress: () => console.log('Points added') }]
      );
    }
  };

  const renderMarker = (phillboard) => {
    // Different markers for different types of phillboards
    if (phillboard.type === 'challenge') {
      return (
        <Marker
          key={phillboard.id}
          coordinate={{
            latitude: phillboard.latitude,
            longitude: phillboard.longitude,
          }}
          onPress={() => handleMarkerPress(phillboard)}
        >
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={styles.challengeMarker}>
              <FontAwesome name="trophy" size={16} color="#FFD700" />
            </View>
          </Animated.View>
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{phillboard.title}</Text>
              <Text>Challenge Available!</Text>
              <Text>{phillboard.points} pts</Text>
            </View>
          </Callout>
        </Marker>
      );
    } else if (phillboard.type === 'bonus') {
      return (
        <Marker
          key={phillboard.id}
          coordinate={{
            latitude: phillboard.latitude,
            longitude: phillboard.longitude,
          }}
          onPress={() => handleMarkerPress(phillboard)}
        >
          <View style={styles.bonusMarker}>
            <FontAwesome name="star" size={14} color="#FFFFFF" />
          </View>
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{phillboard.title}</Text>
              <Text>Bonus Phillboard!</Text>
              <Text>{phillboard.points} pts (2x bonus)</Text>
            </View>
          </Callout>
        </Marker>
      );
    } else {
      return (
        <Marker
          key={phillboard.id}
          coordinate={{
            latitude: phillboard.latitude,
            longitude: phillboard.longitude,
          }}
          onPress={() => handleMarkerPress(phillboard)}
        >
          <View style={[styles.regularMarker, phillboard.isMock && styles.mockMarker]}>
            <MaterialIcons name="push-pin" size={14} color="#FFFFFF" />
          </View>
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{phillboard.title}</Text>
              <Text>Visitors: {phillboard.visitors || 0}</Text>
              <Text>{phillboard.points} pts</Text>
              {phillboard.isMock && <Text style={styles.mockText}>(Offline Mode)</Text>}
            </View>
          </Callout>
        </Marker>
      );
    }
  };

  // Render VPS location markers
  const renderVpsMarker = (vpsLocation) => {
    return (
      <Marker
        key={vpsLocation.id}
        coordinate={{
          latitude: vpsLocation.latitude,
          longitude: vpsLocation.longitude,
        }}
        pinColor="#4A90E2"
      >
        <View style={styles.vpsMarker}>
          <MaterialIcons name="location-on" size={18} color="#FFFFFF" />
        </View>
        <Callout>
          <View style={styles.callout}>
            <Text style={styles.calloutTitle}>{vpsLocation.name}</Text>
            <Text>VPS Location</Text>
            <Text>Place AR content here</Text>
          </View>
        </Callout>
      </Marker>
    );
  };

  let mapRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };

  if (location) {
    mapRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!location && !errorMsg) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF5E3A" />
        <Text style={styles.loadingText}>Getting your location...</Text>
        <Text style={styles.loadingSubText}>Please ensure location services are enabled</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <>
          <MapView style={styles.map} region={mapRegion} showsUserLocation={true}>
            {phillboards.map(phillboard => renderMarker(phillboard))}
            {isInitialized && vpsLocations.map(vpsLocation => renderVpsMarker(vpsLocation))}
          </MapView>
          
          {/* AR Status Banner (if there's an error) */}
          {initializationError && (
            <TouchableOpacity 
              style={styles.arStatusBanner}
              onPress={retryInitialization}
            >
              <MaterialIcons name="warning" size={18} color="#FFC107" />
              <Text style={styles.arStatusText}>
                AR features limited. Tap to retry.
              </Text>
            </TouchableOpacity>
          )}
          
          {/* Loading Indicator */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FF5E3A" />
            </View>
          )}
          
          {/* Challenge Progress Bar (if a challenge is active) */}
          {challengeActive && currentChallenge && (
            <View style={styles.challengeBar}>
              <Text style={styles.challengeTitle}>{currentChallenge.title}</Text>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    {width: `${(currentChallenge.progress / currentChallenge.total) * 100}%`}
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {currentChallenge.progress}/{currentChallenge.total}
              </Text>
            </View>
          )}
          
          {/* Nearby Phillboards Counter */}
          <View style={styles.nearbyCounter}>
            <MaterialIcons name="place" size={18} color="#FF5E3A" />
            <Text style={styles.nearbyText}>
              {phillboards.length} Phillboards nearby
            </Text>
          </View>
          
          {/* AR Mode Button */}
          <TouchableOpacity 
            style={[styles.arModeButton, !isInitialized && styles.disabledButton]}
            disabled={!isInitialized}
            onPress={() => {
              if (isInitialized) {
                Alert.alert('AR View', 'AR mode would open here in a full implementation.');
              } else {
                Alert.alert('AR Not Available', 'AR features are not currently available. Please check your API key setup in config/nianticConfig.js');
              }
            }}
          >
            <MaterialIcons name="view-in-ar" size={22} color="#FFFFFF" />
            <Text style={styles.arModeText}>View in AR</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingSubText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  regularMarker: {
    backgroundColor: '#FF5E3A',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  mockMarker: {
    backgroundColor: '#888',
    borderColor: '#DDD',
  },
  mockText: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 12,
  },
  challengeMarker: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  bonusMarker: {
    backgroundColor: '#8B5CF6',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  vpsMarker: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  callout: {
    width: 150,
    padding: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arStatusBanner: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arStatusText: {
    color: 'white',
    marginLeft: 8,
  },
  challengeBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  challengeTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4A90E2',
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  progressText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#666',
  },
  nearbyCounter: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nearbyText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  arModeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#888',
  },
  arModeText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WorldMapScreen; 