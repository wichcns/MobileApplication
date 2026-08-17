import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { Connector } from '../../types/station';
import StatusBadge from './StatusBadge';

interface Props {
  connector: Connector;

  onPress: () => void;
}

export default function ConnectorButton({ connector, onPress }: Props) {
  const isDisabled = connector.status !== 'AVAILABLE';

  return (
    <TouchableOpacity
      style={[styles.container, isDisabled && styles.disabled]}
      disabled={isDisabled}
      onPress={onPress}
    >
      <View>
        <Text style={styles.label}>Connector {connector.label}</Text>

        <Text style={styles.power}>{connector.type}</Text>
      </View>

      <StatusBadge status={connector.status} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  disabled: {
    opacity: 0.6,
  },

  label: {
    fontWeight: '700',
    fontSize: 16,
  },

  power: {
    color: '#64748B',
    marginTop: 2,
  },
});