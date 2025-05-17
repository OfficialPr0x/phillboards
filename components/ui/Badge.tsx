import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface VariantStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

interface SizeStyle {
  height: number;
  fontSize: number;
  paddingHorizontal: number;
  dotSize: number;
}

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  outline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Badge Component
 * 
 * A customizable badge component with different variants.
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  dot = false,
  outline = false,
  style,
  textStyle,
}) => {
  // Define variant styles
  const variantStyles: Record<BadgeVariant, VariantStyle> = {
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
    success: {
      backgroundColor: '#52C41A',
      textColor: '#FFFFFF',
      borderColor: '#52C41A',
    },
    warning: {
      backgroundColor: '#FAAD14',
      textColor: '#FFFFFF',
      borderColor: '#FAAD14',
    },
    danger: {
      backgroundColor: '#FF4D4F',
      textColor: '#FFFFFF',
      borderColor: '#FF4D4F',
    },
    info: {
      backgroundColor: '#1890FF',
      textColor: '#FFFFFF',
      borderColor: '#1890FF',
    },
  };

  // Define size styles
  const sizeStyles: Record<BadgeSize, SizeStyle> = {
    small: {
      height: 16,
      fontSize: 10,
      paddingHorizontal: 6,
      dotSize: 8,
    },
    medium: {
      height: 20,
      fontSize: 12,
      paddingHorizontal: 8,
      dotSize: 10,
    },
    large: {
      height: 24,
      fontSize: 14,
      paddingHorizontal: 10,
      dotSize: 12,
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primary;
  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <View
      style={[
        styles.badge,
        {
          height: dot ? selectedSize.dotSize : selectedSize.height,
          width: dot ? selectedSize.dotSize : undefined,
          paddingHorizontal: dot ? 0 : selectedSize.paddingHorizontal,
          backgroundColor: outline ? 'transparent' : selectedVariant.backgroundColor,
          borderColor: selectedVariant.borderColor,
          borderWidth: outline ? 1 : 0,
        },
        style,
      ]}
    >
      {!dot && (
        <Text
          style={[
            styles.text,
            {
              fontSize: selectedSize.fontSize,
              color: outline ? selectedVariant.borderColor : selectedVariant.textColor,
            },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -1, // Visual alignment
  },
});

export default Badge; 