import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FloatingQRButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.icon}>📷</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,

    width: 65,
    height: 65,

    borderRadius: 35,

    backgroundColor: '#00A651',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,
  },

  icon: {
    fontSize: 28,
    color: '#fff',
  },
});
