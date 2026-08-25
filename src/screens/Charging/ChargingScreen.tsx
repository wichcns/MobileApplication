import React, { useCallback, useEffect, useState } from 'react';

import { View, StyleSheet, Alert, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ChargingHeader from '../../components/Charging/ChargingHeader';
import LivePowerCard from '../../components/Charging/LivePowerCard';
import ChargingInfoCard from '../../components/Charging/ChargingInfoCard';

import StopChargingButton from '../../components/Charging/StopChargingButton';

import {
  chargingSession,
  subscribeChargingSession,
} from '../../store/chargingStore';
import {
  getChargingSessionSummary,
  stopChargingSessionOnServer,
} from '../../services/charging/chargingSessionApi';

export default function ChargingScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const sessionId = route.params?.sessionId ?? chargingSession.sessionId;
  const [isStopping, setIsStopping] = useState(false);

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeChargingSession(() => {
      forceUpdate(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  const refreshSession = useCallback(async () => {
    if (!sessionId) return;
    try {
      await getChargingSessionSummary(sessionId);
    } catch (error: any) {
      console.log('[Charging] Unable to refresh live session', {
        status: error?.response?.status,
        message: error?.message,
      });
    }
  }, [sessionId]);

  useEffect(() => {
    refreshSession();
    const interval = setInterval(refreshSession, 8000);
    return () => clearInterval(interval);
  }, [refreshSession]);

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

          onPress: async () => {
            if (!sessionId || isStopping) return;
            setIsStopping(true);
            console.log('[Charging] Requesting OCPP stop command', { sessionId });
            try {
              await stopChargingSessionOnServer(sessionId);
              await refreshSession();
              navigation.replace('ChargingSummary', { sessionId });
            } catch (error: any) {
              const message =
                error?.response?.data?.message ??
                error?.response?.data?.error?.message ??
                error?.message ??
                'Unable to stop charging';
              console.log('[Charging] Stop request failed', {
                status: error?.response?.status,
                message,
              });
              Alert.alert('ไม่สามารถหยุดชาร์จได้', message);
            } finally {
              setIsStopping(false);
            }
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
          time={chargingSession.duration}
          power={chargingSession.power}
        />
      </ScrollView>

      <View style={styles.bottomBar}>
        <StopChargingButton onPress={handleStopCharging} disabled={isStopping} />
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
