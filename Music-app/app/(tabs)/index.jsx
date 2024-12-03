

import React, { useState, useRef } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View 
} from 'react-native';
import { Audio } from 'expo-av'; 

import BottomTabNavigator from '../../components/BottomTabNavigator';
import HomeScreen from '../../screens/HomeScreen';
import PlaylistScreen from '../../screens/PlayListScreen';
import MusicPlayer from '../../components/MuiscPlayer';

export default function App() {
  const [currentTab, setCurrentTab] = useState('Home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundObject = useRef(null);

  const playPauseTrack = async (track) => {
    try {
      if (soundObject.current) {
        await soundObject.current.unloadAsync();
      }
        const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );
  
      soundObject.current = sound;
      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error) {
      console.error('Audio loading error:', error);
    }
  };

  const renderScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen onTrackPlay={playPauseTrack} />;
      case 'Playlist':
        return <PlaylistScreen />;
      default:
        return <HomeScreen onTrackPlay={playPauseTrack} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      
      <BottomTabNavigator 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
      />

      {currentTrack && (
        <MusicPlayer 
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => playPauseTrack(currentTrack)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  }
});

