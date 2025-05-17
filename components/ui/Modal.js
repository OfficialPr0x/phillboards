import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal as RNModal, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

/**
 * Modal Component
 * 
 * A customizable modal component with different variants.
 * 
 * @param {boolean} visible - Whether the modal is visible
 * @param {function} onClose - Function to call when modal is closed
 * @param {string} title - Modal title
 * @param {string} variant - default, bottom, center, fullscreen
 * @param {boolean} closeOnBackdropPress - Whether to close the modal when backdrop is pressed
 * @param {boolean} showCloseButton - Whether to show the close button
 * @param {node} footer - Component to render at the bottom of the modal
 * @param {object} style - Additional style for the modal
 * @param {object} contentStyle - Additional style for the modal content
 * @param {object} backdropStyle - Additional style for the backdrop
 */
const Modal = ({
  children,
  visible = false,
  onClose,
  title,
  variant = 'default',
  closeOnBackdropPress = true,
  showCloseButton = true,
  footer,
  style,
  contentStyle,
  backdropStyle,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(variant === 'bottom' ? height : 0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  // Define variant styles
  const variantStyles = {
    default: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {
        width: width * 0.85,
        maxHeight: height * 0.7,
        borderRadius: 12,
      },
      animation: () => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: visible ? 1 : 0.9,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      },
      animationStyle: {
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      },
    },
    bottom: {
      container: {
        justifyContent: 'flex-end',
      },
      content: {
        width: width,
        maxHeight: height * 0.8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      animation: () => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: visible ? 0 : height,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      },
      animationStyle: {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      },
    },
    fullscreen: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {
        width: width,
        height: height,
        borderRadius: 0,
      },
      animation: () => {
        Animated.timing(fadeAnim, {
          toValue: visible ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
      animationStyle: {
        opacity: fadeAnim,
      },
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  // Handle animations
  useEffect(() => {
    selectedVariant.animation();
  }, [visible]);

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress && onClose) {
      onClose();
    }
  };

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View 
            style={[
              styles.backdrop, 
              { opacity: fadeAnim },
              backdropStyle
            ]} 
          />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          style={[
            styles.modalContainer,
            selectedVariant.container,
            selectedVariant.animationStyle,
          ]}
        >
          <View 
            style={[
              styles.content,
              selectedVariant.content,
              Platform.OS === 'web' && styles.contentShadowWeb,
              style,
            ]}
          >
            {(title || showCloseButton) && (
              <View style={styles.header}>
                {title && <Text style={styles.title}>{title}</Text>}
                {showCloseButton && (
                  <TouchableOpacity 
                    onPress={onClose}
                    style={styles.closeButton}
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <MaterialIcons name="close" size={24} color="#666666" />
                  </TouchableOpacity>
                )}
              </View>
            )}
            
            <View style={[styles.body, contentStyle]}>
              {children}
            </View>
            
            {footer && (
              <View style={styles.footer}>
                {footer}
              </View>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    ...(Platform.OS !== 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    } : {}),
  },
  contentShadowWeb: {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
  },
});

export default Modal; 