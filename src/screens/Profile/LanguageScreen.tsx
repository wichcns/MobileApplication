import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  CreditPayment: undefined;
  AddCreditCard: undefined;
  Promotion: undefined;
  PromotionDetail: undefined;
  MyCoupons: undefined;
  GoogleForm: undefined;
  ChargingStations: undefined;
  Language: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'Language'>;

type Language = {
  id: string;
  flag: string;
  title: string;
  subtitle: string;
};

const languages: Language[] = [
  {
    id: 'en',
    flag: '🇬🇧',
    title: 'English',
    subtitle: 'English',
  },

  {
    id: 'zh',
    flag: '🇨🇳',
    title: '中文',
    subtitle: 'Chinese',
  },
  {
    id: 'th',
    flag: '🇹🇭',
    title: 'ภาษาไทย',
    subtitle: 'Thai',
  },
];

export default function LanguageScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const selectedLanguage = i18n.language?.split('-')[0] || 'th';

  const handleLanguageChange = async (languageId: string) => {
    await i18n.changeLanguage(languageId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('language.title')}</Text>

        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================================
            TITLE
        ====================================================== */}

        <View style={styles.titleSection}>
          <Text style={styles.title}>{t('language.selectLanguage')}</Text>

          <Text style={styles.description}>{t('language.description')}</Text>
        </View>

        {/* =====================================================
            LANGUAGE LIST
        ====================================================== */}

        <View style={styles.languageCard}>
          {languages.map((language, index) => {
            const isSelected = selectedLanguage === language.id;

            return (
              <TouchableOpacity
                key={language.id}
                activeOpacity={0.7}
                style={[
                  styles.languageItem,
                  index === languages.length - 1 && styles.lastLanguageItem,
                ]}
                onPress={() => handleLanguageChange(language.id)}
              >
                {/* Flag */}

                <View style={styles.flagContainer}>
                  <Text style={styles.flag}>{language.flag}</Text>
                </View>

                {/* Language Name */}

                <View style={styles.languageInfo}>
                  <Text
                    style={[
                      styles.languageTitle,
                      isSelected && styles.selectedLanguageTitle,
                    ]}
                  >
                    {language.title}
                  </Text>

                  <Text style={styles.languageSubtitle}>
                    {language.subtitle}
                  </Text>
                </View>

                {/* Check */}

                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={17} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* =====================================================
            INFORMATION
        ====================================================== */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#00A651"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{t('language.infoTitle')}</Text>

            <Text style={styles.infoText}>{t('language.infoText')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ==========================================================
  // CONTAINER
  // ==========================================================

  container: {
    flex: 1,
    backgroundColor: '#F3F7F6',
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 56,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: 10,

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,

    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,

    height: 40,

    justifyContent: 'center',

    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,

    textAlign: 'center',

    fontSize: 18,

    fontWeight: '700',

    color: '#111827',
  },

  headerRight: {
    width: 40,
  },

  // ==========================================================
  // TITLE
  // ==========================================================

  titleSection: {
    marginBottom: 14,

    paddingHorizontal: 2,
  },

  title: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  description: {
    marginTop: 5,

    fontSize: 13,

    lineHeight: 19,

    color: '#64748B',
  },

  // ==========================================================
  // LANGUAGE CARD
  // ==========================================================

  languageCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 12,

    borderWidth: 1,

    borderColor: '#E8F0EE',

    overflow: 'hidden',
  },

  languageItem: {
    minHeight: 76,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#F1F5F9',
  },

  lastLanguageItem: {
    borderBottomWidth: 0,
  },

  // ==========================================================
  // FLAG
  // ==========================================================

  flagContainer: {
    width: 48,

    height: 48,

    borderRadius: 12,

    backgroundColor: '#F0FBF6',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  flag: {
    fontSize: 27,
  },

  // ==========================================================
  // LANGUAGE INFO
  // ==========================================================

  languageInfo: {
    flex: 1,
  },

  languageTitle: {
    fontSize: 15,

    fontWeight: '600',

    color: '#1E293B',
  },

  selectedLanguageTitle: {
    color: '#00A651',

    fontWeight: '800',
  },

  languageSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: '#94A3B8',
  },

  // ==========================================================
  // RADIO / CHECK
  // ==========================================================

  radio: {
    width: 24,

    height: 24,

    borderRadius: 12,

    borderWidth: 1.5,

    borderColor: '#CBD5E1',

    justifyContent: 'center',

    alignItems: 'center',
  },

  radioSelected: {
    backgroundColor: '#00A651',

    borderColor: '#00A651',
  },

  // ==========================================================
  // INFORMATION
  // ==========================================================

  infoCard: {
    marginTop: 14,

    padding: 14,

    backgroundColor: '#F0FBF6',

    borderRadius: 14,

    flexDirection: 'row',

    borderWidth: 1,

    borderColor: '#D9F5E7',
  },

  infoIcon: {
    width: 32,

    alignItems: 'center',

    paddingTop: 1,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 13,

    fontWeight: '700',

    color: '#008F48',
  },

  infoText: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 18,

    color: '#4B6358',
  },
});
