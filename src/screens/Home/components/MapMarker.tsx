import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// import { Station } from "../../../data/stations";
import { Station } from '../../../types/station';
import { colors } from '../../../theme/colors';
import { radius } from '../../../theme/radius';
import { shadows } from '../../../theme/shadow';

interface MapMarkerProps {
  station: Station;

  onPress?: () => void;
}

const MapMarker = ({ station, onPress }: MapMarkerProps) => {
  const getStatusColor = () => {
    switch (station.status) {
      case 'Available':
        return colors.status.success;

      case 'Busy':
        return colors.status.warning;

      case 'Offline':
        return colors.status.danger;

      default:
        return colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.marker,
          {
            backgroundColor: getStatusColor(),
          },
        ]}
      >
        <Text style={styles.icon}>⚡</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MapMarker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    justifyContent: 'center',
  },

  marker: {
    width: 42,

    height: 42,

    borderRadius: radius.full,

    alignItems: 'center',

    justifyContent: 'center',

    ...shadows.card,
  },

  icon: {
    fontSize: 20,
  },
});
