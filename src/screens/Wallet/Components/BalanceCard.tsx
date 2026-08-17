import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface BalanceCardProps {
  balance: number;

  updatedAt?: string;

  onViewAll?: () => void;
}

export default function BalanceCard({
  balance,
  updatedAt = 'Just now',
  onViewAll,
}: BalanceCardProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <Ionicons name="wallet-outline" size={22} color="#FFFFFF" />

        <Text style={styles.title}>{t('wallet.walletBalance')}</Text>
      </View>

      {/* =====================================================
          BALANCE
      ====================================================== */}

      <Text style={styles.balance}>
        {t('common.currency')}{' '}
        {balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>

      {/* =====================================================
          UPDATED
      ====================================================== */}

      <Text style={styles.updated}>
        {t('wallet.updated')} {updatedAt}
      </Text>

      {/* =====================================================
          VIEW ALL
      ====================================================== */}

      <TouchableOpacity
        style={styles.button}
        onPress={onViewAll}
        activeOpacity={0.8}
      >
        <Ionicons name="add-circle" size={18} color="#FFFFFF" />

        <Text style={styles.buttonText}>{t('wallet.viewAll')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00A651',

    borderRadius: 24,

    padding: 24,

    marginHorizontal: 20,

    marginTop: 20,

    elevation: 6,

    shadowColor: '#000',

    shadowOpacity: 0.15,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  title: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '600',

    marginLeft: 8,
  },

  balance: {
    color: '#FFFFFF',

    fontSize: 36,

    fontWeight: 'bold',

    marginTop: 20,
  },

  updated: {
    color: '#D1FAE5',

    marginTop: 6,

    fontSize: 13,
  },

  button: {
    marginTop: 24,

    backgroundColor: 'rgba(255,255,255,0.20)',

    borderRadius: 14,

    paddingVertical: 14,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',
  },

  buttonText: {
    color: '#FFFFFF',

    fontWeight: '700',

    fontSize: 15,

    marginLeft: 8,
  },
});
