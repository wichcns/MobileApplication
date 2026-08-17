import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

import { user, updateUser } from '../../store/userStore';

import { launchImageLibrary } from 'react-native-image-picker';

export default function PersonalInformationScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [name, setName] = useState(user.name ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [phone, setPhone] = useState(user.phone ?? '');
  const [avatar, setAvatar] = useState<string | null>(user.avatar ?? null);

  const handleChangeAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        t('common.error'),
        result.errorMessage || t('personalInformation.cannotSelectImage'),
      );

      return;
    }

    const uri = result.assets?.[0]?.uri;

    if (uri) {
      setAvatar(uri);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert(
        t('personalInformation.incompleteInformation'),
        t('personalInformation.enterName'),
      );

      return;
    }

    if (!email.trim()) {
      Alert.alert(
        t('personalInformation.incompleteInformation'),
        t('personalInformation.enterEmail'),
      );

      return;
    }

    if (!phone.trim()) {
      Alert.alert(
        t('personalInformation.incompleteInformation'),
        t('personalInformation.enterPhone'),
      );

      return;
    }

    updateUser({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar,
    });

    Alert.alert(t('common.success'), t('personalInformation.updated'), [
      {
        text: t('common.ok'),
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const Input = ({
    label,
    value,
    onChangeText,
    keyboardType = 'default',
    editable = true,
  }: any) => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={[styles.input, !editable && styles.disabledInput]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          placeholder={label}
          placeholderTextColor="#94A3B8"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
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
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              {t('personalInformation.title')}
            </Text>

            <Text style={styles.headerSubtitle}>
              {t('personalInformation.subtitle')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          PROFILE
      ====================================================== */}

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={42} color="#FFFFFF" />
              )}
            </View>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleChangeAvatar}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>
            {name || t('personalInformation.user')}
          </Text>

          <Text style={styles.profileEmail}>
            {email || t('personalInformation.noEmail')}
          </Text>
        </View>

        {/* =====================================================
          PERSONAL INFORMATION
      ====================================================== */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={22} color="#16A34A" />

            <Text style={styles.sectionTitle}>
              {t('personalInformation.personalInformation')}
            </Text>
          </View>

          <Input
            label={t('personalInformation.fullName')}
            value={name}
            onChangeText={setName}
          />

          <Input
            label={t('personalInformation.emailAddress')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label={t('personalInformation.phoneNumber')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* =====================================================
          SECURITY NOTICE
      ====================================================== */}

        <View style={styles.noticeBox}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#16A34A" />

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              {t('personalInformation.securityTitle')}
            </Text>

            <Text style={styles.noticeText}>
              {t('personalInformation.securityDescription')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          SAVE BUTTON
      ====================================================== */}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle-outline" size={21} color="#FFFFFF" />

          <Text style={styles.saveButtonText}>
            {t('personalInformation.saveChanges')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  // =========================
  // PROFILE
  // =========================

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    elevation: 3,
  },

  avatarContainer: {
    position: 'relative',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },

  cameraButton: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileName: {
    marginTop: 12,
    fontSize: 19,
    fontWeight: '800',
    color: '#111827',
  },

  profileEmail: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
  },

  // =========================
  // SECTION
  // =========================

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  // =========================
  // INPUT
  // =========================

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  input: {
    height: 55,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
  },

  disabledInput: {
    backgroundColor: '#F1F5F9',
    color: '#64748B',
  },

  // =========================
  // NOTICE
  // =========================

  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
  },

  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#166534',
  },

  noticeText: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: '#166534',
  },

  // =========================
  // SAVE
  // =========================

  saveButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    marginLeft: 9,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
