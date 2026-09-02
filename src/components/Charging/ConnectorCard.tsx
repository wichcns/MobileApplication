import React from 'react';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  charger: {
    type: string;
    available: number;
    total: number;
  };

  selected?: boolean;

  onPress?: () => void;
}

export default function ConnectorCard({
  charger,
  selected = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      <Text style={styles.type}>{charger.type}</Text>

      <Text>
        Available {charger.available}/{charger.total}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F1F5F9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  selected: {
    borderWidth: 2,
    borderColor: '#44C4CE',
  },

  type: {
    fontSize: 18,
    fontWeight: '700',
  },
});
