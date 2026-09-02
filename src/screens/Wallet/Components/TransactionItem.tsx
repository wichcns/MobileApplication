import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface Props {
  title: string;

  amount: number;

  type: 'TOPUP' | 'CHARGING' | 'REFUND';

  status: 'SUCCESS' | 'PENDING' | 'FAILED';

  date: string;
}

export default function TransactionItem({
  title,
  amount,
  type,
  status,
  date,
}: Props) {
  const isIncome = type === 'TOPUP' || type === 'REFUND';

  const amountColor = isIncome ? '#44C4CE' : '#DC2626';

  const amountPrefix = isIncome ? '+' : '-';

  const icon =
    type === 'TOPUP'
      ? 'add-circle'
      : type === 'CHARGING'
      ? 'flash'
      : 'refresh-circle';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color="#44C4CE" />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            {
              color: amountColor,
            },
          ]}
        >
          {amountPrefix}฿{amount.toFixed(2)}
        </Text>

        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 16,

    marginBottom: 12,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    elevation: 2,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  left: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  iconContainer: {
    width: 46,

    height: 46,

    borderRadius: 23,

    backgroundColor: '#EAF9FA',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  title: {
    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },

  date: {
    marginTop: 4,

    color: '#6B7280',

    fontSize: 12,
  },

  right: {
    alignItems: 'flex-end',
  },

  amount: {
    fontWeight: '700',

    fontSize: 15,
  },

  status: {
    marginTop: 4,

    color: '#6B7280',

    fontSize: 12,
  },
});
