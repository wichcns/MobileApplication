import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleLogin, isEmailAvailable, register } from '../../../api/auth.api';
import { saveJwt, saveUser } from '../../../storage/authStorage';
import { Images } from '../../../assets';

type Props = { onLogin: () => void };

export default function RegisterScreen({ onLogin }: Props) {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const saveAuth = (response: any) => {
    if (!response?.jwt) throw new Error(t('register.registerFailed'));
    saveJwt(response.jwt);
    if (response.user) saveUser(response.user);
    onLogin();
  };

  const checkEmail = async () => {
    if (!email.trim()) return setErrorMessage(t('register.emailRequired'));
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return setErrorMessage(t('register.emailInvalid'));
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      if (!(await isEmailAvailable(email)))
        return setErrorMessage(t('register.emailExists'));
      setEmailChecked(true);
    } catch {
      setErrorMessage(t('register.emailCheckFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerWithGoogle = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      if (Platform.OS === 'android')
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      if (!accessToken) throw new Error(t('register.registerFailed'));
      saveAuth(await googleLogin(accessToken));
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          t('register.registerFailed'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = async () => {
    if (
      !name.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !phoneNumber.trim() ||
      !password
    ) {
      setErrorMessage(t('register.detailsRequired'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMessage(t('register.emailInvalid'));
      return;
    }
    if (password.length < 8) {
      setErrorMessage(t('register.passwordLength'));
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(t('register.passwordMismatch'));
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage(t('register.termsRequired'));
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      const response = await register({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        role: 'individual',
      });
      saveAuth(response);
    } catch (error: any) {
      const data = error?.response?.data;
      setErrorMessage(
        data?.message ||
          data?.error?.message ||
          data?.data?.[0]?.messages?.[0]?.message ||
          error?.message ||
          t('register.registerFailed'),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const Input = ({
    label,
    value,
    onChangeText,
    passwordField,
    keyboardType = 'default',
  }: any) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          autoCapitalize={label === 'Email' ? 'none' : 'words'}
          autoCorrect={false}
          keyboardType={keyboardType}
          secureTextEntry={passwordField && !showPassword}
        />
        {passwordField && (
          <TouchableOpacity
            onPress={() => setShowPassword(current => !current)}
            style={styles.eye}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={21}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('register.title')}</Text>
        <Text style={styles.subtitle}>{t('register.subtitle')}</Text>
        <View style={styles.card}>
          {!emailChecked ? (
            <>
              <Text style={styles.stepTitle}>{t('register.emailTitle')}</Text>
              <Text style={styles.stepSubtitle}>
                {t('register.emailSubtitle')}
              </Text>
              <Input
                label={t('register.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={checkEmail}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>
                    {t('register.checkEmail')}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.emailRow}>
                <Text>{email}</Text>
                <TouchableOpacity onPress={() => setEmailChecked(false)}>
                  <Text style={styles.loginLink}>
                    {t('register.changeEmail')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.stepTitle}>{t('register.detailsTitle')}</Text>
              <Input
                label={t('register.firstName')}
                value={name}
                onChangeText={setName}
              />
              <Input
                label={t('register.lastName')}
                value={surname}
                onChangeText={setSurname}
              />
              <Input
                label={t('register.phoneNumber')}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <Input
                label={t('register.password')}
                value={password}
                onChangeText={setPassword}
                passwordField
              />
              <Input
                label={t('register.confirmPassword')}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                passwordField
              />
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAcceptedTerms(value => !value)}
              >
                <Ionicons
                  name={acceptedTerms ? 'checkbox' : 'square-outline'}
                  size={23}
                  color="#00A651"
                />
                <Text style={styles.terms}>
                  {t('register.termsPrefix')}{' '}
                  <Text style={styles.loginLink}>
                    {t('register.termsLink')}
                  </Text>
                </Text>
              </TouchableOpacity>
              {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
              ) : null}
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>
                    {t('register.createAccount')}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
        {errorMessage && !emailChecked ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={registerWithGoogle}
          disabled={isSubmitting}
        >
          <Image
            source={Images.Google}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleText}>{t('register.google')}</Text>
        </TouchableOpacity>
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            {t('register.alreadyHaveAccount')}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}> {t('register.login')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F7F6' },
  content: { padding: 24, paddingBottom: 42 },
  back: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 7, color: '#64748B', fontSize: 14 },
  card: {
    marginTop: 28,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
  },
  field: { marginBottom: 15 },
  label: { marginBottom: 7, fontSize: 13, fontWeight: '700', color: '#334155' },
  inputRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9E2EC',
    borderRadius: 13,
    backgroundColor: '#F8FAFC',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    color: '#111827',
    fontSize: 15,
  },
  eye: { paddingHorizontal: 13, height: '100%', justifyContent: 'center' },
  error: { marginBottom: 12, color: '#DC2626', fontSize: 13 },
  button: {
    height: 54,
    borderRadius: 15,
    backgroundColor: '#00A651',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  stepTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 5,
  },
  stepSubtitle: { color: '#64748B', fontSize: 13, marginBottom: 18 },
  emailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  termsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  terms: { flex: 1, marginLeft: 8, color: '#475569', fontSize: 13 },
  googleButton: {
    height: 52,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#D9E2EC',
    backgroundColor: '#FFFFFF',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: { marginLeft: 9, color: '#111827', fontWeight: '700' },
  googleIcon: { width: 20, height: 20 },
  loginRow: { marginTop: 22, flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: '#64748B' },
  loginLink: { color: '#00A651', fontWeight: '800' },
});
