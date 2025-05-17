import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'large' | 'small';
type AvatarShape = 'circle' | 'rounded' | 'square';
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

interface SizeStyle {
  width: number;
  height: number;
  fontSize: number;
  statusSize: number;
}

interface ShapeStyle {
  borderRadius: number;
}

interface StatusStyle {
  backgroundColor: string;
}

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}

/**
 * Avatar Component
 * 
 * A customizable avatar component with different variants.
 */
const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  initials,
  size = 'md',
  shape = 'circle',
  status,
  style,
  imageStyle,
}) => {
  // Define size styles
  const sizeStyles: Record<AvatarSize, SizeStyle> = {
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
    large: {
      width: 56,
      height: 56,
      fontSize: 20,
      statusSize: 12,
    },
    small: {
      width: 32,
      height: 32,
      fontSize: 12,
      statusSize: 8,
    },
  };

  // Define shape styles
  const shapeStyles: Record<AvatarShape, ShapeStyle> = {
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
  const statusStyles: Record<AvatarStatus, StatusStyle> = {
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
  const getInitials = (): string => {
    if (initials) return initials;
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
  const getBackgroundColor = (): string => {
    if (!name && !initials) return '#8C8C8C';
    
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
    const hashString = name || initials || '';
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
      hash = hashString.charCodeAt(i) + ((hash << 5) - hash);
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
      
      {status && selectedStatus && (
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