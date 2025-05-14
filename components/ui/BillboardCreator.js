import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTempAR } from '../../context/TempARContext';

const { width, height } = Dimensions.get('window');

// Billboard templates
const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    background: '#FF5E3A',
    borderColor: '#FFFFFF',
    icon: 'billboard',
  },
  {
    id: 'neon',
    name: 'Neon',
    background: '#4A90E2',
    borderColor: '#00FFFF',
    icon: 'lightbulb-on',
  },
  {
    id: 'retro',
    name: 'Retro',
    background: '#8B5CF6',
    borderColor: '#FFD700',
    icon: 'gamepad-variant',
  },
  {
    id: 'business',
    name: 'Business',
    background: '#2D3748',
    borderColor: '#A0AEC0',
    icon: 'briefcase',
  },
  {
    id: 'playful',
    name: 'Playful',
    background: '#38B2AC',
    borderColor: '#FBBF24',
    icon: 'party-popper',
  }
];

const BillboardCreator = ({ visible, onClose, onCreated }) => {
  const { placePhillboardAnchor, checkForValidSurface } = useTempAR();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [step, setStep] = useState(1); // 1: Content, 2: Template, 3: Placement
  const [surfaceDetected, setSurfaceDetected] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placementSuccess, setPlacementSuccess] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(width));
  const [errorMessage, setErrorMessage] = useState('');
  
  // Animate modal entry
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  
  // Animate step transitions
  useEffect(() => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);
  
  // Check for valid surface when on placement step
  useEffect(() => {
    if (step === 3) {
      checkSurface();
    }
  }, [step]);
  
  // Check if a valid surface is detected
  const checkSurface = async () => {
    try {
      const isValid = await checkForValidSurface();
      setSurfaceDetected(isValid);
    } catch (error) {
      console.error('Error checking surface:', error);
    }
  };
  
  // Handle close with animation
  const handleClose = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setStep(1);
      setTitle('');
      setMessage('');
      setSelectedTemplate('classic');
      setSurfaceDetected(false);
      setIsPlacing(false);
      setPlacementSuccess(false);
      setErrorMessage('');
      onClose();
    });
  };
  
  // Move to next step
  const nextStep = () => {
    if (step === 1) {
      // Validate content
      if (!title.trim()) {
        setErrorMessage('Please enter a title');
        return;
      }
      if (!message.trim()) {
        setErrorMessage('Please enter a message');
        return;
      }
      setErrorMessage('');
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };
  
  // Move to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      handleClose();
    }
  };
  
  // Create and place the billboard
  const createBillboard = async () => {
    if (isPlacing) return;
    
    setIsPlacing(true);
    try {
      const newBillboard = await placePhillboardAnchor(message, selectedTemplate);
      
      if (newBillboard) {
        setPlacementSuccess(true);
        
        // Notify parent component
        if (onCreated) {
          onCreated({
            id: newBillboard.identifier,
            title,
            message,
            template: selectedTemplate,
          });
        }
        
        // Auto close after success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrorMessage('Failed to place billboard. Please try again.');
        setIsPlacing(false);
      }
    } catch (error) {
      console.error('Error creating billboard:', error);
      setErrorMessage('An error occurred. Please try again.');
      setIsPlacing(false);
    }
  };
  
  // Render content based on current step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View 
            style={[styles.stepContainer, { transform: [{ translateX: slideAnim }] }]}
          >
            <Text style={styles.stepTitle}>Create Your Billboard</Text>
            <Text style={styles.stepSubtitle}>
              Enter the content for your AR billboard
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.titleInput}
                placeholder="Enter a catchy title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
                maxLength={30}
              />
              <Text style={styles.charCount}>{title.length}/30</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="Enter your message"
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={200}
              />
              <Text style={styles.charCount}>{message.length}/200</Text>
            </View>
            
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
          </Animated.View>
        );
        
      case 2:
        return (
          <Animated.View 
            style={[styles.stepContainer, { transform: [{ translateX: slideAnim }] }]}
          >
            <Text style={styles.stepTitle}>Choose a Template</Text>
            <Text style={styles.stepSubtitle}>
              Select a style for your AR billboard
            </Text>
            
            <ScrollView 
              style={styles.templateScrollView}
              contentContainerStyle={styles.templateContainer}
              showsVerticalScrollIndicator={false}
            >
              {TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateOption,
                    {
                      backgroundColor: template.background,
                      borderColor: selectedTemplate === template.id ? '#FFF' : 'transparent',
                    },
                  ]}
                  onPress={() => setSelectedTemplate(template.id)}
                >
                  <MaterialCommunityIcons
                    name={template.icon}
                    size={30}
                    color="#FFF"
                  />
                  <Text style={styles.templateName}>{template.name}</Text>
                  
                  {selectedTemplate === template.id && (
                    <View style={styles.selectedMark}>
                      <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        );
        
      case 3:
        return (
          <Animated.View 
            style={[styles.stepContainer, { transform: [{ translateX: slideAnim }] }]}
          >
            <Text style={styles.stepTitle}>Place Your Billboard</Text>
            <Text style={styles.stepSubtitle}>
              Position your device where you want to place the billboard
            </Text>
            
            <View style={styles.placementContainer}>
              {isPlacing ? (
                <View style={styles.placingContainer}>
                  {placementSuccess ? (
                    <>
                      <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                      <Text style={styles.successText}>Billboard Created!</Text>
                    </>
                  ) : (
                    <>
                      <View style={styles.loadingIndicator}>
                        <MaterialCommunityIcons name="rotate-3d-variant" size={50} color="#FFF" />
                      </View>
                      <Text style={styles.placingText}>Creating billboard...</Text>
                    </>
                  )}
                </View>
              ) : (
                <>
                  <View style={styles.surfaceIndicator}>
                    <MaterialCommunityIcons
                      name={surfaceDetected ? "target" : "target-variant"}
                      size={80}
                      color={surfaceDetected ? "#4CAF50" : "#F44336"}
                    />
                  </View>
                  
                  <Text style={styles.surfaceText}>
                    {surfaceDetected 
                      ? "Surface detected! Tap 'Place' to create your billboard."
                      : "Move your device to find a flat surface..."}
                  </Text>
                  
                  {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  ) : null}
                </>
              )}
            </View>
          </Animated.View>
        );
        
      default:
        return null;
    }
  };
  
  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.stepDot,
              { backgroundColor: i <= step ? '#4A90E2' : '#ccc' },
            ]}
          />
        ))}
      </View>
    );
  };
  
  // Render action buttons
  const renderActionButtons = () => {
    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={prevStep}
        >
          <Text style={styles.backButtonText}>
            {step === 1 ? 'Cancel' : 'Back'}
          </Text>
        </TouchableOpacity>
        
        {step < 3 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextStep}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.placeButton,
              { opacity: surfaceDetected && !isPlacing ? 1 : 0.5 },
            ]}
            onPress={createBillboard}
            disabled={!surfaceDetected || isPlacing}
          >
            <Text style={styles.placeButtonText}>Place</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View 
        style={[styles.modalOverlay, { opacity: fadeAnim }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.modalContent}>
            {renderStepIndicator()}
            {renderStepContent()}
            {renderActionButtons()}
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  keyboardAvoid: {
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    height: height * 0.7,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    color: '#999',
    marginTop: 4,
  },
  templateScrollView: {
    flex: 1,
  },
  templateContainer: {
    paddingBottom: 20,
  },
  templateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 3,
  },
  templateName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    flex: 1,
  },
  selectedMark: {
    marginLeft: 10,
  },
  placementContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surfaceIndicator: {
    marginBottom: 20,
  },
  surfaceText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginHorizontal: 20,
  },
  placingContainer: {
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 15,
  },
  errorText: {
    color: '#F44336',
    marginTop: 10,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  placeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BillboardCreator; 