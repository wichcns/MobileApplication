import React, { useEffect } from 'react';
import { useChargerStore } from '../../store/chargerStore';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { Images } from '../../assets';

import { Station } from '../../types/station';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

type Props = {
  station: Station;
  onClose: () => void;
  onStartCharging: (station: Station) => void;
};

export default function StationDetailSheet({
  station,

  onClose,
}: Props) {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const { chargers, setChargers, setSelectedCharger, setSelectedConnector } =
    useChargerStore();

  useEffect(() => {
    if (station) {
      setChargers(station.chargers);
    }
  }, [station, setChargers]);

  if (!station) {
    return null;
  }
  const total = chargers.reduce(
    (sum, charger) => sum + charger.connectors.length,

    0,
  );

  const available = chargers.reduce(
    (sum, charger) =>
      sum +
      charger.connectors.filter(connector => connector.status === 'AVAILABLE')
        .length,

    0,
  );

  const handleNavigate = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

    Linking.openURL(url);
  };

  const handleStartCharging = () => {
    const charger = station.chargers[0];

    const connector = charger.connectors[0];

    navigation.navigate('QRScanner', {
      station: {
        id: station.id,
        name: station.name,
      },

      charger: {
        chargerId: charger.chargerId,
        chargerName: charger.chargerName,
        chargerType: charger.chargerType,
        maxPower: charger.maxPower,
      },

      connector: {
        connectorId: connector.connectorId,
        label: connector.label,
        type: connector.type,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ==========================
          COVER IMAGE
      =========================== */}

        <View style={styles.coverContainer}>
          <Image source={Images.BackTest} style={styles.coverImage} />

          <View style={styles.topActions}>
            <TouchableOpacity style={styles.circleButton} onPress={onClose}>
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </TouchableOpacity>

            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.circleButton}>
                <Ionicons name="heart-outline" size={22} color="#111827" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleButton}>
                <Ionicons name="call-outline" size={22} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ==========================
          STATION INFORMATION
      =========================== */}

        <View style={styles.stationInfoCard}>
          <Image source={Images.logoLow80} style={styles.stationLogo} />

          <View style={styles.stationDetail}>
            <Text style={styles.stationName}>{station.name}</Text>

            <Text style={styles.address}>
              {station.address ?? t('station.chargingStation')}
            </Text>

            <Text style={styles.openText}>{t('station.open24Hours')}</Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* ==========================
          DISTANCE
      =========================== */}

        <View style={styles.distanceRow}>
          <Ionicons name="navigate" size={18} color="#00C878" />

          <Text style={styles.distanceText}>8.6 km</Text>
        </View>

        {/* ==========================
          PROMOTION
      =========================== */}

        <View style={styles.promotionCard}>
          <Ionicons name="rocket-outline" size={18} color="#00C878" />

          <Text style={styles.promotionText}>
            Super DC 120+kW {t('station.fasterCharging')}
          </Text>
        </View>

        {/* ==========================
          CONNECTOR SUMMARY
      =========================== */}

        <View style={styles.connectorSummary}>
          <Ionicons name="flash-outline" size={20} color="#F97316" />

          <Text style={styles.connectorText}>
            {available}/{total} • DC • 120kW
          </Text>
        </View>

        {/* ==========================
          PRICE CARD
      =========================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{t('station.price')}</Text>

            <Text style={styles.detailText}>{t('station.detail')} ›</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.dcBadge}>
              <Text style={styles.dcText}>DC</Text>
            </View>

            <Text style={styles.price}>{station.price} THB/kWh</Text>

            <Text style={styles.time}>09:00 - 22:00</Text>
          </View>

          <Text style={styles.delayText}>{t('station.delayFreeTime')}</Text>
        </View>

        {/* ==========================
    ALL CHARGERS
========================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{t('station.allChargers')}</Text>
            <Text style={styles.detailText}>{t('station.detail')} ›</Text>
          </View>

          {chargers.map(charger => {
            const availableConnector = charger.connectors.find(
              c => c.status === 'AVAILABLE',
            );

            return (
              <TouchableOpacity
                key={charger.chargerId}
                style={styles.chargerItem}
                onPress={() => {
                  if (availableConnector) {
                    navigation.navigate('ReadyToCharge', {
                      station,
                      charger,
                      connector: availableConnector,
                    });
                  }
                }}
              >
                <Ionicons name="disc-outline" size={32} color="#111827" />

                <View style={styles.chargerInfo}>
                  <Text style={styles.chargerName}>{charger.chargerId}</Text>

                  <Text style={styles.chargerDetail}>
                    {charger.chargerType} | {availableConnector?.type ?? '-'} |{' '}
                    {charger.maxPower} kW
                  </Text>
                </View>

                <View
                  style={[
                    styles.availableBox,
                    !availableConnector && styles.unavailableBox,
                  ]}
                >
                  <Ionicons
                    name="flash"
                    size={16}
                    color={availableConnector ? '#00C878' : '#9CA3AF'}
                  />

                  <Text
                    style={[
                      styles.availableText,
                      !availableConnector && styles.unavailableText,
                    ]}
                  >
                    {availableConnector
                      ? t('station.available')
                      : t('station.unavailable')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* ==========================
          BOTTOM ACTION
      =========================== */}

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartCharging}
          >
            <Ionicons name="scan-outline" size={20} color="#111827" />

            <Text style={styles.startText}>{t('station.startCharging')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.goButton} onPress={handleNavigate}>
            <Ionicons name="navigate" size={20} color="#FFFFFF" />

            <Text style={styles.goText}>{t('station.goHere')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    top: 80,

    bottom: 0,

    left: 0,

    right: 0,

    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    overflow: 'hidden',

    elevation: 20,
  },

  /*
  ==========================
  COVER IMAGE
  ==========================
  */

  coverContainer: {
    width: '100%',

    height: 190,
  },

  coverImage: {
    width: '100%',

    height: '100%',

    resizeMode: 'cover',
  },

  topActions: {
    position: 'absolute',

    top: 20,

    left: 20,

    right: 20,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  rightActions: {
    flexDirection: 'row',

    gap: 12,
  },

  circleButton: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 5,
  },

  /*
  ==========================
  STATION INFORMATION
  ==========================
  */

  stationInfoCard: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 20,

    marginTop: -30,
  },

  stationLogo: {
    width: 70,

    height: 70,

    borderRadius: 35,

    borderWidth: 3,

    borderColor: '#FFFFFF',

    backgroundColor: '#FFFFFF',

    marginRight: 14,
  },

  stationDetail: {
    flex: 1,
  },

  stationName: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',
  },

  address: {
    marginTop: 5,

    fontSize: 13,

    color: '#64748B',

    lineHeight: 18,
  },

  openText: {
    marginTop: 8,

    fontSize: 13,

    color: '#00C878',

    fontWeight: '600',
  },

  /*
  ==========================
  DISTANCE
  ==========================
  */

  distanceRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'flex-end',

    paddingHorizontal: 20,

    marginTop: 10,
  },

  distanceText: {
    marginLeft: 5,

    color: '#64748B',

    fontSize: 13,
  },

  /*
  ==========================
  PROMOTION
  ==========================
  */

  promotionCard: {
    marginHorizontal: 16,

    marginTop: 16,

    padding: 12,

    borderRadius: 14,

    backgroundColor: '#E9FFF6',

    flexDirection: 'row',

    alignItems: 'center',
  },

  promotionText: {
    marginLeft: 8,

    color: '#00A86B',

    fontSize: 13,

    fontWeight: '600',
  },

  /*
  ==========================
  CONNECTOR SUMMARY
  ==========================
  */

  connectorSummary: {
    marginHorizontal: 16,

    marginTop: 10,

    height: 48,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: '#FED7AA',

    backgroundColor: '#FFF7ED',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 15,
  },

  connectorText: {
    marginLeft: 10,

    fontWeight: '700',

    color: '#9A3412',

    fontSize: 15,
  },

  /*
  ==========================
  COMMON CARD
  ==========================
  */

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 16,

    marginTop: 14,

    borderRadius: 18,

    padding: 16,

    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 15,
  },

  title: {
    fontSize: 17,

    fontWeight: '800',

    color: '#111827',
  },

  detailText: {
    color: '#64748B',

    fontSize: 14,
  },

  /*
  ==========================
  PRICE
  ==========================
  */

  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  dcBadge: {
    backgroundColor: '#F97316',

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 3,
  },

  dcText: {
    color: '#FFFFFF',

    fontSize: 12,

    fontWeight: '800',
  },

  price: {
    marginLeft: 12,

    fontSize: 16,

    fontWeight: '800',

    color: '#DC2626',
  },

  time: {
    marginLeft: 'auto',

    fontSize: 13,

    color: '#64748B',

    backgroundColor: '#F8FAFC',

    paddingHorizontal: 8,

    paddingVertical: 4,
  },

  delayText: {
    marginTop: 12,

    color: '#64748B',

    fontSize: 13,
  },

  /*
  ==========================
  CHARGER LIST
  ==========================
  */

  chargerItem: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 14,

    borderTopWidth: 1,

    borderColor: '#F1F5F9',
  },

  chargerInfo: {
    flex: 1,

    marginLeft: 12,
  },

  chargerName: {
    fontSize: 15,

    fontWeight: '800',

    color: '#111827',
  },

  chargerDetail: {
    marginTop: 5,

    color: '#64748B',

    fontSize: 13,
  },

  availableBox: {
    width: 90,

    height: 55,

    backgroundColor: '#ECFDF5',

    justifyContent: 'center',

    alignItems: 'center',

    borderRadius: 8,
  },

  availableText: {
    marginTop: 3,

    color: '#00C878',

    fontSize: 12,

    fontWeight: '700',
  },

  /*
  ==========================
  BOTTOM BUTTON
  ==========================
  */

  bottomBar: {
    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,

    flexDirection: 'row',

    gap: 10,

    padding: 16,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,

    borderColor: '#E5E7EB',
  },

  startButton: {
    flex: 1,

    height: 52,

    borderRadius: 15,

    borderWidth: 1,

    borderColor: '#CBD5E1',

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',
  },

  startText: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },

  goButton: {
    flex: 1,

    height: 52,

    borderRadius: 15,

    backgroundColor: '#00C878',

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',
  },

  goText: {
    marginLeft: 8,

    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',
  },

  unavailableBox: {
    backgroundColor: '#F3F4F6',
  },

  unavailableText: {
    color: '#9CA3AF',
  },
});
