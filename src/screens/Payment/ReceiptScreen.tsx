import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewShot from 'react-native-view-shot';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  chargingSession,
  clearChargingSession,
} from '../../store/chargingStore';
import {
  GalleryPermissionError,
  saveImageToGallery,
} from '../../utils/saveImageToGallery';

export default function ReceiptScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const receiptRef = useRef<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // ==========================================================
  // PAYMENT DATA
  // ==========================================================

  const {
    originalAmount = chargingSession.total,
    discountAmount = 0,
    finalAmount = chargingSession.total,
    coupon = null,
    paymentMethod = chargingSession.paymentMethod,
  } = route.params || {};

  // ==========================================================
  // SAVE RECEIPT
  // ==========================================================

  const saveReceipt = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const uri = await receiptRef.current?.capture();

      if (!uri) {
        Alert.alert('Error', 'Unable to capture receipt');

        return;
      }

      await saveImageToGallery(uri);

      Alert.alert(t('common.success'), t('receipt.receiptSaved'));
    } catch (error) {
      console.log('Save receipt error', error);

      Alert.alert(
        t('common.error'),
        error instanceof GalleryPermissionError
          ? t('receipt.photoPermissionDenied')
          : t('receipt.receiptSaveError'),
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ==========================================================
  // BACK TO HOME
  // ==========================================================

  const handleBackHome = () => {
    clearChargingSession();

    navigation.navigate('HomeScreen');
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ====================================================
          HEADER
      ===================================================== */}

        <View style={styles.header}>
          <Text style={styles.title}>{t('receipt.title')}</Text>
        </View>

        {/* ====================================================
          RECEIPT
      ===================================================== */}

        <ViewShot
          ref={receiptRef}
          options={{
            format: 'png',
            quality: 1,
          }}
        >
          <View style={styles.card}>
            {/* ==================================================
              SUCCESS
          ================================================== */}

            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>

              <Text style={styles.success}>
                {t('receipt.paymentSuccessful')}
              </Text>

              <Text style={styles.successSubtitle}>
                {t('receipt.chargingPaymentCompleted')}
              </Text>
            </View>

            {/* ==================================================
              CHARGING INFORMATION
          ================================================== */}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('receipt.chargingInformation')}
              </Text>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.station')}</Text>

                <Text style={styles.value}>
                  {chargingSession.stationName || '-'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.charger')}</Text>

                <Text style={styles.value}>
                  {chargingSession.chargerName || '-'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.connector')}</Text>

                <Text style={styles.value}>
                  {chargingSession.connectorLabel || '-'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.energy')}</Text>

                <Text style={styles.value}>
                  {Number(chargingSession.energy || 0).toFixed(2)} kWh
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>
                  {t('receipt.chargingDuration')}
                </Text>

                <Text style={styles.value}>
                  {chargingSession.duration || '-'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.endTime')}</Text>

                <Text style={styles.value}>
                  {chargingSession.endTime || '-'}
                </Text>
              </View>
            </View>

            {/* ==================================================
              PAYMENT SUMMARY
          ================================================== */}

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('receipt.paymentSummary')}
              </Text>

              {/* ORIGINAL AMOUNT */}

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.chargingAmount')}</Text>

                <Text style={styles.value}>
                  {Number(originalAmount).toFixed(2)} {t('common.currency')}
                </Text>
              </View>

              {/* COUPON */}

              {coupon && discountAmount > 0 && (
                <View style={styles.row}>
                  <View style={styles.discountLabelContainer}>
                    <Text style={styles.label}>
                      {t('receipt.couponDiscount')}
                    </Text>

                    <Text style={styles.couponCode}>{coupon.code}</Text>
                  </View>

                  <Text style={styles.discountValue}>
                    -{Number(discountAmount).toFixed(2)} {t('common.currency')}
                  </Text>
                </View>
              )}

              {/* TOTAL */}

              <View style={styles.totalDivider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  {t('receipt.totalPayment')}
                </Text>

                <Text style={styles.totalAmount}>
                  {Number(finalAmount).toFixed(2)} {t('common.currency')}
                </Text>
              </View>
            </View>

            {/* ==================================================
              PAYMENT INFORMATION
          ================================================== */}

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('receipt.paymentInformation')}
              </Text>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.paymentMethod')}</Text>

                <Text style={styles.value}>{paymentMethod || '-'}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.transactionId')}</Text>

                <Text style={styles.valueSmall}>
                  {chargingSession.transactionId || '-'}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{t('receipt.paidAt')}</Text>

                <Text style={styles.valueSmall}>
                  {chargingSession.paidAt || '-'}
                </Text>
              </View>
            </View>
          </View>
        </ViewShot>

        {/* ====================================================
          ACTION BUTTONS
      ===================================================== */}

        <View style={styles.actionContainer}>
          {/* ==================================================
            SAVE RECEIPT
        ================================================== */}

          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.disabledButton]}
            onPress={saveReceipt}
            activeOpacity={0.8}
            disabled={isSaving}
          >
            <View style={styles.actionIconWhite}>
              <Text style={styles.saveIcon}>↓</Text>
            </View>

            <View style={styles.saveButtonContent}>
              <Text style={styles.saveButtonTitle}>
                {t('receipt.saveReceipt')}
              </Text>

              <Text style={styles.saveButtonSubtitle}>
                {t('receipt.saveReceiptDescription')}
              </Text>
            </View>

            <Text style={styles.arrowWhite}>›</Text>
          </TouchableOpacity>

          {/* ==================================================
            TAX INVOICE
        ================================================== */}

          <TouchableOpacity
            style={styles.invoiceButton}
            onPress={() => {
              navigation.navigate('TaxInvoice');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.invoiceIconContainer}>
              <Text style={styles.invoiceIcon}>▣</Text>
            </View>

            <View style={styles.invoiceButtonContent}>
              <Text style={styles.invoiceButtonTitle}>
                {t('receipt.requestTaxInvoice')}
              </Text>

              <Text style={styles.invoiceButtonSubtitle}>
                {t('receipt.taxInvoiceDescription')}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* ==================================================
            BACK HOME
        ================================================== */}

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleBackHome}
            activeOpacity={0.7}
          >
            <Text style={styles.homeButtonText}>{t('receipt.backToHome')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',
  },

  scrollContent: {
    padding: 20,

    paddingBottom: 40,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    marginBottom: 20,

    alignItems: 'center',
  },

  title: {
    fontSize: 28,

    fontWeight: '800',

    color: '#111827',
  },

  // ==========================================================
  // RECEIPT CARD
  // ==========================================================

  card: {
    backgroundColor: '#FFFFFF',

    padding: 22,

    borderRadius: 20,

    borderWidth: 1,

    borderColor: '#E2E8F0',

    elevation: 4,
  },

  // ==========================================================
  // SUCCESS
  // ==========================================================

  successContainer: {
    alignItems: 'center',

    paddingBottom: 20,
  },

  successIcon: {
    width: 58,

    height: 58,

    borderRadius: 29,

    backgroundColor: '#D7F3F5',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,
  },

  successIconText: {
    fontSize: 30,

    fontWeight: '900',

    color: '#44C4CE',
  },

  success: {
    fontSize: 20,

    fontWeight: '900',

    color: '#44C4CE',
  },

  successSubtitle: {
    marginTop: 5,

    fontSize: 11,

    color: '#64748B',

    textAlign: 'center',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop: 5,
  },

  sectionTitle: {
    marginBottom: 14,

    fontSize: 15,

    fontWeight: '800',

    color: '#111827',
  },

  // ==========================================================
  // ROW
  // ==========================================================

  row: {
    minHeight: 30,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 8,
  },

  label: {
    flex: 1,

    fontSize: 12,

    color: '#64748B',
  },

  value: {
    flex: 1,

    fontSize: 12,

    fontWeight: '700',

    color: '#111827',

    textAlign: 'right',
  },

  valueSmall: {
    flex: 1,

    fontSize: 10,

    fontWeight: '700',

    color: '#111827',

    textAlign: 'right',
  },

  // ==========================================================
  // DISCOUNT
  // ==========================================================

  discountLabelContainer: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',
  },

  couponCode: {
    marginLeft: 6,

    paddingHorizontal: 6,

    paddingVertical: 2,

    borderRadius: 5,

    backgroundColor: '#EAF9FA',

    fontSize: 9,

    fontWeight: '800',

    color: '#44C4CE',
  },

  discountValue: {
    fontSize: 12,

    fontWeight: '800',

    color: '#44C4CE',

    textAlign: 'right',
  },

  // ==========================================================
  // TOTAL
  // ==========================================================

  totalDivider: {
    height: 1,

    backgroundColor: '#E2E8F0',

    marginTop: 8,

    marginBottom: 10,
  },

  totalRow: {
    minHeight: 45,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 15,

    fontWeight: '900',

    color: '#111827',
  },

  totalAmount: {
    fontSize: 23,

    fontWeight: '900',

    color: '#44C4CE',
  },

  // ==========================================================
  // DIVIDER
  // ==========================================================

  divider: {
    height: 1,

    backgroundColor: '#E2E8F0',

    marginVertical: 18,
  },

  // ==========================================================
  // ACTION CONTAINER
  // ==========================================================

  actionContainer: {
    marginTop: 20,
  },

  // ==========================================================
  // SAVE RECEIPT
  // ==========================================================

  saveButton: {
    minHeight: 72,

    backgroundColor: '#44C4CE',

    borderRadius: 18,

    paddingHorizontal: 18,

    flexDirection: 'row',

    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  actionIconWhite: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: 'rgba(255,255,255,0.18)',

    justifyContent: 'center',

    alignItems: 'center',
  },

  saveIcon: {
    color: '#FFFFFF',

    fontSize: 27,

    fontWeight: '700',
  },

  saveButtonContent: {
    flex: 1,

    marginLeft: 14,
  },

  saveButtonTitle: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '800',
  },

  saveButtonSubtitle: {
    color: 'rgba(255,255,255,0.8)',

    fontSize: 12,

    marginTop: 3,
  },

  arrowWhite: {
    color: '#FFFFFF',

    fontSize: 30,

    fontWeight: '300',
  },

  // ==========================================================
  // TAX INVOICE
  // ==========================================================

  invoiceButton: {
    minHeight: 72,

    marginTop: 12,

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    paddingHorizontal: 18,

    flexDirection: 'row',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  invoiceIconContainer: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: '#EAF9FA',

    justifyContent: 'center',

    alignItems: 'center',
  },

  invoiceIcon: {
    color: '#44C4CE',

    fontSize: 20,

    fontWeight: '700',
  },

  invoiceButtonContent: {
    flex: 1,

    marginLeft: 14,
  },

  invoiceButtonTitle: {
    color: '#111827',

    fontSize: 16,

    fontWeight: '800',
  },

  invoiceButtonSubtitle: {
    color: '#64748B',

    fontSize: 12,

    marginTop: 3,
  },

  arrow: {
    color: '#64748B',

    fontSize: 30,

    fontWeight: '300',
  },

  // ==========================================================
  // HOME
  // ==========================================================

  homeButton: {
    marginTop: 18,

    height: 45,

    justifyContent: 'center',

    alignItems: 'center',
  },

  homeButtonText: {
    color: '#64748B',

    fontSize: 15,

    fontWeight: '700',
  },
});
