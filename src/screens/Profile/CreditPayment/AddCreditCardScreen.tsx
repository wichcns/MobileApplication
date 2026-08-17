import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

export default function AddCreditCardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    if (!cardName.trim()) {
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCardholderName'),
      );
      return;
    }

    if (!cardNumber.trim()) {
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCardNumber'),
      );
      return;
    }

    if (!expiryDate.trim()) {
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterExpiryDate'),
      );
      return;
    }

    if (!cvv.trim()) {
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCvv'),
      );
      return;
    }

    console.log('ADD CREDIT CARD', {
      cardName,
      cardNumber,
      expiryDate,
      cvv,
    });

    Alert.alert(t('addCreditCard.success'), t('addCreditCard.successMessage'), [
      {
        text: t('addCreditCard.ok'),
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>{t('addCreditCard.title')}</Text>

            <Text style={styles.subtitle}>{t('addCreditCard.subtitle')}</Text>
          </View>
        </View>

        {/* CARD PREVIEW */}

        <View style={styles.cardPreview}>
          <View style={styles.cardTop}>
            <Text style={styles.cardBrand}>{t('addCreditCard.cardBrand')}</Text>

            <Ionicons name="card-outline" size={30} color="#FFFFFF" />
          </View>

          <Text style={styles.cardNumber}>
            {cardNumber
              ? cardNumber
                  .replace(/\s/g, '')
                  .replace(/(.{4})/g, '$1 ')
                  .trim()
              : '•••• •••• •••• ••••'}
          </Text>

          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>
                {t('addCreditCard.cardholder')}
              </Text>

              <Text style={styles.cardValue}>
                {cardName || t('addCreditCard.yourName')}
              </Text>
            </View>

            <View>
              <Text style={styles.cardLabel}>{t('addCreditCard.expires')}</Text>

              <Text style={styles.cardValue}>
                {expiryDate || t('addCreditCard.expiryDatePlaceholder')}
              </Text>
            </View>
          </View>
        </View>

        {/* FORM */}

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>
            {t('addCreditCard.cardInformation')}
          </Text>

          {/* Cardholder Name */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {t('addCreditCard.cardholderName')}
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={cardName}
                onChangeText={setCardName}
                placeholder={t('addCreditCard.cardholderNamePlaceholder')}
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Card Number */}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t('addCreditCard.cardNumber')}</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="card-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={text => {
                  const cleaned = text.replace(/\D/g, '');

                  const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();

                  setCardNumber(formatted);
                }}
                placeholder={t('addCreditCard.cardNumberPlaceholder')}
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                maxLength={19}
              />
            </View>
          </View>

          {/* Expiry + CVV */}

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.half]}>
              <Text style={styles.label}>{t('addCreditCard.expiryDate')}</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={20} color="#64748B" />

                <TextInput
                  style={styles.input}
                  value={expiryDate}
                  onChangeText={text => {
                    let cleaned = text.replace(/\D/g, '');

                    if (cleaned.length > 2) {
                      cleaned =
                        cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
                    }

                    setExpiryDate(cleaned);
                  }}
                  placeholder={t('addCreditCard.expiryDatePlaceholder')}
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.half]}>
              <Text style={styles.label}>{t('addCreditCard.cvv')}</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={text => setCvv(text.replace(/\D/g, ''))}
                  placeholder={t('addCreditCard.cvvPlaceholder')}
                  placeholderTextColor="#94A3B8"
                  keyboardType="number-pad"
                  secureTextEntry
                  maxLength={4}
                />
              </View>
            </View>
          </View>
        </View>

        {/* SECURITY */}

        <View style={styles.securityBox}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#16A34A" />

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>
              {t('addCreditCard.securityTitle')}
            </Text>

            <Text style={styles.securityText}>
              {t('addCreditCard.securityDescription')}
            </Text>
          </View>
        </View>

        {/* ADD BUTTON */}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCard}
          activeOpacity={0.8}
        >
          <Ionicons name="card-outline" size={21} color="#FFFFFF" />

          <Text style={styles.addButtonText}>
            {t('addCreditCard.addButton')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // HEADER

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },

  // CARD PREVIEW

  cardPreview: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 22,
    minHeight: 190,
    marginBottom: 20,
    elevation: 5,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardBrand: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  cardNumber: {
    marginTop: 35,
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
  },

  cardBottom: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700',
  },

  cardValue: {
    marginTop: 3,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // FORM

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  inputWrapper: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  half: {
    flex: 1,
  },

  // SECURITY

  securityBox: {
    marginTop: 18,
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 15,
  },

  securityContent: {
    flex: 1,
    marginLeft: 10,
  },

  securityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#166534',
  },

  securityText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: '#166534',
  },

  // BUTTON

  addButton: {
    height: 56,
    marginTop: 22,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    marginLeft: 9,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
