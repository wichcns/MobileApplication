import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { coupons } from '../../../store/couponStore';

export default function MyCouponsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [selectedTab, setSelectedTab] = useState<
    'Available' | 'Used' | 'Expired'
  >('Available');

  const [couponList, setCouponList] = useState(coupons);

  // ==========================================================
  // REFRESH COUPONS WHEN SCREEN IS FOCUSED
  // ==========================================================

  useFocusEffect(
    useCallback(() => {
      setCouponList([...coupons]);
    }, []),
  );

  // ==========================================================
  // FILTER
  // ==========================================================

  const filteredCoupons = couponList.filter(coupon => {
    if (selectedTab === 'Available') {
      return coupon.status === 'available';
    }

    if (selectedTab === 'Used') {
      return coupon.status === 'used';
    }

    return coupon.status === 'expired';
  });

  const availableCount = couponList.filter(
    coupon => coupon.status === 'available',
  ).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{t('myCoupons.title')}</Text>

            <Text style={styles.headerSubtitle}>{t('myCoupons.subtitle')}</Text>
          </View>
        </View>

        {/* SUMMARY */}

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="ticket-outline" size={27} color="#FFFFFF" />
          </View>

          <View style={styles.summaryInfo}>
            <Text style={styles.summaryTitle}>
              {t('myCoupons.couponWallet')}
            </Text>

            <Text style={styles.summarySubtitle}>
              {t('myCoupons.couponsAvailable', {
                count: availableCount,
              })}
            </Text>
          </View>
        </View>

        {/* TABS */}

        <View style={styles.tabs}>
          {(['Available', 'Used', 'Expired'] as const).map(tab => {
            const active = selectedTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active && styles.activeTab]}
                activeOpacity={0.8}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, active && styles.activeTabText]}>
                  {t(`myCoupons.tabs.${tab.toLowerCase()}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* COUPONS */}

        <View style={styles.couponList}>
          {filteredCoupons.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="ticket-outline" size={38} color="#94A3B8" />
              </View>

              <Text style={styles.emptyTitle}>{t('myCoupons.noCoupons')}</Text>

              <Text style={styles.emptyText}>
                {t(`myCoupons.emptyMessages.${selectedTab.toLowerCase()}`)}
              </Text>

              {selectedTab === 'Available' && (
                <TouchableOpacity
                  style={styles.exploreButton}
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.exploreButtonText}>
                    {t('myCoupons.explorePromotions')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            filteredCoupons.map(coupon => (
              <TouchableOpacity
                key={coupon.id}
                style={styles.couponCard}
                activeOpacity={0.85}
                onPress={() => {
                  // ตรงนี้ค่อยทำ Coupon Detail ต่อภายหลัง
                  console.log('SELECT COUPON:', coupon);
                }}
              >
                {/* LEFT */}

                <View style={styles.couponLeft}>
                  <View style={styles.couponIcon}>
                    <Ionicons name="ticket-outline" size={25} color="#00A651" />
                  </View>
                </View>

                {/* CONTENT */}

                <View style={styles.couponContent}>
                  <Text style={styles.merchant}>{coupon.merchant}</Text>

                  <Text style={styles.couponTitle}>{coupon.title}</Text>

                  <Text style={styles.discount}>{coupon.discount}</Text>

                  <View style={styles.codeRow}>
                    <Text style={styles.codeLabel}>{t('myCoupons.code')}</Text>

                    <Text style={styles.code}>{coupon.code}</Text>
                  </View>

                  <View style={styles.expiryRow}>
                    <Ionicons name="time-outline" size={13} color="#94A3B8" />

                    <Text style={styles.expiry}>
                      {t('myCoupons.expires', {
                        date: coupon.expiresAt,
                      })}
                    </Text>
                  </View>
                </View>

                {/* STATUS */}

                {coupon.status === 'available' && (
                  <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                )}

                {coupon.status === 'used' && (
                  <View style={styles.statusBadge}>
                    <Text style={styles.usedText}>
                      {t('myCoupons.status.used')}
                    </Text>
                  </View>
                )}

                {coupon.status === 'expired' && (
                  <View style={[styles.statusBadge, styles.expiredBadge]}>
                    <Text style={styles.expiredText}>
                      {t('myCoupons.status.expired')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* INFO */}

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#00A651"
          />

          <Text style={styles.infoText}>{t('myCoupons.info')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F6',
  },

  content: {
    paddingHorizontal: 14,
    paddingBottom: 40,
  },

  // HEADER

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

  // SUMMARY

  summaryCard: {
    minHeight: 82,
    borderRadius: 18,
    backgroundColor: '#00A651',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  summaryInfo: {
    marginLeft: 12,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  summarySubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#E8FFF3',
  },

  // TABS

  tabs: {
    marginTop: 18,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8EFEC',
    padding: 3,
    flexDirection: 'row',
  },

  tab: {
    flex: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#FFFFFF',
  },

  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  activeTabText: {
    color: '#00A651',
    fontWeight: '800',
  },

  // COUPONS

  couponList: {
    marginTop: 14,
  },

  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EFEC',
  },

  couponLeft: {
    width: 48,
    alignItems: 'center',
  },

  couponIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  couponContent: {
    flex: 1,
    marginLeft: 10,
  },

  merchant: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00A651',
  },

  couponTitle: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  discount: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: '#16A34A',
  },

  codeRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  codeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
  },

  code: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 1,
  },

  expiryRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  expiry: {
    marginLeft: 4,
    fontSize: 10,
    color: '#94A3B8',
  },

  // EMPTY

  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  exploreButton: {
    marginTop: 18,
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 21,
    backgroundColor: '#00A651',
    justifyContent: 'center',
    alignItems: 'center',
  },

  exploreButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // INFO

  infoBox: {
    marginTop: 5,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#ECFDF5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 11,
    lineHeight: 17,
    color: '#166534',
  },

  statusBadge: {
    minWidth: 48,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  usedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },

  expiredBadge: {
    backgroundColor: '#FEF2F2',
  },

  expiredText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
  },
});
