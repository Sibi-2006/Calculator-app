import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Vibration } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const CalculatorScreen = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const { login, clearVault } = useAuth();

  const handlePress = async (val) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (val === 'AC') {
      setDisplay('0');
      setExpression('');
    } else if (val === '=') {
      try {
        // EMERGENCY RESET TRIGER
        if (display === '0000') {
            await clearVault(); // This helper function resets everything
            alert('Vault Reset Successful. App will restart.');
            return;
        }

        // LOGOUT & NEW ACCOUNT TRIGGER
        if (display === '1111') {
            await clearVault(); // We clear storage to allow a fresh setup
            alert('Logged out. Please set up a new account.');
            return;
        }

        // Vault check - Try login first
        if (display && display !== '0') {
           const result = await login(display);
           if (result.success) return; // Navigation will redirect automatically
        }
        
        // If not a valid vault PIN, proceed to math
        if (expression) {
            const result = eval(expression + display.replace(/,/g, ''));
            setDisplay(result.toString());
            setExpression('');
        }
      } catch (e) {
        // Only show error if math fails after login attempt fails
        setDisplay('Error');
      }
    } else if (['+', '-', '*', '/'].includes(val)) {
      setExpression(`${display} ${val} `);
      setDisplay('0');
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const buttons = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>{expression}</Text>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity 
                key={btn} 
                style={[
                    styles.button, 
                    btn === '0' && { width: (width / 4) * 2 - 20 },
                    ['/', '*', '-', '+', '='].includes(btn) && styles.operatorButton,
                    ['AC', '+/-', '%'].includes(btn) && styles.topButton
                ]}
                onPress={() => handlePress(btn)}
              >
                <Text style={[
                  styles.buttonText,
                  ['AC', '+/-', '%'].includes(btn) && styles.topButtonText,
                ]}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060e20',
    paddingBottom: 20,
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  expressionText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 24,
    marginBottom: 10,
  },
  displayText: {
    color: '#fff',
    fontSize: 72,
    fontWeight: '300',
  },
  buttonContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: width / 4 - 20,
    height: width / 4 - 20,
    borderRadius: (width / 4 - 20) / 2,
    backgroundColor: '#1a2235',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
  operatorButton: {
    backgroundColor: '#4d21e8',
  },
  topButton: {
    backgroundColor: '#252d3d',
  },
  topButtonText: {
      color: '#00f2ff',
  }
});

export default CalculatorScreen;
