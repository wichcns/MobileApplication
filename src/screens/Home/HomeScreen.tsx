import React, { useEffect, useState } from 'react';

import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import HomeHeader from '../../components/Home/HomeHeader';

import EVMap from '../../components/Map/EVMap';

import StationBottomSheet from '../../components/Station/StationBottomSheet';

import StationDetailSheet from '../../components/Station/StationDetailSheet';

import ShowListButton from '../../components/Station/ShowListButton';

import { Station } from '../../types/station';

import { getStations } from '../../api/station.api';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  /**
   * แสดง / ซ่อน Station Bottom Sheet
   */
  const [showStation, setShowStation] = useState(true);

  /**
   * Station ที่ผู้ใช้เลือกจาก Map
   */
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  /**
   * Station ที่กำลังเปิดรายละเอียด
   */
  const [detailStation, setDetailStation] = useState<Station | null>(null);

  /**
   * ข้อมูล Station จาก Production API
   *
   * GET
   * https://api.ev-charge-sunpower.ampereenergy.tech/stations
   */
  const [stations, setStations] = useState<Station[]>([]);

  /**
   * สถานะ Loading
   */
  const [loading, setLoading] = useState(true);

  /**
   * โหลด Station จาก Production API
   */
  useEffect(() => {
    const loadStations = async () => {
      try {
        console.log('===== HOME: LOAD STATIONS =====');

        const data = await getStations();

        console.log('HOME STATIONS:', data);

        setStations(data);

        console.log('===== HOME: STATIONS LOADED =====');
      } catch (error) {
        console.error('HOME API ERROR:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  /**
   * Loading Screen
   *
   * ป้องกันไม่ให้ Component ด้านล่าง
   * ทำงานก่อนที่ API จะโหลดข้อมูลเสร็จ
   */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>กำลังโหลดสถานีชาร์จ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*
        Home Header

        ถ้าต้องการใช้ สามารถเปิดกลับมาได้
      */}

      {/* <HomeHeader /> */}

      {/*
        EV Map

        ใช้ stations ที่ได้จาก
        Production API
        แทน Mock Data
      */}
      <EVMap
        stations={stations}
        selectedStation={selectedStation}
        onMarkerPress={station => {
          /**
           * เก็บ Station ที่เลือก
           */
          setSelectedStation(station);

          /**
           * เปิด Station List
           */
          setShowStation(true);
        }}
      />

      {/*
        Station List Bottom Sheet
      */}
      {showStation ? (
        <StationBottomSheet
          stations={stations}
          selectedStation={selectedStation}
          onSelectStation={station => {
            /**
             * เลือก Station
             */
            setSelectedStation(station);

            /**
             * ปิด Station List
             */
            setShowStation(false);

            /**
             * เปิด Station Detail
             */
            setDetailStation(station);
          }}
          onClose={() => {
            /**
             * ปิด Station List
             */
            setShowStation(false);
          }}
        />
      ) : (
        /**
         * ปุ่มสำหรับเปิด Station List กลับมา
         */
        <ShowListButton
          onPress={() => {
            setShowStation(true);
          }}
        />
      )}

      {/*
        Station Detail Sheet
      */}
      {detailStation && (
        <StationDetailSheet
          station={detailStation}
          onClose={() => {
            /**
             * ปิด Station Detail
             */
            setDetailStation(null);
          }}
          onStartCharging={station => {
            console.log('CLICK START CHARGING:', station.name);

            /**
             * ปิด Station Detail
             */
            setDetailStation(null);

            /**
             * ไปหน้า QR Scanner
             *
             * Flow:
             *
             * Home
             *   ↓
             * Station Detail
             *   ↓
             * Start Charging
             *   ↓
             * QR Scanner
             */
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

  loadingContainer: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#F5F6F8',
  },

  loadingText: {
    marginTop: 12,

    fontSize: 14,

    color: '#6B7280',
  },
});
