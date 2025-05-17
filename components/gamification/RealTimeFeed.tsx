import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';

export interface FeedItem {
  id: string;
  type: 'overwrite' | 'purchase' | 'earning';
  timestamp: Date;
  fromUser: {
    id: string;
    username: string;
    avatar?: string;
  };
  toUser?: {
    id: string;
    username: string;
    avatar?: string;
  };
  phillboard: {
    id: string;
    content: string;
    location: string;
  };
  amount: number;
}

interface RealTimeFeedProps {
  items: FeedItem[];
  onItemPress?: (item: FeedItem) => void;
  onUserPress?: (userId: string) => void;
  maxItems?: number;
  autoScroll?: boolean;
}

const RealTimeFeed: React.FC<RealTimeFeedProps> = ({
  items,
  onItemPress,
  onUserPress,
  maxItems = 10,
  autoScroll = true,
}) => {
  const [visibleItems, setVisibleItems] = useState<FeedItem[]>([]);
  const [newItem, setNewItem] = useState<FeedItem | null>(null);
  const listRef = useRef<FlatList>(null);
  
  // Animation values
  const newItemAnim = useRef(new Animated.Value(0)).current;
  
  // Update visible items when props change
  useEffect(() => {
    if (items.length === 0) return;
    
    // Check if there's a new item
    if (visibleItems.length > 0 && items[0]?.id !== visibleItems[0]?.id) {
      // New item added
      setNewItem(items[0]);
      
      // Animate new item entrance
      newItemAnim.setValue(0);
      Animated.timing(newItemAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back()),
        useNativeDriver: true,
      }).start(() => {
        // After animation, update the visible items list
        setVisibleItems(items.slice(0, maxItems));
        setNewItem(null);
        
        // Scroll to top if autoScroll is enabled
        if (autoScroll && listRef.current) {
          listRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      });
    } else {
      // Initial load or non-animated update
      setVisibleItems(items.slice(0, maxItems));
    }
  }, [items, maxItems, autoScroll, newItemAnim]);
  
  // Format timestamp to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    
    if (diffSec < 60) return 'Just now';
    if (diffSec < 120) return '1 minute ago';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} minutes ago`;
    if (diffSec < 7200) return '1 hour ago';
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
    return date.toLocaleDateString();
  };
  
  // Get icon based on item type
  const getActionIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'overwrite':
        return <MaterialIcons name="swap-horiz" size={24} color="#5856D6" />;
      case 'purchase':
        return <MaterialIcons name="add-circle" size={24} color="#FF9500" />;
      case 'earning':
        return <MaterialIcons name="attach-money" size={24} color="#4CD964" />;
      default:
        return <MaterialIcons name="notifications" size={24} color="#999" />;
    }
  };
  
  // Get action text
  const getActionText = (item: FeedItem) => {
    switch (item.type) {
      case 'overwrite':
        return (
          <Text style={styles.actionText}>
            <Text style={styles.usernameText}>@{item.fromUser.username}</Text>
            {' just overwrote '}
            <Text style={styles.usernameText}>@{item.toUser?.username || 'unknown'}</Text>
            {' for '}
            <Text style={styles.highlightText}>${item.amount.toFixed(2)}</Text>
          </Text>
        );
      case 'purchase':
        return (
          <Text style={styles.actionText}>
            <Text style={styles.usernameText}>@{item.fromUser.username}</Text>
            {' just placed a new phillboard for '}
            <Text style={styles.highlightText}>${item.amount.toFixed(2)}</Text>
          </Text>
        );
      case 'earning':
        return (
          <Text style={styles.actionText}>
            <Text style={styles.usernameText}>@{item.fromUser.username}</Text>
            {' earned '}
            <Text style={styles.highlightText}>${item.amount.toFixed(2)}</Text>
            {' from an overwrite'}
          </Text>
        );
      default:
        return <Text style={styles.actionText}>New activity</Text>;
    }
  };
  
  // Render a feed item
  const renderItem = ({ item, index }: { item: FeedItem; index: number }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onItemPress && onItemPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
          {getActionIcon(item.type)}
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.userContainer}>
            <TouchableOpacity
              onPress={() => onUserPress && onUserPress(item.fromUser.id)}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Avatar
                size="small"
                source={item.fromUser.avatar ? { uri: item.fromUser.avatar } : undefined}
                initials={item.fromUser.username.substring(0, 2).toUpperCase()}
              />
            </TouchableOpacity>
            
            {item.type === 'overwrite' && item.toUser && (
              <>
                <MaterialIcons name="arrow-forward" size={16} color="#999" style={styles.arrowIcon} />
                <TouchableOpacity
                  onPress={() => onUserPress && onUserPress(item.toUser!.id)}
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <Avatar
                    size="small"
                    source={item.toUser.avatar ? { uri: item.toUser.avatar } : undefined}
                    initials={item.toUser.username.substring(0, 2).toUpperCase()}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          
          {getActionText(item)}
          
          <View style={styles.detailsContainer}>
            <Text style={styles.locationText}>
              <MaterialIcons name="location-on" size={12} color="#999" />
              {' '}{item.phillboard.location}
            </Text>
            <Text style={styles.timeText}>{formatRelativeTime(item.timestamp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  // Animated new item component
  const renderNewItem = () => {
    if (!newItem) return null;
    
    const animatedStyle = {
      opacity: newItemAnim,
      transform: [
        {
          translateY: newItemAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        },
        {
          scale: newItemAnim.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0.8, 1.05, 1],
          }),
        },
      ],
    };
    
    return (
      <Animated.View style={[styles.newItemContainer, animatedStyle]}>
        {renderItem({ item: newItem, index: -1 })}
      </Animated.View>
    );
  };
  
  // Empty state component
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="notifications-none" size={40} color="#DDD" />
      <Text style={styles.emptyText}>No activity yet</Text>
      <Text style={styles.emptySubtext}>Recent activities will appear here</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Feed</Text>
      </View>
      
      {/* New item animation overlay */}
      {renderNewItem()}
      
      <FlatList
        ref={listRef}
        data={visibleItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingBottom: 10,
    minHeight: 200,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  arrowIcon: {
    marginHorizontal: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  usernameText: {
    fontWeight: '600',
    color: '#007AFF',
  },
  highlightText: {
    fontWeight: '600',
    color: '#FF5E3A',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#999',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  newItemContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48, // Header height
    zIndex: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    marginTop: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 4,
  },
});

export default RealTimeFeed; 