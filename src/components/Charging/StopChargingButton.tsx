import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface Props {
  onPress: () => void;
}

export default function StopChargingButton({ onPress }: Props) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconCircle}>
        <View style={styles.stopIcon} />
      </View>

      <Text style={styles.text}>{t('charging.stopCharging')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,

    borderRadius: 30,

    backgroundColor: '#DC2626',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    shadowColor: '#DC2626',

    shadowOpacity: 0.25,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    elevation: 8,
  },

  iconCircle: {
    width: 28,

    height: 28,

    borderRadius: 14,

    backgroundColor: 'rgba(255,255,255,0.2)',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 10,
  },

  stopIcon: {
    width: 10,

    height: 10,

    borderRadius: 2,

    backgroundColor: '#FFFFFF',
  },

  text: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '800',
  },
});
