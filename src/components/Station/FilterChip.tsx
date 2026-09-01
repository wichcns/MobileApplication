import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export default function FilterChip({ title, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, selected && styles.selectedContainer]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,

    paddingHorizontal: 18,

    borderRadius: 20,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#F1F5F9',

    marginRight: 10,

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  selectedContainer: {
    backgroundColor: '#0F766E',

    borderColor: '#0F766E',
  },

  text: {
    fontSize: 14,

    fontWeight: '600',

    color: '#475569',
  },

  selectedText: {
    color: '#FFFFFF',
  },
});
