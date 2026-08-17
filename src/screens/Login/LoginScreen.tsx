import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡ GSB Sunpower</Text>

      <Text style={styles.title}>Welcome Back</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    marginVertical: 30,
  },

  button: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
