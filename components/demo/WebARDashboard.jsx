import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ARView } from '@niantic/lightship-react-native';
import { Camera } from 'expo-camera';
import { MapView } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

// Import UI components
import { 
  Avatar, 
  Badge, 
  Billboard, 
  Button, 
  Card, 
  Input, 
  Modal, 
  TabView 
} from '../ui';

// Import other components
import ARPhillboardRenderer from '../ARPhillboardRenderer';

// Sample data
const SAMPLE_USER = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  points: 1250,
  created: 12,
  viewed: 45
};

const SAMPLE_PHILLBOARDS = [
  { id: 1, title: 'Coffee Shop Ad', description: '50% off lattes this week!', location: 'Downtown' },
  { id: 2, title: 'New Apartments', description: 'Luxury apartments now leasing', location: 'Midtown' },
  { id: 3, title: 'Tech Conference', description: 'Annual developer meetup - June 15', location: 'Convention Center' }
];

const TABS = [
  { key: 'dashboard', title: 'Dashboard' },
  { key: 'ar', title: 'AR View' },
  { key: 'map', title: 'Map View' },
  { key: 'components', title: 'Components' }
];

const WebARDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <View style={styles.tabContent}>
            <View style={styles.header}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.headerGradient}
              >
                <Text style={styles.headerTitle}>Phillboards Dashboard</Text>
                <Text style={styles.headerSubtitle}>Web Demo Version</Text>
              </LinearGradient>
            </View>
            
            <View style={styles.userSection}>
              <Avatar 
                size={80} 
                source={{ uri: SAMPLE_USER.avatar }} 
                containerStyle={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{SAMPLE_USER.name}</Text>
                <View style={styles.statsRow}>
                  <Badge value={SAMPLE_USER.points} label="Points" />
                  <Badge value={SAMPLE_USER.created} label="Created" />
                  <Badge value={SAMPLE_USER.viewed} label="Viewed" />
                </View>
              </View>
            </View>
            
            <Card style={styles.analyticsCard}>
              <Text style={styles.cardTitle}>Your Activity</Text>
              <View style={styles.analyticsRow}>
                <View style={styles.analyticItem}>
                  <Text style={styles.analyticValue}>124</Text>
                  <Text style={styles.analyticLabel}>Views Today</Text>
                </View>
                <View style={styles.analyticItem}>
                  <Text style={styles.analyticValue}>1.2k</Text>
                  <Text style={styles.analyticLabel}>Monthly Views</Text>
                </View>
                <View style={styles.analyticItem}>
                  <Text style={styles.analyticValue}>$45</Text>
                  <Text style={styles.analyticLabel}>Revenue</Text>
                </View>
              </View>
            </Card>
            
            <Text style={styles.sectionTitle}>Recent Phillboards</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.recentPhillboards}
            >
              {SAMPLE_PHILLBOARDS.map(board => (
                <Card key={board.id} style={styles.phillboardCard}>
                  <View style={styles.phillboardContent}>
                    <Text style={styles.phillboardTitle}>{board.title}</Text>
                    <Text style={styles.phillboardDesc}>{board.description}</Text>
                    <Text style={styles.phillboardLocation}>{board.location}</Text>
                  </View>
                  <Button 
                    title="View Details" 
                    onPress={() => setModalVisible(true)} 
                    containerStyle={styles.phillboardButton}
                    type="outline"
                  />
                </Card>
              ))}
            </ScrollView>
          </View>
        );
        
      case 'ar':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>AR Viewer</Text>
            <View style={styles.arContainer}>
              <ARView style={styles.arView}>
                <Camera style={styles.cameraView} type={Camera.Constants.Type.back}>
                  <ARPhillboardRenderer />
                </Camera>
              </ARView>
              <View style={styles.arControls}>
                <Button 
                  title="Place Phillboard" 
                  onPress={() => {}} 
                  containerStyle={styles.arButton}
                />
                <Button 
                  title="Take Screenshot" 
                  onPress={() => {}} 
                  containerStyle={styles.arButton}
                  type="outline"
                />
              </View>
            </View>
          </View>
        );
        
      case 'map':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Map View</Text>
            <View style={styles.mapContainer}>
              <MapView 
                style={styles.mapView}
                showsUserLocation
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
          </View>
        );
        
      case 'components':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>UI Components</Text>
            <ScrollView style={styles.componentsScroll}>
              <Card style={styles.componentCard}>
                <Text style={styles.componentTitle}>Buttons</Text>
                <View style={styles.componentRow}>
                  <Button title="Primary" onPress={() => {}} />
                  <Button title="Secondary" type="secondary" onPress={() => {}} />
                  <Button title="Outline" type="outline" onPress={() => {}} />
                </View>
              </Card>
              
              <Card style={styles.componentCard}>
                <Text style={styles.componentTitle}>Inputs</Text>
                <Input
                  placeholder="Search"
                  value={searchText}
                  onChangeText={setSearchText}
                  containerStyle={styles.input}
                  leftIcon={{ name: 'search' }}
                />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  containerStyle={styles.input}
                  leftIcon={{ name: 'lock' }}
                />
              </Card>
              
              <Card style={styles.componentCard}>
                <Text style={styles.componentTitle}>Avatar & Badges</Text>
                <View style={styles.componentRow}>
                  <Avatar size={50} source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} />
                  <Avatar size={50} source={{ uri: 'https://randomuser.me/api/portraits/men/2.jpg' }} />
                  <View>
                    <Badge value="42" status="success" />
                    <Badge value="New" status="primary" />
                    <Badge value="Alert" status="error" />
                  </View>
                </View>
              </Card>
              
              <Card style={styles.componentCard}>
                <Text style={styles.componentTitle}>Billboard Preview</Text>
                <View style={styles.billboardContainer}>
                  <Billboard 
                    title="Sample Billboard"
                    description="This is how a billboard looks in AR"
                    image={{ uri: 'https://via.placeholder.com/300x200' }}
                  />
                </View>
              </Card>
              
              <Button 
                title="Open Modal Example" 
                onPress={() => setModalVisible(true)} 
                containerStyle={styles.modalButton}
              />
            </ScrollView>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={tab => setActiveTab(tab.key)}
        containerStyle={styles.tabView}
      />
      
      {renderTabContent()}
      
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        title="Sample Modal"
        containerStyle={styles.modal}
      >
        <Text style={styles.modalText}>
          This is a sample modal that demonstrates the Modal component functionality.
        </Text>
        <Button 
          title="Close Modal" 
          onPress={() => setModalVisible(false)} 
          containerStyle={styles.modalButton}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabView: {
    marginTop: 10,
  },
  tabContent: {
    flex: 1,
    padding: 15,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  header: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerGradient: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsRow: {
    flexDirection: 'row',
  },
  analyticsCard: {
    marginBottom: 20,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  analyticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  analyticItem: {
    alignItems: 'center',
  },
  analyticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  analyticLabel: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentPhillboards: {
    marginBottom: 20,
  },
  phillboardCard: {
    width: 250,
    marginRight: 15,
    padding: 15,
  },
  phillboardContent: {
    marginBottom: 10,
  },
  phillboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phillboardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  phillboardLocation: {
    fontSize: 12,
    color: '#999',
  },
  phillboardButton: {
    marginTop: 5,
  },
  arContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  arView: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
  arControls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arButton: {
    marginHorizontal: 5,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapView: {
    flex: 1,
  },
  componentsScroll: {
    flex: 1,
  },
  componentCard: {
    marginBottom: 15,
    padding: 15,
  },
  componentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  input: {
    marginBottom: 10,
  },
  billboardContainer: {
    height: 200,
    marginTop: 10,
  },
  modalButton: {
    marginTop: 15,
  },
  modal: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default WebARDashboard; 