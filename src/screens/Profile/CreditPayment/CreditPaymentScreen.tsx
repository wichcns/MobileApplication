import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import apiClient from '../../../api/client';

type SavedCard = {
  id: string;
  brand: string;
  lastDigits: string;
  name: string;
  isDefault: boolean;
};

export default function CreditPaymentScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  // ==========================================================
  // CREDIT CARD
  // ==========================================================

  const [creditCards, setCreditCards] = useState<SavedCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<SavedCard[]>(
        '/payment/customers/cards',
      );
      setCreditCards(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setCreditCards([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [loadCards]),
  );

  // ==========================================================
  // ADD CARD
  // ==========================================================

  const handleAddCard = () => {
    navigation.navigate('AddCreditCard');
  };

  // ==========================================================
  // REMOVE CARD
  // ==========================================================

  const handleRemoveCard = (card: SavedCard) => {
    Alert.alert(
      t('creditPayment.removeCreditCard'),
      t('creditPayment.removeCreditCardMessage'),
      [
        {
          text: t('creditPayment.cancel'),
          style: 'cancel',
        },
        {
          text: t('creditPayment.remove'),
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await apiClient.delete<SavedCard[]>(
                `/payment/customers/cards/${card.id}?return_many=true`,
              );
              setCreditCards(
                Array.isArray(response.data) ? response.data : [],
              );
            } catch (error) {
              Alert.alert(
                t('creditPayment.error'),
                t('creditPayment.cannotRemoveCard'),
              );
            }
          },
        },
      ],
    );
  };

  const handleSetDefaultCard = async (card: SavedCard) => {
    if (card.isDefault) {
      Alert.alert(
        t('creditPayment.defaultCard'),
        t('creditPayment.defaultCardMessage'),
      );
      return;
    }

    try {
      const response = await apiClient.put<SavedCard[]>(
        `/payment/customers/cards/${card.id}?return_many=true`,
        { isDefault: true },
      );
      setCreditCards(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      Alert.alert(t('creditPayment.error'), t('creditPayment.cannotRemoveCard'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =====================================================
          HEADER
      ====================================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{t('creditPayment.title')}</Text>

            <Text style={styles.headerSubtitle}>
              {t('creditPayment.subtitle')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          SECTION TITLE
      ====================================================== */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {t('creditPayment.paymentMethods')}
            </Text>

            <Text style={styles.sectionSubtitle}>
              {t('creditPayment.savedCreditCards')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          NO CARD
      ====================================================== */}

        {isLoading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#16A34A" />
          </View>
        ) : creditCards.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="card-outline" size={38} color="#16A34A" />
            </View>

            <Text style={styles.emptyTitle}>
              {t('creditPayment.noCreditCard')}
            </Text>

            <Text style={styles.emptyDescription}>
              {t('creditPayment.noCreditCardDescription')}
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={handleAddCard}
            >
              <Ionicons name="add" size={21} color="#FFFFFF" />

              <Text style={styles.addButtonText}>
                {t('creditPayment.addCreditCard')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* =====================================================
          CREDIT CARD
      ====================================================== */}

        {creditCards.map(creditCard => (
          <View key={creditCard.id} style={styles.cardWrapper}>
            <View style={styles.creditCard}>
              {/* Card Header */}

              <View style={styles.creditCardHeader}>
                <View style={styles.cardBrandIcon}>
                  <Ionicons name="card" size={24} color="#FFFFFF" />
                </View>

                <Text style={styles.cardBrand}>{creditCard.brand}</Text>

                {creditCard.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>
                      {t('creditPayment.default')}
                    </Text>
                  </View>
                )}
              </View>

              {/* Card Number */}

              <Text style={styles.cardNumber}>
                •••• •••• •••• {creditCard.lastDigits}
              </Text>

              {/* Card Holder */}

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardLabel}>
                    {t('creditPayment.cardHolder')}
                  </Text>

                  <Text style={styles.cardHolder}>{creditCard.name || '-'}</Text>
                </View>

                <Ionicons name="shield-checkmark" size={25} color="#FFFFFF" />
              </View>
            </View>

            {/* Card Actions */}

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => handleSetDefaultCard(creditCard)}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="#16A34A"
                />

                <Text style={styles.actionText}>
                  {t('creditPayment.defaultCard')}
                </Text>
              </TouchableOpacity>

              <View style={styles.actionDivider} />

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => handleRemoveCard(creditCard)}
              >
                <Ionicons name="trash-outline" size={20} color="#DC2626" />

                <Text style={styles.removeText}>
                  {t('creditPayment.remove')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* =====================================================
          ADD ANOTHER CARD
      ====================================================== */}

        {!isLoading && creditCards.length > 0 && (
          <TouchableOpacity
            style={styles.addAnotherButton}
            activeOpacity={0.7}
            onPress={handleAddCard}
          >
            <View style={styles.addAnotherIcon}>
              <Ionicons name="add" size={22} color="#16A34A" />
            </View>

            <View style={styles.addAnotherContent}>
              <Text style={styles.addAnotherTitle}>
                {t('creditPayment.addAnotherCreditCard')}
              </Text>

              <Text style={styles.addAnotherSubtitle}>
                {t('creditPayment.addAnotherCreditCardDescription')}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}

        {/* =====================================================
          SECURITY
      ====================================================== */}

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color="#16A34A"
            />
          </View>

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>
              {t('creditPayment.securityTitle')}
            </Text>

            <Text style={styles.securityText}>
              {t('creditPayment.securityDescription')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ==========================================================
  // CONTAINER
  // ==========================================================

  container: {
    flex: 1,

    backgroundColor: '#F3F7F6',
  },

  content: {
    padding: 20,

    paddingBottom: 40,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 28,
  },

  backButton: {
    width: 44,

    height: 44,

    borderRadius: 22,

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

  headerTitle: {
    fontSize: 24,

    fontWeight: '800',

    color: '#111827',
  },

  headerSubtitle: {
    marginTop: 4,

    fontSize: 13,

    color: '#64748B',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  sectionHeader: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  sectionSubtitle: {
    marginTop: 4,

    fontSize: 13,

    color: '#64748B',
  },

  // ==========================================================
  // EMPTY
  // ==========================================================

  emptyCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    paddingHorizontal: 25,

    paddingVertical: 35,

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#E8F0EE',
  },

  loadingCard: {
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyIcon: {
    width: 76,

    height: 76,

    borderRadius: 38,

    backgroundColor: '#ECFDF5',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 18,

    fontWeight: '800',

    color: '#111827',
  },

  emptyDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    color: '#64748B',

    textAlign: 'center',

    maxWidth: 300,
  },

  addButton: {
    height: 50,

    marginTop: 22,

    paddingHorizontal: 25,

    borderRadius: 25,

    backgroundColor: '#16A34A',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  addButtonText: {
    marginLeft: 8,

    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: '800',
  },

  // ==========================================================
  // CREDIT CARD
  // ==========================================================

  cardWrapper: {
    marginBottom: 15,
  },

  creditCard: {
    minHeight: 205,

    borderRadius: 22,

    backgroundColor: '#111827',

    padding: 22,

    justifyContent: 'space-between',

    elevation: 5,
  },

  creditCardHeader: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  cardBrandIcon: {
    width: 42,

    height: 42,

    borderRadius: 12,

    backgroundColor: '#16A34A',

    justifyContent: 'center',

    alignItems: 'center',
  },

  cardBrand: {
    marginLeft: 10,

    fontSize: 18,

    fontWeight: '800',

    color: '#FFFFFF',
  },

  defaultBadge: {
    marginLeft: 'auto',

    paddingHorizontal: 9,

    paddingVertical: 5,

    borderRadius: 8,

    backgroundColor: '#DCFCE7',
  },

  defaultBadgeText: {
    fontSize: 9,

    fontWeight: '900',

    color: '#166534',
  },

  cardNumber: {
    marginTop: 30,

    fontSize: 21,

    letterSpacing: 2,

    fontWeight: '700',

    color: '#FFFFFF',
  },

  cardFooter: {
    marginTop: 22,

    flexDirection: 'row',

    alignItems: 'flex-end',

    justifyContent: 'space-between',
  },

  cardLabel: {
    fontSize: 9,

    color: '#94A3B8',

    fontWeight: '700',
  },

  cardHolder: {
    marginTop: 4,

    fontSize: 14,

    color: '#FFFFFF',

    fontWeight: '700',
  },

  // ==========================================================
  // CARD ACTIONS
  // ==========================================================

  cardActions: {
    height: 58,

    backgroundColor: '#FFFFFF',

    borderBottomLeftRadius: 18,

    borderBottomRightRadius: 18,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 10,

    borderWidth: 1,

    borderTopWidth: 0,

    borderColor: '#E2E8F0',
  },

  actionButton: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  actionText: {
    marginLeft: 7,

    fontSize: 13,

    fontWeight: '700',

    color: '#16A34A',
  },

  removeText: {
    marginLeft: 7,

    fontSize: 13,

    fontWeight: '700',

    color: '#DC2626',
  },

  actionDivider: {
    width: 1,

    height: 25,

    backgroundColor: '#E2E8F0',
  },

  // ==========================================================
  // ADD ANOTHER
  // ==========================================================

  addAnotherButton: {
    minHeight: 70,

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    paddingHorizontal: 15,

    flexDirection: 'row',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: '#E2E8F0',
  },

  addAnotherIcon: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: '#ECFDF5',

    justifyContent: 'center',

    alignItems: 'center',
  },

  addAnotherContent: {
    flex: 1,

    marginLeft: 12,
  },

  addAnotherTitle: {
    fontSize: 14,

    fontWeight: '800',

    color: '#111827',
  },

  addAnotherSubtitle: {
    marginTop: 3,

    fontSize: 12,

    color: '#64748B',
  },

  // ==========================================================
  // SECURITY
  // ==========================================================

  securityCard: {
    marginTop: 20,

    padding: 16,

    borderRadius: 18,

    backgroundColor: '#ECFDF5',

    flexDirection: 'row',
  },

  securityIcon: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',

    alignItems: 'center',
  },

  securityContent: {
    flex: 1,

    marginLeft: 12,
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
});
