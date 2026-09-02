import React, { useMemo, useState } from 'react';
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

import { useNavigation } from '@react-navigation/native';

import { promotions } from '../../../store/promotionStore';

import { addCoupon, coupons } from '../../../store/couponStore';

const categories = [
  {
    key: 'all',
    label: 'promotion.categories.all',
  },
  {
    key: 'evCharging',
    label: 'promotion.categories.evCharging',
  },
  {
    key: 'hotel',
    label: 'promotion.categories.hotel',
  },
  {
    key: 'restaurant',
    label: 'promotion.categories.restaurant',
  },
  {
    key: 'travel',
    label: 'promotion.categories.travel',
  },
  {
    key: 'lifestyle',
    label: 'promotion.categories.lifestyle',
  },
];

export default function PromotionScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [, setCouponVersion] = useState(0);

  // ==========================================================
  // MY COUPONS
  // ==========================================================

  const collectedCoupons = coupons.filter(coupon => coupon.status === 'available');

  // ==========================================================
  // FILTER PROMOTIONS
  // ==========================================================

  const filteredPromotions = useMemo(() => {
    if (selectedCategory === 'All') {
      return promotions;
    }

    return promotions.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // ==========================================================
  // CHECK COLLECTED
  // ==========================================================

  const isCollected = (promotionId: string) => {
    return coupons.some(
      coupon =>
        coupon.promotionId === promotionId && coupon.status === 'available',
    );
  };

  // ==========================================================
  // COLLECT COUPON
  // ==========================================================

  const handleCollect = (promotionId: string) => {
    const promotion = promotions.find(item => item.id === promotionId);

    if (!promotion) {
      return;
    }

    const success = addCoupon(promotion);

    if (!success) {
      Alert.alert('Already Collected', 'This coupon is already in My Coupons.');

      return;
    }

    // บังคับให้ UI refresh
    setCouponVersion(version => version + 1);

    Alert.alert('Coupon Collected', 'The coupon has been added to My Coupons.');
  };

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
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t('promotion.title')}</Text>

            <Text style={styles.headerSubtitle}>{t('promotion.subtitle')}</Text>
          </View>
        </View>

        {/* =====================================================
          MY COUPONS
      ====================================================== */}

        <View style={styles.couponWallet}>
          <View style={styles.walletIcon}>
            <Ionicons name="ticket-outline" size={28} color="#FFFFFF" />
          </View>

          <View style={styles.walletInfo}>
            <Text style={styles.walletTitle}>{t('promotion.myCoupons')}</Text>

            <Text style={styles.walletSubtitle}>
              {collectedCoupons.length} {t('promotion.couponsAvailable')}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.viewCouponButton}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('MyCoupons');
            }}
          >
            <Text style={styles.viewCouponText}>{t('promotion.view')}</Text>

            <Ionicons name="chevron-forward" size={17} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* =====================================================
          CATEGORY
      ====================================================== */}

        <Text style={styles.sectionTitle}>
          {t('promotion.explorePromotions')}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => {
            const active = selectedCategory === category.key;

            return (
              <TouchableOpacity
                key={category.key}
                activeOpacity={0.8}
                style={[
                  styles.categoryButton,
                  active && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {t(category.label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* =====================================================
          PROMOTION LIST
      ====================================================== */}

        <View style={styles.promotionList}>
          {filteredPromotions.map(item => {
            const collected = isCollected(item.id);

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.promotionCard}
                activeOpacity={0.85}
                onPress={() => {
                  navigation.navigate('PromotionDetail', {
                    promotion: item,
                  });
                }}
              >
                {/* LEFT */}

                <View style={styles.promotionLeft}>
                  <View style={styles.merchantIcon}>
                    <Ionicons
                      name={
                        item.category === 'Hotel'
                          ? 'business-outline'
                          : item.category === 'Restaurant'
                          ? 'restaurant-outline'
                          : item.category === 'Travel'
                          ? 'airplane-outline'
                          : item.category === 'Lifestyle'
                          ? 'bag-handle-outline'
                          : 'flash-outline'
                      }
                      size={25}
                      color="#44C4CE"
                    />
                  </View>
                </View>

                {/* CONTENT */}

                <View style={styles.promotionContent}>
                  <Text style={styles.merchantName}>{item.merchant}</Text>

                  <Text style={styles.promotionTitle}>{item.title}</Text>

                  <Text style={styles.description}>{item.description}</Text>

                  <View style={styles.promotionBottom}>
                    <View>
                      <Text style={styles.discount}>{item.discount}</Text>

                      <View style={styles.expiryRow}>
                        <Ionicons
                          name="time-outline"
                          size={13}
                          color="#94A3B8"
                        />

                        <Text style={styles.expiry}>
                          {t('promotion.expires')} {item.expiresAt}
                        </Text>
                      </View>
                    </View>

                    {/* COLLECT */}

                    <TouchableOpacity
                      activeOpacity={0.8}
                      disabled={collected}
                      style={[
                        styles.collectButton,
                        collected && styles.collectedButton,
                      ]}
                      onPress={event => {
                        event.stopPropagation();

                        handleCollect(item.id);
                      }}
                    >
                      <Ionicons
                        name={collected ? 'checkmark' : 'add'}
                        size={17}
                        color={collected ? '#44C4CE' : '#FFFFFF'}
                      />

                      <Text
                        style={[
                          styles.collectText,
                          collected && styles.collectedText,
                        ]}
                      >
                        {collected
                          ? t('promotion.collected')
                          : t('promotion.collect')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* =====================================================
          INFO
      ====================================================== */}

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#44C4CE"
          />

          <Text style={styles.infoText}>{t('promotion.info')}</Text>
        </View>
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
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: '#64748B',
  },

  // ==========================================================
  // COUPON WALLET
  // ==========================================================

  couponWallet: {
    minHeight: 88,
    borderRadius: 18,
    backgroundColor: '#44C4CE',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  walletInfo: {
    flex: 1,
    marginLeft: 12,
  },

  walletTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  walletSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#EAF9FA',
  },

  viewCouponButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  viewCouponText: {
    marginRight: 3,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ==========================================================
  // CATEGORY
  // ==========================================================

  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  categoryContainer: {
    paddingBottom: 4,
  },

  categoryButton: {
    paddingHorizontal: 15,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  categoryButtonActive: {
    backgroundColor: '#44C4CE',
    borderColor: '#44C4CE',
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  categoryTextActive: {
    color: '#FFFFFF',
  },

  // ==========================================================
  // PROMOTIONS
  // ==========================================================

  promotionList: {
    marginTop: 12,
  },

  promotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    padding: 14,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E7F1F2',
  },

  promotionLeft: {
    width: 48,
    alignItems: 'center',
  },

  merchantIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EAF9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  promotionContent: {
    flex: 1,
    marginLeft: 10,
  },

  merchantName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#44C4CE',
  },

  promotionTitle: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  description: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: '#64748B',
  },

  promotionBottom: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  discount: {
    fontSize: 17,
    fontWeight: '900',
    color: '#44C4CE',
  },

  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  expiry: {
    marginLeft: 4,
    fontSize: 10,
    color: '#94A3B8',
  },

  collectButton: {
    minWidth: 88,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#44C4CE',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  collectText: {
    marginLeft: 3,
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  collectedButton: {
    backgroundColor: '#EAF9FA',
    borderWidth: 1,
    borderColor: '#B8E7EA',
  },

  collectedText: {
    color: '#44C4CE',
  },

  // ==========================================================
  // INFO
  // ==========================================================

  infoBox: {
    marginTop: 5,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#EAF9FA',
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 11,
    lineHeight: 17,
    color: '#24777D',
  },
});
