import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { getWalletHistory } from '../../../api/wallet.api';

type WalletTransaction = {
  id: string;
  type: 'TOP_UP' | 'CHARGING' | 'REFUND' | 'ADJUSTMENT';
  amount: number;
  description: string;
  date: string;
  stationName?: string;
  chargerName?: string;
  energy?: number;
  paymentMethod?: string;
};

const asNumber = (value: unknown) => {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
};

const formatDate = (value: unknown) => {
  if (!value) return '-';
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('th-TH');
};

export default function TransactionHistoryScreen() {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHistory = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const response = await getWalletHistory(1, 50);
          const records = Array.isArray(response?.data) ? response.data : [];
          const transactions = records.map((record: any): WalletTransaction => {
            const rawType = String(record?.type ?? record?.transactionType ?? record?.action ?? '').toUpperCase();
            const amount = asNumber(record?.amount ?? record?.value ?? record?.creditAmount);
            const type = rawType.includes('CHARG')
              ? 'CHARGING'
              : rawType.includes('REFUND')
              ? 'REFUND'
              : rawType.includes('ADJUST')
              ? 'ADJUSTMENT'
              : 'TOP_UP';

            return {
              id: String(record?.id ?? record?._id ?? `${type}-${record?.createdAt ?? records.indexOf(record)}`),
              type,
              amount: type === 'CHARGING' && amount > 0 ? -amount : amount,
              description: record?.description ?? record?.message ?? record?.method ?? '-',
              date: formatDate(record?.createdAt ?? record?.date ?? record?.paidAt),
              stationName: record?.stationName,
              chargerName: record?.chargerName,
              energy: asNumber(record?.energy),
              paymentMethod: record?.paymentMethod ?? record?.method,
            };
          });
          if (isActive) setData(transactions);
        } catch (requestError: any) {
          console.log('[WalletHistory] Load failed', {
            status: requestError?.response?.status,
            message: requestError?.response?.data?.message || requestError?.message,
          });
          if (isActive) setError('Unable to load wallet transactions.');
        } finally {
          if (isActive) setIsLoading(false);
        }
      };

      loadHistory();
      return () => {
        isActive = false;
      };
    }, []),
  );

  const renderItem = ({ item }: { item: WalletTransaction }) => {
    const isIncome = item.amount > 0;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('TransactionDetail', {
            transaction: item,
          });
        }}
      >
        {/* ICON */}

        <View style={styles.icon}>
          <Ionicons
            name={
              item.type === 'CHARGING'
                ? 'flash'
                : isIncome
                ? 'arrow-down-circle'
                : 'swap-horizontal'
            }
            size={30}
            color={item.type === 'CHARGING' ? '#EF4444' : '#00A651'}
          />
        </View>

        {/* INFORMATION */}

        <View style={styles.info}>
          <Text style={styles.title}>
            {item.type === 'CHARGING'
              ? 'EV Charging'
              : item.type === 'TOP_UP'
              ? 'Wallet Top Up'
              : item.type}
          </Text>

          <Text style={styles.description}>
            {item.stationName
              ? `${item.stationName}${
                  item.chargerName ? ` • ${item.chargerName}` : ''
                }`
              : item.description}
          </Text>

          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* AMOUNT */}

        <Text
          style={[
            styles.amount,
            {
              color: isIncome ? '#00A651' : '#EF4444',
            },
          ]}
        >
          {isIncome ? '+' : '-'}฿{Math.abs(item.amount).toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      {isLoading ? (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color="#00A651" />
        </View>
      ) : error ? (
        <View style={styles.empty}>
          <Ionicons name="alert-circle-outline" size={56} color="#EF4444" />
          <Text style={styles.emptyTitle}>{error}</Text>
        </View>
      ) : (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          data.length === 0 ? styles.emptyContainer : undefined
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={60} color="#CBD5E1" />

            <Text style={styles.emptyTitle}>No Transactions</Text>

            <Text style={styles.emptyText}>
              Your wallet transactions will appear here
            </Text>
          </View>
        }
      />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 20,

    marginBottom: 25,

    height: 45,
  },

  headerTitle: {
    fontSize: 20,

    fontWeight: '700',

    color: '#111827',

    marginLeft: 20,
  },

  backButton: {
    width: 45,

    height: 45,

    justifyContent: 'center',

    alignItems: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 18,

    marginBottom: 15,

    flexDirection: 'row',

    alignItems: 'center',
  },

  icon: {
    width: 45,

    height: 45,

    borderRadius: 22,

    backgroundColor: '#F1F5F9',

    justifyContent: 'center',

    alignItems: 'center',
  },

  info: {
    flex: 1,

    marginLeft: 15,
  },

  title: {
    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },

  description: {
    marginTop: 4,

    color: '#64748B',
  },

  date: {
    marginTop: 5,

    fontSize: 12,

    color: '#94A3B8',
  },

  amount: {
    fontSize: 18,

    fontWeight: '800',
  },

  emptyContainer: {
    flexGrow: 1,
  },

  empty: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 15,

    fontSize: 18,

    fontWeight: '700',

    color: '#334155',
  },

  emptyText: {
    marginTop: 8,

    color: '#94A3B8',

    textAlign: 'center',
  },
});
