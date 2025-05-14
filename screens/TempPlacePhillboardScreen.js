import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useTempAR } from '../context/TempARContext';
import AROverlay from '../components/ui/AROverlay';
import BillboardCreator from '../components/ui/BillboardCreator';
import Billboard from '../components/ui/Billboard';

const { width, height } = Dimensions.get('window');

const TempPlacePhillboardScreen = ({ navigation, userPoints = 1250, setUserPoints = () => {} }) => {
  const { 
    hasPermission, 
    cameraRef, 
    setCameraRef,
    getNearbyPhillboards
  } = useTempAR();
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [showBillboardCreator, setShowBillboardCreator] = useState(false);
  const [nearbyBillboards, setNearbyBillboards] = useState([]);
  const [selectedBillboard, setSelectedBillboard] = useState(null);
  
  // Initialize and fetch nearby billboards
  useEffect(() => {
    const initializeScreen = async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert(
            'Location Permission Required',
            'Please enable location permissions to place Phillboards',
            [{ text: 'OK' }]
          );
        }
        
        // Fetch nearby billboards
        const billboards = await getNearbyPhillboards(100);
        setNearbyBillboards(billboards);
        
        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing AR screen:', error);
        Alert.alert('Error', 'Failed to initialize AR experience');
        setIsInitializing(false);
      }
    };
    
    initializeScreen();
    
    // Set up interval to refresh nearby billboards
    const interval = setInterval(async () => {
      try {
        const billboards = await getNearbyPhillboards(100);
        setNearbyBillboards(billboards);
      } catch (error) {
        console.error('Error fetching nearby billboards:', error);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle billboard creation
  const handleCreateBillboard = () => {
    setShowBillboardCreator(true);
  };
  
  // Handle billboard created
  const handleBillboardCreated = (newBillboard) => {
    // Add points for creating a billboard
    const pointsEarned = 100;
    if (setUserPoints) {
      setUserPoints(prevPoints => prevPoints + pointsEarned);
    }
    
    // Refresh nearby billboards
    getNearbyPhillboards(100).then(billboards => {
      setNearbyBillboards(billboards);
    });
    
    // Show success message
    Alert.alert(
      'Billboard Created!',
      `Your billboard has been placed successfully. You earned ${pointsEarned} points!`,
      [{ text: 'Awesome!' }]
    );
  };
  
  // Handle billboard interaction
  const handleBillboardInteraction = (billboardId) => {
    const billboard = nearbyBillboards.find(b => b.id === billboardId);
    if (billboard) {
      setSelectedBillboard(billboard);
    }
  };
  
  // Navigate to leaderboard
  const handleViewLeaderboard = () => {
    navigation.navigate('LeaderboardScreen');
  };
  
  // Navigate to profile
  const handleViewProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  if (isInitializing) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF5E3A" />
        <Text style={styles.loadingText}>
          Initializing AR Experience...
        </Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Camera and location access is required to use AR features.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <Camera
        ref={ref => setCameraRef(ref)}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      >
        {/* AR UI Overlay */}
        <AROverlay 
          onCreatePhillboard={handleCreateBillboard}
          onViewLeaderboard={handleViewLeaderboard}
          onViewProfile={handleViewProfile}
        />
        
        {/* Render nearby billboards */}
        <View style={styles.billboardsContainer}>
          {nearbyBillboards.map((billboard, index) => (
            <View 
              key={billboard.id} 
              style={[
                styles.billboardWrapper,
                {
                  top: 150 + (index * 50) % 300,
                  left: (index * 80) % (width - 200),
                }
              ]}
            >
              <Billboard
                id={billboard.id}
                title={billboard.title}
                message={billboard.message}
                template={billboard.template}
                likes={billboard.likes}
                createdBy={billboard.createdBy}
                distance={billboard.distance}
                onInteract={handleBillboardInteraction}
                animate={true}
              />
            </View>
          ))}
        </View>
      </Camera>
      
      {/* Billboard Creator Modal */}
      <BillboardCreator
        visible={showBillboardCreator}
        onClose={() => setShowBillboardCreator(false)}
        onCreated={handleBillboardCreated}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  camera: {
    flex: 1,
  },
  billboardsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  billboardWrapper: {
    position: 'absolute',
    transform: [{ scale: 0.8 }],
  },
});

export default TempPlacePhillboardScreen; 