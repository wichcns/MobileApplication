import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

import TransactionItem from './TransactionItem';

interface Props {
  onViewAll?: () => void;
}

export default function RecentTransactionList({ onViewAll }: Props) {
  // const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>

        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <TransactionItem
        title="Wallet Top Up"
        amount={500}
        type="TOPUP"
        status="SUCCESS"
        date="Today • 10:20"
      />

      <TransactionItem
        title="Charging Session"
        amount={120}
        type="CHARGING"
        status="SUCCESS"
        date="Yesterday • 16:45"
      />

      <TransactionItem
        title="Refund"
        amount={50}
        type="REFUND"
        status="SUCCESS"
        date="28 Jul • 09:30"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,

    paddingHorizontal: 20,

    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 16,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    color: '#111827',
  },

  viewAll: {
    color: '#00A651',

    fontWeight: '700',
  },
});
