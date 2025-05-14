import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const LeaderboardScreen = () => {
  const [selectedTab, setSelectedTab] = useState('global');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);
  
  // Sample leaderboard data
  const globalLeaderboardData = [
    {
      id: 1,
      name: 'JaneDoe',
      points: 12450,
      level: 27,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=JD',
      country: 'USA',
    },
    {
      id: 2,
      name: 'MaxPower',
      points: 9870,
      level: 23,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=MP',
      country: 'Germany',
    },
    {
      id: 3,
      name: 'JohnSmith',
      points: 8760,
      level: 21,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=JS',
      country: 'UK',
    },
    {
      id: 4,
      name: 'TokyoGirl',
      points: 7650,
      level: 19,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=TG',
      country: 'Japan',
    },
    {
      id: 5,
      name: 'SydneyGuy',
      points: 6540,
      level: 17,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=SG',
      country: 'Australia',
    },
    {
      id: 6,
      name: 'ParisLover',
      points: 5430,
      level: 15,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=PL',
      country: 'France',
    },
    {
      id: 7,
      name: 'RomeRoamer',
      points: 4320,
      level: 13,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=RR',
      country: 'Italy',
    },
    {
      id: 8,
      name: 'NYCExplorer',
      points: 3210,
      level: 10,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=NE',
      country: 'USA',
    },
    // You are here
    {
      id: 9,
      name: 'You',
      points: 2500,
      level: 8,
      avatar: 'https://via.placeholder.com/50/4A90E2/FFFFFF?text=YOU',
      country: 'USA',
      isCurrentUser: true,
    },
  ];
  
  const friendsLeaderboardData = [
    {
      id: 1,
      name: 'BestFriend',
      points: 6780,
      level: 17,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=BF',
      country: 'USA',
    },
    {
      id: 2,
      name: 'You',
      points: 2500,
      level: 8,
      avatar: 'https://via.placeholder.com/50/4A90E2/FFFFFF?text=YOU',
      country: 'USA',
      isCurrentUser: true,
    },
    {
      id: 3,
      name: 'Colleague',
      points: 2200,
      level: 7,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=CO',
      country: 'Canada',
    },
    {
      id: 4,
      name: 'ClassMate',
      points: 1800,
      level: 6,
      avatar: 'https://via.placeholder.com/50/FF5E3A/FFFFFF?text=CM',
      country: 'Mexico',
    },
  ];
  
  const achievementsList = [
    {
      id: 1,
      title: 'First Phillboard',
      description: 'Place your first Phillboard',
      icon: 'flag',
      points: 50,
      completed: true,
    },
    {
      id: 2,
      title: 'Explorer',
      description: 'Visit 10 different Phillboards',
      icon: 'search',
      points: 100,
      progress: 7,
      total: 10,
      completed: false,
    },
    {
      id: 3,
      title: 'Phillboard Artist',
      description: 'Place 5 Phillboards',
      icon: 'brush',
      points: 150,
      progress: 2,
      total: 5,
      completed: false,
    },
    {
      id: 4,
      title: 'Popular Creator',
      description: 'Get 50 likes on your Phillboards',
      icon: 'favorite',
      points: 200,
      progress: 23,
      total: 50,
      completed: false,
    },
    {
      id: 5,
      title: 'Globetrotter',
      description: 'Place Phillboards in 3 different countries',
      icon: 'public',
      points: 300,
      progress: 1,
      total: 3,
      completed: false,
    },
  ];
  
  // Set initial data
  useEffect(() => {
    setLeaderboardData(globalLeaderboardData);
    setAchievementsData(achievementsList);
  }, []);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === 'global') {
      setLeaderboardData(globalLeaderboardData);
    } else if (tab === 'friends') {
      setLeaderboardData(friendsLeaderboardData);
    }
  };
  
  const renderLeaderboardItem = ({ item, index }) => (
    <View style={[
      styles.leaderboardItem, 
      item.isCurrentUser && styles.currentUserItem
    ]}>
      <View style={styles.rankColumn}>
        <View style={[
          styles.rankBadge,
          index < 3 ? styles.topThreeRank : null,
          item.isCurrentUser ? styles.currentUserRank : null
        ]}>
          <Text style={styles.rankText}>{index + 1}</Text>
        </View>
      </View>
      
      <View style={styles.avatarColumn}>
        <Image 
          source={{ uri: item.avatar }} 
          style={styles.avatar} 
        />
      </View>
      
      <View style={styles.infoColumn}>
        <View style={styles.nameRow}>
          <Text style={[styles.nameText, item.isCurrentUser && styles.currentUserText]}>
            {item.name}
          </Text>
          <Text style={styles.countryText}>{item.country}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelLabel}>Level</Text>
            <Text style={styles.levelValue}>{item.level}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsValue}>{item.points}</Text>
            <Text style={styles.pointsLabel}>PTS</Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  const renderAchievementItem = ({ item }) => (
    <View style={[
      styles.achievementItem,
      item.completed && styles.completedAchievement
    ]}>
      <View style={[
        styles.achievementIcon,
        item.completed ? styles.completedIcon : styles.inProgressIcon
      ]}>
        <MaterialIcons 
          name={item.icon} 
          size={24} 
          color={item.completed ? '#4CAF50' : '#4A90E2'} 
        />
      </View>
      
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementTitle}>{item.title}</Text>
        <Text style={styles.achievementDescription}>{item.description}</Text>
        
        {!item.completed && item.progress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${(item.progress / item.total) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {item.progress}/{item.total}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.achievementPoints}>
        <Text style={styles.pointsAmount}>+{item.points}</Text>
        <Text style={styles.pointsText}>pts</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'global' && styles.activeTab]}
          onPress={() => handleTabChange('global')}
        >
          <FontAwesome5 
            name="globe-americas" 
            size={18} 
            color={selectedTab === 'global' ? '#FF5E3A' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'global' && styles.activeTabText
          ]}>
            Global
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'friends' && styles.activeTab]}
          onPress={() => handleTabChange('friends')}
        >
          <MaterialIcons 
            name="people" 
            size={22} 
            color={selectedTab === 'friends' ? '#FF5E3A' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'friends' && styles.activeTabText
          ]}>
            Friends
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.activeTab]}
          onPress={() => handleTabChange('achievements')}
        >
          <MaterialIcons 
            name="emoji-events" 
            size={22} 
            color={selectedTab === 'achievements' ? '#FF5E3A' : '#666'} 
          />
          <Text style={[
            styles.tabText,
            selectedTab === 'achievements' && styles.activeTabText
          ]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Content area */}
      <View style={styles.content}>
        {selectedTab === 'achievements' ? (
          <>
            <Text style={styles.sectionTitle}>Your Achievements</Text>
            <FlatList
              data={achievementsData}
              renderItem={renderAchievementItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.achievementsList}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              {selectedTab === 'global' ? 'Global Rankings' : 'Friends Rankings'}
            </Text>
            <FlatList
              data={leaderboardData}
              renderItem={renderLeaderboardItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.leaderboardList}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF5E3A',
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF5E3A',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  leaderboardList: {
    paddingBottom: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserItem: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  rankColumn: {
    width: 40,
    alignItems: 'center',
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topThreeRank: {
    backgroundColor: '#FFD700',
  },
  currentUserRank: {
    backgroundColor: '#4A90E2',
  },
  rankText: {
    fontWeight: 'bold',
    color: '#333',
  },
  avatarColumn: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoColumn: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  currentUserText: {
    color: '#4A90E2',
  },
  countryText: {
    fontSize: 12,
    color: '#999',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelLabel: {
    color: '#666',
    marginRight: 5,
    fontSize: 12,
  },
  levelValue: {
    fontWeight: 'bold',
    color: '#FF5E3A',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  pointsValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pointsLabel: {
    color: '#666',
    marginLeft: 3,
    fontSize: 12,
  },
  achievementsList: {
    paddingBottom: 20,
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedAchievement: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  completedIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  inProgressIcon: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  achievementDescription: {
    color: '#666',
    fontSize: 13,
    marginBottom: 5,
  },
  progressContainer: {
    marginTop: 5,
  },
  progressBarBackground: {
    height: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  progressBarFill: {
    height: 5,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 10,
    color: '#666',
    marginTop: 3,
    textAlign: 'right',
  },
  achievementPoints: {
    alignItems: 'center',
    marginLeft: 15,
  },
  pointsAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF5E3A',
  },
  pointsText: {
    fontSize: 12,
    color: '#FF5E3A',
  },
});

export default LeaderboardScreen; 