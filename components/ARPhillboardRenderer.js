import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ARView, ARAnchorTrackingComponent } from '@niantic/lightship-react-native';
import { useNianticAR } from '../context/NianticARContext';

// Phillboard UI template options
const PHILLBOARD_TEMPLATES = {
  classic: {
    containerStyle: styles.classicContainer,
    titleStyle: styles.classicTitle,
    textStyle: styles.classicText,
    backgroundColor: '#FF5E3A',
    border: true,
  },
  neon: {
    containerStyle: styles.neonContainer,
    titleStyle: styles.neonTitle,
    textStyle: styles.neonText,
    backgroundColor: '#4A90E2',
    border: true,
  },
  retro: {
    containerStyle: styles.retroContainer,
    titleStyle: styles.retroTitle,
    textStyle: styles.retroText,
    backgroundColor: '#8B5CF6',
    border: true,
  },
};

const ARPhillboardRenderer = ({ onPhillboardDiscovered }) => {
  const { sessionManager, anchors, getNearbyPhillboards } = useNianticAR();
  const [visiblePhillboards, setVisiblePhillboards] = useState([]);

  // Fetch phillboards when the component mounts
  useEffect(() => {
    fetchNearbyPhillboards();
    
    // Poll for new phillboards every 30 seconds
    const interval = setInterval(fetchNearbyPhillboards, 30000);
    
    return () => clearInterval(interval);
  }, [sessionManager]);

  // Fetch nearby phillboards
  const fetchNearbyPhillboards = async () => {
    if (!sessionManager) return;
    
    try {
      const phillboards = await getNearbyPhillboards(100);
      setVisiblePhillboards(phillboards);
      
      // Notify parent component about discovered phillboards
      if (onPhillboardDiscovered && phillboards.length > 0) {
        onPhillboardDiscovered(phillboards);
      }
    } catch (error) {
      console.error('Error fetching nearby phillboards:', error);
    }
  };

  // Render a philippboard based on its template
  const renderPhillboard = (phillboard) => {
    const template = phillboard.template || 'classic';
    const templateConfig = PHILLBOARD_TEMPLATES[template] || PHILLBOARD_TEMPLATES.classic;
    
    return (
      <View style={[styles.phillboardContainer, templateConfig.containerStyle]}>
        <Text style={[styles.phillboardTitle, templateConfig.titleStyle]}>
          {phillboard.title}
        </Text>
        <Text style={[styles.phillboardMessage, templateConfig.textStyle]}>
          {phillboard.message}
        </Text>
        <View style={styles.phillboardFooter}>
          <Text style={styles.phillboardLikes}>♥ {phillboard.likes}</Text>
        </View>
      </View>
    );
  };

  return (
    <ARView style={styles.arView}>
      {visiblePhillboards.map((phillboard) => (
        <ARAnchorTrackingComponent
          key={phillboard.id}
          anchor={phillboard.id}
          onAnchorUpdated={(updatedAnchor) => {
            // Update the anchor when it changes
            console.log('Anchor updated:', updatedAnchor);
          }}
        >
          {renderPhillboard(phillboard)}
        </ARAnchorTrackingComponent>
      ))}
    </ARView>
  );
};

const styles = StyleSheet.create({
  arView: {
    flex: 1,
  },
  phillboardContainer: {
    width: 300,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  phillboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phillboardMessage: {
    fontSize: 16,
    marginBottom: 15,
  },
  phillboardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  phillboardLikes: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Classic template styles
  classicContainer: {
    backgroundColor: '#FF5E3A',
    borderWidth: 2,
    borderColor: 'white',
  },
  classicTitle: {
    color: 'white',
  },
  classicText: {
    color: 'white',
  },
  // Neon template styles
  neonContainer: {
    backgroundColor: '#4A90E2',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  neonTitle: {
    color: '#FFFFFF',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  neonText: {
    color: '#FFFFFF',
  },
  // Retro template styles
  retroContainer: {
    backgroundColor: '#8B5CF6',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  retroTitle: {
    color: '#FFD700',
    fontFamily: 'monospace',
  },
  retroText: {
    color: 'white',
    fontFamily: 'monospace',
  },
});

export default ARPhillboardRenderer; 