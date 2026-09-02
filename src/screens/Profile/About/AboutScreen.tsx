import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  CreditPayment: undefined;
  AddCreditCard: undefined;
  Promotion: undefined;
  PromotionDetail: undefined;
  MyCoupons: undefined;
  ChargingStations: undefined;
  About: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'About'>;

const APP_VERSION = '4.0.0';

export default function AboutScreen({ navigation }: Props) {
  const { t } = useTranslation();
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
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t('about.title')}</Text>

          <View style={styles.headerRight} />
        </View>

        {/* =====================================================
          APP INFORMATION
      ====================================================== */}

        <View style={styles.appCard}>
          {/* App Logo */}

          <View style={styles.logoWrapper}>
            <View style={styles.logo}>
              <Ionicons name="flash" size={38} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.appName}>GSB EV</Text>

          <Text style={styles.appDescription}>{t('about.appDescription')}</Text>

          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>
              {t('about.version')} {APP_VERSION}
            </Text>
          </View>
        </View>

        {/* =====================================================
          INFORMATION
      ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('about.information')}</Text>

          <View style={styles.menuCard}>
            {/* About Application */}

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color="#44C4CE"
                />
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>
                  {t('about.aboutApplication')}
                </Text>

                <Text style={styles.menuDescription}>
                  {t('about.aboutApplicationDescription')}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Terms */}

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#44C4CE"
                />
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{t('about.terms')}</Text>

                <Text style={styles.menuDescription}>
                  {t('about.termsDescription')}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Privacy */}

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color="#44C4CE"
                />
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{t('about.privacyPolicy')}</Text>

                <Text style={styles.menuDescription}>
                  {t('about.privacyPolicyDescription')}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* Contact */}

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <Ionicons name="headset-outline" size={22} color="#44C4CE" />
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{t('about.contactUs')}</Text>

                <Text style={styles.menuDescription}>
                  {t('about.contactUsDescription')}
                </Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* =====================================================
          COMPANY
      ====================================================== */}

        <View style={styles.companyCard}>
          <View style={styles.companyIcon}>
            <Ionicons name="business-outline" size={24} color="#44C4CE" />
          </View>

          <Text style={styles.companyLabel}>{t('about.poweredBy')}</Text>

          <Text style={styles.companyName}>GSB Sunpower</Text>

          <Text style={styles.copyright}>{t('about.copyright')}</Text>
        </View>

        {/* =====================================================
          FOOTER
      ====================================================== */}

        <Text style={styles.footer}>{t('about.footer')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF9FA',
  },

  content: {
    paddingHorizontal: 8,
    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
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
  // APP CARD
  // ==========================================================

  appCard: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  logoWrapper: {
    marginBottom: 12,
  },

  logo: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#44C4CE',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#44C4CE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },

  appName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },

  appDescription: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  versionBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#EAF9FA',
  },

  versionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E929A',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop: 16,
  },

  sectionTitle: {
    marginLeft: 6,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '800',
    color: '#475569',
  },

  // ==========================================================
  // MENU
  // ==========================================================

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  menuItem: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EAF9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuContent: {
    flex: 1,
    marginLeft: 12,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },

  menuDescription: {
    marginTop: 3,
    fontSize: 11,
    color: '#94A3B8',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 54,
  },

  // ==========================================================
  // COMPANY
  // ==========================================================

  companyCard: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  companyIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EAF9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  companyLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },

  companyName: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  copyright: {
    marginTop: 7,
    fontSize: 10,
    color: '#94A3B8',
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 10,
    color: '#94A3B8',
  },
});
