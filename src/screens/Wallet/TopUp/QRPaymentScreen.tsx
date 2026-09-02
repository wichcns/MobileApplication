import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

import { WebView } from 'react-native-webview';

import { getWalletBalance, topUpWallet } from '../../../api/wallet.api';

export default function QRPaymentScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  // ==========================================================
  // STATE
  // ==========================================================

  const [qrCodeContent, setQrCodeContent] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [balanceBeforePayment, setBalanceBeforePayment] = useState<number | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  // ==========================================================
  // DECODE HTML ENTITIES
  // ==========================================================

  const decodeHtmlEntities = (value: string): string => {
    return value
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&');
  };

  // ==========================================================
  // NORMALIZE SVG
  // ==========================================================

  const normalizeSvg = (svg: string): string => {
    let result = svg.trim();

    // Remove XML declaration
    result = result.replace(/<\?xml[\s\S]*?\?>/gi, '');

    // Remove DOCTYPE
    result = result.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

    result = result.trim();

    // Decode HTML entities
    result = decodeHtmlEntities(result);

    result = result.trim();

    return result;
  };

  // ==========================================================
  // CREATE PROMPTPAY QR
  // ==========================================================

  useEffect(() => {
    void createPromptPayQR();
    // The payment request must run only once when this screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPromptPayQR = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setQrCodeContent(null);
      setExpiresAt(null);
      const balanceResponse = await getWalletBalance();
      setBalanceBeforePayment(Number(balanceResponse?.balance ?? 0));

      console.log('=====================================');
      console.log('===== PROMPTPAY TOP UP START =====');
      console.log('Amount:', amount);
      console.log('=====================================');

      // ======================================================
      // REQUEST BACKEND
      // ======================================================

      const payload = {
        method: 'PROMPTPAY',
        amount: Number(amount),
      };

      console.log('===== PROMPTPAY REQUEST =====');
      console.log(JSON.stringify(payload, null, 2));
      console.log('=====================================');

      const response = await topUpWallet(payload);

      console.log('===== PROMPTPAY RESPONSE =====');
      console.log(JSON.stringify(response, null, 2));
      console.log('=====================================');

      // ======================================================
      // GET OMISE CHARGE
      // ======================================================

      const omiseCharge = response?.omiseCharge;

      console.log('=====================================');
      console.log('===== OMISE CHARGE =====');
      console.log('omiseChargeId:', omiseCharge?.omiseChargeId);
      console.log('qrCodeDownloadUri:', omiseCharge?.qrCodeDownloadUri);
      console.log('expiresAt:', omiseCharge?.expiresAt);
      console.log('=====================================');

      const qrUrl = omiseCharge?.qrCodeDownloadUri;

      if (!qrUrl) {
        console.log('❌ qrCodeDownloadUri NOT FOUND');

        throw new Error('ระบบสร้างรายการ PromptPay สำเร็จ แต่ไม่พบ QR Code');
      }

      console.log('✅ qrCodeDownloadUri FOUND');

      setExpiresAt(omiseCharge?.expiresAt ?? null);

      // ======================================================
      // FETCH SVG FROM OMISE
      // ======================================================

      console.log('=====================================');
      console.log('===== FETCH OMISE SVG =====');
      console.log('QR URL:', qrUrl);
      console.log('=====================================');

      const qrResponse = await fetch(qrUrl);

      console.log('QR HTTP STATUS:', qrResponse.status);

      const contentType = qrResponse.headers.get('content-type');

      console.log('QR CONTENT TYPE:', contentType);

      if (!qrResponse.ok) {
        throw new Error(
          `ไม่สามารถดาวน์โหลด QR Code ได้ (${qrResponse.status})`,
        );
      }

      // ======================================================
      // READ SVG AS TEXT
      // ======================================================

      const rawSvg = await qrResponse.text();

      console.log('=====================================');
      console.log('===== QR SVG RESPONSE =====');
      console.log('Length:', rawSvg.length);
      console.log('First 200 chars:', rawSvg.substring(0, 200));
      console.log('=====================================');

      if (!rawSvg || !rawSvg.trim()) {
        throw new Error('QR Code ที่ได้รับจาก Omise ว่างเปล่า');
      }

      // ======================================================
      // NORMALIZE SVG
      // ======================================================

      const svgText = normalizeSvg(rawSvg);

      console.log('=====================================');
      console.log('===== NORMALIZED SVG =====');
      console.log('Length:', svgText.length);
      console.log('First 300 chars:', svgText.substring(0, 300));
      console.log('=====================================');

      // ======================================================
      // VALIDATE SVG
      // ======================================================

      const isSvg = svgText.startsWith('<svg') || svgText.startsWith('<?xml');

      if (!isSvg) {
        console.log('❌ RESPONSE IS NOT SVG');

        console.log('Response:', svgText.substring(0, 500));

        throw new Error('ข้อมูล QR Code ที่ได้รับจาก Omise ไม่ใช่ SVG');
      }

      console.log('✅ QR SVG FOUND');

      // ======================================================
      // SAVE SVG STRING
      // ======================================================

      setQrCodeContent(svgText);

      console.log('=====================================');
      console.log('✅ PROMPTPAY QR READY');
      console.log('=====================================');
    } catch (err: any) {
      console.log('=====================================');
      console.log('❌ PROMPTPAY TOP UP ERROR');
      console.log('Message:', err?.message);

      console.log('Response:', JSON.stringify(err?.response?.data, null, 2));

      console.log('Status:', err?.response?.status);

      console.log('=====================================');

      setError(
        err?.response?.data?.message ||
          err?.message ||
          'ไม่สามารถสร้าง QR Code ได้',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================================
  // PAYMENT COMPLETED
  // ==========================================================

  const handlePayment = async () => {
    if (isCheckingPayment) {
      return;
    }

    try {
      setIsCheckingPayment(true);

      // Omise จะส่ง webhook เพื่อเพิ่มเครดิต จึงตรวจยอดจาก backend
      // เท่านั้น และไม่เพิ่มยอดในเครื่องเอง
      for (let attempt = 0; attempt < 12; attempt += 1) {
        const response = await getWalletBalance();
        const currentBalance = Number(response?.balance ?? 0);

        if (
          balanceBeforePayment !== null &&
          currentBalance >= balanceBeforePayment + Number(amount)
        ) {
          Alert.alert('ชำระเงินสำเร็จ', 'ยอดเงินใน Wallet ได้รับการอัปเดตแล้ว', [
            { text: 'ตกลง', onPress: () => navigation.navigate('WalletHome') },
          ]);
          return;
        }

        await new Promise<void>(resolve => setTimeout(() => resolve(), 5000));
      }

      Alert.alert(
        'กำลังรอยืนยันการชำระเงิน',
        'ยังไม่พบยอดเงินที่อัปเดต กรุณารอสักครู่แล้วตรวจสอบยอด Wallet อีกครั้ง',
      );
    } catch (err: any) {
      console.log('[PromptPay] Payment status check failed', {
        status: err?.response?.status,
        message: err?.response?.data?.message || err?.message,
      });
      Alert.alert('ตรวจสอบการชำระเงินไม่สำเร็จ', 'กรุณาตรวจสอบยอด Wallet อีกครั้ง');
    } finally {
      setIsCheckingPayment(false);
    }
  };

  // ==========================================================
  // RETRY
  // ==========================================================

  const handleRetry = () => {
    setQrCodeContent(null);
    setError(null);
    setExpiresAt(null);
    setBalanceBeforePayment(null);

    createPromptPayQR();
  };

  // ==========================================================
  // FORMAT EXPIRATION
  // ==========================================================

  const formattedExpiresAt = expiresAt
    ? new Date(expiresAt).toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>{t('qrPayment.title')}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* =====================================================
            PAYMENT METHOD
        ====================================================== */}

        <View style={styles.methodCard}>
          <View style={styles.methodIcon}>
            <Ionicons name="qr-code-outline" size={25} color="#44C4CE" />
          </View>

          <View style={styles.methodText}>
            <Text style={styles.methodTitle}>
              {t('paymentMethod.mobileBanking')}
            </Text>

            <Text style={styles.methodSubtitle}>
              {t('paymentMethod.mobileBankingSubtitle')}
            </Text>
          </View>
        </View>

        {/* =====================================================
            AMOUNT
        ====================================================== */}

        <Text style={styles.label}>{t('qrPayment.amount')}</Text>

        <Text style={styles.amount}>
          {Number(amount).toFixed(2)} {t('common.currency')}
        </Text>

        {/* =====================================================
            QR SECTION
        ====================================================== */}

        <View style={styles.qrContainer}>
          {/* ===================================================
              LOADING
          ==================================================== */}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#44C4CE" />

              <Text style={styles.loadingTitle}>กำลังสร้าง QR Code</Text>

              <Text style={styles.loadingSubtitle}>กรุณารอสักครู่...</Text>
            </View>
          )}

          {/* ===================================================
              ERROR
          ==================================================== */}

          {!isLoading && error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={55} color="#DC2626" />

              <Text style={styles.errorTitle}>ไม่สามารถสร้าง QR Code ได้</Text>

              <Text style={styles.errorMessage}>{error}</Text>

              <TouchableOpacity
                style={styles.retryButton}
                activeOpacity={0.85}
                onPress={handleRetry}
              >
                <Ionicons name="refresh" size={19} color="#FFFFFF" />

                <Text style={styles.retryButtonText}>ลองอีกครั้ง</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ===================================================
              SVG QR CODE
          ==================================================== */}

          {!isLoading && !error && qrCodeContent && (
            <View style={styles.qrContent}>
              <Text style={styles.qrTitle}>สแกน QR Code เพื่อชำระเงิน</Text>

              <View style={styles.qrImageWrapper}>
                <WebView
                  source={{
                    html: `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta
                            name="viewport"
                            content="width=device-width,
                            initial-scale=1.0,
                            maximum-scale=1.0,
                            user-scalable=no"
                          />

                          <style>
                            html, body {
                              margin: 0;
                              padding: 0;
                              width: 100%;
                              height: 100%;
                              background: #ffffff;
                              overflow: hidden;
                            }

                            svg {
                              width: 100%;
                              height: 100%;
                              display: block;
                            }
                          </style>
                        </head>

                        <body>
                          ${qrCodeContent}
                        </body>
                      </html>
                    `,
                  }}
                  style={styles.qrWebView}
                  scrollEnabled={false}
                  javaScriptEnabled={false}
                />
              </View>

              <Text style={styles.qrInstruction}>
                เปิดแอปธนาคารของคุณ และสแกน QR Code นี้เพื่อชำระเงิน
              </Text>

              {formattedExpiresAt && (
                <View style={styles.expireRow}>
                  <Ionicons name="time-outline" size={17} color="#64748B" />

                  <Text style={styles.expireText}>
                    QR Code หมดอายุ {formattedExpiresAt}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* =====================================================
            PAYMENT BUTTON
        ====================================================== */}

        {!isLoading && !error && qrCodeContent && (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handlePayment}
            disabled={isCheckingPayment}
          >
            {isCheckingPayment ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>{t('qrPayment.iHavePaid')}</Text>
                <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 30,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 5,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
    color: '#111827',
  },

  // ==========================================================
  // PAYMENT METHOD
  // ==========================================================

  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E3F6F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  methodText: {
    flex: 1,
    marginLeft: 14,
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  methodSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },

  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    color: '#64748B',
    marginTop: 22,
    fontSize: 14,
    fontWeight: '600',
  },

  // ==========================================================
  // AMOUNT
  // ==========================================================

  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#44C4CE',
    marginTop: 5,
  },

  // ==========================================================
  // QR CONTAINER
  // ==========================================================

  qrContainer: {
    marginTop: 25,
    minHeight: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
  },

  // ==========================================================
  // LOADING
  // ==========================================================

  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  loadingSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },

  // ==========================================================
  // ERROR
  // ==========================================================

  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },

  errorMessage: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },

  retryButton: {
    marginTop: 20,
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: '#44C4CE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },

  // ==========================================================
  // QR CONTENT
  // ==========================================================

  qrContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qrTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 15,
  },

  // ==========================================================
  // SVG WRAPPER
  // ==========================================================

  qrImageWrapper: {
    width: 280,
    minHeight: 400,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  qrInstruction: {
    marginTop: 15,
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  expireRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  expireText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#64748B',
  },

  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    marginTop: 20,
    height: 56,
    backgroundColor: '#44C4CE',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginRight: 8,
  },

  qrWebView: {
    width: 260,
    height: 260,
    backgroundColor: '#FFFFFF',
  },
});
