import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface RevenueSplitAnimationProps {
  visible: boolean;
  previousOwner: {
    id: string;
    username: string;
    avatar?: string;
  };
  currentOwner: {
    id: string;
    username: string;
    avatar?: string;
  };
  amount: number;
  isFirstEarning?: boolean;
  onAnimationComplete?: () => void;
}

const RevenueSplitAnimation: React.FC<RevenueSplitAnimationProps> = ({
  visible,
  previousOwner,
  currentOwner,
  amount,
  isFirstEarning = false,
  onAnimationComplete,
}) => {
  // Animation refs
  const coinAnimationRef = useRef<LottieView>(null);
  const confettiAnimationRef = useRef<LottieView>(null);
  
  // Animation values
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const splitBarAnim = useRef(new Animated.Value(0)).current;
  const previousOwnerAnim = useRef(new Animated.Value(0)).current;
  const currentOwnerAnim = useRef(new Animated.Value(0)).current;
  const previousAmountAnim = useRef(new Animated.Value(0)).current;
  const currentAmountAnim = useRef(new Animated.Value(0)).current;
  
  // Calculate split amounts
  const previousOwnerAmount = amount * 0.5; // 50% to previous owner
  const currentOwnerAmount = amount * 0.5; // 50% to current owner
  
  // Track animation progress
  const [coinAnimationPlayed, setCoinAnimationPlayed] = useState(false);
  const [confettiAnimationPlayed, setConfettiAnimationPlayed] = useState(false);
  
  // Play animations when component becomes visible
  useEffect(() => {
    if (visible) {
      // Reset animation states
      setCoinAnimationPlayed(false);
      setConfettiAnimationPlayed(false);
      
      // Fade in and scale animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back()),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Play coin animation
        if (coinAnimationRef.current) {
          coinAnimationRef.current.play();
        }
        
        // Play confetti animation if it's first earning
        if (isFirstEarning && confettiAnimationRef.current) {
          confettiAnimationRef.current.play();
        }
        
        // Start split bar animation
        Animated.timing(splitBarAnim, {
          toValue: 1,
          duration: 1500,
          delay: 1000,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }).start();
        
        // Animate previous owner values
        Animated.sequence([
          Animated.delay(1200),
          Animated.parallel([
            Animated.timing(previousOwnerAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(previousAmountAnim, {
              toValue: previousOwnerAmount,
              duration: 1000,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            }),
          ]),
        ]).start();
        
        // Animate current owner values
        Animated.sequence([
          Animated.delay(1700),
          Animated.parallel([
            Animated.timing(currentOwnerAnim, {
              toValue: 1,
              duration: 800,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(currentAmountAnim, {
              toValue: currentOwnerAmount,
              duration: 1000,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: false,
            }),
          ]),
        ]).start();
      });
    } else {
      // Reset animations when not visible
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.8);
      splitBarAnim.setValue(0);
      previousOwnerAnim.setValue(0);
      currentOwnerAnim.setValue(0);
      previousAmountAnim.setValue(0);
      currentAmountAnim.setValue(0);
    }
  }, [visible, opacityAnim, scaleAnim, splitBarAnim, previousOwnerAnim, currentOwnerAnim, 
      previousAmountAnim, currentAmountAnim, previousOwnerAmount, currentOwnerAmount, isFirstEarning]);
  
  // Handle lottie animation completion
  const handleCoinAnimationFinish = () => {
    setCoinAnimationPlayed(true);
    checkAnimationComplete();
  };
  
  const handleConfettiAnimationFinish = () => {
    setConfettiAnimationPlayed(true);
    checkAnimationComplete();
  };
  
  // Check if all animations completed to trigger onAnimationComplete
  const checkAnimationComplete = () => {
    if (coinAnimationPlayed && (!isFirstEarning || confettiAnimationPlayed)) {
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, 2000);
      }
    }
  };
  
  if (!visible) return null;
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <MaterialIcons name="attach-money" size={30} color="#FFD700" />
          <Text style={styles.headerText}>Revenue Split</Text>
          <MaterialIcons name="attach-money" size={30} color="#FFD700" />
        </View>
        
        <Text style={styles.amountText}>${amount.toFixed(2)}</Text>
        
        {/* Coins animation */}
        <View style={styles.coinAnimationContainer}>
          <LottieView
            ref={coinAnimationRef}
            source={require('../../assets/animations/coin-burst.json')}
            style={styles.coinAnimation}
            loop={false}
            onAnimationFinish={handleCoinAnimationFinish}
            autoPlay={false}
          />
        </View>
        
        {/* Split bar */}
        <View style={styles.splitBarContainer}>
          <View style={styles.splitBarBackground} />
          <Animated.View 
            style={[
              styles.splitBarFill,
              {
                width: splitBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%'],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['#4A00E0', '#8E2DE2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientFill}
            />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.splitBarFill,
              styles.secondFill,
              {
                width: splitBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%'],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['#FF416C', '#FF4B2B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientFill}
            />
          </Animated.View>
        </View>
        
        {/* Previous owner */}
        <View style={styles.ownersContainer}>
          <Animated.View 
            style={[
              styles.ownerContainer,
              {
                opacity: previousOwnerAnim,
                transform: [
                  {
                    translateY: previousOwnerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.avatarContainer}>
              {previousOwner.avatar ? (
                <Image
                  source={{ uri: previousOwner.avatar }}
                  style={styles.avatar}
                  defaultSource={require('../../assets/default-avatar.png')}
                />
              ) : (
                <View style={[styles.avatar, styles.placeholderAvatar]}>
                  <Text style={styles.avatarText}>
                    {previousOwner.username.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={[styles.badgeContainer, styles.previousBadge]}>
                <Text style={styles.badgeText}>50%</Text>
              </View>
            </View>
            <Text style={styles.usernameText}>@{previousOwner.username}</Text>
            <Animated.Text style={styles.amountValueText}>
              ${previousAmountAnim.interpolate({
                inputRange: [0, previousOwnerAmount],
                outputRange: ['0.00', previousOwnerAmount.toFixed(2)],
                extrapolate: 'clamp',
              })}
            </Animated.Text>
          </Animated.View>
          
          {/* Current owner */}
          <Animated.View 
            style={[
              styles.ownerContainer,
              {
                opacity: currentOwnerAnim,
                transform: [
                  {
                    translateY: currentOwnerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.avatarContainer}>
              {currentOwner.avatar ? (
                <Image
                  source={{ uri: currentOwner.avatar }}
                  style={styles.avatar}
                  defaultSource={require('../../assets/default-avatar.png')}
                />
              ) : (
                <View style={[styles.avatar, styles.placeholderAvatar]}>
                  <Text style={styles.avatarText}>
                    {currentOwner.username.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={[styles.badgeContainer, styles.currentBadge]}>
                <Text style={styles.badgeText}>50%</Text>
              </View>
            </View>
            <Text style={styles.usernameText}>@{currentOwner.username}</Text>
            <Animated.Text style={styles.amountValueText}>
              ${currentAmountAnim.interpolate({
                inputRange: [0, currentOwnerAmount],
                outputRange: ['0.00', currentOwnerAmount.toFixed(2)],
                extrapolate: 'clamp',
              })}
            </Animated.Text>
          </Animated.View>
        </View>
        
        <Text style={styles.footerText}>
          {isFirstEarning ? 'Congratulations on your first earnings!' : 'Revenue is split 50/50 between owners'}
        </Text>
      </Animated.View>
      
      {/* Confetti animation for first earning */}
      {isFirstEarning && (
        <View style={styles.confettiContainer}>
          <LottieView
            ref={confettiAnimationRef}
            source={require('../../assets/animations/confetti.json')}
            style={styles.confettiAnimation}
            loop={false}
            onAnimationFinish={handleConfettiAnimationFinish}
            autoPlay={false}
          />
        </View>
      )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  contentContainer: {
    width: width * 0.85,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF5E3A',
    marginBottom: 20,
  },
  coinAnimationContainer: {
    width: 200,
    height: 200,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: -1,
  },
  coinAnimation: {
    width: '100%',
    height: '100%',
  },
  splitBarContainer: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
    flexDirection: 'row',
  },
  splitBarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  splitBarFill: {
    height: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  secondFill: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  gradientFill: {
    width: '100%',
    height: '100%',
  },
  ownersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  ownerContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  avatarContainer: {
    marginBottom: 8,
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderAvatar: {
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  previousBadge: {
    backgroundColor: '#8E2DE2',
  },
  currentBadge: {
    backgroundColor: '#FF416C',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amountValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  confettiContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 1001,
  },
  confettiAnimation: {
    width: '100%',
    height: '100%',
  },
});

export default RevenueSplitAnimation; 