import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DemoLocation {
  id: string;
  name: string;
  description: string;
  image: any; // Image source
  lat: number;
  lng: number;
  vpsAvailable: boolean;
}

interface DemoLocationSelectorProps {
  locations: DemoLocation[];
  selectedLocationId: string | null;
  onSelectLocation: (location: DemoLocation) => void;
  onClose?: () => void;
}

const DEMO_LOCATIONS: DemoLocation[] = [
  {
    id: 'times-square',
    name: 'Times Square',
    description: 'The heart of New York City, filled with billboards and advertising.',
    image: require('../../assets/locations/times-square.jpg'),
    lat: 40.7580,
    lng: -73.9855,
    vpsAvailable: true,
  },
  {
    id: 'venice-beach',
    name: 'Venice Beach',
    description: 'Vibrant boardwalk with street performers and oceanfront views.',
    image: require('../../assets/locations/venice-beach.jpg'),
    lat: 33.9850,
    lng: -118.4695,
    vpsAvailable: true,
  },
  {
    id: 'shibuya-crossing',
    name: 'Shibuya Crossing',
    description: 'Famous Tokyo intersection surrounded by digital displays.',
    image: require('../../assets/locations/shibuya-crossing.jpg'),
    lat: 35.6595,
    lng: 139.7004,
    vpsAvailable: true,
  },
];

const DemoLocationSelector: React.FC<DemoLocationSelectorProps> = ({
  locations = DEMO_LOCATIONS,
  selectedLocationId,
  onSelectLocation,
  onClose,
}) => {
  const [expanded, setExpanded] = useState(true);
  
  // Animation values
  const containerHeight = useSharedValue(expanded ? 300 : 80);
  const rotateValue = useSharedValue(expanded ? 0 : 180);
  const iconOpacity = useSharedValue(1);
  
  // Handle toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Update animation when expanded state changes
  useEffect(() => {
    containerHeight.value = withTiming(expanded ? 300 : 80, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    
    rotateValue.value = withTiming(expanded ? 0 : 180, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    
    iconOpacity.value = withSequence(
      withTiming(0, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
  }, [expanded, containerHeight, rotateValue, iconOpacity]);
  
  // Get the currently selected location
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId) || locations[0];
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
    };
  });
  
  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotateValue.value}deg` },
      ],
      opacity: iconOpacity.value,
    };
  });
  
  // Render a location card
  const renderLocationCard = (location: DemoLocation) => {
    const isSelected = location.id === selectedLocationId;
    
    return (
      <TouchableOpacity
        key={location.id}
        style={[styles.locationCard, isSelected && styles.selectedCard]}
        onPress={() => {
          onSelectLocation(location);
          if (!expanded) {
            setExpanded(true);
          }
        }}
        activeOpacity={0.9}
      >
        <Image source={location.image} style={styles.locationImage} />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        
        <View style={styles.locationInfo}>
          <Text style={styles.locationName}>{location.name}</Text>
          <Text style={styles.locationDescription} numberOfLines={2}>
            {location.description}
          </Text>
        </View>
        
        {isSelected && (
          <View style={styles.selectedBadge}>
            <MaterialIcons name="check-circle" size={24} color="#4CD964" />
          </View>
        )}
        
        {location.vpsAvailable && (
          <View style={styles.vpsBadge}>
            <MaterialIcons name="3d-rotation" size={16} color="#FFF" />
            <Text style={styles.vpsBadgeText}>VPS</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Header with collapse/expand toggle */}
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.8}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Demo Locations</Text>
          <Text style={styles.subtitle}>
            {expanded ? 'Select a location to explore' : selectedLocation.name}
          </Text>
        </View>
        
        <Animated.View style={arrowStyle}>
          <MaterialIcons
            name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#FFF"
          />
        </Animated.View>
      </TouchableOpacity>
      
      {/* Locations grid */}
      {expanded && (
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.locationsContainer}
        >
          {locations.map(renderLocationCard)}
        </ScrollView>
      )}
      
      {/* Close button */}
      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <MaterialIcons name="close" size={20} color="#FFF" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    width: width - 32,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  locationsContainer: {
    padding: 12,
  },
  locationCard: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CD964',
  },
  locationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  locationInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  locationName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  vpsBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(76, 217, 100, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vpsBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DemoLocationSelector; 