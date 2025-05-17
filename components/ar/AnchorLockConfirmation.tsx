import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  Easing,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

interface AnchorLockConfirmationProps {
  visible: boolean;
  onAnimationComplete?: () => void;
}

const AnchorLockConfirmation: React.FC<AnchorLockConfirmationProps> = ({
  visible,
  onAnimationComplete,
}) => {
  // Animation values
  const scaleValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);
  const colorValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);

  const handleAnimationComplete = () => {
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  useEffect(() => {
    if (visible) {
      // Appear animation
      scaleValue.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1.2, { duration: 400, easing: Easing.out(Easing.back()) }),
        withTiming(1, { duration: 200 })
      );
      
      // Opacity animation
      opacityValue.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 300 })
      );
      
      // Color transition
      colorValue.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: 500 })
      );
      
      // Pulse animation
      pulseValue.value = withSequence(
        withTiming(1, { duration: 0 }),
        withTiming(1.4, { duration: 600 }),
        withTiming(1, { duration: 600 }),
        withRepeat(
          withSequence(
            withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
          ),
          3,
          false
        ),
        withDelay(
          300,
          withTiming(0, { duration: 500 }, () => {
            runOnJS(handleAnimationComplete)();
          })
        )
      );
    } else {
      // Reset animations
      scaleValue.value = withTiming(0);
      opacityValue.value = withTiming(0);
      pulseValue.value = withTiming(0);
    }
  }, [visible, scaleValue, opacityValue, colorValue, pulseValue, onAnimationComplete]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseValue.value }],
      opacity: 1 - (pulseValue.value - 1) * 2, // Fade out as it expands
      borderColor: interpolateColor(
        colorValue.value,
        [0, 0.5, 1],
        ['#FFFFFF', '#90CAF9', '#4CAF50']
      ),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      transform: [{ scale: scaleValue.value }],
    };
  });

  if (!visible && opacityValue.value === 0) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.pulseCircle, pulseStyle]} />
      <Animated.View style={[styles.confirmationContainer, containerStyle]}>
        <Animated.View style={iconStyle}>
          <MaterialIcons name="check-circle" size={60} color="#4CAF50" />
        </Animated.View>
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
    zIndex: 100,
  },
  pulseCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4CAF50',
    position: 'absolute',
  },
  confirmationContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default AnchorLockConfirmation; 