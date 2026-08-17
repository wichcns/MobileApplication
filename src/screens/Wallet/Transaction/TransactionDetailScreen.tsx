import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function TransactionDetailScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Detail</Text>

      <View style={styles.card}>
        <Text style={styles.status}>
          {transaction.type === 'CHARGING'
            ? '⚡ EV Charging'
            : '💰 Wallet Top Up'}
        </Text>

        <View style={styles.divider} />

        {transaction.stationName && (
          <>
            <Text style={styles.label}>Station</Text>

            <Text style={styles.value}>{transaction.stationName}</Text>
          </>
        )}

        {transaction.chargerName && (
          <>
            <Text style={styles.label}>Charger</Text>

            <Text style={styles.value}>{transaction.chargerName}</Text>
          </>
        )}

        {transaction.energy && (
          <>
            <Text style={styles.label}>Energy</Text>

            <Text style={styles.value}>{transaction.energy} kWh</Text>
          </>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>

          <Text style={styles.amount}>{transaction.amount.toFixed(2)} THB</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment</Text>

          <Text style={styles.value}>{transaction.paymentMethod || '-'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>

          <Text style={styles.value}>{transaction.date}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
  },

  status: {
    fontSize: 20,
    fontWeight: '800',
    color: '#16A34A',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },

  label: {
    color: '#64748B',
    marginTop: 10,
  },

  value: {
    color: '#111827',
    fontWeight: '700',
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  amount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#EF4444',
  },

  button: {
    marginTop: 30,
    height: 55,
    backgroundColor: '#16A34A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
