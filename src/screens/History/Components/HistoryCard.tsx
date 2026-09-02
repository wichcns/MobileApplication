import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { ChargingHistory } from '../../../types/history';

interface Props {
  item: ChargingHistory;
  onPress: () => void;
}

export default function HistoryCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="flash" size={22} color="#44C4CE" />
        </View>

        <View style={styles.stationContainer}>
          <Text style={styles.stationName}>{item.stationName}</Text>

          <Text style={styles.chargerName}>{item.chargerName}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.status === 'COMPLETED' ? styles.completed : styles.failed,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Information */}
      <View style={styles.infoRow}>
        <Text style={styles.label}>Connector</Text>
        <Text style={styles.value}>{item.connectorType}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Energy</Text>
        <Text style={styles.value}>{item.energy} kWh</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{item.duration} min</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.total}>฿{item.total.toFixed(2)}</Text>

        <Text style={styles.date}>{item.startTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3F6F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stationContainer: {
    flex: 1,
    marginLeft: 12,
  },

  stationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  chargerName: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  completed: {
    backgroundColor: '#D7F3F5',
  },

  failed: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  label: {
    color: '#6B7280',
    fontSize: 14,
  },

  value: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  total: {
    fontSize: 18,
    fontWeight: '700',
    color: '#44C4CE',
  },

  date: {
    fontSize: 12,
    color: '#6B7280',
  },
});
