import React, { useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { topUpWallet } from '../../../store/walletStore';
import { addTransaction } from '../../../store/transactionStore';

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  useEffect(() => {
    if (amount > 0) {
      // เพิ่มเงินเข้า Wallet

      topUpWallet(amount);

      // บันทึก Transaction

      addTransaction({
        id: `TXN-${Date.now()}`,

        type: 'TOPUP',

        title: 'Wallet Top Up',

        description: 'Mobile Banking',

        amount: amount,

        status: 'SUCCESS',

        createdAt: new Date().toLocaleString(),
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="checkmark" size={60} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Payment Successful</Text>

        <Text style={styles.subtitle}>Your wallet has been topped up</Text>

        <Text style={styles.amount}>+ ฿{amount.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('WalletHome');
          }}
        >
          <Text style={styles.buttonText}>Back to Wallet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',

    padding: 20,
  },

  icon: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: '#00A651',

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    fontSize: 26,

    fontWeight: '800',

    marginTop: 30,

    color: '#111827',
  },

  subtitle: {
    marginTop: 10,

    color: '#64748B',
  },

  amount: {
    marginTop: 25,

    fontSize: 36,

    fontWeight: '900',

    color: '#00A651',
  },

  button: {
    marginTop: 50,

    width: '100%',

    backgroundColor: '#00A651',

    padding: 18,

    borderRadius: 18,

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '700',
  },
});
