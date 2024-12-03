
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const PLAYLIST_DATA = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: require('../assets/images/album1.jpg'),
    uri: require('../assets/songs/song1.mp3')
  },
  {
    id: '2',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    artwork: require('../assets/images/album2.jpg'),
    uri: require('../assets/songs/song2.mp3')
  },
  {
    id: '3',
    title: 'Alone',
    artist: 'The Weeknd',
    album: 'Alone',
    artwork: require('../assets/images/album1.jpg'),
    uri: require('../assets/songs/song3.mp3')
  }
];

export default function PlaylistScreen() {
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playTrack(track) {
    if (sound) {
      await sound.unloadAsync();
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        track.uri,
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading sound:', error);
      alert('Unable to play track. Please check file path.');
    }
  }

  async function togglePlayPause() {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => playTrack(item)}
    >
      <Image
        source={item.artwork}
        style={styles.artwork}
        resizeMode="cover"
      />
      <View style={styles.trackInfo}>
        <Text
          style={styles.trackTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text
          style={styles.trackArtist}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.artist}
        </Text>
      </View>
      <Ionicons
        name="play-circle"
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={PLAYLIST_DATA}
        renderItem={renderTrackItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Your Playlists</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />

      {currentTrack && (
        <View style={styles.currentTrackBar}>
          <Image source={currentTrack.artwork} style={styles.miniArtwork} />
          <View style={styles.currentTrackInfo}>
            <Text style={styles.currentTrackTitle}>{currentTrack.title}</Text>
            <Text style={styles.currentTrackArtist}>{currentTrack.artist}</Text>
          </View>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#282828'
  },
  screenTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  listContainer: {
    paddingBottom: 20
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#181818'
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  trackTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  trackArtist: {
    color: '#888',
    fontSize: 14
  },
  currentTrackBar: {
    position: 'absolute',
    bottom:0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 10
  },
  miniArtwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10
  },
  currentTrackInfo: {
    flex: 1
  },
  currentTrackTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  currentTrackArtist: {
    color: '#888',
    fontSize: 12
  }
});
