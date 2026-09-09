import React, { useEffect, useRef, useState } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import {
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import StationMarker from './StationMarker';

import { Station } from '../../types/station';

interface Props {
  stations: Station[];

  selectedStation: Station | null;

  onMarkerPress: (station: Station) => void;
}

interface UserLocation {
  latitude: number;

  longitude: number;
}

const getStationMarkerDescription = (station: Station) => {
  const connectors = station.chargers.flatMap(charger => charger.connectors);
  const available = connectors.filter(
    connector => connector.status === 'AVAILABLE',
  ).length;
  const charging = connectors.filter(
    connector => connector.status === 'CHARGING',
  ).length;

  if (charging > 0) {
    return `${station.status} • ${charging} charging`;
  }

  return `${station.status} • ${available}/${connectors.length} available`;
};

export default function EVMap({
  stations,

  selectedStation,

  onMarkerPress,
}: Props) {
  const mapRef = useRef<MapView>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [tracksMarkerViews, setTracksMarkerViews] = useState(true);

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

  const centerOnUserLocation = (location: UserLocation) => {
    mapRef.current?.animateToRegion(
      {
        latitude: location.latitude,

        longitude: location.longitude,

        latitudeDelta: 0.015,

        longitudeDelta: 0.015,
      },

      500,
    );
  };

  const handleMyLocationPress = () => {
    if (!hasLocationPermission) {
      return;
    }

    if (userLocation) {
      centerOnUserLocation(userLocation);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,

          longitude: position.coords.longitude,
        };

        setUserLocation(location);
        centerOnUserLocation(location);
      },

      () => undefined,

      {
        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 30000,
      },
    );
  };

  const validStations = stations.filter(
    station =>
      Number.isFinite(station.latitude) &&
      Number.isFinite(station.longitude) &&
      station.latitude >= -90 &&
      station.latitude <= 90 &&
      station.longitude >= -180 &&
      station.longitude <= 180 &&
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

  const markerSignature = validStations.map(getMarkerVisualKey).join('|');

  useEffect(() => {
    setTracksMarkerViews(true);

    const timeout = setTimeout(() => {
      setTracksMarkerViews(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [markerSignature]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        showsUserLocation={hasLocationPermission}
        showsMyLocationButton={
          Platform.OS === 'android' && hasLocationPermission
        }
        onUserLocationChange={event => {
          const { coordinate } = event.nativeEvent;

          if (!coordinate) {
            return;
          }

          setUserLocation({
            latitude: coordinate.latitude,

            longitude: coordinate.longitude,
          });
        }}
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
            title={station.name}
            description={getStationMarkerDescription(station)}
            anchor={{
              x: 0.5,

              y: 1,
            }}
            tracksViewChanges={Platform.OS === 'ios' ? true : tracksMarkerViews}
            zIndex={selectedStation?.id === station.id ? 2 : 1}
          >
            <StationMarker
              station={station}
              selected={selectedStation?.id === station.id}
            />
          </Marker>
        ))}
      </MapView>
      {Platform.OS === 'ios' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="กลับไปยังตำแหน่งปัจจุบัน"
          disabled={!hasLocationPermission}
          onPress={handleMyLocationPress}
          style={({ pressed }) => [
            styles.myLocationButton,
            !hasLocationPermission && styles.myLocationButtonDisabled,
            pressed && styles.myLocationButtonPressed,
          ]}
        >
          <Ionicons name="locate" size={24} color="#0F172A" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  myLocationButton: {
    position: 'absolute',

    right: 18,

    bottom: 22,

    width: 52,

    height: 52,

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 26,

    backgroundColor: '#FFFFFF',

    shadowColor: '#0F172A',

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowOpacity: 0.2,

    shadowRadius: 6,

    elevation: 5,
  },

  myLocationButtonDisabled: {
    opacity: 0.45,
  },

  myLocationButtonPressed: {
    opacity: 0.75,
  },
});
