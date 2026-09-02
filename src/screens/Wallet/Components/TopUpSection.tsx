import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const amounts = [100, 300, 500, 1000];

interface TopUpSectionProps {
  onContinue: (amount: number) => void;
}

export default function TopUpSection({ onContinue }: TopUpSectionProps) {
  const { t } = useTranslation();

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const [customAmount, setCustomAmount] = useState('');

  const amount = customAmount ? Number(customAmount) : selectedAmount;

  return (
    <View style={styles.container}>
      {/* =====================================================
          TITLE
      ====================================================== */}

      <Text style={styles.title}>{t('topUp.title')}</Text>

      <Text style={styles.subtitle}>{t('topUp.selectAmount')}</Text>

      {/* =====================================================
          PRESET AMOUNTS
      ====================================================== */}

      <View style={styles.amountGrid}>
        {amounts.map(item => {
          const isSelected = selectedAmount === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.amountButton, isSelected && styles.selected]}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedAmount(item);

                setCustomAmount('');
              }}
            >
              <Text
                style={[styles.amountText, isSelected && styles.selectedText]}
              >
                {item} {t('common.currency')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* =====================================================
          CUSTOM AMOUNT
      ====================================================== */}

      <Text style={styles.section}>{t('topUp.customAmount')}</Text>

      <TextInput
        value={customAmount}
        onChangeText={text => {
          // Allow numbers and decimal point only
          const cleanedText = text.replace(/[^0-9.]/g, '');

          setCustomAmount(cleanedText);

          setSelectedAmount(0);
        }}
        keyboardType="decimal-pad"
        placeholder={t('topUp.enterAmount')}
        placeholderTextColor="#94A3B8"
        style={styles.input}
      />

      {/* =====================================================
          CONTINUE
      ====================================================== */}

      <TouchableOpacity
        style={[styles.button, amount <= 0 && styles.buttonDisabled]}
        disabled={amount <= 0}
        activeOpacity={0.85}
        onPress={() => {
          onContinue(amount);
        }}
      >
        <Text style={styles.buttonText}>{t('common.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,

    paddingHorizontal: 20,
  },

  // ==========================================================
  // TITLE
  // ==========================================================

  title: {
    fontSize: 20,

    fontWeight: '700',

    color: '#111827',
  },

  subtitle: {
    marginTop: 6,

    fontSize: 14,

    color: '#64748B',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  section: {
    marginTop: 24,

    marginBottom: 12,

    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },

  // ==========================================================
  // AMOUNT GRID
  // ==========================================================

  amountGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

    marginTop: 16,
  },

  amountButton: {
    width: '48%',

    height: 56,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 12,

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  selected: {
    backgroundColor: '#44C4CE',

    borderColor: '#44C4CE',
  },

  amountText: {
    fontSize: 17,

    fontWeight: '700',

    color: '#111827',
  },

  selectedText: {
    color: '#FFFFFF',
  },

  // ==========================================================
  // INPUT
  // ==========================================================

  input: {
    height: 56,

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 16,

    fontSize: 16,

    color: '#111827',

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  // ==========================================================
  // BUTTON
  // ==========================================================

  button: {
    height: 56,

    marginTop: 28,

    backgroundColor: '#44C4CE',

    borderRadius: 16,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 2,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 4,

    shadowOffset: {
      width: 0,

      height: 2,
    },
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',
  },
});
