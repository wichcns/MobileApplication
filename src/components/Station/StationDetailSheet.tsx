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

  const { setChargers, setSelectedCharger, setSelectedConnector } =
    useChargerStore();

  useEffect(() => {
    if (station) {
      setChargers(station.chargers);
    }
  }, [station, setChargers]);

  if (!station) {
    return null;
  }

  const chargers = station.chargers ?? [];
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

  const availableSelections = chargers
    .flatMap(charger =>
      charger.connectors
        .filter(connector => connector.status === 'AVAILABLE')
        .map(connector => ({ charger, connector })),
    );

  const firstAvailableSelection = availableSelections[0];

  const handleStartCharging = () => {
    if (!firstAvailableSelection) {
      return;
    }

    const { charger, connector } = firstAvailableSelection;

    setSelectedCharger(charger);
    setSelectedConnector(connector);

    navigation.navigate('ReadyToCharge', {
      station,
      charger,
      connector,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==========================
        COVER IMAGE
    =========================== */}

        <View style={styles.coverContainer}>
          <Image
            source={station.image ? { uri: station.image } : Images.BackTest}
            style={styles.coverImage}
          />

          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={22} color="#111827" />
            </TouchableOpacity>

            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
                <Ionicons name="heart-outline" size={22} color="#111827" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circleButton} activeOpacity={0.8}>
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
            <Text
              style={styles.stationName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {station.name}
            </Text>

            <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">
              {station.address ?? t('station.chargingStation')}
            </Text>

            <Text style={styles.openText}>{t('station.open24Hours')}</Text>
          </View>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.8}>
            <Ionicons name="share-social-outline" size={22} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* ==========================
        DISTANCE
    =========================== */}

        <View style={styles.distanceRow}>
          <Ionicons name="navigate" size={18} color="#44C4CE" />

          <Text style={styles.distanceText}>8.6 km</Text>
        </View>

        {/* ==========================
        PROMOTION
    =========================== */}

        <View style={styles.promotionCard}>
          <Ionicons name="rocket-outline" size={18} color="#44C4CE" />

          <Text style={styles.promotionText} numberOfLines={2}>
            Super DC 120+kW {t('station.fasterCharging')}
          </Text>
        </View>

        {/* ==========================
        CONNECTOR SUMMARY
    =========================== */}

        <View style={styles.connectorSummary}>
          <Ionicons name="flash-outline" size={20} color="#F97316" />

          <Text
            style={styles.connectorText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {available}/{total} • AC • 40 kW
          </Text>
        </View>

        {/* ==========================
        PRICE CARD
    =========================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{t('station.price')}</Text>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.detailText}>{t('station.detail')} ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.dcBadge}>
              <Text style={styles.dcText}>AC</Text>
            </View>

            <Text style={styles.price} numberOfLines={1}>
              {station.price} THB/kWh
            </Text>

            <Text style={styles.time}>09:00 - 22:00</Text>
          </View>

          <Text style={styles.delayText}>{t('station.delayFreeTime')}</Text>
        </View>

        {/* ==========================
        ALL CHARGERS
    =========================== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{t('station.allChargers')}</Text>

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.detailText}>{t('station.detail')} ›</Text>
            </TouchableOpacity>
          </View>

          {chargers.map((charger, chargerIndex) => {
            const availableConnectors = charger.connectors.filter(
              connector => connector.status === 'AVAILABLE',
            );

            const chargingConnectors = charger.connectors.filter(
              connector => connector.status === 'CHARGING',
            );

            const totalConnectors = charger.connectors.length;

            const availableCount = availableConnectors.length;

            const chargingCount = chargingConnectors.length;

            return (
              <View
                key={String(charger.chargerId)}
                style={[
                  styles.chargerBlock,
                  chargerIndex > 0 && styles.chargerBlockSpacing,
                ]}
              >
                {/* ==========================
                CHARGER HEADER
            =========================== */}

                <View style={styles.chargerItem}>
                  {/* Charger Icon */}

                  <View style={styles.chargerIconContainer}>
                    <Ionicons name="disc-outline" size={30} color="#111827" />
                  </View>

                  {/* Charger Information */}

                  <View style={styles.chargerInfo}>
                    <Text
                      style={styles.chargerName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {charger.chargerName || charger.chargerId}
                    </Text>

                    <Text
                      style={styles.chargerDetail}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {charger.chargerType} | {availableCount}/{totalConnectors}{' '}
                      | {charger.maxPower || 0} kW
                    </Text>
                  </View>

                  {/* Charger Availability */}

                  <View
                    style={[
                      styles.availableBox,

                      availableCount === 0 &&
                        chargingCount === 0 &&
                        styles.unavailableBox,

                      chargingCount > 0 && styles.chargingBox,
                    ]}
                  >
                    <Ionicons
                      name={chargingCount > 0 ? 'flash' : 'flash-outline'}
                      size={16}
                      color={
                        chargingCount > 0
                          ? '#F59E0B'
                          : availableCount > 0
                          ? '#44C4CE'
                          : '#9CA3AF'
                      }
                    />

                    <Text
                      style={[
                        styles.availableText,

                        chargingCount > 0 && styles.chargingText,

                        availableCount === 0 &&
                          chargingCount === 0 &&
                          styles.unavailableText,
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {chargingCount > 0
                        ? t('station.chargingCount', { count: chargingCount })
                        : availableCount > 0
                        ? t('station.available')
                        : t('station.unavailable')}
                    </Text>
                  </View>
                </View>

                {/* ==========================
                CONNECTORS
            =========================== */}

                <View style={styles.connectorList}>
                  {charger.connectors.map(connector => {
                    const isAvailable = connector.status === 'AVAILABLE';

                    const isCharging = connector.status === 'CHARGING';

                    const batteryPercentage = connector.batteryPercentage;

                    return (
                      <TouchableOpacity
                        key={String(connector.connectorId)}
                        style={[
                          styles.connectorItem,

                          !isAvailable && styles.connectorItemDisabled,
                        ]}
                        disabled={!isAvailable}
                        activeOpacity={0.75}
                        onPress={() => {
                          if (!isAvailable) {
                            return;
                          }

                          setSelectedCharger(charger);

                          setSelectedConnector(connector);

                          navigation.navigate('ReadyToCharge', {
                            station,
                            charger,
                            connector,
                          });
                        }}
                      >
                        {/* ==========================
                          CONNECTOR LEFT
                      =========================== */}

                        <View style={styles.connectorLeft}>
                          <View
                            style={[
                              styles.connectorIcon,

                              isAvailable && styles.connectorIconAvailable,

                              isCharging && styles.connectorIconCharging,
                            ]}
                          >
                            <Ionicons
                              name="flash"
                              size={16}
                              color={
                                isAvailable
                                  ? '#44C4CE'
                                  : isCharging
                                  ? '#F59E0B'
                                  : '#9CA3AF'
                              }
                            />
                          </View>

                          <View style={styles.connectorInfo}>
                            <Text
                              style={styles.connectorName}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {connector.label ||
                                `Connector ${connector.connectorId}`}
                            </Text>

                            <Text
                              style={styles.connectorDetail}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {connector.type}

                              {connector.powerElectricity
                                ? ` • ${connector.powerElectricity} kW`
                                : ''}
                            </Text>

                            {/* ==========================
                              CHARGING PROGRESS
                          =========================== */}

                            {isCharging && (
                              <View style={styles.chargingProgress}>
                                <View style={styles.progressBackground}>
                                  <View
                                    style={[
                                      styles.progressFill,
                                      {
                                        width: `${Math.min(
                                          Math.max(batteryPercentage ?? 0, 0),
                                          100,
                                        )}%`,
                                      },
                                    ]}
                                  />
                                </View>

                                <Text style={styles.batteryText}>
                                  {batteryPercentage != null
                                    ? `${batteryPercentage}%`
                                    : t('station.charging')}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        {/* ==========================
                          CONNECTOR STATUS
                      =========================== */}

                        <View
                          style={[
                            styles.connectorStatus,

                            isAvailable && styles.connectorStatusAvailable,

                            isCharging && styles.connectorStatusCharging,
                          ]}
                        >
                          <Text
                            style={[
                              styles.connectorStatusText,

                              isAvailable &&
                                styles.connectorStatusTextAvailable,

                              isCharging && styles.connectorStatusTextCharging,
                            ]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                          >
                            {isAvailable
                              ? t('station.available')
                              : isCharging
                              ? batteryPercentage != null
                                ? t('station.chargingWithPercentage', {
                                    percentage: batteryPercentage,
                                  })
                                : t('station.charging')
                              : t('station.unavailable')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>

        {/* ==========================
        END CONTENT
    =========================== */}
      </ScrollView>

      {/* ==========================
      BOTTOM ACTION
  =========================== */}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.startButton,
            !firstAvailableSelection && styles.startButtonDisabled,
          ]}
          onPress={handleStartCharging}
          disabled={!firstAvailableSelection}
          activeOpacity={0.8}
        >
          <Ionicons
            name="scan-outline"
            size={20}
            color={firstAvailableSelection ? '#111827' : '#94A3B8'}
          />

          <Text
            style={[
              styles.startText,
              !firstAvailableSelection && styles.startTextDisabled,
            ]}
          >
            {firstAvailableSelection
              ? t('station.startCharging')
              : t('station.noAvailableConnector')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goButton}
          onPress={handleNavigate}
          activeOpacity={0.8}
        >
          <Ionicons name="navigate" size={20} color="#FFFFFF" />

          <Text style={styles.goText}>{t('station.goHere')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  // =========================================================
  // CONTAINER
  // =========================================================

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

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  // =========================================================
  // SCROLL VIEW
  // =========================================================

  scrollContent: {
    paddingBottom: 120,
  },

  // =========================================================
  // COVER IMAGE
  // =========================================================

  coverContainer: {
    width: '100%',
    height: 190,

    position: 'relative',
  },

  coverImage: {
    width: '100%',
    height: '100%',

    resizeMode: 'cover',
  },

  // =========================================================
  // TOP ACTIONS
  // =========================================================

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

    alignItems: 'center',

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

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  // =========================================================
  // STATION INFORMATION
  // =========================================================

  stationInfoCard: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 20,

    marginTop: -30,

    minHeight: 90,
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

    minWidth: 0,

    paddingTop: 22,
  },

  stationName: {
    fontSize: 20,

    fontWeight: '800',

    color: '#111827',

    lineHeight: 25,
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

    color: '#44C4CE',

    fontWeight: '600',
  },

  shareButton: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 8,

    marginTop: 22,
  },

  // =========================================================
  // DISTANCE
  // =========================================================

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

  // =========================================================
  // PROMOTION
  // =========================================================

  promotionCard: {
    marginHorizontal: 16,

    marginTop: 16,

    paddingHorizontal: 12,
    paddingVertical: 12,

    minHeight: 48,

    borderRadius: 14,

    backgroundColor: '#EAF9FA',

    flexDirection: 'row',

    alignItems: 'center',
  },

  promotionText: {
    flex: 1,

    marginLeft: 8,

    color: '#44C4CE',

    fontSize: 13,

    fontWeight: '600',

    lineHeight: 18,
  },

  // =========================================================
  // CONNECTOR SUMMARY
  // =========================================================

  connectorSummary: {
    marginHorizontal: 16,

    marginTop: 10,

    minHeight: 48,

    borderRadius: 12,

    borderWidth: 1,

    borderColor: '#FED7AA',

    backgroundColor: '#FFF7ED',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 15,
  },

  connectorText: {
    flex: 1,

    marginLeft: 10,

    fontWeight: '700',

    color: '#9A3412',

    fontSize: 15,
  },

  // =========================================================
  // COMMON CARD
  // =========================================================

  card: {
    backgroundColor: '#FFFFFF',

    marginHorizontal: 16,

    marginTop: 14,

    borderRadius: 18,

    padding: 16,

    elevation: 2,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 15,
  },

  title: {
    flex: 1,

    fontSize: 17,

    fontWeight: '800',

    color: '#111827',
  },

  detailText: {
    color: '#64748B',

    fontSize: 14,

    marginLeft: 10,
  },

  // =========================================================
  // PRICE
  // =========================================================

  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',

    width: '100%',
  },

  dcBadge: {
    backgroundColor: '#F97316',

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 3,

    flexShrink: 0,
  },

  dcText: {
    color: '#FFFFFF',

    fontSize: 12,

    fontWeight: '800',
  },

  price: {
    marginLeft: 12,

    flex: 1,

    fontSize: 16,

    fontWeight: '800',

    color: '#DC2626',
  },

  time: {
    marginLeft: 8,

    fontSize: 12,

    color: '#64748B',

    backgroundColor: '#F8FAFC',

    paddingHorizontal: 8,
    paddingVertical: 5,

    borderRadius: 6,

    flexShrink: 0,
  },

  delayText: {
    marginTop: 12,

    color: '#64748B',

    fontSize: 13,

    lineHeight: 18,
  },

  // =========================================================
  // CHARGER BLOCK
  // =========================================================

  chargerBlock: {
    paddingTop: 4,
  },

  chargerBlockSpacing: {
    marginTop: 8,

    borderTopWidth: 1,

    borderColor: '#F1F5F9',

    paddingTop: 8,
  },

  // =========================================================
  // CHARGER ITEM
  // =========================================================

  chargerItem: {
    flexDirection: 'row',

    alignItems: 'center',

    minHeight: 70,

    paddingVertical: 10,
  },

  chargerIconContainer: {
    width: 36,
    height: 36,

    justifyContent: 'center',
    alignItems: 'center',

    flexShrink: 0,
  },

  chargerInfo: {
    flex: 1,

    minWidth: 0,

    marginLeft: 10,

    marginRight: 8,
  },

  chargerName: {
    fontSize: 15,

    fontWeight: '800',

    color: '#111827',

    lineHeight: 19,
  },

  chargerDetail: {
    marginTop: 5,

    color: '#64748B',

    fontSize: 13,

    lineHeight: 17,
  },

  // =========================================================
  // CHARGER AVAILABILITY
  // =========================================================

  availableBox: {
    width: 88,
    minHeight: 48,

    paddingHorizontal: 6,
    paddingVertical: 6,

    backgroundColor: '#EAF9FA',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,

    flexShrink: 0,
  },

  chargingBox: {
    backgroundColor: '#FFF7ED',
  },

  unavailableBox: {
    backgroundColor: '#F3F4F6',
  },

  availableText: {
    marginTop: 3,

    color: '#44C4CE',

    fontSize: 11,

    fontWeight: '700',

    textAlign: 'center',
  },

  chargingText: {
    color: '#F59E0B',
  },

  unavailableText: {
    color: '#9CA3AF',
  },

  // =========================================================
  // CONNECTOR LIST
  // =========================================================

  connectorList: {
    marginLeft: 42,

    marginTop: 2,

    marginBottom: 8,
  },

  // =========================================================
  // CONNECTOR ITEM
  // =========================================================

  connectorItem: {
    minHeight: 64,

    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingVertical: 9,
    paddingHorizontal: 10,

    marginBottom: 7,

    borderRadius: 12,

    backgroundColor: '#F8FAFC',

    borderWidth: 1,

    borderColor: '#F1F5F9',
  },

  connectorItemDisabled: {
    opacity: 0.9,
  },

  // =========================================================
  // CONNECTOR LEFT
  // =========================================================

  connectorLeft: {
    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,

    minWidth: 0,

    marginRight: 8,
  },

  connectorIcon: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: '#F1F5F9',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,

    flexShrink: 0,
  },

  connectorIconAvailable: {
    backgroundColor: '#EAF9FA',
  },

  connectorIconCharging: {
    backgroundColor: '#FFF7ED',
  },

  connectorInfo: {
    flex: 1,

    minWidth: 0,
  },

  connectorName: {
    fontSize: 13,

    fontWeight: '700',

    color: '#111827',

    lineHeight: 17,

    flexShrink: 1,
  },

  connectorDetail: {
    marginTop: 3,

    fontSize: 11,

    color: '#64748B',

    lineHeight: 15,
  },

  // =========================================================
  // CONNECTOR STATUS
  // =========================================================

  connectorStatus: {
    minWidth: 82,

    maxWidth: 92,

    paddingHorizontal: 8,
    paddingVertical: 6,

    borderRadius: 10,

    backgroundColor: '#F3F4F6',

    justifyContent: 'center',
    alignItems: 'center',

    flexShrink: 0,
  },

  connectorStatusAvailable: {
    backgroundColor: '#EAF9FA',
  },

  connectorStatusCharging: {
    backgroundColor: '#FFF7ED',
  },

  connectorStatusText: {
    fontSize: 10,

    fontWeight: '700',

    color: '#9CA3AF',

    textAlign: 'center',
  },

  connectorStatusTextAvailable: {
    color: '#44C4CE',
  },

  connectorStatusTextCharging: {
    color: '#F59E0B',
  },

  // =========================================================
  // CHARGING PROGRESS
  // =========================================================

  chargingProgress: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 6,

    maxWidth: 120,
  },

  progressBackground: {
    flex: 1,

    height: 6,

    backgroundColor: '#E5E7EB',

    borderRadius: 10,

    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',

    backgroundColor: '#F59E0B',

    borderRadius: 10,
  },

  batteryText: {
    marginLeft: 6,

    fontSize: 10,

    fontWeight: '700',

    color: '#F59E0B',

    minWidth: 34,

    textAlign: 'right',
  },

  // =========================================================
  // OLD / OPTIONAL CHARGING PROGRESS
  // =========================================================

  chargingProgressContainer: {
    marginTop: 5,

    width: 100,
  },

  chargingProgressRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 4,
  },

  chargingProgressText: {
    fontSize: 10,

    fontWeight: '700',

    color: '#F59E0B',
  },

  chargingPercent: {
    fontSize: 10,

    fontWeight: '800',

    color: '#F59E0B',
  },

  chargingProgressBackground: {
    width: '100%',

    height: 5,

    borderRadius: 5,

    backgroundColor: '#E5E7EB',

    overflow: 'hidden',
  },

  chargingProgressFill: {
    height: '100%',

    borderRadius: 5,

    backgroundColor: '#F59E0B',
  },

  // =========================================================
  // BOTTOM ACTION
  // =========================================================

  bottomBar: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: 'row',

    gap: 10,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,

    borderColor: '#E5E7EB',

    elevation: 12,

    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: -3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,
  },

  // =========================================================
  // START BUTTON
  // =========================================================

  startButton: {
    flex: 1,

    height: 52,

    borderRadius: 15,

    borderWidth: 1,

    borderColor: '#CBD5E1',

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  startButtonDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },

  startText: {
    marginLeft: 8,

    fontSize: 15,

    fontWeight: '700',

    color: '#111827',

    textAlign: 'center',
  },

  startTextDisabled: {
    color: '#94A3B8',
  },

  // =========================================================
  // GO BUTTON
  // =========================================================

  goButton: {
    flex: 1,

    height: 52,

    borderRadius: 15,

    backgroundColor: '#44C4CE',

    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
  },

  goText: {
    marginLeft: 8,

    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',

    textAlign: 'center',
  },
});
