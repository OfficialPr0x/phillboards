import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Input Component
 * 
 * A customizable input component with different variants.
 * 
 * @param {string} variant - default, outlined, underlined
 * @param {string} label - Input label
 * @param {string} placeholder - Input placeholder
 * @param {string} value - Input value
 * @param {function} onChangeText - Function to call when text changes
 * @param {string} error - Error message to display
 * @param {string} helper - Helper text to display
 * @param {string} leftIcon - Material icon name to show on the left
 * @param {string} rightIcon - Material icon name to show on the right
 * @param {function} onRightIconPress - Function to call when right icon is pressed
 * @param {boolean} secureTextEntry - Whether to hide the input text
 * @param {object} style - Additional style for the input container
 * @param {object} inputStyle - Additional style for the text input
 */
const Input = ({
  variant = 'default',
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helper,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  // Define variant styles
  const variantStyles = {
    default: {
      backgroundColor: '#F5F5F5',
      borderColor: '#EEEEEE',
      borderWidth: 1,
      borderRadius: 8,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 8,
    },
    underlined: {
      backgroundColor: 'transparent',
      borderColor: '#CCCCCC',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderRadius: 0,
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;
  
  // Handle focus state
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Determine border color based on state
  const getBorderColor = () => {
    if (error) return '#FF4D4F';
    if (isFocused) return '#FF5E3A';
    return selectedVariant.borderColor;
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[
          styles.label,
          error && styles.errorLabel
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        selectedVariant,
        { borderColor: getBorderColor() },
        isFocused && styles.focused,
      ]}>
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={20}
            color="#666666"
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor="#999999"
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.rightIconContainer}
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity 
            onPress={onRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress}
          >
            <MaterialIcons
              name={rightIcon}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helper) && (
        <Text style={[
          styles.helperText,
          error && styles.errorText
        ]}>
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 6,
  },
  errorLabel: {
    color: '#FF4D4F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  focused: {
    borderColor: '#FF5E3A',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333333',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIconContainer: {
    padding: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    marginLeft: 4,
  },
  errorText: {
    color: '#FF4D4F',
  },
});

export default Input; 