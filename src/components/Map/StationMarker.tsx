import React, { useEffect, useRef } from 'react';

import { View, Text, Image, StyleSheet, Animated } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { Images } from '../../assets';

import { Station } from '../../types/station';

interface Props {
  station: Station;

  selected?: boolean;
}

export default function StationMarker({
  station,

  selected = false,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.25 : 1,

      useNativeDriver: true,
    }).start();
  }, [selected, scale]);

  const color =
    station.status === 'Available'
      ? '#16A34A'
      : station.status === 'Busy'
      ? '#F59E0B'
      : '#DC2626';

  /**
   * Count available connectors
   * New Model:
   * Charger -> connectors -> status
   */
  const availableCount = (station.chargers ?? []).reduce(
    (sum, charger) =>
      sum +
      (charger.connectors ?? []).filter(
        connector => connector.status === 'AVAILABLE',
      ).length,
    0,
  );

  return (
    <Animated.View
      style={[
        styles.wrapper,

        {
          transform: [
            {
              scale,
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.badge,

          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons name="flash" size={14} color="#FFFFFF" />

        <Text style={styles.number}>{availableCount}</Text>
      </View>

      <Image
        source={Images.logoLow80}
        style={[
          styles.logo,

          {
            borderColor: color,
          },
        ]}
        resizeMode="contain"
      />

      <View
        style={[
          styles.pointer,

          {
            borderTopColor: color,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },

  badge: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 20,

    marginBottom: -6,

    zIndex: 2,
  },

  number: {
    color: '#FFFFFF',

    fontSize: 12,

    fontWeight: '800',

    marginLeft: 3,
  },

  logo: {
    width: 30,

    height: 35,

    borderRadius: 32,

    backgroundColor: '#FFFFFF',

    borderWidth: 3,

    resizeMode: 'contain',

    elevation: 8,
  },

  pointer: {
    width: 0,

    height: 0,

    borderLeftWidth: 8,

    borderRightWidth: 8,

    borderTopWidth: 10,

    borderLeftColor: 'transparent',

    borderRightColor: 'transparent',
  },
});
