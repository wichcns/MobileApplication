import React from 'react';

import { View, StyleSheet } from 'react-native';

import type { Station } from '../../../types/station';

import MapMarker from './MapMarker';

interface MapViewProps {
  stations?: Station[];
  onMarkerPress?: (stationId: string) => void;
}

// Legacy component: callers must supply stations loaded from the API.
const MapView = ({ stations = [], onMarkerPress }: MapViewProps) => {
  return (
    <View style={styles.container}>
      {stations.map(station => {
        /**
         * Convert Station ID
         *
         * SP001 -> 1
         * SP002 -> 2
         * SP010 -> 10
         *
         * ใช้สำหรับ Demo Position เท่านั้น
         */
        const stationNumber = Number(station.id.replace('SP', ''));

        return (
          <View
            key={station.id}
            style={[
              styles.markerPosition,

              {
                top: stationNumber * 80,

                left: stationNumber * 60,
              },
            ]}
          >
            <MapMarker
              station={station}
              onPress={() => {
                onMarkerPress?.(station.id);
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#DCEBED',
  },

  markerPosition: {
    position: 'absolute',
  },
});
