import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StationCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>⚡ SunPower EV Station</Text>

      <Text>DC Fast Charger</Text>

      <Text>Available : 4 / 6</Text>

      <Text>Distance : 1.2 km</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 6,
  },
});
