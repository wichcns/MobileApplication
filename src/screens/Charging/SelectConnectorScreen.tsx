import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import ChargerCard from '../../components/Connector/ChargerCard';

import { Station, Charger, Connector } from '../../types/station';

// import { selectConnector } from '../../store/chargingStore';

export default function SelectConnectorScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const [selectedConnector, setSelectedConnector] = useState<{
    charger: Charger;
    connector: Connector;
  } | null>(null);

  const { station, verification } = route.params as {
    station: Station;
    verification?: { qrCodePayload?: string; accessCode?: string };
  };

  const handleSelectConnector = (charger: Charger, connector: Connector) => {
    setSelectedConnector({
      charger,
      connector,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Connector</Text>

      <Text style={styles.stationName}>{station.name}</Text>

      <Text style={styles.address}>{station.address}</Text>

      <FlatList
        data={station.chargers}
        keyExtractor={item => item.chargerId}
        renderItem={({ item }) => (
          <ChargerCard
            charger={item}
            selected={selectedConnector?.charger.chargerId === item.chargerId}
            onSelectConnector={handleSelectConnector}
          />
        )}
      />

      <TouchableOpacity
        disabled={!selectedConnector}
        onPress={() => {
          if (!selectedConnector) {
            return;
          }

          // After the connector is selected, show the real preparation step
          // before asking the user to check in and start a session.
          navigation.navigate('ReadyToCharge', {
            station,
            charger: selectedConnector.charger,
            connector: selectedConnector.connector,
            verification,
          });
        }}
        style={[styles.button, !selectedConnector && styles.disabled]}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',

    padding: 20,
  },

  title: {
    fontSize: 24,

    fontWeight: '700',

    color: '#111827',

    marginBottom: 20,
  },

  stationName: {
    fontSize: 18,

    fontWeight: '700',

    color: '#111827',
  },

  address: {
    marginTop: 5,

    color: '#64748B',

    marginBottom: 20,
  },

  button: {
    height: 50,

    backgroundColor: '#16A34A',

    borderRadius: 25,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 15,
  },

  disabled: {
    backgroundColor: '#CBD5E1',
  },

  buttonText: {
    color: '#FFFFFF',

    fontWeight: '700',

    fontSize: 16,
  },
});
