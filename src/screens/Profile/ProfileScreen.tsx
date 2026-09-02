import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { user } from '../../store/userStore';

import { useNavigation } from '@react-navigation/native';
import { getMe } from '../../api/auth.api';
import { updateUser } from '../../store/userStore';
import { getWalletBalance } from '../../api/wallet.api';
type ProfileScreenProps = {
  onLogout?: () => void;
};
export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const { t } = useTranslation();
  // ==========================
  // Quick Actions
  // ==========================
  const navigation = useNavigation<any>();
  const [profileUser, setProfileUser] = useState(user);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const loadProfile = async () => {
    try {
      setLoadingProfile(true);

      console.log('===== PROFILE LOAD START =====');

      const [profile, wallet] = await Promise.all([
        getMe(),
        getWalletBalance(),
      ]);

      console.log('===== PROFILE API RESPONSE =====');
      console.log('Profile:', profile);
      console.log('Name:', profile?.name);
      console.log('Phone:', profile?.phoneNumber);
      console.log('Email:', profile?.email);
      console.log('Cars:', profile?.cars);
      console.log('================================');

      console.log('===== WALLET API RESPONSE =====');
      console.log('Wallet:', wallet);
      console.log('Wallet balance:', wallet?.balance);
      console.log('Wallet data.balance:', wallet?.data?.balance);
      console.log('Wallet wallet.balance:', wallet?.wallet?.balance);
      console.log('================================');

      // ==========================================
      // UPDATE USER
      // ==========================================

      const currentUser = {
        id: profile?._id || profile?.id || '',
        name: profile?.name || '',
        surname: profile?.surname || '',
        email: profile?.email || '',
        phone: profile?.phoneNumber || '',
        phoneNumber: profile?.phoneNumber || '',
        avatar: null,
        cars: profile?.cars || [],
      };

      updateUser(currentUser);
      setProfileUser(currentUser);

      // ==========================================
      // UPDATE WALLET
      // ==========================================

      let balance = 0;

      if (typeof wallet?.balance === 'number') {
        balance = wallet.balance / 100;
      } else if (typeof wallet?.data?.balance === 'number') {
        balance = wallet.data.balance / 100;
      } else if (typeof wallet?.wallet?.balance === 'number') {
        balance = wallet.wallet.balance / 100;
      }

      console.log('===== FINAL WALLET BALANCE =====');
      console.log('Backend Balance:', wallet?.balance);
      console.log('Display Balance:', balance);
      console.log('================================');

      setWalletBalance(balance);
    } catch (error: any) {
      console.log('===== PROFILE LOAD ERROR =====');
      console.log('Message:', error?.message);
      console.log('Response:', error?.response?.data);
      console.log('Status:', error?.response?.status);
      console.log('==============================');
    } finally {
      setLoadingProfile(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );
  // useFocusEffect(
  //   useCallback(() => {
  //     loadProfile();
  //   }, []),
  // );
  const quickActions = [
    {
      key: 'favorite',
      icon: 'heart-outline',
      title: t('profile.favorite'),
    },
    {
      key: 'reservation',
      icon: 'calendar-outline',
      title: t('profile.reservation'),
    },
    {
      key: 'language',
      icon: 'language-outline',
      title: t('profile.language'),
    },
    {
      key: 'service',
      icon: 'headset-outline',
      title: t('profile.service'),
    },
  ];

  // ==========================
  // Menu
  // ==========================

  const menuItems = [
    {
      key: 'creditPayment',
      icon: 'card-outline',
      title: t('profile.creditPayment'),
    },
    {
      key: 'shareEarn',
      icon: 'gift-outline',
      title: t('profile.promotionCoupons'),
    },
    {
      key: 'chargingStations',
      icon: 'business-outline',
      title: t('profile.chargingStations'),
    },
    {
      key: 'about',
      icon: 'information-circle-outline',
      title: t('profile.about'),
    },
  ];

  const handleLogout = () => {
    console.log('===== LOGOUT BUTTON =====');
    console.log('onLogout:', onLogout);
    console.log('typeof onLogout:', typeof onLogout);

    if (typeof onLogout !== 'function') {
      console.error('ERROR: onLogout is not a function');
      return;
    }

    onLogout();
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
          {/* Avatar */}

          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={34} color="#CBD5E1" />
            </View>

            <View style={styles.onlineDot} />
          </View>

          {/* User Information */}

          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {profileUser.name || t('profile.user')}
            </Text>

            <Text style={styles.phone} numberOfLines={1}>
              {profileUser.phone || '-'}
            </Text>
          </View>

          {/* Header Actions */}

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#111827"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('PersonalInformation');
              }}
            >
              <Ionicons name="settings-outline" size={24} color="#111827" />
            </TouchableOpacity>
          </View>
        </View>

        {/* =====================================================
        MY ACCOUNT
    ====================================================== */}

        <View style={styles.accountCard}>
          <Text style={styles.accountTitle}>{t('profile.myAccount')}</Text>

          <View style={styles.accountStats}>
            {/* Balance */}
            <TouchableOpacity style={styles.accountItem}>
              <Text style={styles.accountNumber}>
                {loadingProfile ? '...' : Number(walletBalance || 0).toFixed(2)}
              </Text>

              <Text style={styles.accountLabel}>
                {t('profile.availableBalance')}
              </Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            {/* Coupon */}
            <TouchableOpacity style={styles.accountItem}>
              <Text style={styles.accountNumber}>0</Text>

              <Text style={styles.accountLabel}>{t('profile.couponCard')}</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            {/* Vehicle */}
            <TouchableOpacity style={styles.accountItem}>
              <Text style={styles.accountNumber}>0</Text>

              <Text style={styles.accountLabel}>{t('profile.myCar')}</Text>
            </TouchableOpacity>
          </View>

          {/* Charging Statistics */}
          <View style={styles.accountFooter}>
            <View style={styles.energyInfo}>
              <Ionicons name="flash" size={18} color="#44C4CE" />

              <Text style={styles.energyText}>{t('profile.totalKwh')}:</Text>

              <Text style={styles.energyValue}>0 kWh</Text>
            </View>

            <View style={styles.co2Info}>
              <Text style={styles.co2Text}>{t('profile.reduceCo2')}:</Text>

              <Text style={styles.co2Value}>0</Text>

              <Ionicons
                name="information-circle-outline"
                size={14}
                color="#44C4CE"
              />
            </View>
          </View>
        </View>

        {/* =====================================================
        QUICK ACTIONS
    ====================================================== */}

        <View style={styles.quickCard}>
          {quickActions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickItem}
              activeOpacity={0.7}
              onPress={() => {
                if (item.key === 'language') {
                  navigation.navigate('Language');
                }

                if (item.key === 'service') {
                  navigation.navigate('Service');
                }
              }}
            >
              <View style={styles.quickIcon}>
                <Ionicons name={item.icon as any} size={25} color="#1E293B" />
              </View>

              <Text style={styles.quickTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* =====================================================
        PROMOTION
    ====================================================== */}

        <TouchableOpacity style={styles.promotion} activeOpacity={0.85}>
          <View style={styles.promotionLeft}>
            <View style={styles.giftIcon}>
              <Ionicons name="gift-outline" size={22} color="#111827" />
            </View>

            <Text style={styles.promotionText}>
              {t('profile.promotionEvents')}
            </Text>
          </View>

          <Text style={styles.promotionHighlight}>
            {t('profile.getRewards')}
          </Text>

          <Ionicons name="chevron-forward" size={34} color="#FFFFFF" />
        </TouchableOpacity>

        {/* =====================================================
        MENU
    ====================================================== */}

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
              activeOpacity={0.7}
              onPress={() => {
                if (item.key === 'creditPayment') {
                  navigation.navigate('CreditPayment');
                }

                if (item.key === 'shareEarn') {
                  navigation.navigate('Promotion');
                }

                if (item.key === 'chargingStations') {
                  navigation.navigate('ChargingStations');
                }

                if (item.key === 'about') {
                  navigation.navigate('About');
                }
              }}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={23} color="#334155" />
              </View>

              <Text style={styles.menuTitle}>{item.title}</Text>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* =====================================================
        LOGOUT
    ====================================================== */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={21} color="#DC2626" />

          <Text style={styles.logoutText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 8,

    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    minHeight: 92,

    paddingHorizontal: 6,

    flexDirection: 'row',

    alignItems: 'center',
  },

  avatarWrapper: {
    width: 58,

    height: 58,

    position: 'relative',

    justifyContent: 'center',

    alignItems: 'center',
  },

  avatar: {
    width: 54,

    height: 54,

    borderRadius: 27,

    backgroundColor: '#FFFFFF',

    borderWidth: 2,

    borderColor: '#44C4CE',

    justifyContent: 'center',

    alignItems: 'center',
  },

  onlineDot: {
    position: 'absolute',

    right: 1,

    bottom: 1,

    width: 14,

    height: 14,

    borderRadius: 7,

    backgroundColor: '#44C4CE',

    borderWidth: 2,

    borderColor: '#EAF9FA',
  },

  userInfo: {
    flex: 1,

    marginLeft: 10,
  },

  userName: {
    fontSize: 17,

    fontWeight: '800',

    color: '#111827',
  },

  phone: {
    marginTop: 5,

    fontSize: 12,

    color: '#64748B',
  },

  headerActions: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 4,
  },

  headerButton: {
    width: 40,

    height: 40,

    justifyContent: 'center',

    alignItems: 'center',
  },

  // ==========================================================
  // MY ACCOUNT
  // ==========================================================

  accountCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    overflow: 'hidden',

    borderWidth: 1,

    borderColor: '#E7F1F2',
  },

  accountTitle: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',

    paddingHorizontal: 14,

    paddingTop: 13,
  },

  accountStats: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 13,
  },

  accountItem: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  accountNumber: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  accountLabel: {
    marginTop: 5,

    fontSize: 11,

    color: '#64748B',

    textAlign: 'center',
  },

  verticalDivider: {
    width: 1,

    height: 32,

    backgroundColor: '#E2E8F0',
  },

  accountFooter: {
    minHeight: 36,

    backgroundColor: '#EAF9FA',

    paddingHorizontal: 14,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  energyInfo: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  energyText: {
    marginLeft: 5,

    fontSize: 11,

    color: '#2E929A',
  },

  energyValue: {
    marginLeft: 3,

    fontSize: 11,

    color: '#2E929A',

    fontWeight: '700',
  },

  co2Info: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  co2Text: {
    fontSize: 11,

    color: '#2E929A',
  },

  co2Value: {
    marginLeft: 3,

    marginRight: 3,

    fontSize: 11,

    color: '#2E929A',

    fontWeight: '700',
  },

  // ==========================================================
  // QUICK ACTION
  // ==========================================================

  quickCard: {
    marginTop: 10,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    minHeight: 86,

    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 10,
  },

  quickItem: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  quickIcon: {
    height: 34,

    justifyContent: 'center',

    alignItems: 'center',
  },

  quickTitle: {
    marginTop: 5,

    fontSize: 11,

    color: '#475569',

    textAlign: 'center',
  },

  // ==========================================================
  // PROMOTION
  // ==========================================================

  promotion: {
    marginTop: 9,

    height: 48,

    borderRadius: 13,

    backgroundColor: '#44C4CE',

    paddingHorizontal: 10,

    flexDirection: 'row',

    alignItems: 'center',

    overflow: 'hidden',
  },

  promotionLeft: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  giftIcon: {
    width: 38,

    height: 32,

    borderRadius: 8,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',
  },

  promotionText: {
    marginLeft: 8,

    fontSize: 12,

    fontWeight: '700',

    color: '#FFFFFF',
  },

  promotionHighlight: {
    fontSize: 17,

    fontWeight: '900',

    color: '#FFF200',

    marginRight: 3,
  },

  // ==========================================================
  // MENU
  // ==========================================================

  menuCard: {
    marginTop: 9,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 12,

    borderWidth: 1,

    borderColor: '#E7F1F2',
  },

  menuItem: {
    minHeight: 58,

    flexDirection: 'row',

    alignItems: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#F1F5F9',
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuIcon: {
    width: 34,

    alignItems: 'flex-start',

    justifyContent: 'center',
  },

  menuTitle: {
    flex: 1,

    fontSize: 14,

    color: '#1E293B',

    fontWeight: '500',
  },

  country: {
    fontSize: 20,

    marginRight: 8,
  },

  // ==========================================================
  // LOGOUT
  // ==========================================================

  logoutButton: {
    marginTop: 15,

    marginBottom: 10,

    height: 50,

    borderRadius: 15,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#FECACA',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  logoutText: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: '700',

    color: '#DC2626',
  },
});
