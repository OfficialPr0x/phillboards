import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ARPlacementReticleProps {
  isPlacing: boolean;
  isValidSurface: boolean;
}

const ARPlacementReticle: React.FC<ARPlacementReticleProps> = ({
  isPlacing,
  isValidSurface,
}) => {
  // Animation values
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(0.8);
  const rotationValue = useSharedValue(0);

  // Set up animations when component mounts or props change
  useEffect(() => {
    if (isPlacing) {
      // Pulsing animation
      scaleValue.value = withRepeat(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      
      // Opacity animation
      opacityValue.value = withRepeat(
        withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      
      // Rotation animation
      rotationValue.value = withRepeat(
        withTiming(360, { duration: 5000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      // Reset animations when not placing
      scaleValue.value = withTiming(1);
      opacityValue.value = withTiming(0.8);
      rotationValue.value = withTiming(0);
    }
  }, [isPlacing, isValidSurface, scaleValue, opacityValue, rotationValue]);

  // Animated styles
  const outerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scaleValue.value },
        { rotateZ: `${rotationValue.value}deg` },
      ],
      opacity: opacityValue.value,
      borderColor: isValidSurface ? '#4CAF50' : '#F44336',
    };
  });

  const innerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value * 0.8 }],
      opacity: opacityValue.value,
      backgroundColor: isValidSurface ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
    };
  });

  const crosshairStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value * 1.2,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.outerCircle, outerCircleStyle]} />
      <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      <Animated.View style={[styles.crosshairContainer, crosshairStyle]}>
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairVertical} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    position: 'absolute',
  },
  crosshairContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairHorizontal: {
    width: 40,
    height: 1,
    backgroundColor: 'white',
  },
  crosshairVertical: {
    width: 1,
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export default ARPlacementReticle; 