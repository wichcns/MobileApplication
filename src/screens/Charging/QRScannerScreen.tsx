import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import { startChargingSession } from '../../store/chargingStore';

export default function QRScannerScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { station, charger, connector } = route.params ?? {};

  const device = useCameraDevice('back');

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

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

  const handleConfirmCharging = () => {
    // MOCK FLOW
    // ยังไม่ตรวจ QR จริง
    // ยังไม่เชื่อม Database

    startChargingSession(station, charger, connector);

    navigation.navigate('Charging');
  };

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

    if (!device) {
      return (
        <View style={styles.cameraMessage}>
          <Ionicons name="camera-reverse-outline" size={55} color="#94A3B8" />

          <Text style={styles.cameraMessageTitle}>
            {t('qrScanner.cameraNotAvailable')}
          </Text>

          <Text style={styles.cameraMessageText}>
            {t('qrScanner.unableToAccessCamera')}
          </Text>
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
          device={device}
          isActive={true}
        />

        {/* Dark overlay */}
        <View style={styles.cameraOverlay}>
          {/* Scan Area */}
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <View style={styles.scanLine} />
          </View>

          <Text style={styles.cameraText}>{t('qrScanner.scanChargerQr')}</Text>

          <Text style={styles.cameraSubText}>
            {t('qrScanner.positionQrCode')}
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
        style={styles.button}
        onPress={handleConfirmCharging}
        activeOpacity={0.8}
      >
        <Ionicons name="flash" size={22} color="#FFFFFF" />

        <Text style={styles.buttonText}>
          {t('qrScanner.confirmStartCharging')}
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#00C878',
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },

  scanLine: {
    position: 'absolute',
    left: 15,
    right: 15,
    height: 2,
    backgroundColor: '#00C878',
    top: '50%',
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
