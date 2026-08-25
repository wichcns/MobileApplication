import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { chargingSession } from '../../store/chargingStore';
import { getChargingSessionSummary } from '../../services/charging/chargingSessionApi';
import { checkOutChargingSessionOnServer } from '../../services/charging/chargingSessionApi';

export default function ChargingSummaryScreen() {
  const route = useRoute<any>();

  const { t } = useTranslation();
  const sessionId = route.params?.sessionId ?? chargingSession.sessionId;
  const [isLoading, setIsLoading] = useState(Boolean(sessionId));
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const refreshSummary = useCallback(async () => {
    if (!sessionId) {
      setLoadError('ไม่พบข้อมูลการชาร์จ');
      setIsLoading(false);
      return;
    }
    try {
      await getChargingSessionSummary(sessionId);
      setLoadError(null);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? error?.message ?? 'Unable to load summary';
      console.log('[Charging] Summary request failed', {
        sessionId,
        status: error?.response?.status,
        message,
      });
      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    refreshSummary();
  }, [refreshSummary]);

  const handleCheckOut = async () => {
    if (!sessionId || isCheckingOut) return;
    setIsCheckingOut(true);
    try {
      const result = await checkOutChargingSessionOnServer(sessionId);
      Alert.alert(
        result?.status === 'COMPLETED' ? 'ชำระเงินสำเร็จ' : 'ดำเนินการสำเร็จ',
        result?.status === 'COMPLETED'
          ? 'ระบบตัดชำระเงินตามวิธีที่เลือกไว้แล้ว'
          : 'ระบบกำลังประมวลผลการชำระเงิน',
      );
      await refreshSummary();
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.message;
      Alert.alert('ยังไม่สามารถชำระเงินได้', message ?? 'กรุณาถอดหัวชาร์จออกก่อน');
    } finally { setIsCheckingOut(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ {t('chargingSummary.title')}</Text>

      {isLoading && <ActivityIndicator size="small" color="#16A34A" />}
      {loadError && <Text style={styles.errorText}>{loadError}</Text>}

      <View style={styles.card}>
        <Text style={styles.complete}>
          {t('chargingSummary.chargingCompleted')}
        </Text>

        <Text style={styles.station}>{chargingSession.stationName || '-'}</Text>

        <Text style={styles.subText}>{chargingSession.chargerName || '-'}</Text>

        <Text style={styles.subText}>
          {t('chargingSummary.connector')}{' '}
          {chargingSession.connectorLabel || '-'} (
          {chargingSession.connectorType || '-'})
        </Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.duration')}</Text>

          <Text style={styles.value}>{chargingSession.duration}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.energyUsed')}</Text>

          <Text style={styles.value}>{chargingSession.energy} kWh</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.pricePerKwh')}</Text>

          <Text style={styles.value}>
            {chargingSession.pricePerKwh.toFixed(2)} THB/kWh
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.power')}</Text>

          <Text style={styles.value}>{chargingSession.power} kW</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.chargingCost')}</Text>

          <Text style={styles.value}>{chargingSession.cost} THB</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.serviceFee')}</Text>

          <Text style={styles.value}>{chargingSession.serviceFee} THB</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('chargingSummary.vat')}</Text>

          <Text style={styles.value}>{chargingSession.vat} THB</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>{t('chargingSummary.total')}</Text>

          <Text style={styles.total}>{chargingSession.total} THB</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCheckOut}
        disabled={isCheckingOut || !sessionId}
      >
        <Text style={styles.buttonText}>
          {isCheckingOut ? 'กำลังชำระเงิน...' : 'ถอดหัวชาร์จแล้ว และชำระเงิน'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    padding: 20,
  },

  title: {
    fontSize: 28,

    fontWeight: '800',

    color: '#111827',

    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 25,

    elevation: 5,
  },

  complete: {
    fontSize: 20,

    fontWeight: '800',

    color: '#16A34A',

    marginBottom: 15,
  },

  station: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  subText: {
    marginTop: 5,

    color: '#64748B',

    fontSize: 15,
  },

  divider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginVertical: 20,
  },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 16,
  },

  label: {
    color: '#64748B',

    fontSize: 16,
  },

  value: {
    fontWeight: '700',

    color: '#111827',
  },

  totalLabel: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  total: {
    fontSize: 20,

    fontWeight: '900',

    color: '#16A34A',
  },

  button: {
    marginTop: 30,

    height: 55,

    borderRadius: 30,

    backgroundColor: '#16A34A',

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 18,

    fontWeight: '800',
  },

  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    textAlign: 'center',
  },
});
