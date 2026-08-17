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

import { useNavigation } from '@react-navigation/native';

import { Images } from '../../../assets';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('LOGIN', {
      username,
      password,
    });
    navigation.getParent()?.navigate('Main');
    // TODO:
    // เชื่อม Login API ตรงนี้
  };

  const handleGoogleLogin = () => {
    console.log('GOOGLE LOGIN');

    // TODO:
    // เชื่อม Google Login ตรงนี้
  };

  const handleRegister = () => {
    console.log('REGISTER');

    // TODO:
    // navigation ไปหน้า Register
  };

  const handleForgotPassword = () => {
    console.log('FORGOT PASSWORD');

    // TODO:
    // navigation ไปหน้า Forgot Password
  };

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
            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>
              Sign in to continue using EV Charging
            </Text>
          </View>

          {/* =========================
              USERNAME / EMAIL
          ========================== */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username / Email</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username or email"
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
            <Text style={styles.label}>Password</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
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

          {/* =========================
              FORGOT PASSWORD
          ========================== */}

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={handleForgotPassword}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* =========================
              LOGIN BUTTON
          ========================== */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>

            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* =========================
              DIVIDER
          ========================== */}

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>OR</Text>

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

            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* =========================
              REGISTER
          ========================== */}

          <View style={styles.registerContainer}>
            <Text style={styles.registerLabel}>Don't have an account?</Text>

            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================
            FOOTER
        ========================== */}

        <Text style={styles.footer}>EV Charging Platform</Text>
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
    color: '#00A651',

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

    backgroundColor: '#00A651',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 10,

    shadowColor: '#00A651',

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

    color: '#00A651',

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
});
