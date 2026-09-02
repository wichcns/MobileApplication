import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChargingCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>⚡ Current Charging</Text>

      <Text style={styles.station}>SunPower Station A01</Text>

      <Text>Charging : 56%</Text>

      <Text>Power : 32.5 kW</Text>

      <Text>Time : 00:18:24</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EAF9FA',
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  station: {
    fontWeight: '600',
    marginBottom: 6,
  },
});
