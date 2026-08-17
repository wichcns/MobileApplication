import React, { useState, useCallback } from 'react';

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

import BalanceCard from './Components/BalanceCard';

import TopUpSection from './Components/TopUpSection';

import { wallet } from '../../store/walletStore';

export default function WalletScreen() {
  const navigation = useNavigation<any>();

  const [, refresh] = useState(0);

  useFocusEffect(
    useCallback(() => {
      refresh(prev => prev + 1);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <BalanceCard
          balance={wallet.balance}
          updatedAt="Just now"
          onViewAll={() => {
            navigation.navigate('TransactionHistory');
          }}
        />

        <TopUpSection
          onContinue={amount => {
            navigation.navigate('PaymentMethod', {
              amount,
            });
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingBottom: 40,
  },
});
