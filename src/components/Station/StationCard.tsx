import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { Station } from '../../types/station';

interface Props {
  station: Station;

  selected?: boolean;

  onPress?: (station: Station) => void;
}

export default function StationCard({
  station,
  selected = false,
  onPress,
}: Props) {
  const color =
    station.status === 'Available'
      ? '#16A34A'
      : station.status === 'Busy'
      ? '#F59E0B'
      : '#DC2626';

  const total = station.chargers.reduce(
    (sum, charger) => sum + charger.connectors.length,
    0,
  );

  const available = station.chargers.reduce((sum, charger) => {
    return (
      sum +
      charger.connectors.filter(connector => connector.status === 'AVAILABLE')
        .length
    );
  }, 0);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => onPress?.(station)}>
      <View style={[styles.card, selected && styles.selected]}>
        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{station.name}</Text>

            <Text style={styles.address}>{station.address}</Text>
          </View>

          <View
            style={[
              styles.status,
              {
                backgroundColor: color,
              },
            ]}
          >
            <Ionicons name="flash" size={14} color="#FFFFFF" />

            <Text style={styles.statusText}>{station.status}</Text>
          </View>
        </View>

        {/* Charger */}

        <View style={styles.info}>
          <Text style={styles.count}>
            ⚡ {available}/{total}
          </Text>

          <Text style={styles.price}>{station.price} ฿/kWh</Text>
        </View>

        {/* Charger Type */}

        <View style={styles.chargerRow}>
          {station.chargers.map(charger => {
            const availableConnector = charger.connectors.filter(
              c => c.status === 'AVAILABLE',
            ).length;

            return (
              <View key={charger.chargerId} style={styles.charger}>
                <Text style={styles.chargerText}>
                  {charger.chargerType} {availableConnector}/
                  {charger.connectors.length}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 16,

    marginBottom: 12,

    elevation: 5,

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  selected: {
    borderWidth: 2,
    borderColor: '#16A34A',
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  name: {
    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },

  address: {
    marginTop: 4,

    fontSize: 12,

    color: '#64748B',
  },

  status: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 8,

    paddingVertical: 5,

    borderRadius: 20,
  },

  statusText: {
    color: '#FFFFFF',

    fontSize: 11,

    fontWeight: '700',

    marginLeft: 4,
  },

  info: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 14,
  },

  count: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  price: {
    fontSize: 14,

    fontWeight: '600',

    color: '#475569',
  },

  chargerRow: {
    flexDirection: 'row',

    marginTop: 12,
  },

  charger: {
    backgroundColor: '#F1F5F9',

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 12,

    marginRight: 8,
  },

  chargerText: {
    fontSize: 12,

    fontWeight: '600',

    color: '#334155',
  },
});
