import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { vehicles } from '../../store/vehicleStore';

export default function VehicleScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.brand} {item.model}
            </Text>

            <Text>Plate : {item.plateNumber}</Text>

            <Text>Battery : {item.batteryCapacity} kWh</Text>

            <Text>Connector : {item.connectorType}</Text>

            <Text>AC : {item.maxACPower} kW</Text>

            <Text>DC : {item.maxDCPower} kW</Text>

            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default Vehicle</Text>
              </View>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  defaultBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#16A34A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  defaultText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  addButton: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
