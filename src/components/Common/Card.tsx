import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../../theme/colors';
import Radius from '../../theme/radius';
import Shadow from '../../theme/shadow';

export default function Card({ children, style }: any) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,

    borderRadius: Radius.lg,

    padding: 15,

    ...Shadow.card,
  },
});
