import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type InputVariant = 'default' | 'outlined' | 'underlined';
type IconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface VariantStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  borderBottomWidth?: number;
}

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

/**
 * Input Component
 * 
 * A customizable input component with different variants.
 */
const Input: React.FC<InputProps> = ({
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
  const variantStyles: Record<InputVariant, VariantStyle> = {
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
          error ? styles.errorLabel : undefined
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        selectedVariant,
        { borderColor: getBorderColor() },
        isFocused ? styles.focused : undefined,
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
            leftIcon ? styles.inputWithLeftIcon : undefined,
            (rightIcon || secureTextEntry) ? styles.inputWithRightIcon : undefined,
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
          error ? styles.errorText : undefined
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