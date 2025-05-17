import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface VariantStyle {
  backgroundColor: string;
  borderColor: string;
  shadowOpacity: number;
}

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  onPress?: () => void;
  title?: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  showDivider?: boolean;
}

/**
 * Card Component
 * 
 * A customizable card component with different variants.
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  style,
  onPress,
  title,
  subtitle,
  headerRight,
  footer,
  showDivider = false,
  ...props 
}) => {
  // Define variant styles
  const variantStyles: Record<CardVariant, VariantStyle> = {
    default: {
      backgroundColor: '#FFFFFF',
      borderColor: '#EEEEEE',
      shadowOpacity: 0.1,
    },
    elevated: {
      backgroundColor: '#FFFFFF',
      borderColor: 'transparent',
      shadowOpacity: 0.2,
    },
    outlined: {
      backgroundColor: '#FFFFFF',
      borderColor: '#DDDDDD',
      shadowOpacity: 0,
    },
    flat: {
      backgroundColor: '#F5F5F5',
      borderColor: 'transparent',
      shadowOpacity: 0,
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;
  
  const CardContainer = onPress ? TouchableOpacity : View;
  
  const hasHeader = title || subtitle || headerRight;
  
  return (
    <CardContainer
      style={[
        styles.card,
        {
          backgroundColor: selectedVariant.backgroundColor,
          borderColor: selectedVariant.borderColor,
          shadowOpacity: selectedVariant.shadowOpacity,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      {...props}
    >
      {hasHeader && (
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          {headerRight && (
            <View style={styles.headerRight}>
              {headerRight}
            </View>
          )}
        </View>
      )}
      
      {hasHeader && showDivider && <View style={styles.divider} />}
      
      <View style={styles.content}>
        {children}
      </View>
      
      {footer && (
        <>
          {showDivider && <View style={styles.divider} />}
          <View style={styles.footer}>
            {footer}
          </View>
        </>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  headerRight: {
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
});

export default Card; 