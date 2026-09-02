import React, { useCallback, useMemo, useState } from 'react';

import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HistoryCard from './Components/HistoryCard';

import apiClient from '../../api/client';
import { ChargingHistory } from '../../types/history';

type HistoryStackParamList = {
  HistoryHome: undefined;

  ChargingHistoryDetail: {
    history: any;
  };
};

const asNumber = (value: unknown) => Number(value ?? 0) || 0;

const formatDate = (value: unknown) => {
  if (!value) return '-';
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const mapChargingHistory = (session: any): ChargingHistory => {
  const connector = session?.connector ?? {};
  const chargingPoint = connector?.chargingPoint ?? {};
  const station = chargingPoint?.station ?? {};

  return {
    id: String(session?.id ?? ''),
    stationName: station?.name ?? 'ไม่ระบุสถานี',
    chargerName:
      chargingPoint?.name ?? chargingPoint?.serialNumber ?? 'ไม่ระบุเครื่องชาร์จ',
    connectorType:
      connector?.connectorType?.name ??
      connector?.connectorType?.key ??
      connector?.name ??
      String(connector?.connectorId ?? '-'),
    energy: asNumber(session?.totalEnergy),
    duration: Math.round(asNumber(session?.totalChargingDuration) / 60000),
    total: asNumber(session?.grandTotalFee),
    status: session?.status ?? 'UNKNOWN',
    startTime: formatDate(session?.checkedInAt ?? session?.createdAt),
    endTime: formatDate(session?.checkedOutAt ?? session?.completedAt),
  };
};

export default function HistoryScreen() {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<HistoryStackParamList>>();

  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<ChargingHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      console.log('[History] Loading charging history');
      const response = await apiClient.get('/charging-sessions/histories', {
        params: { _sort: 'checkedInAt:DESC' },
      });
      const sessions = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];
      setHistory(
        sessions
          .map(mapChargingHistory)
          .filter((item: ChargingHistory) => item.id),
      );
      setError(null);
      console.log('[History] Charging history loaded', { count: sessions.length });
    } catch (requestError: any) {
      const message =
        requestError?.response?.data?.message ??
        requestError?.response?.data?.error?.message ??
        requestError?.message ??
        'ไม่สามารถโหลดประวัติการชาร์จได้';
      console.log('[History] Charging history load failed', {
        status: requestError?.response?.status,
        message,
      });
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory]),
  );

  const filteredHistory = useMemo(() => {
    if (!search.trim()) {
      return history;
    }

    const query = search.trim().toLowerCase();
    return history.filter(item =>
      [item.stationName, item.chargerName, item.connectorType]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [search, history]);

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          TITLE
      ====================================================== */}

      <Text style={styles.title}>{t('history.title')}</Text>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <TextInput
        style={styles.search}
        placeholder={t('history.searchPlaceholder')}
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
      />

      {/* =====================================================
          HISTORY LIST
      ====================================================== */}

      <FlatList
        data={filteredHistory}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadHistory(true)}
            colors={['#44C4CE']}
          />
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator size="large" color="#44C4CE" />
              <Text style={styles.emptyText}>กำลังโหลดประวัติการชาร์จ...</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                {error ? 'ไม่สามารถโหลดประวัติได้' : 'ยังไม่มีประวัติการชาร์จ'}
              </Text>
              <Text style={styles.emptyText}>
                {error ?? 'เมื่อชาร์จและชำระเงินเสร็จ รายการจะแสดงที่นี่'}
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <HistoryCard
            item={item}
            onPress={() => {
              console.log('SEND HISTORY:', item);

              navigation.navigate('ChargingHistoryDetail', {
                history: item,
              });
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5F6F8',
  },

  title: {
    fontSize: 24,

    fontWeight: '700',

    color: '#111827',

    marginTop: 20,

    marginHorizontal: 20,

    marginBottom: 16,
  },

  search: {
    height: 48,

    marginHorizontal: 20,

    backgroundColor: '#FFFFFF',

    borderRadius: 12,

    paddingHorizontal: 16,

    borderWidth: 1,

    borderColor: '#E5E7EB',

    fontSize: 14,

    color: '#111827',
  },

  list: {
    paddingVertical: 16,

    paddingBottom: 30,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 72,
  },

  emptyTitle: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },

  emptyText: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
