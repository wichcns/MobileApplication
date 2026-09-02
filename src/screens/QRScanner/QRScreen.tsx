import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Camera, CameraType } from 'react-native-camera-kit';
import { useCameraPermission } from 'react-native-vision-camera';

import apiClient from '../../api/client';
import { mapStationFromApi } from '../../api/mappers/station.mapper';
import { Station } from '../../types/station';

type VerificationMode = 'QR' | 'ACCESS_CODE';

const unwrapResponse = (response: any) =>
  response?.data?.data ?? response?.data;

const findStationFromChargingPoint = (chargingPoint: any): Station | null => {
  const station =
    chargingPoint?.station ??
    chargingPoint?.stationEntity ??
    chargingPoint?.chargingStation;
  if (!station) return null;

  return mapStationFromApi({
    ...station,
    chargingPoints: Array.isArray(station.chargingPoints)
      ? station.chargingPoints
      : [chargingPoint],
  });
};

export default function QRScreen() {
  const navigation = useNavigation<any>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const accessCodeInputRef = useRef<TextInput>(null);
  const [mode, setMode] = useState<VerificationMode>('QR');
  const [scannedValue, setScannedValue] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [requestingPermission, setRequestingPermission] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const canContinue =
    mode === 'QR' ? Boolean(scannedValue) : /^\d{4}$/.test(accessCode);

  useEffect(() => {
    if (hasPermission) return;
    const requestAccess = async () => {
      setRequestingPermission(true);
      try {
        await requestPermission();
      } catch {
        console.log('[QR] Camera permission request failed');
      } finally {
        setRequestingPermission(false);
      }
    };
    requestAccess();
  }, [hasPermission, requestPermission]);

  const goToConnectorSelection = useCallback(
    (station: Station) => {
      // QR is a tab. The actual selection flow belongs to the Home stack.
      navigation
        .getParent()
        ?.navigate('Home', { screen: 'SelectConnector', params: { station } });
    },
    [navigation],
  );

  const lookUpChargingPoint = useCallback(async () => {
    if (!canContinue || isLookingUp) return;
    const value = mode === 'QR' ? scannedValue!.trim() : accessCode;
    const queryKey = mode === 'QR' ? 'serialNumber' : 'accessCode';
    setIsLookingUp(true);
    console.log('[QR] Looking up charging point', { method: mode });

    try {
      // Production endpoint used by the old mobile app: resolves QR/access code to a station.
      const response = await apiClient.get('/charging-points', {
        params: { [queryKey]: value },
      });
      const result = unwrapResponse(response);
      const chargingPoint = Array.isArray(result)
        ? result[0]
        : Array.isArray(result?.chargingPoints)
        ? result.chargingPoints[0]
        : result;
      const station = findStationFromChargingPoint(chargingPoint);
      if (!station?.id || station.chargers.length === 0) {
        throw new Error('ไม่พบสถานีหรือหัวชาร์จที่ใช้งานได้');
      }
      console.log('[QR] Charging point found', { stationId: station.id });
      goToConnectorSelection(station);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.response?.data?.error?.message ??
        error?.message ??
        'ไม่พบข้อมูลจาก QR Code หรือ Access Code นี้';
      console.log('[QR] Charging point lookup failed', {
        method: mode,
        status: error?.response?.status,
        message,
      });
      Alert.alert('ไม่สามารถค้นหาหัวชาร์จได้', message);
    } finally {
      setIsLookingUp(false);
    }
  }, [
    accessCode,
    canContinue,
    goToConnectorSelection,
    isLookingUp,
    mode,
    scannedValue,
  ]);

  if (mode === 'ACCESS_CODE') {
    return (
      <View style={styles.accessContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setAccessCode('');
            setMode('QR');
          }}
          disabled={isLookingUp}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.accessContent}>
          <Text style={styles.accessTitle}>กรอกรหัส</Text>
          <Text style={styles.accessSubtitle}>
            โปรดกรอกรหัส (Access Code){'\n'}เพื่อค้นหาหัวชาร์จ
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.codeBoxes}
            onPress={() => accessCodeInputRef.current?.focus()}
          >
            {[0, 1, 2, 3].map(index => (
              <View key={index} style={styles.codeBox}>
                <Text style={styles.codeDigit}>
                  {accessCode[index] ? '•' : ''}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
          <TextInput
            ref={accessCodeInputRef}
            value={accessCode}
            onChangeText={value =>
              setAccessCode(value.replace(/\D/g, '').slice(0, 4))
            }
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            secureTextEntry
            editable={!isLookingUp}
            style={styles.hiddenInput}
          />
          <TouchableOpacity
            onPress={() => {
              setAccessCode('');
              setMode('QR');
            }}
            disabled={isLookingUp}
          >
            <Text style={styles.switchText}>
              เช็คอินด้วย <Text style={styles.switchLink}>QR Code?</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!canContinue || isLookingUp) && styles.disabledButton,
          ]}
          onPress={lookUpChargingPoint}
          disabled={!canContinue || isLookingUp}
        >
          {isLookingUp ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.continueText}>ไปต่อ</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>สแกน QR Code</Text>
      </View>
      <View style={styles.cameraBox}>
        {requestingPermission ? (
          <View style={styles.messageBox}>
            <ActivityIndicator size="large" color="#44C4CE" />
            <Text style={styles.messageText}>กำลังขอสิทธิ์ใช้งานกล้อง</Text>
          </View>
        ) : !hasPermission ? (
          <View style={styles.messageBox}>
            <Ionicons name="camera-outline" size={54} color="#94A3B8" />
            <Text style={styles.messageText}>
              อนุญาตให้แอปใช้กล้องเพื่อสแกน QR Code
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestPermission}
            >
              <Text style={styles.permissionText}>อนุญาตใช้กล้อง</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              cameraType={CameraType.Back}
              scanBarcode={!scannedValue && !isLookingUp}
              allowedBarcodeTypes={['qr']}
              showFrame={false}
              onReadCode={(event: any) => {
                const value = event?.nativeEvent?.codeStringValue?.trim();
                if (!value || scannedValue || isLookingUp) return;
                console.log('[QR] QR scan completed');
                setScannedValue(value);
              }}
              onError={() => console.log('[QR] Camera error')}
            />
            <View pointerEvents="none" style={styles.cameraOverlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.cameraText}>
                {scannedValue
                  ? 'สแกนสำเร็จ กดไปต่อเพื่อเลือกหัวชาร์จ'
                  : 'วาง QR Code ไว้ภายในกรอบ'}
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.bottom}>
        <Text style={styles.description}>
          สแกน QR Code ที่เครื่องชาร์จเพื่อเลือกหัวชาร์จ
        </Text>
        <TouchableOpacity
          onPress={() => setMode('ACCESS_CODE')}
          disabled={isLookingUp}
        >
          <Text style={styles.accessLink}>ใช้ Access Code 4 หลัก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!canContinue || isLookingUp) && styles.disabledButton,
          ]}
          onPress={lookUpChargingPoint}
          disabled={!canContinue || isLookingUp}
        >
          {isLookingUp ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.continueText}>ไปต่อ</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
  },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  cameraBox: { flex: 1, overflow: 'hidden' },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'rgba(68, 196, 206, 0.75)',
    borderRadius: 20,
  },
  cameraText: {
    marginTop: 26,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  messageBox: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  messageText: {
    marginTop: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
  },
  permissionButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#44C4CE',
  },
  permissionText: { color: '#FFFFFF', fontWeight: '800' },
  bottom: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    gap: 16,
  },
  description: { color: '#64748B', textAlign: 'center', fontSize: 14 },
  accessLink: {
    color: '#44C4CE',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
  continueButton: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#44C4CE',
  },
  disabledButton: { backgroundColor: '#9DDFE4' },
  continueText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  accessContainer: { flex: 1, padding: 18, backgroundColor: '#FFFFFF' },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  accessContent: { flex: 1, alignItems: 'center', paddingTop: 44 },
  accessTitle: { color: '#111827', fontSize: 28, fontWeight: '800' },
  accessSubtitle: {
    marginTop: 16,
    color: '#7A7A7A',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 23,
  },
  codeBoxes: { marginTop: 142, flexDirection: 'row', gap: 22 },
  codeBox: {
    width: 76,
    height: 76,
    borderRadius: 12,
    backgroundColor: '#E9E9ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeDigit: { fontSize: 30, color: '#111827' },
  hiddenInput: { position: 'absolute', width: 1, height: 1, opacity: 0 },
  switchText: { marginTop: 106, color: '#777777', fontSize: 15 },
  switchLink: { color: '#44C4CE', textDecorationLine: 'underline' },
});
