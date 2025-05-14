import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNianticAR } from '../context/NianticARContext';

const BrowsePhillboardsScreen = () => {
  const { getNearbyPhillboards, updatePhillboard } = useNianticAR();
  const [phillboards, setPhillboards] = useState([]);
  const [filteredPhillboards, setFilteredPhillboards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchPhillboards();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...phillboards];
    
    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(phillboard => phillboard.type === selectedFilter);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        phillboard => 
          phillboard.title.toLowerCase().includes(query) || 
          (phillboard.message && phillboard.message.toLowerCase().includes(query))
      );
    }
    
    setFilteredPhillboards(filtered);
  }, [phillboards, searchQuery, selectedFilter]);

  const fetchPhillboards = async () => {
    setIsLoading(true);
    try {
      const nearbyPhillboards = await getNearbyPhillboards(1000); // 1km radius
      
      if (nearbyPhillboards.length === 0) {
        // If no real phillboards, generate sample data
        setPhillboards(generateSamplePhillboards());
      } else {
        setPhillboards(nearbyPhillboards);
      }
    } catch (error) {
      console.error('Error fetching phillboards:', error);
      setPhillboards(generateSamplePhillboards());
    } finally {
      setIsLoading(false);
    }
  };

  const generateSamplePhillboards = () => {
    // Generate sample phillboards for demo purposes
    return [
      {
        id: '1',
        title: 'Downtown Art Gallery',
        message: 'Check out the new exhibition at the downtown art gallery!',
        template: 'classic',
        type: 'regular',
        points: 100,
        visitors: 23,
        likes: 12,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: '2',
        title: 'Park Challenge',
        message: 'Complete the park walking challenge to earn bonus points!',
        template: 'neon',
        type: 'challenge',
        points: 150,
        visitors: 15,
        likes: 7,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: '3',
        title: 'Coffee Shop Discount',
        message: 'Show this phillboard at JavaBeans for 10% off your order!',
        template: 'retro',
        type: 'bonus',
        points: 75,
        visitors: 8,
        likes: 5,
        createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
      {
        id: '4',
        title: 'Farmer\'s Market',
        message: 'Fresh local produce every Saturday from 9am-1pm',
        template: 'classic',
        type: 'regular',
        points: 100,
        visitors: 42,
        likes: 18,
        createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      },
      {
        id: '5',
        title: 'Music Festival',
        message: 'Annual Music Festival happening next weekend at City Park. Get your tickets now!',
        template: 'neon',
        type: 'bonus',
        points: 120,
        visitors: 53,
        likes: 31,
        createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      },
    ];
  };

  const handleLike = (phillboardId) => {
    const updatedPhillboards = phillboards.map(phillboard => {
      if (phillboard.id === phillboardId) {
        const updatedPhillboard = {
          ...phillboard,
          likes: (phillboard.likes || 0) + 1
        };
        
        // Update the phillboard on the server
        updatePhillboard(phillboardId, { likes: updatedPhillboard.likes });
        
        return updatedPhillboard;
      }
      return phillboard;
    });
    
    setPhillboards(updatedPhillboards);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderPhillboardItem = ({ item }) => {
    const templateColors = {
      classic: '#FF5E3A',
      neon: '#4A90E2',
      retro: '#8B5CF6'
    };
    
    const typeIcons = {
      regular: 'push-pin',
      challenge: 'emoji-events',
      bonus: 'star'
    };
    
    return (
      <View style={[
        styles.phillboardItem, 
        { borderLeftColor: templateColors[item.template] || '#FF5E3A' }
      ]}>
        <View style={styles.phillboardHeader}>
          <View style={styles.phillboardTitleContainer}>
            <MaterialIcons 
              name={typeIcons[item.type] || 'push-pin'} 
              size={20} 
              color={templateColors[item.template] || '#FF5E3A'} 
            />
            <Text style={styles.phillboardTitle}>{item.title}</Text>
          </View>
          <Text style={styles.phillboardDate}>{formatDate(item.createdAt)}</Text>
        </View>
        
        <Text style={styles.phillboardMessage}>{item.message}</Text>
        
        <View style={styles.phillboardFooter}>
          <View style={styles.phillboardStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="person" size={16} color="#666" />
              <Text style={styles.statText}>{item.visitors || 0}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={16} color="#666" />
              <Text style={styles.statText}>{item.points} pts</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.likeButton} 
            onPress={() => handleLike(item.id)}
          >
            <MaterialIcons name="favorite" size={16} color="#FF5E3A" />
            <Text style={styles.likeCount}>{item.likes || 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search phillboards..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollableFilterChips 
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FF5E3A" />
          <Text style={styles.loaderText}>Loading phillboards...</Text>
        </View>
      ) : filteredPhillboards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="search-off" size={60} color="#DDD" />
          <Text style={styles.emptyTitle}>No phillboards found</Text>
          <Text style={styles.emptyMessage}>
            {searchQuery 
              ? `No results matching "${searchQuery}"`
              : 'Try a different filter or create new phillboards in your area!'}
          </Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={fetchPhillboards}
          >
            <MaterialIcons name="refresh" size={20} color="white" />
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredPhillboards}
          renderItem={renderPhillboardItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={fetchPhillboards}
        />
      )}
    </View>
  );
};

// Scrollable filter chips component
const ScrollableFilterChips = ({ selectedFilter, onSelectFilter }) => {
  const filters = [
    { id: 'all', label: 'All', icon: 'format-list-bulleted' },
    { id: 'regular', label: 'Regular', icon: 'push-pin' },
    { id: 'challenge', label: 'Challenges', icon: 'emoji-events' },
    { id: 'bonus', label: 'Bonus', icon: 'star' },
  ];
  
  return (
    <View style={styles.filtersScroll}>
      {filters.map(filter => (
        <TouchableOpacity
          key={filter.id}
          style={[
            styles.filterChip,
            selectedFilter === filter.id && styles.selectedFilterChip
          ]}
          onPress={() => onSelectFilter(filter.id)}
        >
          <MaterialIcons 
            name={filter.icon} 
            size={16} 
            color={selectedFilter === filter.id ? 'white' : '#666'} 
          />
          <Text 
            style={[
              styles.filterLabel,
              selectedFilter === filter.id && styles.selectedFilterLabel
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilterChip: {
    backgroundColor: '#FF5E3A',
  },
  filterLabel: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  selectedFilterLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  phillboardItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  phillboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  phillboardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phillboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  phillboardDate: {
    fontSize: 12,
    color: '#888',
  },
  phillboardMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 10,
  },
  phillboardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  phillboardStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  likeCount: {
    fontSize: 14,
    color: '#FF5E3A',
    marginLeft: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E3A',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default BrowsePhillboardsScreen; 