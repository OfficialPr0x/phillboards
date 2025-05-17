import React from 'react';
import { View } from 'react-native';

// A web implementation of LinearGradient
const LinearGradient = ({ colors, start, end, locations, style, children, ...props }) => {
  // Convert the array of colors to a CSS gradient
  const getGradientStyle = () => {
    const gradientColors = colors.map((color, index) => {
      // If locations are provided, use them, otherwise distribute colors evenly
      const location = locations ? locations[index] * 100 : (index / (colors.length - 1)) * 100;
      return `${color} ${location}%`;
    }).join(', ');

    // Default gradient direction is top to bottom (similar to start={x:0, y:0}, end={x:0, y:1})
    let gradientDirection = 'to bottom';
    
    // Determine gradient direction based on start and end
    if (start && end) {
      if (start.x < end.x && start.y === end.y) {
        gradientDirection = 'to right';
      } else if (start.x > end.x && start.y === end.y) {
        gradientDirection = 'to left';
      } else if (start.x === end.x && start.y < end.y) {
        gradientDirection = 'to bottom';
      } else if (start.x === end.x && start.y > end.y) {
        gradientDirection = 'to top';
      } else if (start.x < end.x && start.y < end.y) {
        gradientDirection = 'to bottom right';
      } else if (start.x < end.x && start.y > end.y) {
        gradientDirection = 'to top right';
      } else if (start.x > end.x && start.y < end.y) {
        gradientDirection = 'to bottom left';
      } else if (start.x > end.x && start.y > end.y) {
        gradientDirection = 'to top left';
      }
    }
    
    return {
      backgroundImage: `linear-gradient(${gradientDirection}, ${gradientColors})`,
    };
  };

  return (
    <View 
      style={[getGradientStyle(), style]} 
      {...props}
    >
      {children}
    </View>
  );
};

export { LinearGradient }; 