import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface PhilledBillboardProps {
  content: string;
  owner: string;
  price: number;
  createdAt: Date;
  overwriteCount: number;
  isRecent?: boolean;
  isPopular?: boolean;
}

const PhilledBillboard: React.FC<PhilledBillboardProps> = ({
  content,
  owner,
  price,
  createdAt,
  overwriteCount,
  isRecent = false,
  isPopular = false,
}) => {
  // Animation values
  const glowIntensity = useSharedValue(0);
  const scaleValue = useSharedValue(1);
  const borderGlowValue = useSharedValue(0);
  
  // Set up animations
  useEffect(() => {
    // For recent boards, animate a pulsing glow
    if (isRecent) {
      glowIntensity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.2, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      
      scaleValue.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
    
    // For popular boards, animate a permanent glow with color shifts
    if (isPopular) {
      borderGlowValue.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      
      glowIntensity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.4, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    }
  }, [isRecent, isPopular, glowIntensity, scaleValue, borderGlowValue]);
  
  // Calculate the age of the phillboard in hours
  const getHoursAgo = () => {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });
  
  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowIntensity.value,
      shadowOpacity: 0.5 + glowIntensity.value * 0.5,
    };
  });
  
  const borderGlowStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        borderGlowValue.value,
        [0, 0.5, 1],
        ['#FF5E3A', '#FFD700', '#FF5E3A']
      ),
    };
  });
  
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Glow effect for popular boards */}
      {isPopular && (
        <Animated.View style={[styles.popularGlowContainer, glowStyle]}>
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.7)', 'rgba(255, 94, 58, 0.7)']}
            style={styles.popularGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
      )}
      
      {/* Glow effect for recent boards */}
      {isRecent && (
        <Animated.View style={[styles.recentGlowContainer, glowStyle]}>
          <LinearGradient
            colors={['rgba(0, 122, 255, 0.7)', 'rgba(76, 217, 100, 0.7)']}
            style={styles.recentGlow}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
      )}
      
      {/* Main billboard content */}
      <Animated.View 
        style={[
          styles.billboardContainer,
          isPopular && styles.popularBorder,
          isPopular && borderGlowStyle
        ]}
      >
        {/* Billboard header */}
        <View style={styles.header}>
          <Text style={styles.priceTag}>${price.toFixed(2)}</Text>
          {overwriteCount > 0 && (
            <View style={styles.overwriteBadge}>
              <Text style={styles.overwriteText}>{overwriteCount}x</Text>
            </View>
          )}
        </View>
        
        {/* Billboard content */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
        
        {/* Billboard footer */}
        <View style={styles.footer}>
          <Text style={styles.ownerText}>@{owner}</Text>
          <Text style={styles.timeText}>{getHoursAgo()}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 180,
    margin: 10,
  },
  popularGlowContainer: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  popularGlow: {
    flex: 1,
    borderRadius: 20,
  },
  recentGlowContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  recentGlow: {
    flex: 1,
    borderRadius: 15,
  },
  billboardContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  popularBorder: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceTag: {
    backgroundColor: '#FF5E3A',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  overwriteBadge: {
    backgroundColor: '#5856D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overwriteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ownerText: {
    color: '#777',
    fontSize: 12,
  },
  timeText: {
    color: '#999',
    fontSize: 10,
  },
});

export default PhilledBillboard; 