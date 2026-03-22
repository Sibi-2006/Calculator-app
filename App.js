import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MediaProvider } from './context/MediaContext';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image as ImageIcon, Video, Folder, Settings as SettingsIcon } from 'lucide-react-native';

// Screens
import CalculatorScreen from './screens/CalculatorScreen';
import SetupScreen from './screens/SetupScreen';
import PhotoGallery from './screens/PhotoGallery';
import VideoGallery from './screens/VideoGallery';
import FileManager from './screens/FileManager';
import VaultSettings from './screens/VaultSettings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const VaultTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#060e20' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0a142c', borderTopWidth: 0 },
        tabBarActiveTintColor: '#00f2ff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        headerTitleAlign: 'center',
        headerTransparent: false,
        headerBlurEffect: 'dark',
      }}
    >
      <Tab.Screen 
        name="Photos" 
        component={PhotoGallery} 
        options={{ tabBarIcon: ({ color }) => <ImageIcon color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Videos" 
        component={VideoGallery} 
        options={{ tabBarIcon: ({ color }) => <Video color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Files" 
        component={FileManager} 
        options={{ tabBarIcon: ({ color }) => <Folder color={color} size={24} /> }}
      />
      <Tab.Screen 
        name="Settings" 
        component={VaultSettings} 
        options={{ tabBarIcon: ({ color }) => <SettingsIcon color={color} size={24} /> }}
      />
    </Tab.Navigator>
  );
};

const NavigationRoot = () => {
    const { isUnlocked, isSetupDone, loading } = useAuth();
    
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#00f2ff" />
            </View>
        );
    }
    
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#060e20' } }}>
            {isUnlocked ? (
                // MODE 1: Vault (Unlocked)
                <Stack.Screen name="Vault" component={VaultTabNavigator} />
            ) : !isSetupDone ? (
                // MODE 2: First Time Setup (Locked)
                <Stack.Screen name="Setup" component={SetupScreen} />
            ) : (
                // MODE 3: Stealth Calculator (Locked)
                <Stack.Screen name="Calculator" component={CalculatorScreen} />
            )}
        </Stack.Navigator>
    );
};

export default function App() {
  return (
    <AuthProvider>
      <MediaProvider>
        <NavigationContainer>
          <NavigationRoot />
        </NavigationContainer>
      </MediaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#060e20',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
