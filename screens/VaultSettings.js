import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, LogOut, Key, Trash2, ShieldCheck, Moon, Bell, Info } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const VaultSettings = () => {
  const { logout, clearVault } = useAuth();
  const [isFaceID, setIsFaceID] = useState(true);

  const handleClearVault = () => {
    Alert.alert(
      "Confirm Action",
      "Are you sure you want to clear the entire vault? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear Vault", style: "destructive", onPress: async () => {
            await clearVault();
        }}
      ]
    );
  };

  const SettingItem = ({ icon: Icon, title, value, type = 'nav', color = '#fff' }) => (
    <TouchableOpacity style={styles.settingItem}>
        <View style={styles.iconBox}>
            <Icon color={color} size={22} />
        </View>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        <View style={styles.rightContent}>
            {type === 'nav' ? (
                <View style={styles.navRow}>
                    <Text style={styles.navValue}>{value}</Text>
                    <ChevronRight color="rgba(255,255,255,0.2)" size={20} />
                </View>
            ) : (
                <Switch 
                   trackColor={{ false: "#1a2235", true: "#4d21e8" }} 
                   thumbColor={isFaceID ? "#00f2ff" : "#f4f3f4"}
                   onValueChange={() => setIsFaceID(!isFaceID)}
                   value={isFaceID} 
                />
            )}
        </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SECURITY SETTINGS</Text>
        <SettingItem icon={Key} title="Update Master PIN" value="••••" />
        <SettingItem icon={ShieldCheck} title="Biometric Unlock" type="switch" />
        <SettingItem icon={Bell} title="Vault Notifications" type="switch" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>APPEARANCE</Text>
        <SettingItem icon={Moon} title="Stealth Icon" value="Calculator" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DANGER ZONE</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleClearVault}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(235, 87, 87, 0.1)' }]}>
                <Trash2 color="#EB5757" size={22} />
            </View>
            <Text style={[styles.settingTitle, { color: '#EB5757' }]}>Wipe All Vault Data</Text>
            <ChevronRight color="rgba(255,255,255,0.2)" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut color="#00f2ff" size={24} />
          <Text style={styles.logoutText}>Close Vault & Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
          <Info color="rgba(255,255,255,0.2)" size={16} />
          <Text style={styles.versionText}>Vault v2.0.25 (Military-Grade Encryption)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060e20',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  rightContent: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navValue: {
    color: 'rgba(255,255,255,0.4)',
    marginRight: 8,
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 255, 0.2)',
    borderRadius: 16,
    backgroundColor: 'rgba(0, 242, 255, 0.05)',
  },
  logoutText: {
    color: '#00f2ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 40,
  },
  versionText: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: 12,
    marginLeft: 8,
  }
});

export default VaultSettings;
