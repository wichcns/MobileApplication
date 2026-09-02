import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { wallet, topUpWallet } from '../../store/walletStore';

export default function WalletScreen() {
  const [refresh, setRefresh] = useState(false);

  const [customAmount, setCustomAmount] = useState('');

  const handleTopUp = (amount: number) => {
    topUpWallet(amount);

    setRefresh(!refresh);
  };

  const handleCustomTopUp = () => {
    const amount = Number(customAmount);

    if (!amount || amount <= 0) {
      return;
    }

    topUpWallet(amount);

    setCustomAmount('');

    setRefresh(!refresh);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Wallet</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance</Text>

        <Text style={styles.balance}>{wallet.balance.toFixed(2)} THB</Text>
      </View>

      <Text style={styles.sectionTitle}>Top Up Wallet</Text>

      <View style={styles.topUpContainer}>
        <TouchableOpacity
          style={styles.topUpButton}
          onPress={() => {
            handleTopUp(100);
          }}
        >
          <Text style={styles.topUpText}>+100 THB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.topUpButton}
          onPress={() => {
            handleTopUp(300);
          }}
        >
          <Text style={styles.topUpText}>+300 THB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.topUpButton}
          onPress={() => {
            handleTopUp(500);
          }}
        >
          <Text style={styles.topUpText}>+500 THB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.topUpButton}
          onPress={() => {
            handleTopUp(1000);
          }}
        >
          <Text style={styles.topUpText}>+1000 THB</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.customContainer}>
        <Text style={styles.customTitle}>Enter Amount</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={customAmount}
          onChangeText={setCustomAmount}
        />

        <TouchableOpacity
          style={styles.customButton}
          onPress={handleCustomTopUp}
        >
          <Text style={styles.buttonText}>Top Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Transaction History</Text>

      <View style={styles.card}>
        {wallet.transactions.length === 0 ? (
          <Text>No Transactions</Text>
        ) : (
          wallet.transactions.map(item => (
            <View key={item.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <Text style={styles.description}>
                  {item.type === 'CHARGING'
                    ? '⚡ EV Charging'
                    : '💰 Wallet Top Up'}
                </Text>

                <Text style={item.amount < 0 ? styles.minus : styles.plus}>
                  {item.amount > 0 ? '+' : ''}
                  {item.amount.toFixed(2)} THB
                </Text>
              </View>

              {item.type === 'CHARGING' && (
                <View style={styles.evDetail}>
                  <Text style={styles.detailText}>
                    Station : {item.stationName}
                  </Text>

                  <Text style={styles.detailText}>
                    Charger : {item.chargerName}
                  </Text>

                  <Text style={styles.detailText}>
                    Energy : {item.energy?.toFixed(2)} kWh
                  </Text>

                  <Text style={styles.detailText}>
                    Payment : {item.paymentMethod}
                  </Text>

                  <Text style={styles.detailText}>
                    Balance After : {item.balanceAfter.toFixed(2)} THB
                  </Text>
                </View>
              )}

              <Text style={styles.date}>{item.date}</Text>
            </View>
          ))
        )}
      </View>
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

  balanceCard: {
    backgroundColor: '#44C4CE',

    padding: 25,

    borderRadius: 20,
  },

  balanceLabel: {
    color: '#FFFFFF',

    fontSize: 16,
  },

  balance: {
    color: '#FFFFFF',

    fontSize: 36,

    fontWeight: '900',

    marginTop: 10,
  },

  sectionTitle: {
    marginTop: 25,

    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  topUpContainer: {
    marginTop: 15,

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  topUpButton: {
    width: '48%',

    height: 45,

    backgroundColor: '#44C4CE',

    borderRadius: 15,

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 15,
  },

  topUpText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '800',
  },

  customContainer: {
    marginTop: 10,

    backgroundColor: '#FFFFFF',

    padding: 20,

    borderRadius: 20,
  },

  customTitle: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',

    marginBottom: 10,
  },

  input: {
    height: 50,

    borderWidth: 1,

    borderColor: '#CBD5E1',

    borderRadius: 15,

    paddingHorizontal: 15,

    fontSize: 18,

    fontWeight: '700',

    backgroundColor: '#F8FAFC',
  },

  customButton: {
    marginTop: 15,

    height: 45,

    backgroundColor: '#44C4CE',

    borderRadius: 15,

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 18,

    fontWeight: '800',
  },

  subtitle: {
    marginTop: 30,

    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  card: {
    marginTop: 15,

    backgroundColor: '#FFFFFF',

    padding: 20,

    borderRadius: 20,
  },

  transaction: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 18,
  },

  description: {
    fontWeight: '700',

    color: '#111827',
  },

  date: {
    marginTop: 5,

    fontSize: 12,

    color: '#64748B',
  },

  plus: {
    color: '#44C4CE',

    fontWeight: '800',
  },

  minus: {
    color: '#DC2626',

    fontWeight: '800',
  },

  transactionCard: {
    backgroundColor: '#F8FAFC',

    padding: 15,

    borderRadius: 15,

    marginBottom: 15,
  },

  transactionHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  evDetail: {
    marginTop: 12,
  },

  detailText: {
    color: '#475569',

    fontSize: 14,

    marginBottom: 5,
  },
});
