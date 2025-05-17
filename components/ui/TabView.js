import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

/**
 * TabView Component
 * 
 * A customizable tab view component.
 * 
 * @param {array} tabs - Array of tab objects with label and optional icon
 * @param {number} initialTab - Index of the initial active tab
 * @param {function} onTabChange - Function to call when tab changes
 * @param {string} variant - default, underline, pills
 * @param {boolean} scrollable - Whether tabs should be scrollable
 * @param {object} style - Additional style for the container
 * @param {object} tabStyle - Additional style for each tab
 * @param {object} activeTabStyle - Additional style for the active tab
 * @param {object} tabTextStyle - Additional style for tab text
 * @param {object} activeTabTextStyle - Additional style for active tab text
 */
const TabView = ({
  tabs = [],
  initialTab = 0,
  onTabChange,
  variant = 'default',
  scrollable = false,
  style,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [indicatorPosition] = useState(new Animated.Value(0));
  const [indicatorWidth] = useState(new Animated.Value(0));
  const tabRefs = React.useRef([]);

  // Define variant styles
  const variantStyles = {
    default: {
      container: {},
      tab: {},
      activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF5E3A',
      },
      tabText: {
        color: '#666666',
      },
      activeTabText: {
        color: '#FF5E3A',
        fontWeight: '600',
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#FF5E3A',
        position: 'absolute',
        bottom: 0,
      },
    },
    underline: {
      container: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
      },
      tab: {},
      activeTab: {},
      tabText: {
        color: '#666666',
      },
      activeTabText: {
        color: '#FF5E3A',
        fontWeight: '600',
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#FF5E3A',
        position: 'absolute',
        bottom: 0,
      },
    },
    pills: {
      container: {
        backgroundColor: '#F5F5F5',
        borderRadius: 100,
        padding: 4,
      },
      tab: {
        borderRadius: 100,
      },
      activeTab: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      tabText: {
        color: '#666666',
      },
      activeTabText: {
        color: '#FF5E3A',
        fontWeight: '600',
      },
      indicatorStyle: {
        display: 'none',
      },
    },
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  // Handle tab press
  const handleTabPress = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
    
    // Only animate indicator for default and underline variants
    if (variant !== 'pills' && tabRefs.current[index]) {
      tabRefs.current[index].measure((x, y, width, pageX) => {
        Animated.parallel([
          Animated.timing(indicatorPosition, {
            toValue: pageX,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(indicatorWidth, {
            toValue: width,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }
  };

  // Initialize indicator position and width
  React.useEffect(() => {
    if (variant !== 'pills' && tabRefs.current[activeTab]) {
      setTimeout(() => {
        tabRefs.current[activeTab].measure((x, y, width, pageX) => {
          indicatorPosition.setValue(pageX);
          indicatorWidth.setValue(width);
        });
      }, 100);
    }
  }, []);

  // Render tab bar
  const renderTabBar = () => {
    const TabContainer = scrollable ? ScrollView : View;
    
    return (
      <View style={[styles.tabBarContainer, selectedVariant.container]}>
        <TabContainer 
          horizontal={scrollable}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={scrollable ? styles.scrollableTabBar : styles.tabBar}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              ref={(ref) => (tabRefs.current[index] = ref)}
              style={[
                styles.tab,
                selectedVariant.tab,
                activeTab === index && selectedVariant.activeTab,
                tabStyle,
                activeTab === index && activeTabStyle,
              ]}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              {tab.icon && tab.icon}
              <Text
                style={[
                  styles.tabText,
                  selectedVariant.tabText,
                  tabTextStyle,
                  activeTab === index && selectedVariant.activeTabText,
                  activeTab === index && activeTabTextStyle,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </TabContainer>
        
        {variant !== 'pills' && (
          <Animated.View
            style={[
              selectedVariant.indicatorStyle,
              {
                left: indicatorPosition,
                width: indicatorWidth,
              },
            ]}
          />
        )}
      </View>
    );
  };

  // Render content
  const renderContent = () => {
    if (Array.isArray(children)) {
      return children[activeTab] || null;
    }
    return children;
  };

  return (
    <View style={[styles.container, style]}>
      {renderTabBar()}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'relative',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollableTabBar: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
});

export default TabView; 