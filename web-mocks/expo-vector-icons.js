// Mock implementation for @expo/vector-icons for web
import React from 'react';
import { Text } from 'react-native';

// Create mock components for each icon family
const createIconSet = (name) => {
  const IconComponent = ({ name, size = 24, color = 'black', style, ...props }) => {
    return (
      <Text
        style={[
          {
            fontFamily: 'monospace',
            fontSize: size,
            color: color,
            width: size,
            height: size,
            textAlign: 'center',
            lineHeight: size,
          },
          style,
        ]}
        {...props}
      >
        ⬤
      </Text>
    );
  };

  IconComponent.displayName = name;
  return IconComponent;
};

// Create mock icon components
export const AntDesign = createIconSet('AntDesign');
export const Entypo = createIconSet('Entypo');
export const EvilIcons = createIconSet('EvilIcons');
export const Feather = createIconSet('Feather');
export const FontAwesome = createIconSet('FontAwesome');
export const FontAwesome5 = createIconSet('FontAwesome5');
export const Fontisto = createIconSet('Fontisto');
export const Foundation = createIconSet('Foundation');
export const Ionicons = createIconSet('Ionicons');
export const MaterialCommunityIcons = createIconSet('MaterialCommunityIcons');
export const MaterialIcons = createIconSet('MaterialIcons');
export const Octicons = createIconSet('Octicons');
export const SimpleLineIcons = createIconSet('SimpleLineIcons');
export const Zocial = createIconSet('Zocial');

// Export a helper function to create button components
export const createIconButtonComponent = (Icon) => {
  return function IconButton({ name, ...props }) {
    return <Icon name={name} {...props} />;
  };
};

export default {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  createIconButtonComponent,
}; 