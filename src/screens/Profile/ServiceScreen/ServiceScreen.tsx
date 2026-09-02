import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
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

type Props = NativeStackScreenProps<ProfileStackParamList, 'Service'>;

export default function ServiceScreen({ navigation }: Props) {
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

        <Text style={styles.headerTitle}>{t('service.title')}</Text>

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
          <Text style={styles.title}>{t('service.howCanWeHelp')}</Text>

          <Text style={styles.description}>{t('service.description')}</Text>
        </View>

        {/* =====================================================
            SERVICE LIST
        ====================================================== */}

        <View style={styles.serviceCard}>
          {/* Feedback */}

          <TouchableOpacity
            style={styles.serviceItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Feedback');
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={25}
                color="#44C4CE"
              />
            </View>

            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{t('service.feedback')}</Text>

              <Text style={styles.serviceDescription}>
                {t('service.feedbackDescription')}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#CBD5E1" />
          </TouchableOpacity>

          {/* Divider */}

          <View style={styles.divider} />

          {/* Online Service */}

          <TouchableOpacity
            style={styles.serviceItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('OnlineService');
            }}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="headset-outline" size={25} color="#44C4CE" />
            </View>

            <View style={styles.serviceInfo}>
              <View style={styles.onlineTitleRow}>
                <Text style={styles.serviceTitle}>
                  {t('service.onlineService')}
                </Text>

                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />

                  <Text style={styles.onlineText}>{t('service.online')}</Text>
                </View>
              </View>

              <Text style={styles.serviceDescription}>
                {t('service.onlineServiceDescription')}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* =====================================================
            SUPPORT INFO
        ====================================================== */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#44C4CE"
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{t('service.needHelp')}</Text>

            <Text style={styles.infoText}>
              {t('service.supportDescription')}
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
    backgroundColor: '#EAF9FA',
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
  // SERVICE CARD
  // ==========================================================

  serviceCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 12,

    borderWidth: 1,

    borderColor: '#E7F1F2',

    overflow: 'hidden',
  },

  serviceItem: {
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

  iconContainer: {
    width: 46,

    height: 46,

    borderRadius: 13,

    backgroundColor: '#EAF9FA',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  // ==========================================================
  // SERVICE INFO
  // ==========================================================

  serviceInfo: {
    flex: 1,
  },

  serviceTitle: {
    fontSize: 15,

    fontWeight: '700',

    color: '#1E293B',
  },

  serviceDescription: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 17,

    color: '#64748B',
  },

  // ==========================================================
  // ONLINE BADGE
  // ==========================================================

  onlineTitleRow: {
    flexDirection: 'row',

    alignItems: 'center',

    flexWrap: 'wrap',
  },

  onlineBadge: {
    marginLeft: 8,

    paddingHorizontal: 7,

    height: 22,

    borderRadius: 11,

    backgroundColor: '#EAF9FA',

    flexDirection: 'row',

    alignItems: 'center',
  },

  onlineDot: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: '#44C4CE',

    marginRight: 4,
  },

  onlineText: {
    fontSize: 10,

    fontWeight: '700',

    color: '#2E929A',
  },

  // ==========================================================
  // INFORMATION
  // ==========================================================

  infoCard: {
    marginTop: 14,

    padding: 14,

    backgroundColor: '#EAF9FA',

    borderRadius: 14,

    flexDirection: 'row',

    borderWidth: 1,

    borderColor: '#D7F3F5',
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

    color: '#2E929A',
  },

  infoText: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 18,

    color: '#4D686B',
  },
});
