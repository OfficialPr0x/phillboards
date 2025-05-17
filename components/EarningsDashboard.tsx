import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import { supabase } from '../config/supabaseClient';
import { Card, Badge, Avatar } from './ui';

const { width } = Dimensions.get('window');

interface PhillboardData {
  id: string;
  content: string;
  current_price: number;
  location_lat: number;
  location_lng: number;
  location_name: string;
  created_at: string;
  overwrite_count: number;
}

interface TransactionData {
  id: string;
  transaction_type: 'purchase' | 'overwrite' | 'earnings';
  amount: number;
  created_at: string;
  phillboard: PhillboardData;
}

interface EarningsDashboardProps {
  userId: string;
}

const EarningsDashboard: React.FC<EarningsDashboardProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [ownedPhillboards, setOwnedPhillboards] = useState<PhillboardData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<TransactionData[]>([]);
  const [heatmapData, setHeatmapData] = useState<{latitude: number; longitude: number; weight: number}[]>([]);
  const [topLocations, setTopLocations] = useState<{name: string; count: number}[]>([]);

  // Animation values
  const earningsValue = useSharedValue(0);
  const roiValue = useSharedValue(0);
  const phillboardCountValue = useSharedValue(0);

  const calculateROI = (earnings: number, spent: number) => {
    if (spent === 0) return 0;
    return (earnings / spent) * 100;
  };

  // Fetch user data, owned phillboards, and transactions
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (profileError) throw profileError;
        
        // Fetch owned phillboards
        const { data: phillboardsData, error: phillboardsError } = await supabase
          .from('phillboards')
          .select('*')
          .eq('owner_id', userId)
          .order('created_at', { ascending: false });
          
        if (phillboardsError) throw phillboardsError;
        
        // Fetch recent transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select(`
            *,
            phillboard:phillboard_id (*)
          `)
          .eq('user_id', userId)
          .eq('transaction_type', 'earnings')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (transactionsError) throw transactionsError;
        
        // Calculate total earnings from profile
        if (profileData) {
          setTotalEarnings(profileData.total_earnings || 0);
          
          // Animate earnings value
          earningsValue.value = withTiming(profileData.total_earnings || 0, {
            duration: 1500,
            easing: Easing.out(Easing.cubic),
          });
          
          // Calculate and animate ROI
          const roi = calculateROI(
            profileData.total_earnings || 0,
            profileData.total_spent || 0
          );
          
          roiValue.value = withTiming(roi, {
            duration: 1500,
            easing: Easing.out(Easing.cubic),
          });
        }
        
        // Set owned phillboards
        if (phillboardsData) {
          setOwnedPhillboards(phillboardsData);
          
          // Animate phillboard count
          phillboardCountValue.value = withTiming(phillboardsData.length, {
            duration: 1500,
            easing: Easing.out(Easing.cubic),
          });
          
          // Generate heatmap data
          const heatmap = phillboardsData.map((phillboard: PhillboardData) => ({
            latitude: phillboard.location_lat,
            longitude: phillboard.location_lng,
            weight: 1 + (phillboard.overwrite_count || 0) / 5, // Weight based on overwrites
          }));
          setHeatmapData(heatmap);
          
          // Calculate top locations
          const locationCounts: Record<string, number> = {};
          
          phillboardsData.forEach((phillboard: PhillboardData) => {
            if (phillboard.location_name) {
              locationCounts[phillboard.location_name] = 
                (locationCounts[phillboard.location_name] || 0) + 1;
            }
          });
          
          const topLocs = Object.entries(locationCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);
            
          setTopLocations(topLocs);
        }
        
        // Set transactions
        if (transactionsData) {
          setRecentTransactions(transactionsData as TransactionData[]);
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);

  // Animated styles
  const animatedEarningsStyle = useAnimatedStyle(() => ({
    opacity: interpolate(earningsValue.value, [0, totalEarnings / 2], [0.5, 1]),
  }));
  
  const animatedROIStyle = useAnimatedStyle(() => ({
    opacity: interpolate(roiValue.value, [0, 50], [0.5, 1]),
  }));
  
  const animatedPhillboardCountStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      phillboardCountValue.value, 
      [0, ownedPhillboards.length / 2], 
      [0.5, 1]
    ),
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5E3A" />
        <Text style={styles.loadingText}>Loading earnings data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Earnings Overview */}
      <Card 
        title="Earnings Overview" 
        style={styles.card}
        headerRight={
          <Badge variant="primary" size="medium">
            Active
          </Badge>
        }
      >
        <View style={styles.statsContainer}>
          <Animated.View style={[styles.statItem, animatedEarningsStyle]}>
            <Text style={styles.statValue}>${totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </Animated.View>
          
          <Animated.View style={[styles.statItem, animatedROIStyle]}>
            <Text style={styles.statValue}>
              {calculateROI(totalEarnings, 0).toFixed(0)}%
            </Text>
            <Text style={styles.statLabel}>ROI</Text>
          </Animated.View>
          
          <Animated.View style={[styles.statItem, animatedPhillboardCountStyle]}>
            <Text style={styles.statValue}>{ownedPhillboards.length}</Text>
            <Text style={styles.statLabel}>Phillboards</Text>
          </Animated.View>
        </View>
      </Card>
      
      {/* Owned Phillboards Map */}
      <Card title="Your Phillboards" style={styles.card}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 
                ownedPhillboards.length > 0 
                  ? ownedPhillboards[0].location_lat 
                  : 40.7128,
              longitude: 
                ownedPhillboards.length > 0 
                  ? ownedPhillboards[0].location_lng 
                  : -74.0060,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {ownedPhillboards.map((phillboard: PhillboardData) => (
              <Marker
                key={phillboard.id}
                coordinate={{
                  latitude: phillboard.location_lat,
                  longitude: phillboard.location_lng,
                }}
                title={phillboard.content}
                description={`$${phillboard.current_price.toFixed(2)}`}
                pinColor="#FF5E3A"
              />
            ))}
            
            <Heatmap
              points={heatmapData}
              radius={20}
              opacity={0.7}
              gradient={{
                colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
                startPoints: [0, 0.25, 0.5, 0.75, 1],
                colorMapSize: 256,
              }}
            />
          </MapView>
        </View>
        
        <Text style={styles.sectionTitle}>Top Locations</Text>
        <View style={styles.topLocationsContainer}>
          {topLocations.map((location, index) => (
            <View key={location.name} style={styles.topLocationItem}>
              <Badge
                variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'info'}
                size="small"
              >
                {index + 1}
              </Badge>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationCount}>{location.count} phillboards</Text>
            </View>
          ))}
        </View>
      </Card>
      
      {/* Recent Transactions */}
      <Card title="Recent Earnings" style={styles.card}>
        {recentTransactions.length === 0 ? (
          <Text style={styles.emptyText}>No earnings yet</Text>
        ) : (
          recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIconContainer}>
                <MaterialIcons name="attach-money" size={24} color="#52C41A" />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>
                  Earnings from {transaction.phillboard?.location_name || 'Phillboard'}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                +${transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))
        )}
        
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>View All Transactions</Text>
          <MaterialIcons name="chevron-right" size={20} color="#FF5E3A" />
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  card: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  topLocationsContainer: {
    marginBottom: 10,
  },
  topLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationName: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  locationCount: {
    fontSize: 14,
    color: '#666',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F7E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#52C41A',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#FF5E3A',
    fontWeight: '500',
    marginRight: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 20,
  },
});

export default EarningsDashboard; 