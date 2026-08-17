import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import HomeHeader from '../../components/Home/HomeHeader';

import EVMap from '../../components/Map/EVMap';

import StationBottomSheet from '../../components/Station/StationBottomSheet';

import StationDetailSheet from '../../components/Station/StationDetailSheet';

import ShowListButton from '../../components/Station/ShowListButton';

import { stations } from '../../data/stations';

import { Station } from '../../types/station';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [showStation, setShowStation] = useState(true);

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const [detailStation, setDetailStation] = useState<Station | null>(null);

  return (
    <View style={styles.container}>
      {/* <HomeHeader /> */}

      {/* <EVMap
        stations={stations}
        selectedStation={selectedStation}
        onMarkerPress={setSelectedStation}
      /> */}

      <EVMap
        stations={stations}
        selectedStation={selectedStation}
        onMarkerPress={station => {
          setSelectedStation(station);

          setShowStation(true);
        }}
      />

      {showStation ? (
        <StationBottomSheet
          stations={stations}
          selectedStation={selectedStation}
          onSelectStation={station => {
            setSelectedStation(station);

            // ปิด Show List ก่อน

            setShowStation(false);

            // เปิด Detail

            setDetailStation(station);
          }}
          onClose={() => {
            setShowStation(false);
          }}
        />
      ) : (
        <ShowListButton
          onPress={() => {
            setShowStation(true);
          }}
        />
      )}
      {detailStation && (
        <StationDetailSheet
          station={detailStation}
          onClose={() => {
            setDetailStation(null);
          }}
          onStartCharging={station => {
            console.log('CLICK START CHARGING', station.name);

            setDetailStation(null);

            navigation.navigate('QRScanner', {
              station,
            });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
