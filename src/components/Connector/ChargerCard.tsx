import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Charger, Connector } from '../../types/station';

import ConnectorButton from './ConnectorButton';

interface Props {
  charger: Charger;

  selected?: boolean;

  onSelectConnector: (charger: Charger, connector: Connector) => void;
}

export default function ChargerCard({
  charger,

  selected,

  onSelectConnector,
}: Props) {
  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      {/* Charger Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.chargerId}>⚡ {charger.chargerId}</Text>

          <Text style={styles.name}>{charger.chargerName}</Text>
        </View>

        <View style={styles.powerContainer}>
          <Text style={styles.power}>{charger.maxPower} kW</Text>
        </View>
      </View>

      {/* Connector List */}

      <View style={styles.connectorContainer}>
        {charger.connectors.map(connector => (
          <ConnectorButton
            key={`${charger.chargerId}-${connector.connectorId}`}
            connector={connector}
            onPress={() => {
              onSelectConnector(
                charger,

                connector,
              );
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 18,

    marginBottom: 18,

    elevation: 4,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 6,
  },

  selectedCard: {
    borderWidth: 2,

    borderColor: '#44C4CE',
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 12,
  },

  chargerId: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  name: {
    marginTop: 4,

    color: '#64748B',

    fontSize: 14,
  },

  powerContainer: {
    backgroundColor: '#EFF6FF',

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20,
  },

  power: {
    color: '#2563EB',

    fontWeight: '700',
  },

  connectorContainer: {
    marginTop: 8,
  },
});
