import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useMedia } from '../context/MediaContext';
import { Plus, Search, MoreHorizontal, CheckCircle2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const itemSize = (width - 48) / 3;

const PhotoGallery = () => {
  const { photos, loading, fetchMedia, uploadMedia } = useMedia();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMedia('image');
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMedia('image');
    setRefreshing(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
        // Since we don't have a real file upload server implemented in this demo without Cloudinary keys 
        // We'll mock the upload to the database using the asset URI
        const asset = result.assets[0];
        try {
            await uploadMedia('image', asset.uri, 'mock_public_id_' + Date.now());
        } catch (e) {
            alert('Upload failed');
        }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
      {item.isSelected && (
          <View style={styles.selectionOverlay}>
              <CheckCircle2 color="#00f2ff" size={24} fill="rgba(0,0,0,0.4)" />
          </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.topLabel}>ENCRYPTED GALLERY</Text>
          <Text style={styles.title}>Recent Media</Text>
        </View>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{photos.length} Items</Text>
        </View>
      </View>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={3}
        contentContainerStyle={styles.list}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={!loading && (
          <View style={styles.empty}>
              <Text style={styles.emptyText}>No photos in vault</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={pickImage}>
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
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
  },
  badgeText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 12,
      fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  imageContainer: {
    width: itemSize,
    height: itemSize,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a2235',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectionOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,242,255,0.1)',
      borderWidth: 2,
      borderColor: '#00f2ff',
      borderRadius: 12,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: 4,
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
    shadowColor: '#00f2ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabBlur: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  empty: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 16,
  }
});

export default PhotoGallery;
