import React, { useMemo, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import HistoryCard from './Components/HistoryCard';

import { mockHistory } from '../../data/mockHistory';

type HistoryStackParamList = {
  HistoryHome: undefined;

  ChargingHistoryDetail: {
    history: any;
  };
};

export default function HistoryScreen() {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<HistoryStackParamList>>();

  const [search, setSearch] = useState('');

  const history = useMemo(() => {
    if (!search.trim()) {
      return mockHistory;
    }

    return mockHistory.filter(item =>
      item.stationName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

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
        data={history}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
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
});
