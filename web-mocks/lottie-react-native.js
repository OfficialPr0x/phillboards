import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Mock LottieView component
const LottieView = ({ 
  source, 
  style, 
  autoPlay = false, 
  loop = false, 
  speed = 1,
  progress,
  resizeMode = 'contain',
  ...props 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 60; // Simulate 60 frames for the animation
  
  // Simulate animation progress
  useEffect(() => {
    let frameTimer;
    if (isPlaying) {
      frameTimer = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= totalFrames - 1) {
            if (loop) {
              return 0; // Loop back to beginning
            } else {
              setIsPlaying(false);
              return prev;
            }
          }
          return prev + 1;
        });
      }, 1000 / (60 * speed)); // Approximate 60fps adjusted by speed
    }
    
    return () => clearInterval(frameTimer);
  }, [isPlaying, loop, speed]);
  
  // If progress prop is provided, use it to control the animation
  useEffect(() => {
    if (progress !== undefined) {
      setCurrentFrame(Math.floor(progress * totalFrames));
    }
  }, [progress]);
  
  // Get source info
  const getSourceInfo = () => {
    if (!source) return 'No animation source';
    
    if (typeof source === 'number') {
      return 'Local animation resource';
    } else if (source.uri) {
      return source.uri;
    } else if (source.json) {
      return 'Inline JSON animation';
    }
    
    return 'Unknown source type';
  };
  
  // Get animation name if possible
  const getAnimationName = () => {
    if (!source) return '';
    
    if (typeof source === 'object' && source.name) {
      return source.name;
    }
    
    if (typeof source === 'object' && source.uri) {
      // Try to extract name from URI
      const uriParts = source.uri.split('/');
      return uriParts[uriParts.length - 1].split('.')[0];
    }
    
    return 'Animation';
  };
  
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.animationContainer}>
        <View style={[styles.progressBar, { width: `${(currentFrame / totalFrames) * 100}%` }]} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.animationName}>{getAnimationName()}</Text>
          <Text style={styles.frameInfo}>
            Frame: {currentFrame}/{totalFrames} 
            ({Math.round((currentFrame / totalFrames) * 100)}%)
          </Text>
          
          <View style={styles.controls}>
            <Text 
              style={styles.controlButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </Text>
            <Text 
              style={styles.controlButton}
              onPress={() => {
                setCurrentFrame(0);
                setIsPlaying(true);
              }}
            >
              🔄 Restart
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Additional methods that LottieView provides
LottieView.prototype.play = function(startFrame, endFrame) {
  // These would be handled by the component itself
};

LottieView.prototype.reset = function() {
  // These would be handled by the component itself
};

LottieView.prototype.pause = function() {
  // These would be handled by the component itself
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    minHeight: 100,
  },
  animationContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: '#3498db',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  animationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  frameInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    fontSize: 14,
  },
});

export default LottieView; 