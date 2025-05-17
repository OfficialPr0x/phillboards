import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface ARMinimapProps {
  visible: boolean;
  phillboards: {
    id: string;
    distance: number;
    angle: number;
    content: string;
  }[];
  onMinimapPress?: () => void;
  onPhillboardPress?: (id: string) => void;
  userHeading: number;
}

const ARMinimap: React.FC<ARMinimapProps> = ({
  visible,
  phillboards = [],
  onMinimapPress,
  onPhillboardPress,
  userHeading = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedPhillboardId, setSelectedPhillboardId] = useState<string | null>(null);
  
  // Animation values
  const opacityValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const scanRotation = useSharedValue(0);
  const pulseValue = useSharedValue(1);
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Handle phillboard selection
  const handlePhillboardPress = (id: string) => {
    setSelectedPhillboardId(id);
    if (onPhillboardPress) {
      onPhillboardPress(id);
    }
  };
  
  // Set up animations
  useEffect(() => {
    if (visible) {
      opacityValue.value = withTiming(1, { duration: 300 });
      scaleValue.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.back()) });
      
      // Rotating radar scan animation
      scanRotation.value = withRepeat(
        withTiming(360, { duration: 4000, easing: Easing.linear }),
        -1,
        false
      );
      
      // Pulse animation
      pulseValue.value = withRepeat(
        withTiming(1.2, { 
          duration: 2000, 
          easing: Easing.inOut(Easing.quad)
        }),
        -1,
        true
      );
    } else {
      opacityValue.value = withTiming(0, { duration: 200 });
      scaleValue.value = withTiming(0.8, { duration: 200 });
    }
  }, [visible, opacityValue, scaleValue, scanRotation, pulseValue]);
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      transform: [
        { scale: scaleValue.value },
      ],
    };
  });
  
  const scanStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${scanRotation.value}deg` },
      ],
    };
  });

  const radarRingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
      opacity: interpolate(
        pulseValue.value,
        [1, 1.2],
        [0.7, 0]
      ),
    };
  });
  
  // If not visible and fully transparent, don't render
  if (!visible && opacityValue.value === 0) {
    return null;
  }
  
  // Convert angle and distance to x,y coordinates within the minimap
  const calculatePosition = (distance: number, angle: number) => {
    // Adjust angle based on user heading
    const adjustedAngle = angle - userHeading;
    
    // Normalize distance to a value between 0 and 1 (where 1 is the edge of the radar)
    const normalizedDistance = Math.min(distance / 100, 1);
    
    // Convert polar to cartesian coordinates
    const x = Math.sin(adjustedAngle * (Math.PI / 180)) * normalizedDistance;
    const y = -Math.cos(adjustedAngle * (Math.PI / 180)) * normalizedDistance;
    
    // Map to container dimensions
    const radius = expanded ? 120 : 60;
    return {
      left: radius + x * radius,
      top: radius + y * radius,
    };
  };
  
  return (
    <TouchableOpacity 
      style={styles.touchContainer}
      onPress={onMinimapPress || toggleExpanded}
      activeOpacity={0.9}
    >
      <Animated.View style={[
        styles.container, 
        expanded ? styles.expanded : styles.collapsed,
        containerStyle
      ]}>
        {/* Background rings */}
        <View style={styles.radarBackground}>
          <View style={styles.radarRing1} />
          <View style={styles.radarRing2} />
          <View style={styles.radarRing3} />
          
          {/* Pulsing ring */}
          <Animated.View style={[styles.pulsingRing, radarRingStyle]} />
          
          {/* Radar scan line */}
          <Animated.View style={[styles.scanLine, scanStyle]} />
          
          {/* Radar center dot */}
          <View style={styles.centerDot} />
          
          {/* Phillboard markers */}
          {phillboards.map((phillboard) => {
            const position = calculatePosition(phillboard.distance, phillboard.angle);
            const isSelected = selectedPhillboardId === phillboard.id;
            
            return (
              <TouchableOpacity
                key={phillboard.id}
                style={[
                  styles.phillboardMarker,
                  isSelected && styles.selectedMarker,
                  { left: position.left, top: position.top }
                ]}
                onPress={() => handlePhillboardPress(phillboard.id)}
              />
            );
          })}
          
          {/* North indicator */}
          <View style={[
            styles.northIndicator, 
            { transform: [{ rotate: `${-userHeading}deg` }] }
          ]}>
            <Text style={styles.northText}>N</Text>
          </View>
        </View>
        
        {/* Legend when expanded */}
        {expanded && (
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Nearby Phillboards</Text>
            {phillboards.length > 0 ? (
              phillboards.slice(0, 3).map((phillboard) => (
                <TouchableOpacity
                  key={phillboard.id}
                  style={styles.legendItem}
                  onPress={() => handlePhillboardPress(phillboard.id)}
                >
                  <View 
                    style={[
                      styles.legendDot,
                      selectedPhillboardId === phillboard.id && styles.selectedLegendDot
                    ]} 
                  />
                  <Text 
                    style={styles.legendText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {phillboard.content}
                  </Text>
                  <Text style={styles.legendDistance}>{phillboard.distance}m</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No phillboards nearby</Text>
            )}
          </View>
        )}
        
        {/* Toggle button */}
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={toggleExpanded}
        >
          <MaterialIcons 
            name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"} 
            size={24} 
            color="#FFF" 
          />
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
  container: {
    backgroundColor: 'rgba(32, 32, 32, 0.8)',
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  collapsed: {
    width: 120,
    height: 120,
  },
  expanded: {
    width: 240,
    height: 320,
    borderRadius: 20,
  },
  radarBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 16, 16, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...(Platform.OS === 'android' ? { elevation: 4 } : {}),
  },
  radarRing1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 100, 0.2)',
  },
  radarRing2: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 100, 0.3)',
  },
  radarRing3: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 217, 100, 0.4)',
  },
  pulsingRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(76, 217, 100, 0.7)',
  },
  scanLine: {
    position: 'absolute',
    width: 60,
    height: 2,
    backgroundColor: 'rgba(76, 217, 100, 0.7)',
    left: 60,
    transformOrigin: 'left center',
  },
  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
  },
  phillboardMarker: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5E3A',
    marginLeft: -4,
    marginTop: -4,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  selectedMarker: {
    backgroundColor: '#007AFF',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: -6,
    marginTop: -6,
    borderWidth: 2,
  },
  northIndicator: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
  },
  northText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  legend: {
    padding: 12,
    marginTop: 120,
  },
  legendTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5E3A',
    marginRight: 8,
  },
  selectedLegendDot: {
    backgroundColor: '#007AFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#FFF',
    fontSize: 12,
    flex: 1,
    marginRight: 4,
  },
  legendDistance: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default ARMinimap; 