import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ userPoints, userLevel }) => {
  const [selectedTab, setSelectedTab] = useState('stats');
  const [userPhillboards, setUserPhillboards] = useState([]);
  const [userStats, setUserStats] = useState({
    boardsPlaced: 2,
    boardsDiscovered: 7,
    totalLikes: 23,
    challengesCompleted: 1,
    countries: 1,
    streakDays: 3,
  });
  
  // Sample data for user's phillboards
  const sampleUserPhillboards = [
    {
      id: 1,
      message: 'Hello from Central Park!',
      location: 'Central Park, New York',
      likes: 15,
      daysAgo: 5,
      image: 'https://via.placeholder.com/300x200/FF5E3A/FFFFFF?text=Central+Park',
    },
    {
      id: 2,
      message: 'Beautiful sunset at the beach!',
      location: 'Venice Beach, Los Angeles',
      likes: 8,
      daysAgo: 12,
      image: 'https://via.placeholder.com/300x200/FF5E3A/FFFFFF?text=Venice+Beach',
    },
  ];
  
  useEffect(() => {
    // In a real app, fetch user phillboards from API
    setUserPhillboards(sampleUserPhillboards);
  }, []);
  
  // Calculate progress to next level (for demo purposes)
  const nextLevelPoints = userLevel * 500; // Simple formula: level * 500
  const pointsForCurrentLevel = (userLevel - 1) * 500;
  const pointsNeededForNextLevel = nextLevelPoints - userPoints;
  const progressPercentage = ((userPoints - pointsForCurrentLevel) / (nextLevelPoints - pointsForCurrentLevel)) * 100;
  
  const renderUserPhillboardItem = ({ item }) => (
    <View style={styles.phillboardItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.phillboardImage} 
        resizeMode="cover"
      />
      <View style={styles.phillboardInfo}>
        <Text style={styles.phillboardMessage}>{item.message}</Text>
        <View style={styles.phillboardDetails}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="place" size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.phillboardStats}>
            <View style={styles.likesContainer}>
              <MaterialIcons name="favorite" size={14} color="#FF5E3A" />
              <Text style={styles.likesText}>{item.likes}</Text>
            </View>
            <Text style={styles.daysAgoText}>{item.daysAgo}d ago</Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100/4A90E2/FFFFFF?text=USER' }} 
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>YourUsername</Text>
          <Text style={styles.joinDate}>Member since May 2023</Text>
          
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>Level {userLevel}</Text>
            <View style={styles.levelProgressContainer}>
              <View 
                style={[
                  styles.levelProgressBar,
                  {width: `${progressPercentage}%`}
                ]}
              />
            </View>
            <Text style={styles.pointsToNextLevel}>
              {pointsNeededForNextLevel} points to Level {userLevel + 1}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Stats Summary */}
      <View style={styles.statsSummary}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.boardsPlaced}</Text>
          <Text style={styles.statLabel}>Boards Placed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.boardsDiscovered}</Text>
          <Text style={styles.statLabel}>Discovered</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userPoints}</Text>
          <Text style={styles.statLabel}>Total Points</Text>
        </View>
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'stats' && styles.activeTab]}
          onPress={() => setSelectedTab('stats')}
        >
          <Text style={[
            styles.tabText, 
            selectedTab === 'stats' && styles.activeTabText
          ]}>
            Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'phillboards' && styles.activeTab]}
          onPress={() => setSelectedTab('phillboards')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'phillboards' && styles.activeTabText
          ]}>
            My Phillboards
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Tab Content */}
      <View style={styles.tabContent}>
        {selectedTab === 'stats' ? (
          <View style={styles.statsContainer}>
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="push-pin" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Phillboards Placed</Text>
                <Text style={styles.detailedStatValue}>{userStats.boardsPlaced}</Text>
              </View>
            </View>
            
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="explore" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Phillboards Discovered</Text>
                <Text style={styles.detailedStatValue}>{userStats.boardsDiscovered}</Text>
              </View>
            </View>
            
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="favorite" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Total Likes Received</Text>
                <Text style={styles.detailedStatValue}>{userStats.totalLikes}</Text>
              </View>
            </View>
            
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="emoji-events" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Challenges Completed</Text>
                <Text style={styles.detailedStatValue}>{userStats.challengesCompleted}</Text>
              </View>
            </View>
            
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="public" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Countries Visited</Text>
                <Text style={styles.detailedStatValue}>{userStats.countries}</Text>
              </View>
            </View>
            
            <View style={styles.detailedStatRow}>
              <MaterialIcons name="local-fire-department" size={22} color="#4A90E2" />
              <View style={styles.detailedStatInfo}>
                <Text style={styles.detailedStatLabel}>Day Streak</Text>
                <Text style={styles.detailedStatValue}>{userStats.streakDays} days</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.friendsButton}>
              <MaterialIcons name="person-add" size={16} color="white" />
              <Text style={styles.friendsButtonText}>Invite Friends</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.phillboardsContainer}>
            {userPhillboards.length > 0 ? (
              <FlatList
                data={userPhillboards}
                renderItem={renderUserPhillboardItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.phillboardsList}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyPhillboardsContainer}>
                <MaterialIcons name="add-location-alt" size={60} color="#ccc" />
                <Text style={styles.emptyPhillboardsText}>
                  You haven't placed any Phillboards yet
                </Text>
                <Text style={styles.emptyPhillboardsSubtext}>
                  Place your first Phillboard to earn points and achievements!
                </Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.newPhillboardButton}>
              <MaterialIcons name="add-location" size={16} color="white" />
              <Text style={styles.newPhillboardButtonText}>Place New Phillboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  joinDate: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
  levelContainer: {
    marginTop: 5,
  },
  levelText: {
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  levelProgressContainer: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginBottom: 5,
  },
  levelProgressBar: {
    height: 6,
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  pointsToNextLevel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
  },
  statsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#FF5E3A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF5E3A',
  },
  tabText: {
    color: '#666',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FF5E3A',
  },
  tabContent: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 20,
  },
  statsContainer: {
    padding: 15,
  },
  detailedStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailedStatInfo: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailedStatLabel: {
    fontSize: 14,
  },
  detailedStatValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendsButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 20,
  },
  friendsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  phillboardsContainer: {
    padding: 15,
  },
  phillboardsList: {
    paddingBottom: 20,
  },
  phillboardItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phillboardImage: {
    width: '100%',
    height: 150,
  },
  phillboardInfo: {
    padding: 15,
  },
  phillboardMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phillboardDetails: {
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  phillboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  daysAgoText: {
    fontSize: 12,
    color: '#999',
  },
  emptyPhillboardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyPhillboardsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyPhillboardsSubtext: {
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  newPhillboardButton: {
    backgroundColor: '#FF5E3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 20,
  },
  newPhillboardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfileScreen; 