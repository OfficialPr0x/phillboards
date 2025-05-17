import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  withRepeat,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface OwnThisSpotCTAProps {
  visible: boolean;
  price: number;
  location?: string;
  onPress: () => void;
  isPulsing?: boolean;
  isHighPriority?: boolean;
  style?: any;
}

const OwnThisSpotCTA: React.FC<OwnThisSpotCTAProps> = ({
  visible,
  price,
  location,
  onPress,
  isPulsing = true,
  isHighPriority = false,
  style,
}) => {
  // Animation values
  const translateY = useSharedValue(100);
  const scale = useSharedValue(1);
  const mainOpacity = useSharedValue(0);
  const pulseOpacity = useSharedValue(0);
  
  // Show/hide animation based on visible prop
  useEffect(() => {
    if (visible) {
      mainOpacity.value = withTiming(1, { duration: 400 });
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.back()),
      });
      
      // Start pulsing animation if enabled
      if (isPulsing) {
        scale.value = withDelay(
          1000,
          withRepeat(
            withSequence(
              withTiming(1.05, { duration: 800, easing: Easing.inOut(Easing.ease) }),
              withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
          )
        );
        
        pulseOpacity.value = withDelay(
          1000,
          withRepeat(
            withSequence(
              withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
              withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
            ),
            -1,
            true
          )
        );
      }
    } else {
      translateY.value = withTiming(100, { duration: 300 });
      mainOpacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(1);
      pulseOpacity.value = withTiming(0);
    }
  }, [visible, translateY, scale, mainOpacity, pulseOpacity, isPulsing]);
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: mainOpacity.value,
    };
  });
  
  const pulseStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseOpacity.value,
    };
  });
  
  if (!visible && mainOpacity.value === 0) {
    return null;
  }
  
  return (
    <Animated.View style={[styles.container, containerStyle, style]}>
      {/* Pulsing background effect */}
      <Animated.View style={[styles.pulseBackground, pulseStyle]} />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={onPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={isHighPriority ? ['#FF416C', '#FF4B2B'] : ['#FF9500', '#FF5E3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name="add-location" size={24} color="#FFF" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Own This Spot</Text>
            {location && (
              <Text style={styles.locationText}>
                {location.length > 20 ? `${location.substring(0, 20)}...` : location}
              </Text>
            )}
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${price.toFixed(2)}</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: width - 32,
    maxWidth: 500,
    borderRadius: 16,
    overflow: 'visible',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pulseBackground: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 94, 58, 0.3)',
    zIndex: -1,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default OwnThisSpotCTA; 