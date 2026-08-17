import React, { useEffect, useState } from 'react';

import { View, StyleSheet, Alert, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ChargingHeader from '../../components/Charging/ChargingHeader';
import LivePowerCard from '../../components/Charging/LivePowerCard';
import ChargingInfoCard from '../../components/Charging/ChargingInfoCard';

import StopChargingButton from '../../components/Charging/StopChargingButton';

import {
  chargingSession,
  stopChargingSession,
  subscribeChargingSession,
} from '../../store/chargingStore';

import {
  startChargingSimulator,
  stopChargingSimulator,
} from '../../services/ocpp/ocppSimulator';

export default function ChargingScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  // ==========================
  // Charging Time
  // ==========================

  const [seconds, setSeconds] = useState(0);

  // ==========================
  // Store Simulator Timer
  // ==========================

  const [chargerTimer, setChargerTimer] = useState<any>(null);

  // ==========================
  // Start Charging Session
  // ==========================

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeChargingSession(() => {
      forceUpdate(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = startChargingSimulator();

    setChargerTimer(timer);

    const timeTimer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      stopChargingSimulator(timer);

      clearInterval(timeTimer);
    };
  }, []);

  // ==========================
  // Format Time
  // ==========================

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return (
      `${hours.toString().padStart(2, '0')}:` +
      `${minutes.toString().padStart(2, '0')}:` +
      `${secs.toString().padStart(2, '0')}`
    );
  };

  // ==========================
  // Stop Charging
  // ==========================

  const handleStopCharging = () => {
    Alert.alert(
      t('charging.stopChargingTitle'),

      t('charging.stopChargingConfirmation'),

      [
        {
          text: t('charging.cancel'),

          style: 'cancel',
        },

        {
          text: t('charging.stop'),

          onPress: () => {
            // 1.
            // หยุด OCPP Simulator

            if (chargerTimer) {
              stopChargingSimulator(chargerTimer);
            }

            // 2.
            // เปลี่ยนสถานะ Charging

            stopChargingSession();

            // 3.
            // ไปหน้า Summary

            navigation.navigate('ChargingSummary' as never);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ChargingHeader
          station={chargingSession.stationName}
          charger={chargingSession.chargerName}
          connector={chargingSession.connectorLabel}
          connectorType={chargingSession.connectorType}
          status={chargingSession.status}
          maxPower={chargingSession.maxPower}
        />

        <LivePowerCard power={chargingSession.power} />

        <ChargingInfoCard
          energy={chargingSession.energy}
          cost={chargingSession.cost}
          time={formatTime()}
        />
      </ScrollView>

      <View style={styles.bottomBar}>
        <StopChargingButton onPress={handleStopCharging} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    paddingHorizontal: 24,

    paddingTop: 20,

    paddingBottom: 30,
  },

  bottomBar: {
    backgroundColor: '#FFFFFF',

    paddingHorizontal: 24,

    paddingTop: 10,

    paddingBottom: 1,

    borderTopWidth: 1,

    borderTopColor: '#E5E7EB',
  },
});
