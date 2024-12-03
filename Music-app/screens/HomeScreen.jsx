import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';


const HOME_DATA = {
  playlists: [
    {
      id: 'playlist1',
      title: 'Daily Mix 1',
      description: 'Arctic Monkeys, The Strokes, and more',
      image: require('../assets/images/album1.jpg')
    },
    {
      id: 'playlist2',
      title: 'Discover Weekly',
      description: 'Your weekly playlist of new discoveries',
      image: require('../assets/images/album2.jpg')
    }
  ],
  recentlyPlayed: [
    {
      id: 'recent1',
      title: 'AM',
      artist: 'Arctic Monkeys',
      image: require('../assets/images/album1.jpg')
    },
    {
      id: 'recent2',
      title: 'Currents',
      artist: 'Tame Impala',
      image: require('../assets/images/album2.jpg')
    }
  ]
};

export default function HomeScreen({ onTrackPlay }) {
  const renderHomeSection = ({ item, index }) => {
    const sectionTitle = index === 0 ? 'Playlists' : 'Recently Played';
    return (
      <SafeAreaView>
      <View style={styles.homeSection}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <FlatList
          horizontal
          data={item}
          keyExtractor={(section) => section.id}
          renderItem={({ item: section }) => (
            <TouchableOpacity 
              style={styles.horizontalItem}
              onPress={() => onTrackPlay(section)}
            >
              <Image source={section.image} style={styles.horizontalImage} />
              <Text style={styles.horizontalTitle}>{section.title}</Text>
              <Text style={styles.horizontalDescription}>
                {section.description || section.artist}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={[HOME_DATA.playlists, HOME_DATA.recentlyPlayed]}
      renderItem={renderHomeSection}
      keyExtractor={(_, index) => index.toString()}
      ListHeaderComponent={
        <Text style={styles.screenTitle}></Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 14
  },
  homeSection: {
    marginBottom: 20
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  horizontalItem: {
    marginHorizontal: 10,
    width: 150
  },
  horizontalImage: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  horizontalTitle: {
    color: 'white',
    marginTop: 10,
    fontSize: 14
  },
  horizontalDescription: {
    color: '#666',
    fontSize: 12
  }
});