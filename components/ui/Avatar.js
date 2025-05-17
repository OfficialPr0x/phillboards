import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

/**
 * Avatar Component
 * 
 * A customizable avatar component with different variants.
 * 
 * @param {string} source - Image source for the avatar
 * @param {string} name - Name to display as initials if no image is provided
 * @param {string} size - xs, sm, md, lg, xl
 * @param {string} shape - circle, rounded, square
 * @param {string} status - online, offline, away, busy
 * @param {object} style - Additional style for the avatar
 * @param {object} imageStyle - Additional style for the avatar image
 */
const Avatar = ({
  source,
  name,
  size = 'md',
  shape = 'circle',
  status,
  style,
  imageStyle,
}) => {
  // Define size styles
  const sizeStyles = {
    xs: {
      width: 24,
      height: 24,
      fontSize: 10,
      statusSize: 6,
    },
    sm: {
      width: 32,
      height: 32,
      fontSize: 12,
      statusSize: 8,
    },
    md: {
      width: 40,
      height: 40,
      fontSize: 16,
      statusSize: 10,
    },
    lg: {
      width: 56,
      height: 56,
      fontSize: 20,
      statusSize: 12,
    },
    xl: {
      width: 72,
      height: 72,
      fontSize: 24,
      statusSize: 14,
    },
  };

  // Define shape styles
  const shapeStyles = {
    circle: {
      borderRadius: 100,
    },
    rounded: {
      borderRadius: 8,
    },
    square: {
      borderRadius: 0,
    },
  };

  // Define status styles
  const statusStyles = {
    online: {
      backgroundColor: '#52C41A',
    },
    offline: {
      backgroundColor: '#8C8C8C',
    },
    away: {
      backgroundColor: '#FAAD14',
    },
    busy: {
      backgroundColor: '#FF4D4F',
    },
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;
  const selectedShape = shapeStyles[shape] || shapeStyles.circle;
  const selectedStatus = status ? statusStyles[status] : null;

  // Generate initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Determine background color based on name (consistent for same name)
  const getBackgroundColor = () => {
    if (!name) return '#8C8C8C';
    
    const colors = [
      '#FF5E3A', // Primary app color
      '#4A90E2',
      '#8B5CF6',
      '#38B2AC',
      '#F59E0B',
      '#EC4899',
      '#10B981',
      '#6366F1',
    ];
    
    // Simple hash function to get consistent color for same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: selectedSize.width,
            height: selectedSize.height,
            backgroundColor: !source ? getBackgroundColor() : undefined,
          },
          selectedShape,
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={[
              styles.image,
              selectedShape,
              imageStyle,
            ]}
          />
        ) : (
          <Text
            style={[
              styles.initials,
              {
                fontSize: selectedSize.fontSize,
              },
            ]}
          >
            {getInitials()}
          </Text>
        )}
      </View>
      
      {status && (
        <View
          style={[
            styles.statusIndicator,
            selectedStatus,
            {
              width: selectedSize.statusSize,
              height: selectedSize.statusSize,
              borderWidth: selectedSize.statusSize / 4,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 100,
    borderColor: '#FFFFFF',
  },
});

export default Avatar; 