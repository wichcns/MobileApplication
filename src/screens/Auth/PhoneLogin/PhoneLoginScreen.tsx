import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { loginWithPhone, requestLoginOtp } from '../../../api/auth.api';
import { saveJwt, saveUser } from '../../../storage/authStorage';

type Props = { onLogin: () => void };

const errorMessageFrom = (error: any, fallback: string) =>
  error?.response?.data?.message ||
  error?.response?.data?.error?.message ||
  error?.response?.data?.error ||
  fallback;

export default function PhoneLoginScreen({ onLogin }: Props) {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPhoneValid = phoneNumber.replace(/[^0-9]/g, '').length >= 9;

  const sendOtp = async () => {
    if (!isPhoneValid) {
      setErrorMessage(t('login.phoneInvalid'));
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await requestLoginOtp(phoneNumber);
      if (!response?.token) throw new Error(t('login.otpRequestFailed'));
      setToken(response.token);
      setReference(response.refno || '');
      setOtp('');
      setStep('otp');
    } catch (error) {
      setErrorMessage(errorMessageFrom(error, t('login.otpRequestFailed')));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      setErrorMessage(t('login.otpInvalid'));
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await loginWithPhone({ phoneNumber, otp, token });
      if (!response?.jwt) throw new Error(t('login.phoneLoginFailed'));
      await saveJwt(response.jwt);
      if (response.user) await saveUser(response.user);
      onLogin();
    } catch (error) {
      setErrorMessage(errorMessageFrom(error, t('login.phoneLoginFailed')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          accessibilityLabel={t('common.back')}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {t(step === 'phone' ? 'login.phoneTitle' : 'login.otpTitle')}
        </Text>
        <Text style={styles.subtitle}>
          {t(step === 'phone' ? 'login.phoneSubtitle' : 'login.otpSubtitle')}
        </Text>

        {step === 'phone' ? (
          <View style={styles.inputBox}>
            <Ionicons name="call-outline" size={21} color="#64748B" />
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              placeholder={t('login.phonePlaceholder')}
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>
        ) : (
          <>
            <Text style={styles.phoneValue}>{phoneNumber}</Text>
            {reference ? (
              <Text style={styles.reference}>
                {t('login.reference', { value: reference })}
              </Text>
            ) : null}
            <TextInput
              value={otp}
              onChangeText={value => setOtp(value.replace(/[^0-9]/g, ''))}
              style={styles.otpInput}
              placeholder="••••••"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
              maxLength={6}
              autoFocus
            />
            <TouchableOpacity
              disabled={loading}
              onPress={sendOtp}
              style={styles.resend}
            >
              <Text style={styles.resendText}>{t('login.resendOtp')}</Text>
            </TouchableOpacity>
          </>
        )}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabled]}
          disabled={loading}
          onPress={step === 'phone' ? sendOtp : verifyOtp}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryText}>
              {t(step === 'phone' ? 'login.sendOtp' : 'login.verifyAndLogin')}
            </Text>
          )}
        </TouchableOpacity>
        {step === 'otp' ? (
          <TouchableOpacity
            disabled={loading}
            style={styles.changePhone}
            onPress={() => {
              setStep('phone');
              setErrorMessage('');
            }}
          >
            <Text style={styles.changePhoneText}>{t('login.changePhone')}</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flexGrow: 1, padding: 24, paddingTop: 38 },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: { color: '#111827', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: {
    color: '#64748B',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  inputBox: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  input: { flex: 1, marginLeft: 10, color: '#111827', fontSize: 16 },
  phoneValue: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  reference: { color: '#64748B', fontSize: 13, marginBottom: 22 },
  otpInput: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 8,
  },
  resend: { alignSelf: 'center', marginTop: 18 },
  resendText: { color: '#00A651', fontWeight: '700', fontSize: 14 },
  error: { color: '#DC2626', fontSize: 13, marginTop: 16 },
  primaryButton: {
    height: 56,
    marginTop: 26,
    borderRadius: 28,
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  disabled: { opacity: 0.6 },
  changePhone: { alignSelf: 'center', marginTop: 20 },
  changePhoneText: { color: '#475569', fontSize: 14, fontWeight: '700' },
});
