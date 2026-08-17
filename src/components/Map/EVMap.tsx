import React, { useRef } from 'react';

import MapView, { Marker } from 'react-native-maps';

import { StyleSheet } from 'react-native';

import StationMarker from './StationMarker';

import { Station } from '../../types/station';

interface Props {
  stations: Station[];

  selectedStation: Station | null;

  onMarkerPress: (station: Station) => void;
}

export default function EVMap({
  stations,

  selectedStation,

  onMarkerPress,
}: Props) {
  const mapRef = useRef<MapView>(null);

  const handleMarkerPress = (station: Station) => {
    // ส่งค่ากลับ HomeScreen

    onMarkerPress(station);

    // Zoom ไปตำแหน่งสถานี

    mapRef.current?.animateToRegion(
      {
        latitude: station.latitude,

        longitude: station.longitude,

        latitudeDelta: 0.02,

        longitudeDelta: 0.02,
      },

      800,
    );
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}
      initialRegion={{
        latitude: 13.7563,

        longitude: 100.5018,

        latitudeDelta: 0.08,

        longitudeDelta: 0.08,
      }}
    >
      {stations.map(station => (
        <Marker
          key={station.id}
          coordinate={{
            latitude: station.latitude,

            longitude: station.longitude,
          }}
          onPress={() => handleMarkerPress(station)}
          anchor={{
            x: 0.5,

            y: 1,
          }}
          tracksViewChanges={true}
        >
          <StationMarker
            station={station}
            selected={selectedStation?.id === station.id}
          />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
