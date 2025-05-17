import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  View,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Button Component
 * 
 * A customizable button component with different variants.
 * 
 * @param {string} variant - primary, secondary, outline, danger, success
 * @param {string} size - small, medium, large
 * @param {function} onPress - Function to call when button is pressed
 * @param {boolean} disabled - Whether the button is disabled
 * @param {boolean} loading - Whether to show loading indicator
 * @param {string} icon - Material icon name to show before text
 * @param {object} style - Additional style for the button
 * @param {object} textStyle - Additional style for the button text
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onPress, 
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props 
}) => {
  // Define variant styles
  const variantStyles = {
    primary: {
      backgroundColor: '#FF5E3A',
      textColor: '#FFFFFF',
      borderColor: '#FF5E3A',
    },
    secondary: {
      backgroundColor: '#4A90E2',
      textColor: '#FFFFFF',
      borderColor: '#4A90E2',
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: '#FF5E3A',
      borderColor: '#FF5E3A',
    },
    danger: {
      backgroundColor: '#FF4D4F',
      textColor: '#FFFFFF',
      borderColor: '#FF4D4F',
    },
    success: {
      backgroundColor: '#52C41A',
      textColor: '#FFFFFF',
      borderColor: '#52C41A',
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: '#333333',
      borderColor: 'transparent',
    }
  };

  // Define size styles
  const sizeStyles = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
      iconSize: 14,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
      iconSize: 16,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      iconSize: 20,
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primary;
  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: selectedVariant.backgroundColor,
          borderColor: selectedVariant.borderColor,
          paddingVertical: selectedSize.paddingVertical,
          paddingHorizontal: selectedSize.paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
        },
        // Add boxShadow for web platform
        Platform.OS === 'web' && styles.buttonShadowWeb,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={selectedVariant.textColor} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && (
            <MaterialIcons 
              name={icon} 
              size={selectedSize.iconSize} 
              color={selectedVariant.textColor} 
              style={styles.icon} 
            />
          )}
          <Text 
            style={[
              styles.text, 
              { 
                color: selectedVariant.textColor,
                fontSize: selectedSize.fontSize,
              },
              textStyle
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS !== 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    } : {}),
  },
  buttonShadowWeb: {
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    marginRight: 6,
  },
});

export default Button; 