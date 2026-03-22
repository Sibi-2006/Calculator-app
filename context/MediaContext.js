import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MediaContext = createContext();

const API_URL = 'https://calculator-backend-kncu.onrender.com/api/media'; // Live Render backend URL

export const MediaProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMedia = async (type = '') => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(type ? `${API_URL}?type=${type}` : API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;
      if (type === 'image') setPhotos(data);
      else if (type === 'video') setVideos(data);
      else if (type === 'file') setFiles(data);
      else {
        setPhotos(data.filter(i => i.type === 'image'));
        setVideos(data.filter(i => i.type === 'video'));
        setFiles(data.filter(i => i.type === 'file'));
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const uploadMedia = async (type, url, public_id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${API_URL}/upload`, { type, url, public_id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedia(type); // Refresh current type
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deleteMedia = async (id, type) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedia(type); // Refresh
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return (
    <MediaContext.Provider value={{
      photos,
      videos,
      files,
      loading,
      fetchMedia,
      uploadMedia,
      deleteMedia
    }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
