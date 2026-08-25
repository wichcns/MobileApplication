import React, { useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { captureRef } from 'react-native-view-shot';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ChargingHistory } from '../../types/history';

export default function ChargingHistoryDetail() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const receiptRef = useRef<any>(null);

  const saveReceipt = async () => {
    try {
      const uri = await captureRef(receiptRef, {
        format: 'png',
        quality: 1,
      });

      await CameraRoll.save(uri, {
        type: 'photo',
      });

      Alert.alert(t('common.success'), t('chargingHistoryDetail.receiptSaved'));
    } catch (error) {
      console.log('SAVE ERROR', error);

      Alert.alert(
        t('common.error'),
        t('chargingHistoryDetail.receiptSaveError'),
      );
    }
  };

  const history = (
    route.params as
      | {
          history: ChargingHistory;
        }
      | undefined
  )?.history;

  if (!history) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('chargingHistoryDetail.noData')}</Text>

          <Text style={styles.subtitle}>
            {t('chargingHistoryDetail.historyNotFound')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.title}>{t('chargingHistoryDetail.title')}</Text>

          <View
            style={{
              width: 40,
            }}
          />
        </View>

        {/* =====================================================
            RECEIPT CARD
        ====================================================== */}

        <View ref={receiptRef} style={styles.receiptCard}>
          <View style={styles.receiptHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="receipt-outline" size={32} color="#00A651" />
            </View>

            <View>
              <Text style={styles.stationTitle}>{history.stationName}</Text>

              <Text style={styles.receiptNo}>
                {t('chargingHistoryDetail.receiptNo')}:{' '}
                {history.receiptNumber ?? 'AUTO'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* =====================================================
              CHARGING INFORMATION
          ====================================================== */}

          <Text style={styles.section}>
            {t('chargingHistoryDetail.chargingInformation')}
          </Text>

          <Row
            label={t('chargingHistoryDetail.charger')}
            value={history.chargerName}
          />

          <Row
            label={t('chargingHistoryDetail.connector')}
            value={history.connectorType}
          />

          <Row
            label={t('chargingHistoryDetail.energy')}
            value={`${history.energy} kWh`}
          />

          <Row
            label={t('chargingHistoryDetail.duration')}
            value={`${history.duration} min`}
          />

          <View style={styles.divider} />

          {/* =====================================================
              PAYMENT SUMMARY
          ====================================================== */}

          <Text style={styles.section}>
            {t('chargingHistoryDetail.paymentSummary')}
          </Text>

          <Row
            label={t('chargingHistoryDetail.chargingFee')}
            value={`฿${history.total.toFixed(2)}`}
          />

          <Row
            label={t('chargingHistoryDetail.serviceFee')}
            value="-"
          />

          <Row
            label={t('chargingHistoryDetail.vat')}
            value={t('chargingHistoryDetail.included')}
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>
              {t('chargingHistoryDetail.totalPaid')}
            </Text>

            <Text style={styles.total}>฿{history.total}</Text>
          </View>
        </View>

        {/* =====================================================
            DOWNLOAD RECEIPT
        ====================================================== */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveReceipt}
          activeOpacity={0.8}
        >
          <Ionicons name="download-outline" size={26} color="#16A34A" />

          <View style={styles.saveButtonContent}>
            <Text style={styles.saveButtonTitle}>
              {t('chargingHistoryDetail.saveReceipt')}
            </Text>

            <Text style={styles.saveButtonSubtitle}>
              {t('chargingHistoryDetail.saveReceiptSubtitle')}
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#64748B" />
        </TouchableOpacity>

        {/* =====================================================
            TAX INVOICE
        ====================================================== */}

        <TouchableOpacity
          style={styles.taxButton}
          onPress={() => {
            navigation.navigate('TaxInvoiceRequest', {
              history,
            });
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="document-text-outline" size={22} color="#00A651" />

          <Text style={styles.taxText}>
            {t('chargingHistoryDetail.requestTaxInvoice')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// ROW COMPONENT
// ============================================================

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5F6F8',
  },

  content: {
    padding: 20,

    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 20,
  },

  backButton: {
    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    fontSize: 22,

    fontWeight: '800',

    color: '#111827',
  },

  subtitle: {
    color: '#6B7280',
  },

  receiptCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 20,
  },

  receiptHeader: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  iconBox: {
    width: 55,

    height: 55,

    borderRadius: 15,

    backgroundColor: '#ECFDF5',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  stationTitle: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  receiptNo: {
    marginTop: 5,

    color: '#64748B',

    fontSize: 13,
  },

  section: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',

    marginVertical: 15,
  },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 12,
  },

  label: {
    color: '#64748B',

    fontSize: 14,
  },

  value: {
    color: '#111827',

    fontWeight: '700',

    flexShrink: 1,

    maxWidth: '65%',

    textAlign: 'right',
  },

  divider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginVertical: 15,
  },

  totalBox: {
    marginTop: 20,

    padding: 16,

    borderRadius: 16,

    backgroundColor: '#ECFDF5',

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  total: {
    fontSize: 24,

    fontWeight: '900',

    color: '#00A651',
  },

  button: {
    marginTop: 20,

    height: 55,

    borderRadius: 18,

    backgroundColor: '#00A651',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 10,

    color: '#FFFFFF',

    fontWeight: '800',

    fontSize: 16,
  },

  taxButton: {
    marginTop: 12,

    height: 55,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: '#00A651',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',
  },

  taxText: {
    marginLeft: 10,

    color: '#00A651',

    fontWeight: '800',

    fontSize: 16,
  },

  saveButton: {
    marginTop: 20,

    height: 75,

    borderRadius: 18,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#E2E8F0',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 20,
  },

  saveButtonContent: {
    flex: 1,

    marginLeft: 15,
  },

  saveButtonTitle: {
    fontSize: 17,

    fontWeight: '800',

    color: '#111827',
  },

  saveButtonSubtitle: {
    marginTop: 4,

    fontSize: 13,

    color: '#64748B',
  },
});
