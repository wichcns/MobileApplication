import React, { useCallback, useState } from 'react';

import { SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import BalanceCard from './Components/BalanceCard';
import TopUpSection from './Components/TopUpSection';

import { wallet } from '../../store/walletStore';
import { getWalletBalance } from '../../api/wallet.api';

export default function WalletScreen() {
  const navigation = useNavigation<any>();

  // ==========================================================
  // WALLET STATE
  // ==========================================================

  const [balance, setBalance] = useState(wallet.balance);
  const [loading, setLoading] = useState(false);

  // ==========================================================
  // LOAD WALLET FROM BACKEND
  // ==========================================================

  const loadWallet = useCallback(async () => {
    try {
      setLoading(true);

      console.log('===== WALLET LOAD START =====');

      const response = await getWalletBalance();

      console.log('===== WALLET API RESPONSE =====');
      console.log('Wallet Response:', response);
      console.log('Balance:', response?.balance);
      console.log('Data Balance:', response?.data?.balance);
      console.log('Wallet Balance:', response?.wallet?.balance);
      console.log('================================');

      // ========================================================
      // GET BACKEND BALANCE
      // ========================================================

      let backendBalance = 0;

      if (typeof response?.balance === 'number') {
        backendBalance = response.balance;
      } else if (typeof response?.data?.balance === 'number') {
        backendBalance = response.data.balance;
      } else if (typeof response?.wallet?.balance === 'number') {
        backendBalance = response.wallet.balance;
      }

      // ========================================================
      // BACKEND USES CENTS
      // Example:
      //
      // Backend = 50000
      // Display = 500.00
      // ========================================================

      const displayBalance = backendBalance / 100;

      console.log('===== WALLET BALANCE =====');
      console.log('Backend Balance:', backendBalance);
      console.log('Display Balance:', displayBalance);
      console.log('==========================');

      // ========================================================
      // UPDATE SCREEN STATE
      // ========================================================

      setBalance(displayBalance);
    } catch (error: any) {
      console.log('===== WALLET LOAD ERROR =====');
      console.log('Message:', error?.message);
      console.log('Response:', error?.response?.data);
      console.log('Status:', error?.response?.status);
      console.log('============================');

      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Unable to load wallet balance.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // RELOAD WHEN SCREEN COMES INTO FOCUS
  // ==========================================================

  useFocusEffect(
    useCallback(() => {
      loadWallet();
    }, [loadWallet]),
  );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================================
            BALANCE CARD
        ====================================================== */}

        <BalanceCard
          balance={balance}
          updatedAt={loading ? 'Updating...' : 'Just now'}
          onViewAll={() => {
            navigation.navigate('TransactionHistory');
          }}
        />

        {/* =====================================================
            TOP UP
        ====================================================== */}

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

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingBottom: 40,
  },
});
