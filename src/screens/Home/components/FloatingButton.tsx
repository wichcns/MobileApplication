import React from 'react';

import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';

import { radius } from '../../../theme/radius';

import { spacing } from '../../../theme/spacing';

import { shadows } from '../../../theme/shadow';

interface FloatingButtonProps {
  icon: string;

  onPress?: () => void;
}

const FloatingButton = ({ icon, onPress }: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    width: 52,

    height: 52,

    borderRadius: radius.full,

    backgroundColor: colors.surface,

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: spacing.md,

    ...shadows.floating,
  },

  icon: {
    fontSize: 24,
  },
});
