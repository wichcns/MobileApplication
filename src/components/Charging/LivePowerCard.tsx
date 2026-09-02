import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  power: number;
}

export default function LivePowerCard({ power }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;
  const { t } = useTranslation();
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,

          duration: 1400,

          useNativeDriver: true,
        }),

        Animated.timing(pulse, {
          toValue: 1,

          duration: 1400,

          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [pulse]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerCircle,

          {
            transform: [
              {
                scale: pulse,
              },
            ],
          },
        ]}
      >
        <View style={styles.circle}>
          <Text style={styles.icon}>⚡</Text>

          <Text style={styles.power}>{power.toFixed(1)}</Text>

          <Text style={styles.unit}>kW</Text>
        </View>
      </Animated.View>

      <View style={styles.liveRow}>
        <View style={styles.liveDot} />

        <Text style={styles.label}>{t('charging.liveCharging')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',

    marginBottom: 26,
  },

  outerCircle: {
    width: 250,

    height: 250,

    borderRadius: 125,

    borderWidth: 10,

    borderColor: '#D7F3F5',

    justifyContent: 'center',

    alignItems: 'center',
  },

  circle: {
    width: 230,

    height: 230,

    borderRadius: 115,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.1,

    shadowRadius: 20,

    shadowOffset: {
      width: 0,

      height: 8,
    },

    elevation: 8,
  },

  icon: {
    fontSize: 36,

    marginBottom: 4,
  },

  power: {
    fontSize: 56,

    fontWeight: '800',

    color: '#111827',
  },

  unit: {
    fontSize: 22,

    fontWeight: '700',

    color: '#44C4CE',

    marginTop: -6,
  },

  liveRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 18,
  },

  liveDot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    backgroundColor: '#44C4CE',

    marginRight: 8,
  },

  label: {
    fontSize: 15,

    fontWeight: '600',

    color: '#64748B',
  },
});
