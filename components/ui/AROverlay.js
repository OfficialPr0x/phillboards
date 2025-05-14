import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image
} from 'react-native';
import { useTempAR } from '../../context/TempARContext';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AROverlay = ({ onCreatePhillboard, onViewLeaderboard, onViewProfile }) => {
  const { isInitialized, getNearbyPhillboards } = useTempAR();
  const [nearbyCount, setNearbyCount] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [showGameStats, setShowGameStats] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [userRank, setUserRank] = useState('Billboard Apprentice');

  // Pulse animation for action button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
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
  }, []);

  // Fetch nearby phillboards periodically
  useEffect(() => {
    if (!isInitialized) return;

    const fetchNearby = async () => {
      const nearby = await getNearbyPhillboards(100);
      setNearbyCount(nearby.length);
    };

    fetchNearby();
    const interval = setInterval(fetchNearby, 10000);
    
    return () => clearInterval(interval);
  }, [isInitialized]);

  // Dismiss tutorial after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Top status bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={onViewProfile}
        >
          <View style={styles.profileIconContainer}>
            <FontAwesome5 name="user-alt" size={18} color="#fff" />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userLevel}</Text>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{userPoints} PTS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.leaderboardButton}
          onPress={onViewLeaderboard}
        >
          <Ionicons name="trophy" size={24} color="#FFD700" />
          <Text style={styles.leaderboardText}>Ranks</Text>
        </TouchableOpacity>
      </View>

      {/* Nearby phillboards indicator */}
      <View style={styles.nearbyContainer}>
        <MaterialCommunityIcons name="billboard" size={24} color="#4A90E2" />
        <Text style={styles.nearbyText}>
          {nearbyCount} {nearbyCount === 1 ? 'Phillboard' : 'Phillboards'} nearby
        </Text>
      </View>

      {/* Game stats popup */}
      {showGameStats && (
        <Animated.View 
          style={[
            styles.gameStatsContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowGameStats(false)}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.gameStatsTitle}>Your Stats</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Level:</Text>
            <Text style={styles.statValue}>{userLevel}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Points:</Text>
            <Text style={styles.statValue}>{userPoints}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rank:</Text>
            <Text style={styles.statValue}>{userRank}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(userPoints % 1000) / 10}%` }]} />
            <Text style={styles.progressText}>{userPoints % 1000}/1000 to next level</Text>
          </View>
        </Animated.View>
      )}

      {/* Tutorial overlay */}
      {showTutorial && (
        <View style={styles.tutorialContainer}>
          <View style={styles.tutorialCard}>
            <Text style={styles.tutorialTitle}>Welcome to PhillBoards AR!</Text>
            <Text style={styles.tutorialText}>
              Look around to discover billboards in AR.
              Tap the + button to create your own.
              Earn points when others view your billboards!
            </Text>
            <TouchableOpacity 
              style={styles.tutorialButton}
              onPress={() => setShowTutorial(false)}
            >
              <Text style={styles.tutorialButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.statsButton}
          onPress={() => setShowGameStats(!showGameStats)}
        >
          <Ionicons name="stats-chart" size={28} color="#fff" />
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={onCreatePhillboard}
          >
            <Ionicons name="add" size={40} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: 'box-none',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 8,
  },
  profileIconContainer: {
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF5E3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  levelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pointsContainer: {
    marginLeft: 10,
  },
  pointsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  leaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  leaderboardText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  nearbyContainer: {
    position: 'absolute',
    top: 110,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  nearbyText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF5E3A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  helpButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  tutorialContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tutorialCard: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  tutorialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tutorialText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  tutorialButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  tutorialButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gameStatsContainer: {
    position: 'absolute',
    top: '30%',
    left: width * 0.1,
    width: width * 0.8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameStatsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  statValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF5E3A',
  },
  progressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AROverlay; 