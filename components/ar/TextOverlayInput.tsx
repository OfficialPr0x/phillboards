import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TextOverlayInputProps {
  visible: boolean;
  initialValue?: string;
  onConfirm: (text: string) => void;
  onCancel: () => void;
  maxLength?: number;
  placeholder?: string;
}

const TextOverlayInput: React.FC<TextOverlayInputProps> = ({
  visible,
  initialValue = '',
  onConfirm,
  onCancel,
  maxLength = 100,
  placeholder = 'Enter your phillboard text...',
}) => {
  const [text, setText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animation = useRef(new Animated.Value(0)).current;
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (visible) {
      setIsAnimatingOut(false);
      // Animate in
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 30,
        friction: 8,
      }).start();

      // Auto focus the input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      // Animate out
      setIsAnimatingOut(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimatingOut(false);
      });

      // Blur the input
      inputRef.current?.blur();
    }
  }, [visible, animation]);

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text);
    }
  };

  // Animation styles
  const containerStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: animation,
  };

  const labelStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0, 1],
    }),
  };

  if (!visible && !isAnimatingOut) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[styles.label, labelStyle]}>
          Phillboard Content
        </Animated.Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            multiline
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            blurOnSubmit={false}
          />
          
          {maxLength && (
            <Text style={styles.charCount}>
              {text.length}/{maxLength}
            </Text>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <MaterialIcons name="close" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !text.trim() && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!text.trim()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: 'rgba(60, 60, 60, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7B7B7B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E3A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: 'rgba(255, 94, 58, 0.5)',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default TextOverlayInput; 