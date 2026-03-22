import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useMedia } from '../context/MediaContext';
import { FileDown, FileText, Archive, MoreVertical, Plus, Trash2, Share } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const FileManager = () => {
    const { files, loading, fetchMedia, uploadMedia, deleteMedia } = useMedia();

    useEffect(() => {
        fetchMedia('file');
    }, []);

    const [filter, setFilter] = useState('All Files');
    const categories = ['All Files', 'Documents', 'Archives', 'Other'];

    const renderItem = ({ item }) => (
        <View style={styles.fileCard}>
            <BlurView intensity={10} tint="dark" style={styles.cardBlur}>
                <View style={[styles.iconBox, { backgroundColor: item.type === 'file' ? 'rgba(235, 87, 87, 0.1)' : 'rgba(0, 242, 255, 0.1)' }]}>
                    <FileText color={item.type === 'file' ? '#EB5757' : '#00f2ff'} size={24} />
                </View>
                <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{item.url.split('/').pop() || 'Untitled Document'}</Text>
                    <Text style={styles.details}>2.4 MB • {new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
                <TouchableOpacity style={styles.actionBtn}>
                    <MoreVertical color="rgba(255,255,255,0.4)" size={20} />
                </TouchableOpacity>
            </BlurView>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <FlatList 
                    horizontal 
                    data={categories} 
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={[styles.chip, filter === item && styles.activeChip]}
                            onPress={() => setFilter(item)}
                        >
                            <Text style={[styles.chipText, filter === item && styles.activeChipText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.chipList}
                />
            </View>

            <FlatList
                data={files}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={styles.fab}>
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
    toolbar: {
        paddingVertical: 16,
    },
    chipList: {
        paddingHorizontal: 20,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginRight: 10,
    },
    activeChip: {
        backgroundColor: '#00f2ff',
    },
    chipText: {
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '600',
    },
    activeChipText: {
        color: '#000',
    },
    list: {
        padding: 20,
    },
    fileCard: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardBlur: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileInfo: {
        flex: 1,
        marginLeft: 16,
    },
    fileName: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    details: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: 4,
    },
    actionBtn: {
        padding: 8,
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

export default FileManager;
