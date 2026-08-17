import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { shadows } from '../../../theme/shadow';

interface FilterButtonProps {
  onPress?: () => void;
}

const FilterButton = ({ onPress }: FilterButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>☰</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    width: 36,

    height: 36,

    borderRadius: radius.md,

    backgroundColor: colors.primary.main,

    alignItems: 'center',

    justifyContent: 'center',

    ...shadows.card,
  },

  icon: {
    fontSize: 18,

    color: colors.white,
  },
});
