import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { addCoupon, coupons } from '../../../store/couponStore';

export default function PromotionDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const promotion = route.params?.promotion;

  // ==========================================================
  // COUPON REFRESH VERSION
  // ==========================================================

  const [, setCouponVersion] = useState(0);

  // ==========================================================
  // CHECK COLLECTED
  // ==========================================================

  const collected = promotion
    ? coupons.some(
        coupon =>
          coupon.promotionId === promotion.id && coupon.status === 'available',
      )
    : false;

  // ==========================================================
  // EMPTY PROMOTION
  // ==========================================================

  if (!promotion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#CBD5E1" />

          <Text style={styles.emptyTitle}>{t('promotionDetail.notFound')}</Text>

          <TouchableOpacity
            style={styles.backButtonEmpty}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonEmptyText}>
              {t('promotionDetail.goBack')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================================
  // CATEGORY ICON
  // ==========================================================

  const getCategoryIcon = () => {
    switch (promotion.category) {
      case 'Hotel':
        return 'business-outline';

      case 'Restaurant':
        return 'restaurant-outline';

      case 'Travel':
        return 'airplane-outline';

      case 'Lifestyle':
        return 'bag-handle-outline';

      default:
        return 'flash-outline';
    }
  };

  // ==========================================================
  // COLLECT COUPON
  // ==========================================================

  const handleCollect = () => {
    if (collected) {
      return;
    }

    const success = addCoupon(promotion);

    if (!success) {
      Alert.alert(
        t('promotionDetail.alreadyCollected'),
        t('promotionDetail.alreadyCollectedMessage'),
      );

      return;
    }

    setCouponVersion(version => version + 1);

    Alert.alert(
      t('promotionDetail.couponCollected'),
      t('promotionDetail.couponAddedMessage'),
      [
        {
          text: t('promotionDetail.ok'),
        },
      ],
    );
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================================
          HEADER
      ====================================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t('promotionDetail.title')}</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* =====================================================
          PROMOTION HERO
      ====================================================== */}

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons
              name={getCategoryIcon() as any}
              size={42}
              color="#44C4CE"
            />
          </View>

          <Text style={styles.merchant}>{promotion.merchant}</Text>

          <Text style={styles.discount}>{promotion.discount}</Text>
        </View>

        {/* =====================================================
          TITLE
      ====================================================== */}

        <View style={styles.infoCard}>
          <Text style={styles.title}>{promotion.title}</Text>

          <Text style={styles.description}>{promotion.description}</Text>

          <View style={styles.categoryBadge}>
            <Ionicons name="pricetag-outline" size={14} color="#44C4CE" />

            <Text style={styles.categoryText}>{promotion.category}</Text>
          </View>
        </View>

        {/* =====================================================
          COUPON CODE
      ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('promotionDetail.couponCode')}
          </Text>

          <View style={styles.codeCard}>
            <View>
              <Text style={styles.codeLabel}>
                {t('promotionDetail.useCodeDuringPayment')}
              </Text>

              <Text style={styles.code}>{promotion.code}</Text>
            </View>

            <TouchableOpacity
              style={styles.copyButton}
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert(
                  t('promotionDetail.couponCode'),
                  `${t('promotionDetail.code')}: ${promotion.code}`,
                );
              }}
            >
              <Ionicons name="copy-outline" size={18} color="#44C4CE" />

              <Text style={styles.copyText}>{t('promotionDetail.copy')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =====================================================
          VALIDITY
      ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('promotionDetail.validity')}
          </Text>

          <View style={styles.validityCard}>
            <View style={styles.validityIcon}>
              <Ionicons name="calendar-outline" size={21} color="#44C4CE" />
            </View>

            <View style={styles.validityInfo}>
              <Text style={styles.validityLabel}>
                {t('promotionDetail.validUntil')}
              </Text>

              <Text style={styles.validityDate}>{promotion.expiresAt}</Text>
            </View>
          </View>
        </View>

        {/* =====================================================
          TERMS
      ====================================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t('promotionDetail.termsConditions')}
          </Text>

          <View style={styles.termsCard}>
            <View style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#44C4CE" />

              <Text style={styles.termText}>
                {t('promotionDetail.termParticipatingLocations')}
              </Text>
            </View>

            <View style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#44C4CE" />

              <Text style={styles.termText}>
                {t('promotionDetail.termOnePerAccount')}
              </Text>
            </View>

            <View style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#44C4CE" />

              <Text style={styles.termText}>
                {t('promotionDetail.termCannotCombine')}
              </Text>
            </View>

            <View style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#44C4CE" />

              <Text style={styles.termText}>
                {t('promotionDetail.termValidPayment')}
              </Text>
            </View>
          </View>
        </View>

        {/* =====================================================
          INFORMATION
      ====================================================== */}

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#44C4CE"
          />

          <Text style={styles.noticeText}>{t('promotionDetail.notice')}</Text>
        </View>

        {/* =====================================================
          COLLECT BUTTON
      ====================================================== */}

        <TouchableOpacity
          style={[styles.collectButton, collected && styles.collectedButton]}
          activeOpacity={0.85}
          disabled={collected}
          onPress={handleCollect}
        >
          <Ionicons
            name={collected ? 'checkmark-circle-outline' : 'ticket-outline'}
            size={22}
            color={collected ? '#44C4CE' : '#FFFFFF'}
          />

          <Text
            style={[
              styles.collectButtonText,
              collected && styles.collectedButtonText,
            ]}
          >
            {collected
              ? t('promotionDetail.couponCollected')
              : t('promotionDetail.collectCoupon')}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 14,
    paddingBottom: 40,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  headerPlaceholder: {
    width: 42,
  },

  // ==========================================================
  // HERO
  // ==========================================================

  heroCard: {
    height: 190,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  heroIcon: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: '#EAF9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  merchant: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  discount: {
    marginTop: 3,
    fontSize: 27,
    fontWeight: '900',
    color: '#44C4CE',
  },

  // ==========================================================
  // INFO
  // ==========================================================

  infoCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  title: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111827',
  },

  description: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#EAF9FA',
    flexDirection: 'row',
    alignItems: 'center',
  },

  categoryText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: '700',
    color: '#2E929A',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop: 15,
  },

  sectionTitle: {
    marginBottom: 9,
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // CODE
  // ==========================================================

  codeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  codeLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },

  code: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#111827',
  },

  copyButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#EAF9FA',
    flexDirection: 'row',
    alignItems: 'center',
  },

  copyText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: '800',
    color: '#44C4CE',
  },

  // ==========================================================
  // VALIDITY
  // ==========================================================

  validityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  validityIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EAF9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  validityInfo: {
    marginLeft: 10,
  },

  validityLabel: {
    fontSize: 11,
    color: '#94A3B8',
  },

  validityDate: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // TERMS
  // ==========================================================

  termsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  termRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  termText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 17,
    color: '#475569',
  },

  // ==========================================================
  // NOTICE
  // ==========================================================

  notice: {
    marginTop: 15,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#EAF9FA',
    flexDirection: 'row',
    alignItems: 'center',
  },

  noticeText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 11,
    lineHeight: 17,
    color: '#24777D',
  },

  // ==========================================================
  // COLLECT
  // ==========================================================

  collectButton: {
    height: 56,
    marginTop: 20,
    borderRadius: 28,
    backgroundColor: '#44C4CE',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  collectButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  collectedButton: {
    backgroundColor: '#EAF9FA',
    borderWidth: 1,
    borderColor: '#B8E7EA',
  },

  collectedButtonText: {
    color: '#44C4CE',
  },

  // ==========================================================
  // EMPTY
  // ==========================================================

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
  },

  backButtonEmpty: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: '#44C4CE',
  },

  backButtonEmptyText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
