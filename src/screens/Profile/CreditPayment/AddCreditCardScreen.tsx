import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { OMISE_PUBLIC_KEY } from '@env';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import apiClient from '../../../api/client';

const encodeBase64 = (value: string) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let index = 0;

  while (index < value.length) {
    const first = value.charCodeAt(index++);
    const second = value.charCodeAt(index++);
    const third = value.charCodeAt(index++);

    output += chars.charAt(first >> 2);
    output += chars.charAt(((first & 3) << 4) | (second >> 4));
    output += Number.isNaN(second)
      ? '='
      : chars.charAt(((second & 15) << 2) | (third >> 6));
    output += Number.isNaN(third) ? '=' : chars.charAt(third & 63);
  }

  return output;
};

const isValidCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

const getCardBrand = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';
  if (/^35/.test(digits)) return 'JCB';
  if (/^(30[0-5]|36|38)/.test(digits)) return 'Diners Club';
  if (/^62/.test(digits)) return 'UnionPay';

  return null;
};

export default function AddCreditCardScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cardBrand = getCardBrand(cardNumber);

  const handleAddCard = async () => {
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');
    console.log('[CreditCard] Save requested', {
      hasCardholderName: Boolean(cardName.trim()),
      brand: cardBrand || 'Unknown',
      cardNumberLength: cleanedCardNumber.length,
      last4: cleanedCardNumber.slice(-4),
      hasExpiryDate: Boolean(expiryDate.trim()),
      cvvLength: cvv.length,
    });

    if (!cardName.trim()) {
      console.warn('[CreditCard] Validation failed: missing cardholder name');
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCardholderName'),
      );
      return;
    }

    if (!isValidCardNumber(cleanedCardNumber)) {
      console.warn('[CreditCard] Validation failed: invalid card number');
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCardNumber'),
      );
      return;
    }

    const [monthText, yearText] = expiryDate.split('/');
    const month = Number(monthText);
    const year = Number(`20${yearText}`);
    const isExpired =
      !month ||
      month > 12 ||
      !year ||
      new Date(year, month, 0, 23, 59, 59) < new Date();

    if (isExpired) {
      console.warn('[CreditCard] Validation failed: invalid or expired date');
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterExpiryDate'),
      );
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      console.warn('[CreditCard] Validation failed: invalid CVV length');
      Alert.alert(
        t('addCreditCard.incompleteInformation'),
        t('addCreditCard.enterCvv'),
      );
      return;
    }

    if (!OMISE_PUBLIC_KEY) {
      console.error('[CreditCard] OMISE_PUBLIC_KEY is not configured');
      Alert.alert(t('creditPayment.error'), t('creditPayment.cannotRemoveCard'));
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('[CreditCard] Requesting Omise token');
      const body = [
        ['card[name]', cardName.trim()],
        ['card[number]', cleanedCardNumber],
        ['card[expiration_month]', String(month)],
        ['card[expiration_year]', String(year)],
        ['card[security_code]', cvv],
      ]
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&');

      const tokenResponse = await fetch('https://vault.omise.co/tokens', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodeBase64(`${OMISE_PUBLIC_KEY}:`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
      const token = await tokenResponse.json();
      console.log('[CreditCard] Omise token response', {
        status: tokenResponse.status,
        receivedToken: Boolean(token?.id),
      });
      if (!tokenResponse.ok || !token?.id) {
        throw new Error('Unable to tokenize card');
      }

      console.log('[CreditCard] Saving token to payment API');
      const saveResponse = await apiClient.post(
        '/payment/customers/cards?return_many=true',
        {
          token: token.id,
          isDefault: false,
        },
      );
      console.log('[CreditCard] Card saved', {
        status: saveResponse.status,
        savedCardCount: Array.isArray(saveResponse.data)
          ? saveResponse.data.length
          : undefined,
      });

      setCardNumber('');
      setCvv('');
      Alert.alert(t('addCreditCard.success'), t('addCreditCard.successMessage'), [
        { text: t('addCreditCard.ok'), onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      const apiError = error as {
        message?: string;
        response?: {
          status?: number;
          data?: {
            message?: string | string[];
            error?: { message?: string };
          } | string;
        };
      };
      const responseData = apiError?.response?.data;
      const serverMessage =
        typeof responseData === 'string'
          ? responseData
          : responseData?.message || responseData?.error?.message;
      console.error('[CreditCard] Save failed', {
        message: apiError?.message || 'Unknown error',
        status: apiError?.response?.status,
        serverMessage,
      });
      Alert.alert(t('creditPayment.error'), t('creditPayment.cannotRemoveCard'));
    } finally {
      setIsSubmitting(false);
    }
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
            <Text style={styles.cardBrand}>
              {cardBrand || t('addCreditCard.cardBrand')}
            </Text>

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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="card-outline" size={21} color="#FFFFFF" />
              <Text style={styles.addButtonText}>
                {t('addCreditCard.addButton')}
              </Text>
            </>
          )}
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
