import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
// import { login } from '../../../api/auth.api';
import { login, googleLogin } from '../../../api/auth.api';
import { saveJwt, saveUser } from '../../../storage/authStorage';
import { useNavigation } from '@react-navigation/native';

import { Images } from '../../../assets';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';
type LoginScreenProps = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!username.trim()) {
      setErrorMessage(t('login.identifierRequired'));
      return;
    }

    if (!password) {
      setErrorMessage(t('login.passwordRequired'));
      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const payload = {
        identifier: username.trim(),
        password,
      };

      console.log('===== LOGIN REQUEST =====');
      console.log('Payload:', {
        identifier: payload.identifier,
        password: '********',
      });
      console.log('========================');

      const response = await login(payload);

      console.log('===== LOGIN SUCCESS =====');
      console.log('Response:', response);
      console.log('========================');

      const jwt = response?.jwt;
      const user = response?.user;

      if (!jwt) {
        throw new Error('Login successful but JWT was not returned.');
      }

      // Save JWT
      saveJwt(jwt);

      // Save user
      if (user) {
        saveUser(user);
      }

      console.log('===== AUTH SAVED =====');
      console.log('JWT saved:', !!jwt);
      console.log('User saved:', !!user);
      console.log('=====================');

      console.log('===== LOGIN AUTH STATE UPDATE =====');

      onLogin();

      console.log('Login authentication state updated');
    } catch (error: any) {
      console.log('===== LOGIN FAILED =====');
      console.log('Error:', error);
      console.log('Message:', error?.message);
      console.log('Status:', error?.response?.status);
      console.log('Response:', error?.response?.data);
      console.log(
        'Response JSON:',
        JSON.stringify(error?.response?.data, null, 2),
      );
      console.log('========================');

      const responseData = error?.response?.data;

      let message = t('login.failed');

      // Backend ส่ง { message: "..." }
      if (typeof responseData?.message === 'string') {
        message = responseData.message;
      }

      // Backend ส่ง { error: { message: "..." } }
      else if (typeof responseData?.error?.message === 'string') {
        message = responseData.error.message;
      }

      // Axios error message
      else if (typeof error?.message === 'string') {
        message = error.message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      console.log('================================');
      console.log('===== GOOGLE LOGIN START =====');
      console.log('================================');

      // 1. Check Google Play Services
      console.log('... checking Google Play Services');

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      console.log('... Google Play Services OK');

      // 2. Google Sign-In
      console.log('... opening Google Sign-In');

      const result = await GoogleSignin.signIn();

      console.log('... Google Sign-In success');

      console.log('===== GOOGLE RESULT =====');
      console.log('Google User:', result?.data?.user);
      console.log('Google ID Token Received:', !!result?.data?.idToken);
      console.log(
        'Google Server Auth Code Received:',
        !!result?.data?.serverAuthCode,
      );

      // 3. Get Google Access Token
      console.log('... getting Google access token');

      const { accessToken } = await GoogleSignin.getTokens();

      if (!accessToken) {
        throw new Error('Google access token was not received.');
      }

      console.log('===== GOOGLE ACCESS TOKEN =====');
      console.log('Access Token Received:', true);
      console.log(
        'Access Token Preview:',
        `${accessToken.substring(0, 20)}...`,
      );

      // 4. Send Access Token to Backend
      console.log('... sending Google access token to backend');

      const response = await googleLogin(accessToken);

      console.log('===== GOOGLE BACKEND RESPONSE =====');
      console.log('JWT received:', !!response?.jwt);
      console.log('User:', response?.user);
      console.log('====================================');

      // 5. Get JWT + User
      const jwt = response?.jwt;
      const user = response?.user;

      if (!jwt) {
        throw new Error('Google login successful but JWT was not returned.');
      }

      // 6. Save authentication
      saveJwt(jwt);

      if (user) {
        saveUser(user);
      }

      console.log('===== GOOGLE LOGIN SUCCESS =====');
      console.log('JWT saved:', true);
      console.log('User saved:', !!user);
      console.log('================================');

      console.log('===== GOOGLE LOGIN AUTH STATE UPDATE =====');

      onLogin();

      console.log('Google login authentication state updated');
      
    } catch (error: any) {
      console.log('================================');
      console.log('===== GOOGLE LOGIN ERROR =====');
      console.log('================================');

      console.log('Error Code:', error?.code);
      console.log('Error Message:', error?.message);
      console.log('Error Response:', error?.response?.data);
      console.log('Error Status:', error?.response?.status);

      console.log('================================');

      const responseData = error?.response?.data;

      let message = t('login.googleFailed');

      if (typeof responseData === 'string') {
        message = responseData;
      } else if (typeof responseData?.message === 'string') {
        message = responseData.message;
      } else if (typeof responseData?.error === 'string') {
        message = responseData.error;
      } else if (typeof error?.message === 'string') {
        message = error.message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handlePhoneLogin = () => navigation.navigate('PhoneLogin');

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* =========================
            TOP IMAGE
        ========================== */}

        <View style={styles.imageContainer}>
          <Image
            source={Images.NaverTest}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* =========================
            LOGIN CARD
        ========================== */}

        <View style={styles.loginCard}>
          {/* Header */}

          <View style={styles.header}>
            <Text style={styles.title}>{t('login.title')}</Text>

            <Text style={styles.subtitle}>
              {t('login.subtitle')}
            </Text>
          </View>

          {/* =========================
              USERNAME / EMAIL
          ========================== */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('login.identifier')}</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder={t('login.identifierPlaceholder')}
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* =========================
              PASSWORD
          ========================== */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('login.password')}</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder={t('login.passwordPlaceholder')}
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={21}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {/* =========================
              FORGOT PASSWORD
          ========================== */}

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>{t('login.forgotPassword')}</Text>
          </TouchableOpacity>

          {/* =========================
              LOGIN BUTTON
          ========================== */}

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? t('login.signingIn') : t('login.submit')}
            </Text>

            {!loading && (
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          {/* =========================
              DIVIDER
          ========================== */}

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>{t('login.or')}</Text>

            <View style={styles.dividerLine} />
          </View>

          {/* =========================
              GOOGLE LOGIN
          ========================== */}

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
          >
            <View style={styles.googleIcon}>
              <Image
                source={Images.Google}
                style={styles.googleLogo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.googleText}>{t('login.google')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.phoneButton} onPress={handlePhoneLogin} activeOpacity={0.8}>
            <Ionicons name="call-outline" size={20} color="#44C4CE" />
            <Text style={styles.phoneButtonText}>{t('login.phone')}</Text>
          </TouchableOpacity>

          {/* =========================
              REGISTER
          ========================== */}

          <View style={styles.registerContainer}>
            <Text style={styles.registerLabel}>{t('login.noAccount')}</Text>

            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <Text style={styles.registerText}>{t('login.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================
            FOOTER
        ========================== */}

        <Text style={styles.footer}>{t('login.footer')}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,

    backgroundColor: '#F8FAFC',
  },

  scrollContent: {
    flexGrow: 1,

    paddingHorizontal: 20,

    paddingTop: 30,

    paddingBottom: 30,
  },

  /*
  =========================
  IMAGE
  =========================
  */

  imageContainer: {
    width: '100%',

    height: 190,

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 10,
  },

  image: {
    width: '85%',

    height: '100%',
  },

  /*
  =========================
  LOGIN CARD
  =========================
  */

  loginCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 28,

    padding: 24,

    borderWidth: 1,

    borderColor: '#EEF2F7',

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,

      height: 8,
    },

    shadowOpacity: 0.08,

    shadowRadius: 18,

    elevation: 6,
  },

  /*
  =========================
  HEADER
  =========================
  */

  header: {
    marginBottom: 26,
  },

  title: {
    fontSize: 28,

    fontWeight: '800',

    color: '#111827',

    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,

    color: '#64748B',

    lineHeight: 21,
  },

  /*
  =========================
  INPUT
  =========================
  */

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,

    fontWeight: '700',

    color: '#334155',

    marginBottom: 8,
  },

  inputContainer: {
    height: 56,

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderRadius: 14,

    borderWidth: 1,

    borderColor: '#E2E8F0',

    paddingHorizontal: 16,
  },

  input: {
    flex: 1,

    height: '100%',

    marginLeft: 10,

    fontSize: 15,

    color: '#111827',
  },

  /*
  =========================
  FORGOT
  =========================
  */

  forgotButton: {
    alignSelf: 'flex-end',

    marginTop: -4,

    marginBottom: 22,
  },

  forgotText: {
    color: '#44C4CE',

    fontSize: 14,

    fontWeight: '700',
  },

  /*
  =========================
  LOGIN BUTTON
  =========================
  */

  loginButton: {
    height: 56,

    borderRadius: 28,

    backgroundColor: '#44C4CE',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 10,

    shadowColor: '#44C4CE',

    shadowOffset: {
      width: 0,

      height: 5,
    },

    shadowOpacity: 0.2,

    shadowRadius: 10,

    elevation: 4,
  },

  loginButtonText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '800',
  },

  /*
  =========================
  DIVIDER
  =========================
  */

  dividerContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 24,
  },

  dividerLine: {
    flex: 1,

    height: 1,

    backgroundColor: '#E2E8F0',
  },

  dividerText: {
    marginHorizontal: 14,

    fontSize: 12,

    fontWeight: '700',

    color: '#94A3B8',
  },

  /*
  =========================
  GOOGLE
  =========================
  */

  googleButton: {
    height: 56,

    borderRadius: 28,

    borderWidth: 1,

    borderColor: '#E2E8F0',

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  googleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  googleLogo: {
    width: 22,
    height: 22,
  },

  googleG: {
    fontSize: 20,

    fontWeight: '800',

    color: '#4285F4',
  },

  googleText: {
    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },

  phoneButton: {
    height: 56,
    marginTop: 12,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#44C4CE',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  phoneButtonText: {
    color: '#44C4CE',
    fontSize: 15,
    fontWeight: '700',
  },

  /*
  =========================
  REGISTER
  =========================
  */

  registerContainer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 24,
  },

  registerLabel: {
    fontSize: 14,

    color: '#64748B',
  },

  registerText: {
    marginLeft: 5,

    fontSize: 14,

    color: '#44C4CE',

    fontWeight: '800',
  },

  /*
  =========================
  FOOTER
  =========================
  */

  footer: {
    textAlign: 'center',

    marginTop: 20,

    fontSize: 12,

    color: '#94A3B8',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginBottom: 16,
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },
});
