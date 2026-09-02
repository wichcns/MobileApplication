import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  station: string;

  charger: string;

  connector: string;

  connectorType: string;

  status: string;

  maxPower: number;
}

export default function ChargingHeader({
  station,

  charger,

  connector,

  connectorType,

  status,

  maxPower,
}: Props) {
  const { t } = useTranslation();
  const getStatus = () => {
    switch (status) {
      case 'CHARGING':
        return {
          text: t('charging.charging'),
          color: '#44C4CE',
          bg: '#D7F3F5',
        };

      case 'PREPARING':
        return {
          text: t('charging.preparing'),
          color: '#2563EB',
          bg: '#DBEAFE',
        };

      case 'FINISHING':
        return {
          text: t('charging.finishing'),
          color: '#D97706',
          bg: '#FEF3C7',
        };

      case 'COMPLETED':
        return {
          text: t('charging.completed'),
          color: '#6B7280',
          bg: '#E5E7EB',
        };

      default:
        return {
          text: status,
          color: '#374151',
          bg: '#F3F4F6',
        };
    }
  };

  const statusStyle = getStatus();

  return (
    <View style={styles.container}>
      {/* Station Information */}

      <Text style={styles.station}>{station}</Text>

      <Text style={styles.charger}>{charger}</Text>

      {/* Main Information Row */}

      <View style={styles.mainRow}>
        {/* Connector */}

        <View style={styles.connectorBox}>
          <Text style={styles.connectorIcon}>⚡</Text>

          <View>
            <Text style={styles.connectorText}>{connectorType}</Text>

            <Text style={styles.subText}>{connector}</Text>
          </View>
        </View>

        {/* Power */}

        <View style={styles.powerBox}>
          <Text style={styles.powerValue}>{maxPower} kW</Text>

          <Text style={styles.subText}>{t('charging.maxOutput')}</Text>
        </View>

        {/* Status */}

        <View
          style={[
            styles.statusBadge,

            {
              backgroundColor: statusStyle.bg,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,

              {
                backgroundColor: statusStyle.color,
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,

              {
                color: statusStyle.color,
              },
            ]}
          >
            {statusStyle.text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  station: {
    fontSize: 26,

    fontWeight: '800',

    color: '#111827',
  },

  charger: {
    marginTop: 4,

    fontSize: 15,

    color: '#64748B',

    fontWeight: '500',
  },

  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  connectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.3,
  },

  connectorIcon: {
    fontSize: 18,

    marginRight: 8,
  },

  connectorText: {
    fontSize: 15,

    fontWeight: '700',

    color: '#1F2937',
  },

  subText: {
    marginTop: 2,

    fontSize: 11,

    color: '#64748B',
  },

  powerBox: {
    alignItems: 'center',
    flex: 0.7,
    marginHorizontal: 18,
  },

  powerValue: {
    fontSize: 16,

    fontWeight: '800',

    color: '#111827',
  },

  statusBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 10,

    paddingVertical: 7,

    borderRadius: 18,

    marginLeft: 10,
  },

  statusDot: {
    width: 8,

    height: 8,

    borderRadius: 4,

    marginRight: 6,
  },

  statusText: {
    fontSize: 13,

    fontWeight: '700',
  },
});
