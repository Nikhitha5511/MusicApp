import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabNavigator({ currentTab, onTabChange }) {
  const tabs = [
    { 
      name: 'Home', 
      icon: 'home', 
      activeIcon: 'home' 
    },
    { 
      name: 'Playlist', 
      icon: 'list', 
      activeIcon: 'list' 
    }
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabItem}
          onPress={() => onTabChange(tab.name)}
        >
          <Ionicons 
            name={currentTab === tab.name ? tab.activeIcon : tab.icon}
            size={24} 
            color={currentTab === tab.name ? 'white' : '#666'}
          />
          <Text 
            style={[
              styles.tabText, 
              { color: currentTab === tab.name ? 'white' : '#666' }
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center'
  },
  tabText: {
    fontSize: 12,
    marginTop: 5
  }
});