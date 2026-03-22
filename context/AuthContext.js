import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://192.168.16.101:5000/api/auth'; // Replace with your actual local IP or hosted backend URL

export const AuthProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [user, setUser] = useState(null);
  const [isSetupDone, setIsSetupDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const setup = await AsyncStorage.getItem('setupDone');
      if (setup === 'true') {
        setIsSetupDone(true);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const setupVault = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/setup`, { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('vaultEmail', email); // Store for future logins
      await AsyncStorage.setItem('setupDone', 'true');
      setUser(res.data.user);
      setIsUnlocked(true);
      setIsSetupDone(true);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.response?.data?.message || 'Setup failed' };
    }
  };

  const login = async (password) => {
    try {
      const email = await AsyncStorage.getItem('vaultEmail');
      if (!email) return { success: false, message: 'Vault not initialized correctly' };
      
      const res = await axios.post(`${API_URL}/login`, { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsUnlocked(true);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.response?.data?.message || 'Invalid PIN' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsUnlocked(false);
  };

  const clearVault = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await axios.delete(`${API_URL}/clear-vault`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('vaultEmail');
      await AsyncStorage.removeItem('setupDone');
      setIsUnlocked(false);
      setIsSetupDone(false);
      return { success: true };
    } catch (e) {
      // Still need to reset local state even if backend fails
      await AsyncStorage.clear();
      setIsUnlocked(false);
      setIsSetupDone(false);
      return { success: true }; 
    }
  }

  return (
    <AuthContext.Provider value={{
      isUnlocked,
      setIsUnlocked,
      isSetupDone,
      setupVault,
      login,
      logout,
      clearVault,
      loading,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
