import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTempAR } from '../../context/TempARContext';

const { width } = Dimensions.get('window');

// Billboard templates
const TEMPLATES = {
  classic: {
    background: '#FF5E3A',
    titleColor: '#FFFFFF',
    textColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    shadowColor: 'rgba(255, 94, 58, 0.6)',
  },
  neon: {
    background: '#4A90E2',
    titleColor: '#FFFFFF',
    textColor: '#FFFFFF',
    borderColor: '#00FFFF',
    shadowColor: 'rgba(0, 255, 255, 0.6)',
  },
  retro: {
    background: '#8B5CF6',
    titleColor: '#FFD700',
    textColor: '#FFFFFF',
    borderColor: '#FFD700',
    shadowColor: 'rgba(139, 92, 246, 0.6)',
  },
  business: {
    background: '#2D3748',
    titleColor: '#FFFFFF',
    textColor: '#E2E8F0',
    borderColor: '#A0AEC0',
    shadowColor: 'rgba(45, 55, 72, 0.6)',
  },
  playful: {
    background: '#38B2AC',
    titleColor: '#FFFFFF',
    textColor: '#FFFFFF',
    borderColor: '#FBBF24',
    shadowColor: 'rgba(56, 178, 172, 0.6)',
  }
};

const Billboard = ({ 
  id, 
  title, 
  message, 
  template = 'classic', 
  likes = 0, 
  createdBy,
  distance,
  onLike,
  onInteract,
  animate = true
}) => {
  const { updatePhillboard } = useTempAR();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [expanded, setExpanded] = useState(false);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Get template styles
  const templateStyle = TEMPLATES[template] || TEMPLATES.classic;
  
  // Entry animation
  useEffect(() => {
    if (animate) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Slight rotation animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 0.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -0.02,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Pulse animation for new billboards
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);
  
  // Handle like action
  const handleLike = async () => {
    if (liked) return;
    
    setLiked(true);
    setLikeCount(prev => prev + 1);
    
    // Animate like
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Update in context
    if (updatePhillboard) {
      await updatePhillboard(id, { likes: likeCount + 1 });
    }
    
    // Call parent callback
    if (onLike) {
      onLike(id);
    }
  };
  
  // Toggle expanded view
  const toggleExpanded = () => {
    setExpanded(!expanded);
    if (onInteract) {
      onInteract(id);
    }
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: templateStyle.background,
          borderColor: templateStyle.borderColor,
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
            { rotateZ: rotateAnim },
          ],
        },
      ]}
    >
      {/* Billboard Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: templateStyle.titleColor }]}>
          {title}
        </Text>
        {distance && (
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{distance}m</Text>
          </View>
        )}
      </View>
      
      {/* Billboard Content */}
      <View style={styles.content}>
        <Text 
          style={[styles.message, { color: templateStyle.textColor }]}
          numberOfLines={expanded ? undefined : 3}
        >
          {message}
        </Text>
      </View>
      
      {/* Billboard Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.likeButton} 
          onPress={handleLike}
          disabled={liked}
        >
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={20} 
            color={liked ? "#FF4D4F" : "#fff"} 
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={toggleExpanded}
        >
          <Text style={styles.expandText}>
            {expanded ? "Show less" : "Show more"}
          </Text>
          <Ionicons 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>
      
      {/* Creator badge */}
      {createdBy && (
        <View style={styles.creatorBadge}>
          <FontAwesome name="user" size={12} color="#fff" />
          <Text style={styles.creatorText}>
            {typeof createdBy === 'string' && createdBy.length > 10 
              ? createdBy.substring(0, 10) + '...' 
              : createdBy}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    minHeight: 150,
    borderRadius: 12,
    borderWidth: 2,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandText: {
    color: '#fff',
    marginRight: 5,
    fontSize: 12,
  },
  creatorBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 4,
  },
});

export default Billboard; 