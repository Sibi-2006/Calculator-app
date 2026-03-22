import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Mail, Lock, Fingerprint, ShieldCheck } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const SetupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setupVault } = useAuth();

  const handleSetup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await setupVault(email, password);
    setLoading(false);
    if (!result.success) alert(result.message);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShieldCheck color="#00f2ff" size={48} />
        <Text style={styles.title}>Set Up Your Vault</Text>
        <Text style={styles.subtitle}>
          Initialize your encrypted storage with military-grade protection.
        </Text>
      </View>

      <View style={styles.card}>
        <BlurView intensity={20} style={styles.blurContainer} tint="dark">
            <View style={styles.inputGroup}>
                <Text style={styles.label}>MASTER EMAIL</Text>
                <View style={styles.inputWrapper}>
                    <Mail color="#00f2ff" size={20} />
                    <TextInput 
                        placeholder="vault@secure.com"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>VAULT KEYPHRASE</Text>
                <View style={styles.inputWrapper}>
                    <Lock color="#00f2ff" size={20} />
                    <TextInput 
                        placeholder="••••••••••••"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>CONFIRM KEYPHRASE</Text>
                <View style={styles.inputWrapper}>
                    <ShieldCheck color="#00f2ff" size={20} />
                    <TextInput 
                        placeholder="••••••••••••"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.input}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
            </View>

            <View style={styles.switchRow}>
                <View style={styles.switchLabel}>
                    <Fingerprint color="#4d21e8" size={24} />
                    <View>
                        <Text style={styles.switchText}>Enable Fingerprint Unlock</Text>
                        <Text style={styles.switchSubtext}>Biometric access for quick entry</Text>
                    </View>
                </View>
                {/* Switch placeholder */}
                <View style={styles.toggleOn}></View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSetup} disabled={loading}>
                <LinearGradient
                  colors={['#00f2ff', '#4d21e8']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradientButton}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : (
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Create Secure Vault</Text>
                            <ShieldAlert color="#fff" size={20} />
                        </View>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        </BlurView>
      </View>
      
      <Text style={styles.footerText}>
          By creating a vault, you agree to our <Text style={styles.linkText}>Security Protocols</Text>. Data is locally encrypted.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060e20',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  blurContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#00f2ff',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  switchSubtext: {
    color: 'rgba(255,255,255,0.4)',
    marginLeft: 12,
    fontSize: 12,
  },
  toggleOn: {
      width: 48,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#4d21e8',
      alignItems: 'flex-end',
      padding: 2,
  },
  button: {
    borderRadius: 28,
    overflow: 'hidden',
    height: 56,
  },
  gradientButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footerText: {
      textAlign: 'center',
      color: 'rgba(255,255,255,0.3)',
      marginTop: 40,
      fontSize: 12,
  },
  linkText: {
      color: '#00f2ff',
  }
});

export default SetupScreen;
