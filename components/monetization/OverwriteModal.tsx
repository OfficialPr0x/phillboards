import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Avatar, Card } from '../ui';

interface OwnerInfo {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  overwriteCount: number;
}

interface PhillboardInfo {
  id: string;
  content: string;
  currentPrice: number;
  nextPrice: number;
  createdAt: Date;
  location: string;
}

interface OverwriteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  phillboardInfo: PhillboardInfo;
  ownerInfo: OwnerInfo;
  isLoading?: boolean;
}

const OverwriteModal: React.FC<OverwriteModalProps> = ({
  visible,
  onClose,
  onConfirm,
  phillboardInfo,
  ownerInfo,
  isLoading = false,
}) => {
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation values
  const priceScaleValue = useSharedValue(1);
  const arrowOpacityValue = useSharedValue(0);
  
  // Reset state when modal opens or closes
  useEffect(() => {
    if (visible) {
      setConfirmingPayment(false);
      setError(null);
      
      // Start animations
      priceScaleValue.value = withSequence(
        withTiming(1, { duration: 0 }),
        withTiming(1.2, { duration: 600, easing: Easing.out(Easing.back()) }),
        withTiming(1, { duration: 300 })
      );
      
      arrowOpacityValue.value = withTiming(1, { duration: 800 });
    }
  }, [visible, priceScaleValue, arrowOpacityValue]);
  
  // Handle the confirm action
  const handleConfirm = async () => {
    try {
      setConfirmingPayment(true);
      setError(null);
      await onConfirm();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to process payment. Please try again.');
    } finally {
      setConfirmingPayment(false);
    }
  };
  
  // Calculate price difference percentage
  const getPriceIncrease = () => {
    const increase = ((phillboardInfo.nextPrice - phillboardInfo.currentPrice) / phillboardInfo.currentPrice) * 100;
    return `+${increase.toFixed(0)}%`;
  };
  
  // Format the creation date
  const getFormattedDate = () => {
    return phillboardInfo.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Animated styles
  const priceContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: priceScaleValue.value }],
    };
  });
  
  const arrowStyle = useAnimatedStyle(() => {
    return {
      opacity: arrowOpacityValue.value,
      transform: [
        { 
          translateX: interpolate(
            arrowOpacityValue.value,
            [0, 1],
            [-20, 0]
          ) 
        }
      ],
    };
  });
  
  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={!confirmingPayment ? onClose : undefined}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Overwrite Phillboard</Text>
            {!confirmingPayment && (
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          
          <ScrollView style={styles.container}>
            {/* Current phillboard info */}
            <Card style={styles.phillboardCard}>
              <Text style={styles.phillboardContent}>"{phillboardInfo.content}"</Text>
              <View style={styles.phillboardDetails}>
                <Text style={styles.locationText}>
                  <MaterialIcons name="location-on" size={12} color="#666" /> {phillboardInfo.location}
                </Text>
                <Text style={styles.dateText}>
                  {getFormattedDate()}
                </Text>
              </View>
            </Card>
            
            {/* Current owner info */}
            <View style={styles.ownerContainer}>
              <Text style={styles.sectionTitle}>Current Owner</Text>
              <View style={styles.ownerInfo}>
                <Avatar
                  size="lg"
                  source={ownerInfo.avatar ? { uri: ownerInfo.avatar } : undefined}
                  initials={ownerInfo.displayName.substring(0, 2).toUpperCase()}
                />
                <View style={styles.ownerDetails}>
                  <Text style={styles.ownerName}>{ownerInfo.displayName}</Text>
                  <Text style={styles.ownerUsername}>@{ownerInfo.username}</Text>
                  <View style={styles.ownerStats}>
                    <View style={styles.statBadge}>
                      <MaterialIcons name="repeat" size={12} color="#FFF" />
                      <Text style={styles.statText}>{ownerInfo.overwriteCount} overwrites</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Price information */}
            <View style={styles.priceContainer}>
              <Text style={styles.sectionTitle}>Overwrite Price</Text>
              
              <View style={styles.priceComparison}>
                <View style={styles.currentPriceContainer}>
                  <Text style={styles.priceLabel}>Current Price</Text>
                  <Text style={styles.currentPrice}>${phillboardInfo.currentPrice.toFixed(2)}</Text>
                </View>
                
                <Animated.View style={[styles.arrowContainer, arrowStyle]}>
                  <MaterialIcons name="arrow-forward" size={24} color="#666" />
                  <Text style={styles.increaseText}>{getPriceIncrease()}</Text>
                </Animated.View>
                
                <Animated.View style={[styles.nextPriceContainer, priceContainerStyle]}>
                  <Text style={styles.priceLabel}>New Price</Text>
                  <Text style={styles.nextPrice}>${phillboardInfo.nextPrice.toFixed(2)}</Text>
                </Animated.View>
              </View>
              
              <Text style={styles.priceDescription}>
                When you overwrite, the price doubles. If someone overwrites your phillboard, you'll receive 50% of their payment!
              </Text>
            </View>
            
            {/* Payment confirmation */}
            <View style={styles.paymentContainer}>
              <LinearGradient
                colors={['#FF5E3A', '#FF2A68']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.paymentGradient}
              >
                <Text style={styles.paymentTitle}>Payment Summary</Text>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Overwrite Cost</Text>
                  <Text style={styles.paymentValue}>${phillboardInfo.currentPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Fee</Text>
                  <Text style={styles.paymentValue}>$0.00</Text>
                </View>
                <View style={styles.paymentDivider} />
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentTotalLabel}>Total</Text>
                  <Text style={styles.paymentTotalValue}>${phillboardInfo.currentPrice.toFixed(2)}</Text>
                </View>
              </LinearGradient>
            </View>
            
            {/* Error message */}
            {error && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={20} color="#D32F2F" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </ScrollView>
          
          {/* Action buttons */}
          <View style={styles.actionContainer}>
            <Button
              variant="secondary"
              size="large"
              onPress={onClose}
              disabled={confirmingPayment}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="large"
              onPress={handleConfirm}
              disabled={confirmingPayment}
              loading={confirmingPayment}
              style={styles.confirmButton}
            >
              Confirm Overwrite
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  container: {
    maxHeight: 500,
  },
  phillboardCard: {
    marginBottom: 16,
    padding: 16,
  },
  phillboardContent: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  phillboardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  ownerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
  },
  ownerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ownerUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  ownerStats: {
    flexDirection: 'row',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5856D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statText: {
    color: '#FFF',
    fontSize: 10,
    marginLeft: 4,
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPriceContainer: {
    alignItems: 'center',
    flex: 2,
  },
  nextPriceContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 94, 58, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 2,
  },
  arrowContainer: {
    alignItems: 'center',
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  nextPrice: {
    fontSize: 20,
    color: '#FF5E3A',
    fontWeight: '700',
  },
  increaseText: {
    fontSize: 10,
    color: '#FF5E3A',
    fontWeight: '500',
  },
  priceDescription: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  paymentContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  paymentGradient: {
    padding: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  paymentValue: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '500',
  },
  paymentDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  paymentTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  paymentTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 2,
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});

export default OverwriteModal; 