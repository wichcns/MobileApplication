import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const color =
    station.status === 'Available'
      ? '#16A34A'
      : station.status === 'Busy'
      ? '#F59E0B'
      : '#DC2626';

  const chargers = station.chargers ?? [];

  const total = chargers.reduce(
    (sum, charger) => sum + (charger.connectors ?? []).length,
    0,
  );

  const available = chargers.reduce(
    (sum, charger) =>
      sum +
      (charger.connectors ?? []).filter(
        connector => connector.status === 'AVAILABLE',
      ).length,
    0,
  );

  const charging = chargers.reduce(
    (sum, charger) =>
      sum +
      (charger.connectors ?? []).filter(
        connector => connector.status === 'CHARGING',
      ).length,
    0,
  );

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => onPress?.(station)}>
      <View style={[styles.card, selected && styles.selected]}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {station.name}
            </Text>

            <Text style={styles.address} numberOfLines={2}>
              {station.address ?? 'Address unavailable'}
            </Text>
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

        <View style={styles.info}>
          <Text style={styles.count}>
            ⚡ {available}/{total}
            {charging > 0
              ? ` • ${t('station.chargingCount', { count: charging })}`
              : ''}
          </Text>

          <Text style={styles.price}>
            {station.price > 0 ? `${station.price} ฿/kWh` : 'Price unavailable'}
          </Text>
        </View>

        {chargers.length > 0 && (
          <View style={styles.chargerRow}>
            {chargers.map(charger => {
              const connectors = charger.connectors ?? [];

              const availableConnector = connectors.filter(
                connector => connector.status === 'AVAILABLE',
              ).length;

              return (
                <View key={charger.chargerId} style={styles.charger}>
                  <Text style={styles.chargerText}>
                    {charger.chargerType} {availableConnector}/
                    {connectors.length}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
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

  nameContainer: {
    flex: 1,

    marginRight: 10,
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

    flexWrap: 'wrap',
  },

  charger: {
    backgroundColor: '#F1F5F9',

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 12,

    marginRight: 8,

    marginBottom: 6,
  },

  chargerText: {
    fontSize: 12,

    fontWeight: '600',

    color: '#334155',
  },
});
