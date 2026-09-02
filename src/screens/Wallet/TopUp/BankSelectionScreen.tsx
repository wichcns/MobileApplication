import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

const banks = [
  {
    id: 'BBL',
    name: 'Bangkok Bank',
    short: 'BBL',
  },

  {
    id: 'KBANK',
    name: 'Kasikorn Bank',
    short: 'KBank',
  },

  {
    id: 'SCB',
    name: 'Siam Commercial Bank',
    short: 'SCB',
  },

  {
    id: 'KTB',
    name: 'Krungthai Bank',
    short: 'KTB',
  },
];

export default function BankSelectionScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  const [selectedBank, setSelectedBank] = useState('');

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

        <Text style={styles.title}>{t('selectBank.title')}</Text>
      </View>

      {/* =====================================================
        TOP UP AMOUNT
    ====================================================== */}

      <Text style={styles.label}>{t('selectBank.topUpAmount')}</Text>

      <Text style={styles.amount}>
        {amount.toFixed(2)} {t('common.currency')}
      </Text>

      {/* =====================================================
        BANK SELECTION
    ====================================================== */}

      <Text style={styles.section}>{t('selectBank.selectYourBank')}</Text>

      {banks.map(bank => {
        const isSelected = selectedBank === bank.id;

        return (
          <TouchableOpacity
            key={bank.id}
            style={[styles.bankCard, isSelected && styles.selected]}
            activeOpacity={0.8}
            onPress={() => setSelectedBank(bank.id)}
          >
            {/* BANK ICON */}

            <View style={styles.bankIcon}>
              <Ionicons
                name="business"
                size={26}
                color={isSelected ? '#FFFFFF' : '#44C4CE'}
              />
            </View>

            {/* BANK INFORMATION */}

            <View style={styles.bankInfo}>
              <Text
                style={[styles.bankName, isSelected && styles.bankNameSelected]}
              >
                {bank.name}
              </Text>

              <Text style={[styles.short, isSelected && styles.shortSelected]}>
                {bank.short}
              </Text>
            </View>

            {/* SELECTED ICON */}

            {isSelected && (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* =====================================================
        CONTINUE
    ====================================================== */}

      <TouchableOpacity
        disabled={!selectedBank}
        activeOpacity={0.85}
        style={[styles.button, !selectedBank && styles.buttonDisabled]}
        onPress={() => {
          if (!selectedBank) {
            return;
          }

          navigation.navigate('QRPayment', {
            amount,
            bank: selectedBank,
          });
        }}
      >
        <Text style={styles.buttonText}>{t('common.continue')}</Text>

        <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // TOP UP AMOUNT
  // ==========================================================

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },

  amount: {
    fontSize: 30,
    fontWeight: '900',
    color: '#44C4CE',
    marginBottom: 28,
  },

  // ==========================================================
  // BANK SECTION
  // ==========================================================

  section: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },

  // ==========================================================
  // BANK CARD
  // ==========================================================

  bankCard: {
    minHeight: 76,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',

    flexDirection: 'row',
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#44C4CE',
    borderColor: '#44C4CE',
  },

  // ==========================================================
  // BANK ICON
  // ==========================================================

  bankIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#EAF9FA',

    justifyContent: 'center',
    alignItems: 'center',
  },

  // ==========================================================
  // BANK INFORMATION
  // ==========================================================

  bankInfo: {
    flex: 1,
    marginLeft: 12,
  },

  bankName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  bankNameSelected: {
    color: '#FFFFFF',
  },

  short: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },

  shortSelected: {
    color: '#E3F6F7',
  },

  // ==========================================================
  // CHECK ICON
  // ==========================================================

  checkIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  // ==========================================================
  // CONTINUE BUTTON
  // ==========================================================

  button: {
    height: 52,
    marginTop: 'auto',
    marginBottom: 20,

    borderRadius: 26,
    backgroundColor: '#44C4CE',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
