import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import QuickActionCard from './QuickActionCard';

export default function QuickActionGrid() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>

      <View style={styles.grid}>
        <QuickActionCard
          title="Top Up"
          subtitle="Add Wallet Balance"
          icon="add-circle-outline"
          onPress={() => navigation.navigate('TopUp')}
        />

        <QuickActionCard
          title="History"
          subtitle="Transaction History"
          icon="time-outline"
          color="#2563EB"
          onPress={() => navigation.navigate('TransactionHistory')}
        />

        <QuickActionCard
          title="Payment"
          subtitle="Payment Methods"
          icon="card-outline"
          color="#F59E0B"
          onPress={() => navigation.navigate('PaymentMethod')}
        />

        <QuickActionCard
          title="Promotion"
          subtitle="Coupons & Rewards"
          icon="gift-outline"
          color="#8B5CF6"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,

    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    marginBottom: 18,

    color: '#111827',
  },

  grid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },
});
