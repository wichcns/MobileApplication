import React from 'react';
import { useChargerStore } from '../../store/chargerStore';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function ReadyToChargeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { station, charger, connector, verification } = route.params;

  if (!station || !charger || !connector) {
    return (
      <View style={styles.container}>
        <Text>{t('readyToCharge.noChargerSelected')}</Text>
      </View>
    );
  }

  const handleStartCharging = () => {
    navigation.navigate('QRScanner', {
      station,
      charger,
      connector,
      verification,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('readyToCharge.title')}</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* CHARGER INFO */}

        <View style={styles.chargerCard}>
          <View style={styles.row}>
            <View style={styles.statusDot} />

            <View style={{ flex: 1 }}>
              <Text style={styles.chargerName}>
                {charger.chargerName ?? charger.chargerId}
              </Text>

              <Text style={styles.subText}>
                {charger.chargerId}
                {' • '}
                {charger.chargerType}
                {' • '}
                {charger.maxPower} kW
              </Text>

              <Text style={styles.stationName}>{station.name}</Text>

              <Text style={styles.connectorInfo}>
                {t('readyToCharge.connector')} {connector.connectorId}
                {' • '}
                {connector.label}
              </Text>
            </View>

            <Ionicons name="qr-code-outline" size={36} color="#111827" />
          </View>
        </View>

        {/* ADD CAR */}

        <TouchableOpacity style={styles.addCar}>
          <Ionicons name="add-circle" size={18} color="#00C878" />

          <Text style={styles.addCarText}>{t('readyToCharge.addMyCar')}</Text>
        </TouchableOpacity>

        {/* PAYMENT SETTING */}

        <Text style={styles.sectionTitle}>
          {t('readyToCharge.paymentSetting')}
        </Text>

        <View style={styles.card}>
          {/* BALANCE PAYMENT */}

          <View style={styles.rowBetween}>
            <Text style={styles.label}>
              {t('readyToCharge.balancePayment')}
            </Text>

            <TouchableOpacity>
              <Text style={styles.green}>{t('readyToCharge.topUp')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceRow}>
            <Ionicons name="wallet-outline" size={22} color="#00C878" />

            <View>
              <Text style={styles.balance}>0 THB</Text>

              <Text style={styles.tip}>
                {t('readyToCharge.insufficientBalanceTip')}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* CREDIT PAYMENT */}

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Credit Payment</Text>

            <TouchableOpacity>
              <Text style={styles.green}>+ Add Credit Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DISCOUNT */}

        <Text style={styles.sectionTitle}>{t('readyToCharge.discount')}</Text>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.bold}>{t('readyToCharge.prepaidCard')}</Text>

            <Text style={styles.gray}>{t('readyToCharge.noCards')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.bold}>
              {t('readyToCharge.couponDiscountCard')}
            </Text>

            <Text style={styles.gray}>{t('readyToCharge.noCoupons')}</Text>
          </View>
        </View>

        {/* CHARGING STRATEGY */}

        <Text style={styles.sectionTitle}>
          {t('readyToCharge.chargingStrategy')}
        </Text>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.bold}>{t('readyToCharge.maxSoc')}</Text>

            <TouchableOpacity>
              <Text style={styles.gray}>100% ＞</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}

      <View style={styles.bottom}>
        <View style={styles.warning}>
          <Ionicons name="car-sport" size={20} color="#FF0066" />

          <Text style={styles.warningText}>
            {t('readyToCharge.plugConnectorWarning')}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartCharging}
        >
          <Text style={styles.startText}>
            {t('readyToCharge.startCharging')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
  },

  /*
  =====================
  HEADER
  =====================
  */

  header: {
    height: 60,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginTop: 10,
  },

  backButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  headerTitle: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  /*
  =====================
  CHARGER CARD
  =====================
  */

  chargerCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 18,

    marginTop: 10,

    shadowColor: '#000',

    shadowOpacity: 0.06,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  statusDot: {
    width: 14,

    height: 14,

    borderRadius: 7,

    backgroundColor: '#00C878',

    marginRight: 12,
  },

  chargerName: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  subText: {
    marginTop: 4,

    fontSize: 13,

    color: '#64748B',
  },

  stationName: {
    marginTop: 6,

    fontSize: 14,

    color: '#64748B',

    fontWeight: '600',
  },

  connectorInfo: {
    marginTop: 5,

    fontSize: 13,

    color: '#00A651',

    fontWeight: '700',
  },

  /*
  =====================
  ADD CAR
  =====================
  */

  addCar: {
    height: 50,

    marginTop: 16,

    borderRadius: 14,

    backgroundColor: '#ECFDF5',

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',
  },

  addCarText: {
    marginLeft: 8,

    color: '#00A86B',

    fontWeight: '700',
  },

  /*
  =====================
  SECTION
  =====================
  */

  sectionTitle: {
    marginTop: 20,

    marginBottom: 10,

    fontSize: 17,

    fontWeight: '800',

    color: '#111827',
  },

  /*
  =====================
  COMMON CARD
  =====================
  */

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 16,

    shadowColor: '#000',

    shadowOpacity: 0.06,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  rowBetween: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  label: {
    fontSize: 15,

    color: '#111827',

    fontWeight: '600',
  },

  bold: {
    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },

  green: {
    color: '#00C878',

    fontWeight: '700',
  },

  gray: {
    color: '#64748B',

    fontSize: 14,
  },

  /*
  =====================
  BALANCE
  =====================
  */

  balanceRow: {
    flexDirection: 'row',

    marginTop: 18,

    alignItems: 'center',
  },

  balance: {
    marginLeft: 12,

    fontSize: 22,

    fontWeight: '800',

    color: '#111827',
  },

  tip: {
    marginLeft: 12,

    marginTop: 5,

    fontSize: 12,

    color: '#64748B',

    maxWidth: 260,
  },

  divider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginVertical: 15,
  },

  /*
  =====================
  BOTTOM ACTION
  =====================
  */

  bottom: {
    position: 'absolute',

    left: 0,

    right: 0,

    bottom: 0,

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 16,

    paddingTop: 12,

    paddingBottom: 20,

    borderTopWidth: 1,

    borderColor: '#E5E7EB',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 10,
  },

  warning: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,
  },

  warningText: {
    marginLeft: 8,

    color: '#FF0066',

    fontWeight: '600',

    fontSize: 13,
  },

  startButton: {
    height: 54,

    borderRadius: 18,

    backgroundColor: '#00C878',

    justifyContent: 'center',

    alignItems: 'center',
  },

  startText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '800',
  },
});
