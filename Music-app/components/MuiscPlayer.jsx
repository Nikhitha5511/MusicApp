import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MusicPlayer({ track, isPlaying, onPlayPause }) {
  return (
    <View style={styles.currentTrackBar}>
      <Image source={track.artwork} style={styles.miniArtwork} />
      <View style={styles.currentTrackInfo}>
        <Text style={styles.currentTrackTitle}>{track.title}</Text>
        <Text style={styles.currentTrackArtist}>{track.artist}</Text>
      </View>
      <TouchableOpacity onPress={onPlayPause}>
        <Ionicons 
          name={isPlaying ? 'pause' : 'play'} 
          size={30} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  currentTrackBar: {
    position: 'absolute',
    bottom: 60,
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