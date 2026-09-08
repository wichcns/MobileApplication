import React, { useMemo, useRef, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import StationList from './StationList';
import FilterChip from './FilterChip';

import { Station } from '../../types/station';
import { useTranslation } from 'react-i18next';

interface Props {
  stations: Station[];

  selectedStation: Station | null;

  onSelectStation: (station: Station) => void;

  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const COLLAPSED_HEIGHT = 120;

const HALF_HEIGHT = Math.min(430, SCREEN_HEIGHT * 0.55);

const FULL_HEIGHT = SCREEN_HEIGHT - 200;

export default function StationBottomSheet({
  stations,

  selectedStation,

  onSelectStation,

  onClose,
}: Props) {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');

  const [selectedFilter, setSelectedFilter] = useState<
    'ALL' | 'AVAILABLE' | 'AC' | 'DC'
  >('ALL');

  const sheetHeight = useRef(new Animated.Value(HALF_HEIGHT)).current;

  const currentHeight = useRef(HALF_HEIGHT);

  const animateTo = (height: number) => {
    currentHeight.current = height;

    Animated.spring(sheetHeight, {
      toValue: height,

      useNativeDriver: false,

      damping: 20,

      stiffness: 120,
    }).start();
  };

  /*
    Gesture
  */

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > Math.abs(gesture.dx);
      },

      onPanResponderMove: (_, gesture) => {
        let next = currentHeight.current - gesture.dy;

        if (next < COLLAPSED_HEIGHT) next = COLLAPSED_HEIGHT;

        if (next > FULL_HEIGHT) next = FULL_HEIGHT;

        sheetHeight.setValue(next);
      },

      onPanResponderRelease: (_, gesture) => {
        const current = currentHeight.current;

        // ลากขึ้น

        if (gesture.dy < -100) {
          if (current === COLLAPSED_HEIGHT) {
            animateTo(HALF_HEIGHT);
          } else {
            animateTo(FULL_HEIGHT);
          }

          return;
        }

        // ลากลง ปิด

        if (gesture.dy > 120) {
          Animated.spring(sheetHeight, {
            toValue: 0,

            useNativeDriver: false,
          }).start(() => {
            onClose();
          });

          return;
        }

        animateTo(current);
      },
    }),
  ).current;

  const filteredStations = useMemo(() => {
    let result = [...stations];

    // Search

    if (searchText.trim()) {
      result = result.filter(station =>
        station.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filter

    switch (selectedFilter) {
      case 'AVAILABLE':
        result = result.filter(station =>
          station.chargers.some(charger =>
            charger.connectors.some(
              connector => connector.status === 'AVAILABLE',
            ),
          ),
        );

        break;

      case 'AC':
        result = result.filter(station =>
          station.chargers.some(charger => charger.chargerType === 'AC'),
        );

        break;

      case 'DC':
        result = result.filter(station =>
          station.chargers.some(charger => charger.chargerType === 'DC'),
        );

        break;
    }

    return result;
  }, [stations, searchText, selectedFilter]);

  return (
    <Animated.View style={[styles.container, { height: sheetHeight }]}>
      <View {...panResponder.panHandlers} style={styles.dragArea}>
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.title}>{t('home.nearbyStations')}</Text>

          <Text style={styles.count}>
            {stations.length} {t('home.chargingStations')}
          </Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#94A3B8" />

        <TextInput
          placeholder={t('home.searchChargingStation')}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
      </View>

      <View style={styles.filterContainer}>
        <FilterChip
          title={t('home.all')}
          selected={selectedFilter === 'ALL'}
          onPress={() => setSelectedFilter('ALL')}
        />

        <FilterChip
          title={t('home.available')}
          selected={selectedFilter === 'AVAILABLE'}
          onPress={() => setSelectedFilter('AVAILABLE')}
        />

        <FilterChip
          title="AC"
          selected={selectedFilter === 'AC'}
          onPress={() => setSelectedFilter('AC')}
        />

        <FilterChip
          title="DC"
          selected={selectedFilter === 'DC'}
          onPress={() => setSelectedFilter('DC')}
        />
      </View>

      <View style={styles.listContainer}>
        <StationList
          data={filteredStations}
          selectedStation={selectedStation}
          onPress={onSelectStation}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: 0,

    right: 0,

    bottom: 0,

    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    paddingHorizontal: 20,

    paddingTop: 12,

    overflow: 'hidden',

    elevation: 20,
  },

  handle: {
    width: 50,

    height: 5,

    backgroundColor: '#CBD5E1',

    borderRadius: 10,

    alignSelf: 'center',
  },

  dragArea: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 18,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    color: '#111827',
  },

  count: {
    marginTop: 5,

    fontSize: 13,

    color: '#64748B',
  },

  searchBox: {
    marginTop: 18,

    height: 46,

    borderRadius: 14,

    backgroundColor: '#F1F5F9',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 15,
  },

  input: {
    flex: 1,

    marginLeft: 10,
  },

  filterContainer: {
    flexDirection: 'row',

    marginTop: 14,
  },

  listContainer: {
    flex: 1,

    marginTop: 15,
  },
});
