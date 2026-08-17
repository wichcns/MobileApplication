import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

export default function MapPlaceholder() {
  return (
    <View style={styles.container}>
      <Text style={styles.map}>🗺️</Text>

      <Text style={styles.text}>Google Map</Text>

      <View style={styles.marker1}>
        <Text>⚡</Text>
      </View>

      <View style={styles.marker2}>
        <Text>⚡</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#DDE7F0',

    justifyContent: 'center',

    alignItems: 'center',
  },

  map: {
    fontSize: 60,
  },

  text: {
    fontSize: 20,

    fontWeight: '700',

    marginTop: 10,
  },

  marker1: {
    position: 'absolute',

    top: 250,

    left: 100,
  },

  marker2: {
    position: 'absolute',

    top: 180,

    right: 120,
  },
});
