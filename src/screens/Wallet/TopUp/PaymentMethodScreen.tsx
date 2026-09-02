import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function PaymentMethodScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  const [selected, setSelected] = useState('');

  // ==========================================================
  // PAYMENT METHODS
  // ==========================================================

  const methods: {
    id: string;
    title: string;
    subtitle: string;
    icon: IconName;
  }[] = [
    {
      id: 'PROMPTPAY',
      title: t('paymentMethod.mobileBanking'),
      subtitle: t('paymentMethod.mobileBankingSubtitle'),
      icon: 'qr-code-outline',
    },
    {
      id: 'CREDIT_CARD',
      title: t('paymentMethod.creditCard'),
      subtitle: t('paymentMethod.creditCardSubtitle'),
      icon: 'card-outline',
    },
  ];

  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {
    if (!selected) {
      return;
    }

    if (selected === 'PROMPTPAY') {
      navigation.navigate('QRPayment', {
        amount,
        method: 'PROMPTPAY',
      });

      return;
    }

    if (selected === 'CREDIT_CARD') {
      navigation.navigate('CreditCardTopUp', {
        amount,
      });

      return;
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <SafeAreaView style={styles.container}>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.title}>{t('paymentMethod.title')}</Text>
      </View>

      {/* =====================================================
          AMOUNT
      ====================================================== */}

      <Text style={styles.label}>{t('paymentMethod.topUpAmount')}</Text>

      <Text style={styles.amount}>
        {amount.toFixed(2)} {t('common.currency')}
      </Text>

      {/* =====================================================
          PAYMENT METHOD
      ====================================================== */}

      <Text style={styles.section}>
        {t('paymentMethod.choosePaymentMethod')}
      </Text>

      {methods.map(item => {
        const isSelected = selected === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, isSelected && styles.selected]}
            activeOpacity={0.8}
            onPress={() => setSelected(item.id)}
          >
            {/* ICON */}

            <Ionicons
              name={item.icon}
              size={30}
              color={isSelected ? '#FFFFFF' : '#44C4CE'}
            />

            {/* TEXT */}

            <View style={styles.text}>
              <Text
                style={[styles.cardTitle, isSelected && styles.selectedText]}
              >
                {item.title}
              </Text>

              <Text
                style={[styles.subtitle, isSelected && styles.selectedSubText]}
              >
                {item.subtitle}
              </Text>
            </View>

            {/* SELECTED */}

            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        );
      })}

      {/* =====================================================
          CONTINUE
      ====================================================== */}

      <TouchableOpacity
        disabled={!selected}
        activeOpacity={0.85}
        style={[styles.button, !selected && styles.disabledButton]}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>{t('common.continue')}</Text>

        <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 20,
    color: '#111827',
  },

  // ==========================================================
  // AMOUNT
  // ==========================================================

  label: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },

  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#44C4CE',
    marginTop: 5,
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // PAYMENT CARD
  // ==========================================================

  card: {
    minHeight: 82,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#44C4CE',
    borderColor: '#44C4CE',
  },

  // ==========================================================
  // TEXT
  // ==========================================================

  text: {
    marginLeft: 15,
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  selectedText: {
    color: '#FFFFFF',
  },

  subtitle: {
    color: '#64748B',
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
  },

  selectedSubText: {
    color: '#E3F6F7',
  },

  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    marginTop: 40,
    height: 54,
    backgroundColor: '#44C4CE',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
});
