import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { Camera, CameraType } from 'react-native-camera-kit';
import { useCameraPermission } from 'react-native-vision-camera';

import { createAndCheckInChargingSession } from '../../services/charging/chargingSessionApi';

export default function QRScannerScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { station, charger, connector, verification } = route.params ?? {};
  const connectorId = connector?.connectorId;

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [verificationMode, setVerificationMode] = useState<'QR' | 'ACCESS_CODE'>(
    verification?.accessCode ? 'ACCESS_CODE' : 'QR',
  );
  const [scannedQrCode, setScannedQrCode] = useState<string | null>(
    verification?.qrCodePayload ?? null,
  );
  const [accessCode, setAccessCode] = useState(verification?.accessCode ?? '');
  const accessCodeInputRef = useRef<TextInput>(null);
  const isAccessCodeValid = /^\d{4}$/.test(accessCode);
  const canStart =
    verificationMode === 'QR' ? Boolean(scannedQrCode) : isAccessCodeValid;

  useEffect(() => {
    const requestCameraAccess = async () => {
      if (!hasPermission) {
        setIsRequestingPermission(true);

        try {
          await requestPermission();
        } catch (error) {
          console.log('Camera permission error:', error);
        } finally {
          setIsRequestingPermission(false);
        }
      }
    };

    requestCameraAccess();
  }, [hasPermission, requestPermission]);

  const handleConfirmCharging = useCallback(async () => {
    if (isStarting || !canStart || !connectorId) {
      return;
    }

    setIsStarting(true);
    console.log('[Charging] Check-in verification submitted', {
      method: verificationMode === 'QR' ? 'QR' : 'ACCESS_CODE',
    });
    try {
      const session = await createAndCheckInChargingSession({
        connectorId,
        ...(verificationMode === 'QR'
          ? { qrCodePayload: scannedQrCode! }
          : { accessCode }),
      });
      console.log('[Charging] Check-in accepted; selecting payment method', {
        sessionId: session?.id,
        status: session?.status,
      });
      navigation.replace('Payment', { sessionId: session.id, phase: 'SETUP' });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.error?.message ??
        error?.message ??
        'Unable to start charging';
      console.log('[Charging] Start request failed', {
        status: error?.response?.status,
        message,
      });
      Alert.alert('ไม่สามารถเริ่มชาร์จได้', message);
    } finally {
      setIsStarting(false);
    }
  }, [accessCode, canStart, connectorId, isStarting, navigation, scannedQrCode, verificationMode]);

  if (!station || !charger || !connector) {
    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={50} color="#EF4444" />
        <Text style={styles.errorText}>
          {t('qrScanner.invalidChargingInformation')}
        </Text>
      </View>
    );
  }

  if (verificationMode === 'ACCESS_CODE') {
    return (
      <View style={styles.accessPage}>
        <TouchableOpacity
          style={styles.accessBackButton}
          onPress={() => {
            setAccessCode('');
            setVerificationMode('QR');
          }}
          disabled={isStarting}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.accessPageTitle}>กรอกรหัส</Text>
        <Text style={styles.accessPageSubtitle}>
          โปรดกรอกรหัส (Access Code){'\n'}เพื่อเช็คอิน
        </Text>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.accessCodeBoxes}
          onPress={() => accessCodeInputRef.current?.focus()}
        >
          {[0, 1, 2, 3].map(index => (
            <View key={index} style={styles.accessCodeBox}>
              <Text style={styles.accessCodeDigit}>
                {accessCode[index] ? '•' : ''}
              </Text>
            </View>
          ))}
        </TouchableOpacity>

        <TextInput
          ref={accessCodeInputRef}
          value={accessCode}
          onChangeText={value => setAccessCode(value.replace(/\D/g, '').slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
          autoFocus
          secureTextEntry
          editable={!isStarting}
          style={styles.hiddenAccessInput}
        />

        <TouchableOpacity
          style={styles.qrSwitchLink}
          onPress={() => {
            setAccessCode('');
            setVerificationMode('QR');
          }}
          disabled={isStarting}
        >
          <Text style={styles.qrSwitchText}>
            เช็คอินด้วย <Text style={styles.qrSwitchTextLink}>QR Code?</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.accessConfirmButton, (!canStart || isStarting) && { opacity: 0.6 }]}
          onPress={handleConfirmCharging}
          disabled={!canStart || isStarting}
        >
          <Text style={styles.accessConfirmButtonText}>
            {isStarting ? 'กำลังเริ่มชาร์จ...' : 'ยืนยัน'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderCameraContent = () => {
    if (isRequestingPermission) {
      return (
        <View style={styles.cameraMessage}>
          <ActivityIndicator size="large" color="#00C878" />

          <Text style={styles.cameraMessageTitle}>
            {t('qrScanner.requestingCameraPermission')}
          </Text>

          <Text style={styles.cameraMessageText}>
            {t('qrScanner.allowCameraAccess')}
          </Text>
        </View>
      );
    }

    if (!hasPermission) {
      return (
        <View style={styles.cameraMessage}>
          <Ionicons name="camera-outline" size={55} color="#94A3B8" />

          <Text style={styles.cameraMessageTitle}>
            {t('qrScanner.cameraPermissionRequired')}
          </Text>

          <Text style={styles.cameraMessageText}>
            {t('qrScanner.allowCameraAccessToUseScanner')}
          </Text>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>
              {t('qrScanner.allowCamera')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <Camera
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          cameraType={CameraType.Back}
          scanBarcode={verificationMode === 'QR' && !scannedQrCode && !isStarting}
          allowedBarcodeTypes={['qr']}
          showFrame={false}
          onReadCode={(event: any) => {
            const value = event?.nativeEvent?.codeStringValue?.trim();
            if (!value || scannedQrCode || isStarting) return;
            console.log('[Charging] QR scan completed');
            setScannedQrCode(value);
          }}
          onError={(event: any) => {
            console.log('[Charging] QR camera error', {
              message: event?.nativeEvent?.errorMessage,
            });
          }}
        />

        {/* Dark overlay */}
        <View style={styles.cameraOverlay}>
          <View style={styles.scanFrame} />

          <Text style={styles.cameraText}>{t('qrScanner.scanChargerQr')}</Text>

          <Text style={styles.cameraSubText}>
            {scannedQrCode
              ? 'สแกน QR สำเร็จ กรุณากดยืนยันเพื่อเริ่มชาร์จ'
              : t('qrScanner.positionQrCode')}
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('qrScanner.title')}</Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* CAMERA */}
      <View style={styles.cameraBox}>{renderCameraContent()}</View>

      <TouchableOpacity
        style={styles.accessCodeLink}
        onPress={() => setVerificationMode('ACCESS_CODE')}
        disabled={isStarting}
      >
        <Text style={styles.accessCodeLinkText}>ใช้ Access Code 4 หลัก</Text>
      </TouchableOpacity>

      {/* CHARGING INFO */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          {t('qrScanner.chargingInformation')}
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>{t('qrScanner.station')}</Text>

          <Text style={styles.value}>{station.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('qrScanner.charger')}</Text>

          <Text style={styles.value}>
            {charger.chargerName ?? charger.chargerId}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t('qrScanner.connector')}</Text>

          <Text style={styles.value}>
            {connector.label ?? connector.connectorId}
          </Text>
        </View>
      </View>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity
        style={[styles.button, (!canStart || isStarting) && { opacity: 0.6 }]}
        onPress={handleConfirmCharging}
        disabled={!canStart || isStarting}
        activeOpacity={0.8}
      >
        <Ionicons name="flash" size={22} color="#FFFFFF" />

        <Text style={styles.buttonText}>
          {isStarting ? 'กำลังเริ่มชาร์จ...' : t('qrScanner.confirmStartCharging')}
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

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  headerPlaceholder: {
    width: 40,
  },

  cameraBox: {
    height: 300,
    marginTop: 30,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#111827',
    position: 'relative',
  },

  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.15)',
  },

  scanFrame: {
    width: 210,
    height: 210,
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 120, 0.75)',
    borderRadius: 18,
  },

  cameraText: {
    marginTop: 25,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  cameraSubText: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },

  cameraMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  cameraMessageTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  cameraMessageText: {
    marginTop: 8,
    fontSize: 13,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 20,
  },

  permissionButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00C878',
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 25,
  },

  accessCodeLink: {
    alignItems: 'center',
    marginTop: 16,
  },

  accessCodeLinkText: {
    color: '#16A34A',
    fontWeight: '700',
  },

  accessPage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingTop: 74,
  },

  accessBackButton: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    left: 20,
    position: 'absolute',
    top: 20,
    width: 40,
  },

  accessPageTitle: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },

  accessPageSubtitle: {
    color: '#737373',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 18,
    textAlign: 'center',
  },

  accessCodeBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 145,
  },

  accessCodeBox: {
    alignItems: 'center',
    backgroundColor: '#E9E9EE',
    borderRadius: 12,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },

  accessCodeDigit: {
    color: '#111827',
    fontSize: 32,
    lineHeight: 36,
  },

  hiddenAccessInput: {
    height: 1,
    opacity: 0,
    position: 'absolute',
    width: 1,
  },

  qrSwitchLink: {
    alignSelf: 'center',
    marginTop: 110,
  },

  qrSwitchText: {
    color: '#737373',
    fontSize: 15,
  },

  qrSwitchTextLink: {
    color: '#2F9E44',
    textDecorationLine: 'underline',
  },

  accessConfirmButton: {
    backgroundColor: '#00C878',
    borderRadius: 18,
    bottom: 32,
    height: 54,
    justifyContent: 'center',
    left: 32,
    position: 'absolute',
    right: 32,
  },

  accessConfirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },


  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 15,
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
    fontSize: 14,
    fontWeight: '700',
    maxWidth: 200,
    textAlign: 'right',
  },

  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#00C878',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  errorText: {
    marginTop: 20,
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
});
