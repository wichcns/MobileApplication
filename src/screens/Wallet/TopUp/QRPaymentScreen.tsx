import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

export default function QRPaymentScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  const bank = route.params?.bank ?? 'BANK';

  const handlePayment = () => {
    navigation.navigate('PaymentProcessing', {
      amount,
      bank,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>{t('qrPayment.title')}</Text>
      </View>

      {/* =====================================================
          PAYMENT BANK
      ====================================================== */}

      <Text style={styles.label}>{t('qrPayment.paymentBank')}</Text>

      <Text style={styles.bank}>{bank}</Text>

      {/* =====================================================
          AMOUNT
      ====================================================== */}

      <Text style={styles.label}>{t('qrPayment.amount')}</Text>

      <Text style={styles.amount}>{amount.toFixed(2)} THB</Text>

      {/* =====================================================
          QR CODE
      ====================================================== */}

      <View style={styles.qrContainer}>
        <Ionicons name="qr-code" size={180} color="#111827" />

        <Text style={styles.qrText}>{t('qrPayment.scanQrToPay')}</Text>
      </View>

      {/* =====================================================
          PAYMENT BUTTON
      ====================================================== */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={handlePayment}
      >
        <Text style={styles.buttonText}>{t('qrPayment.iHavePaid')}</Text>

        <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    padding: 20,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 30,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    marginLeft: 20,

    color: '#111827',
  },

  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    color: '#64748B',

    marginTop: 20,

    fontSize: 14,
  },

  // ==========================================================
  // BANK
  // ==========================================================

  bank: {
    fontSize: 20,

    fontWeight: '700',

    marginTop: 5,

    color: '#111827',
  },

  // ==========================================================
  // AMOUNT
  // ==========================================================

  amount: {
    fontSize: 32,

    fontWeight: '800',

    color: '#00A651',

    marginTop: 5,
  },

  // ==========================================================
  // QR
  // ==========================================================

  qrContainer: {
    marginTop: 40,

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 40,

    alignItems: 'center',

    justifyContent: 'center',

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  qrText: {
    marginTop: 20,

    fontSize: 16,

    fontWeight: '600',

    color: '#64748B',
  },

  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    marginTop: 40,

    backgroundColor: '#00A651',

    height: 56,

    borderRadius: 18,

    alignItems: 'center',

    justifyContent: 'center',

    flexDirection: 'row',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '700',

    marginRight: 8,
  },
});
