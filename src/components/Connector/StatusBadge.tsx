import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { ConnectorStatus } from '../../types/station';

interface Props {
  status: ConnectorStatus;
}

const statusConfig: Record<string, {
  text: string;
  color: string;
  background: string;
}> = {
  AVAILABLE: {
    text: 'Ready',

    color: '#16A34A',

    background: '#DCFCE7',
  },

  CHARGING: {
    text: 'Charging',

    color: '#2563EB',

    background: '#DBEAFE',
  },

  OFFLINE: {
    text: 'Offline',

    color: '#6B7280',

    background: '#E5E7EB',
  },

  MAINTENANCE: {
    text: 'Maintenance',

    color: '#D97706',

    background: '#FEF3C7',
  },

  DISCONNECTED: {
    text: 'Disconnected',

    color: '#6B7280',

    background: '#E5E7EB',
  },

  PREPARING: {
    text: 'Preparing',

    color: '#2563EB',

    background: '#DBEAFE',
  },

  FINISHING: {
    text: 'Finishing',

    color: '#D97706',

    background: '#FEF3C7',
  },

  RESERVED: {
    text: 'Reserved',

    color: '#7C3AED',

    background: '#EDE9FE',
  },

  FAULTED: {
    text: 'Fault',

    color: '#991B1B',

    background: '#FECACA',
  },
};

export default function StatusBadge({ status }: Props) {
  const config = statusConfig[status] ?? {
    text: status,

    color: '#64748B',

    background: '#E5E7EB',
  };

  return (
    <View
      style={[
        styles.badge,

        {
          backgroundColor: config.background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,

          {
            color: config.color,
          },
        ]}
      >
        {config.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 20,
  },

  text: {
    fontWeight: '700',

    fontSize: 12,
  },
});
