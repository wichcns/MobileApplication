import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  energy: number;

  cost: number;

  time: string;
}

export default function ChargingInfoCard({
  energy,

  cost,

  time,
}: Props) {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <InfoItem icon="🔋" title="Energy" value={`${energy.toFixed(2)} kWh`} />

        <InfoItem icon="⏱" title="Duration" value={time} />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <InfoItem
          icon="💰"
          title={t('charging.cost')}
          value={`${cost.toFixed(2)} ฿`}
        />

        <InfoItem icon="⚡" title={t('charging.power')} value="22 kW" />
      </View>
    </View>
  );
}

function InfoItem({
  icon,

  title,

  value,
}: {
  icon: string;

  title: string;

  value: string;
}) {
  return (
    <View style={styles.item}>
      <View style={styles.titleRow}>
        <Text style={styles.icon}>{icon}</Text>

        <Text style={styles.title}>{title}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    padding: 20,

    marginTop: 8,

    marginBottom: 20,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    elevation: 5,
  },

  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },

  item: {
    width: '48%',
  },

  titleRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  icon: {
    fontSize: 18,

    marginRight: 6,
  },

  title: {
    fontSize: 13,

    color: '#64748B',

    fontWeight: '600',
  },

  value: {
    marginTop: 8,

    fontSize: 22,

    fontWeight: '800',

    color: '#111827',
  },

  divider: {
    height: 1,

    backgroundColor: '#E5E7EB',

    marginVertical: 18,
  },
});
