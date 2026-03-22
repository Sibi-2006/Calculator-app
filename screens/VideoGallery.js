import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useMedia } from '../context/MediaContext';
import { Play, Plus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');
const itemSize = (width - 48) / 3;

const VideoGallery = () => {
  const { videos, loading, fetchMedia, uploadMedia } = useMedia();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMedia('video');
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMedia('video');
    setRefreshing(false);
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      try {
        await uploadMedia('video', asset.uri, 'mock_video_id_' + Date.now());
      } catch (e) {
        alert('Upload failed');
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoContainer}>
        {/* We use the video URI as a thumbnail placeholder if real thumbnails aren't available */}
        <Video
            source={{ uri: item.url }}
            style={styles.thumbnail}
            useNativeControls={false}
            resizeMode="cover"
            shouldPlay={false}
            positionMillis={500}
        />
        <View style={styles.playOverlay}>
            <Play color="#fff" fill="#fff" size={24} />
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.topLabel}>PROTECTED VIDEOS</Text>
          <Text style={styles.title}>Your Vault</Text>
        </View>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{videos.length} Videos</Text>
        </View>
      </View>

      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.list}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <TouchableOpacity style={styles.fab} onPress={pickVideo}>
        <BlurView intensity={20} style={styles.fabBlur}>
            <Plus color="#00f2ff" size={32} />
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060e20',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  topLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  badge: {
    backgroundColor: 'rgba(0,242,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#00f2ff',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  videoContainer: {
    width: itemSize,
    height: itemSize,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a2235',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,242,255,0.2)',
    elevation: 8,
  },
  fabBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default VideoGallery;
