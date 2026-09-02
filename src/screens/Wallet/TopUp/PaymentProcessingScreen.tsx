import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function PaymentProcessingScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('PaymentSuccess', {
        amount,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [amount, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#44C4CE" />

        <Text style={styles.title}>{t('paymentProcessing.title')}</Text>

        <Text style={styles.subtitle}>{t('paymentProcessing.subtitle')}</Text>

        <Text style={styles.amount}>
          {amount.toFixed(2)} {t('common.currency')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',

    alignItems: 'center',
  },

  content: {
    alignItems: 'center',

    paddingHorizontal: 30,
  },

  title: {
    fontSize: 22,

    fontWeight: '800',

    marginTop: 25,

    color: '#111827',
  },

  subtitle: {
    marginTop: 10,

    color: '#64748B',

    textAlign: 'center',

    fontSize: 14,

    lineHeight: 20,
  },

  amount: {
    marginTop: 20,

    fontSize: 32,

    fontWeight: '900',

    color: '#44C4CE',
  },
});
