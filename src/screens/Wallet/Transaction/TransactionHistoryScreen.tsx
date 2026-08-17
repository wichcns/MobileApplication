import React, { useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { wallet, WalletTransaction } from '../../../store/walletStore';

export default function TransactionHistoryScreen() {
  const navigation = useNavigation<any>();

  const [data, setData] = useState<WalletTransaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      setData([...wallet.transactions]);
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
