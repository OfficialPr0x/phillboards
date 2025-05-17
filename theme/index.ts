// Color palette
export const colors = {
  // Primary colors
  primary: '#FF5E3A',
  primaryDark: '#E53935',
  primaryLight: '#FF8A65',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#4A00E0',
  secondaryLight: '#8E2DE2',
  
  // Accent colors
  accent1: '#4CD964', // Success green
  accent2: '#007AFF', // Info blue
  accent3: '#FF9500', // Warning orange
  accent4: '#FF2D55', // Danger red
  
  // Neutrals
  black: '#000000',
  darkGrey: '#333333',
  grey: '#666666',
  lightGrey: '#999999',
  veryLightGrey: '#F5F5F5',
  white: '#FFFFFF',
  
  // Transparent colors
  transparentDark: 'rgba(0, 0, 0, 0.7)',
  transparentLight: 'rgba(255, 255, 255, 0.7)',
  
  // Gradients
  gradients: {
    primary: ['#FF416C', '#FF4B2B'],
    secondary: ['#4A00E0', '#8E2DE2'],
    success: ['#4CD964', '#5AC8FA'],
    warning: ['#FF9500', '#FF5E3A'],
  }
};

// Typography
export const typography = {
  // Font families
  fontFamily: {
    base: 'System',
    heading: 'System',
    mono: 'Courier',
  },
  
  // Font sizes
  fontSize: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    black: '900',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

// Spacing
export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radiuses
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Z-index values
export const zIndex = {
  base: 0,
  above: 1,
  dropdown: 10,
  navbar: 20,
  drawer: 30,
  modal: 40,
  toast: 50,
};

// Screen breakpoints
export const breakpoints = {
  xs: 0,
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Animation timing
export const animation = {
  durations: {
    fastest: 150,
    fast: 250,
    normal: 350,
    slow: 500,
    slowest: 750,
  },
  easings: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Export all theme variables
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  animation,
}; 