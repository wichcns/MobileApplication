import React, { useEffect, useRef, useState } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { PermissionsAndroid, Platform, StyleSheet } from 'react-native';

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
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const status = await Geolocation.requestAuthorization('whenInUse');
        setHasLocationPermission(status === 'granted');
        return;
      }

      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const alreadyGranted = await PermissionsAndroid.check(permission);

      if (alreadyGranted) {
        setHasLocationPermission(true);
        return;
      }

      const result = await PermissionsAndroid.request(permission, {
        title: 'อนุญาตให้เข้าถึงตำแหน่ง',
        message: 'GSB EV ใช้ตำแหน่งของคุณเพื่อแสดงจุดปัจจุบันบนแผนที่',
        buttonPositive: 'อนุญาต',
        buttonNegative: 'ไม่อนุญาต',
      });

      setHasLocationPermission(result === PermissionsAndroid.RESULTS.GRANTED);
    };

    requestLocationPermission().catch(() => {
      setHasLocationPermission(false);
    });
  }, []);

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

  const validStations = stations.filter(
    station =>
      Number.isFinite(station.latitude) &&
      Number.isFinite(station.longitude) &&
      !(station.latitude === 0 && station.longitude === 0),
  );

  const getMarkerVisualKey = (station: Station) => {
    const connectors = station.chargers.flatMap(charger => charger.connectors);
    const available = connectors.filter(
      connector => connector.status === 'AVAILABLE',
    ).length;
    const charging = connectors.filter(
      connector => connector.status === 'CHARGING',
    ).length;

    return [
      station.id,
      station.status,
      available,
      charging,
      connectors.length,
      selectedStation?.id === station.id ? 'selected' : 'default',
    ].join('-');
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation={hasLocationPermission}
      showsMyLocationButton={hasLocationPermission}
      initialRegion={{
        latitude: 13.7563,

        longitude: 100.5018,

        latitudeDelta: 0.08,

        longitudeDelta: 0.08,
      }}
    >
      {validStations.map(station => (
        <Marker
          key={getMarkerVisualKey(station)}
          coordinate={{
            latitude: station.latitude,

            longitude: station.longitude,
          }}
          onPress={() => handleMarkerPress(station)}
          anchor={{
            x: 0.5,

            y: 1,
          }}
          tracksViewChanges={false}
          zIndex={selectedStation?.id === station.id ? 2 : 1}
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
