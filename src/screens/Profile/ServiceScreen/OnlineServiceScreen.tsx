import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
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
  GoogleForm: undefined;
  ChargingStations: undefined;
  Language: undefined;
  Service: undefined;
  Feedback: undefined;
  OnlineService: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'OnlineService'>;

// ==========================================================
// CONTACT INFORMATION
// ==========================================================

const LINE_URL = 'https://lin.ee/XcVCaEBV';

const FACEBOOK_URL = 'https://www.facebook.com/gsbsunpowerofficial/';

const PHONE_NUMBER = '098-828-5767';

// ==========================================================
// OPEN URL
// ==========================================================

const openLink = async (
  url: string,
  cannotOpenTitle: string,
  cannotOpenMessage: string,
  errorTitle: string,
  errorMessage: string,
) => {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(cannotOpenTitle, cannotOpenMessage);
    }
  } catch {
    Alert.alert(errorTitle, errorMessage);
  }
};

// ==========================================================
// CALL
// ==========================================================

const callPhone = async (
  cannotCallTitle: string,
  cannotCallMessage: string,
  errorTitle: string,
  errorMessage: string,
) => {
  const phoneUrl = `tel:${PHONE_NUMBER}`;

  try {
    const supported = await Linking.canOpenURL(phoneUrl);

    if (supported) {
      await Linking.openURL(phoneUrl);
    } else {
      Alert.alert(cannotCallTitle, cannotCallMessage);
    }
  } catch {
    Alert.alert(errorTitle, errorMessage);
  }
};

// ==========================================================
// SCREEN
// ==========================================================

export default function OnlineServiceScreen({ navigation }: Props) {
  const { t } = useTranslation();

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

        <Text style={styles.headerTitle}>{t('onlineService.title')}</Text>

        <View style={styles.headerRight} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================================
            INTRO
        ====================================================== */}

        <View style={styles.intro}>
          <View style={styles.headsetIcon}>
            <Ionicons name="headset-outline" size={32} color="#00A651" />
          </View>

          <Text style={styles.title}>{t('onlineService.howCanWeHelp')}</Text>

          <Text style={styles.description}>
            {t('onlineService.description')}
          </Text>

          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />

            <Text style={styles.onlineText}>
              {t('onlineService.onlineSupport')}
            </Text>
          </View>
        </View>

        {/* =====================================================
            CONTACT CARD
        ====================================================== */}

        <View style={styles.contactCard}>
          {/* =================================================
              LINE
          ================================================== */}

          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.75}
            onPress={() =>
              openLink(
                LINE_URL,
                t('onlineService.cannotOpen'),
                t('onlineService.cannotOpenService'),
                t('onlineService.error'),
                t('onlineService.cannotOpenServiceChannel'),
              )
            }
          >
            <View style={[styles.contactIcon, styles.lineIcon]}>
              <Ionicons name="chatbubble-ellipses" size={26} color="#00B900" />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{t('onlineService.line')}</Text>

              <Text style={styles.contactDescription}>
                {t('onlineService.lineDescription')}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* =================================================
              FACEBOOK
          ================================================== */}

          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.75}
            onPress={() =>
              openLink(
                FACEBOOK_URL,
                t('onlineService.cannotOpen'),
                t('onlineService.cannotOpenService'),
                t('onlineService.error'),
                t('onlineService.cannotOpenServiceChannel'),
              )
            }
          >
            <View style={[styles.contactIcon, styles.facebookIcon]}>
              <Ionicons name="logo-facebook" size={27} color="#1877F2" />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>
                {t('onlineService.facebook')}
              </Text>

              <Text style={styles.contactDescription}>
                {t('onlineService.facebookDescription')}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* =================================================
              PHONE
          ================================================== */}

          <TouchableOpacity
            style={styles.contactItem}
            activeOpacity={0.75}
            onPress={() =>
              callPhone(
                t('onlineService.cannotCall'),
                t('onlineService.deviceCannotCall'),
                t('onlineService.error'),
                t('onlineService.cannotOpenServiceChannel'),
              )
            }
          >
            <View style={[styles.contactIcon, styles.phoneIcon]}>
              <Ionicons name="call" size={25} color="#00A651" />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>
                {t('onlineService.callCenter')}
              </Text>

              <Text style={styles.contactDescription}>{PHONE_NUMBER}</Text>
            </View>

            <View style={styles.callButton}>
              <Ionicons name="call-outline" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* =====================================================
            SUPPORT INFORMATION
        ====================================================== */}

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#00A651"
          />

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              {t('onlineService.customerSupport')}
            </Text>

            <Text style={styles.infoText}>
              {t('onlineService.supportDescription')}
            </Text>
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
  // INTRO
  // ==========================================================

  intro: {
    alignItems: 'center',

    paddingHorizontal: 10,

    paddingBottom: 18,
  },

  headsetIcon: {
    width: 66,

    height: 66,

    borderRadius: 33,

    backgroundColor: '#E8F8F0',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,
  },

  title: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',

    textAlign: 'center',
  },

  description: {
    marginTop: 5,

    fontSize: 13,

    lineHeight: 19,

    color: '#64748B',

    textAlign: 'center',
  },

  onlineBadge: {
    marginTop: 10,

    height: 25,

    paddingHorizontal: 10,

    borderRadius: 13,

    backgroundColor: '#ECFDF5',

    flexDirection: 'row',

    alignItems: 'center',
  },

  onlineDot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor: '#00A651',

    marginRight: 5,
  },

  onlineText: {
    fontSize: 11,

    fontWeight: '700',

    color: '#008F48',
  },

  // ==========================================================
  // CONTACT CARD
  // ==========================================================

  contactCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 12,

    borderWidth: 1,

    borderColor: '#E8F0EE',

    overflow: 'hidden',
  },

  contactItem: {
    minHeight: 86,

    flexDirection: 'row',

    alignItems: 'center',
  },

  divider: {
    height: 1,

    backgroundColor: '#F1F5F9',

    marginLeft: 62,
  },

  // ==========================================================
  // ICON
  // ==========================================================

  contactIcon: {
    width: 46,

    height: 46,

    borderRadius: 13,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  lineIcon: {
    backgroundColor: '#EAFBEA',
  },

  facebookIcon: {
    backgroundColor: '#EEF5FF',
  },

  phoneIcon: {
    backgroundColor: '#E8F8F0',
  },

  // ==========================================================
  // CONTACT INFO
  // ==========================================================

  contactInfo: {
    flex: 1,
  },

  contactTitle: {
    fontSize: 15,

    fontWeight: '700',

    color: '#1E293B',
  },

  contactDescription: {
    marginTop: 4,

    fontSize: 12,

    color: '#64748B',
  },

  // ==========================================================
  // CALL BUTTON
  // ==========================================================

  callButton: {
    width: 36,

    height: 36,

    borderRadius: 18,

    backgroundColor: '#00A651',

    justifyContent: 'center',

    alignItems: 'center',
  },

  // ==========================================================
  // INFO
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

  infoContent: {
    flex: 1,

    marginLeft: 9,
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
