import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Card Component
 * 
 * A customizable card component with different variants.
 * 
 * @param {string} variant - default, elevated, outlined
 * @param {object} style - Additional style for the card
 * @param {boolean} onPress - Makes the card touchable and calls this function on press
 * @param {string} title - Card title
 * @param {string} subtitle - Card subtitle
 * @param {node} headerRight - Component to render on the right side of the header
 * @param {node} footer - Component to render at the bottom of the card
 * @param {boolean} showDivider - Whether to show a divider between header and content
 */
const Card = ({ 
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
  const variantStyles = {
    default: {
      backgroundColor: '#FFFFFF',
      borderColor: '#EEEEEE',
      shadowOpacity: 0.1,
      boxShadowIntensity: 'light'
    },
    elevated: {
      backgroundColor: '#FFFFFF',
      borderColor: 'transparent',
      shadowOpacity: 0.2,
      boxShadowIntensity: 'medium'
    },
    outlined: {
      backgroundColor: '#FFFFFF',
      borderColor: '#DDDDDD',
      shadowOpacity: 0,
      boxShadowIntensity: 'none'
    },
    flat: {
      backgroundColor: '#F5F5F5',
      borderColor: 'transparent',
      shadowOpacity: 0,
      boxShadowIntensity: 'none'
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;
  
  const CardContainer = onPress ? TouchableOpacity : View;
  
  const hasHeader = title || subtitle || headerRight;

  // Get shadow styles based on platform and variant
  const getShadowStyle = () => {
    if (Platform.OS === 'web') {
      switch (selectedVariant.boxShadowIntensity) {
        case 'medium':
          return styles.cardShadowMediumWeb;
        case 'light':
          return styles.cardShadowLightWeb;
        default:
          return {};
      }
    } else {
      return {
        shadowOpacity: selectedVariant.shadowOpacity,
      };
    }
  };
  
  return (
    <CardContainer
      style={[
        styles.card,
        {
          backgroundColor: selectedVariant.backgroundColor,
          borderColor: selectedVariant.borderColor,
        },
        Platform.OS !== 'web' ? { shadowOpacity: selectedVariant.shadowOpacity } : {},
        Platform.OS === 'web' && getShadowStyle(),
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
    marginVertical: 8,
    ...(Platform.OS !== 'web' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 4,
    } : {}),
  },
  cardShadowLightWeb: {
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  },
  cardShadowMediumWeb: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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