import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Sample phillboard data to display on map
const SAMPLE_PHILLBOARDS = [
  { id: 1, title: "Coffee Shop Ad", description: "50% off lattes this week!", lat: 37.7749, lng: -122.4194 },
  { id: 2, title: "Fitness Center", description: "New members get first month free", lat: 37.7851, lng: -122.4094 },
  { id: 3, title: "Pizza Place", description: "Buy one get one free on Tuesdays", lat: 37.7695, lng: -122.4143 },
  { id: 4, title: "Tech Conference", description: "Annual developer meetup - June 15", lat: 37.7790, lng: -122.4200 },
  { id: 5, title: "Music Festival", description: "Weekend passes available now", lat: 37.7820, lng: -122.4250 }
];

// Mock components
class Marker extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.mockMarker}>
        <View style={styles.markerPin}></View>
        <View style={styles.markerContent}>
          {children}
        </View>
      </View>
    );
  }
}

class Callout extends React.Component {
  render() {
    return (
      <View style={styles.mockCallout}>
        {this.props.children}
      </View>
    );
  }
}

class Circle extends React.Component {
  render() {
    return (
      <View style={styles.mockCircle}>
        <Text style={styles.circleText}>Radius: {this.props.radius}m</Text>
      </View>
    );
  }
}

// Mock MapView component with visual styling
class MapView extends React.Component {
  render() {
    const { style, children, region, showsUserLocation } = this.props;
    
    return (
      <View style={[styles.mockMap, style]}>
        <View style={styles.mapGrid}>
          {/* Styled map grid with grid lines */}
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.mapRow}>
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <View key={`cell-${rowIndex}-${colIndex}`} style={styles.mapCell} />
              ))}
            </View>
          ))}
          
          {/* User location indicator */}
          {showsUserLocation && (
            <View style={styles.userLocation}>
              <View style={styles.userDot}></View>
              <View style={styles.userRing}></View>
            </View>
          )}
        </View>
        
        <View style={styles.mapControls}>
          <View style={styles.zoomControls}>
            <Text style={styles.zoomButton}>+</Text>
            <Text style={styles.zoomButton}>−</Text>
          </View>
        </View>
        
        <Text style={styles.mapTitle}>Phillboards Near You</Text>
        
        <View style={styles.phillboardList}>
          <Text style={styles.listTitle}>Available Phillboards</Text>
          <ScrollView style={styles.scrollList}>
            {SAMPLE_PHILLBOARDS.map(phillboard => (
              <View key={phillboard.id} style={styles.phillboardItem}>
                <View style={styles.phillboardIcon}></View>
                <View style={styles.phillboardInfo}>
                  <Text style={styles.phillboardTitle}>{phillboard.title}</Text>
                  <Text style={styles.phillboardDesc}>{phillboard.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        
        {/* Render children */}
        <View style={styles.childrenContainer}>
          {children}
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  mockMap: {
    backgroundColor: '#E8EEF4',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  mapRow: {
    flex: 1,
    flexDirection: 'row',
  },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  mapTitle: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  mapControls: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 5,
  },
  zoomControls: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  zoomButton: {
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userLocation: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{translateX: -12}, {translateY: -12}],
    width: 24,
    height: 24,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4285F4',
    borderWidth: 2,
    borderColor: 'white',
  },
  userRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(66, 133, 244, 0.3)',
    backgroundColor: 'rgba(66, 133, 244, 0.1)',
  },
  phillboardList: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    maxHeight: 200,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollList: {
    maxHeight: 150,
  },
  phillboardItem: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  phillboardIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF5E3A',
    marginRight: 10,
  },
  phillboardInfo: {
    flex: 1,
  },
  phillboardTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  phillboardDesc: {
    fontSize: 12,
    color: '#666',
  },
  mockMarker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  markerPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF5E3A',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  markerContent: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mockCallout: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    minWidth: 100,
  },
  mockCircle: {
    position: 'absolute',
    width: 100,
    height: 30,
    backgroundColor: 'rgba(66, 133, 244, 0.2)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(66, 133, 244, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  circleText: {
    fontSize: 12,
    color: '#4285F4',
  },
  childrenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 6,
  }
});

// Define constants
const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = 'default';

// Attach components to MapView
MapView.Marker = Marker;
MapView.Callout = Callout;
MapView.Circle = Circle;

// Export the MapView as default so it can be imported as:
// import MapView, { Marker, Callout } from 'react-native-maps';
export default MapView;
export { Marker, Callout, Circle, PROVIDER_GOOGLE, PROVIDER_DEFAULT }; 