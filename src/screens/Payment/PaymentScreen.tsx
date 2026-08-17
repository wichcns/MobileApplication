import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

import { chargingSession, completePayment } from '../../store/chargingStore';

import { wallet, deductWallet } from '../../store/walletStore';

import { getAvailableCoupons, useCoupon } from '../../store/couponStore';

export default function PaymentScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  // ==========================================================
  // PAYMENT METHOD
  // ==========================================================

  const [paymentMethod, setPaymentMethod] = useState('');

  // ==========================================================
  // COUPON
  // ==========================================================

  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);

  const [showCouponModal, setShowCouponModal] = useState(false);

  // ==========================================================
  // AVAILABLE COUPONS
  // ==========================================================

  const availableCoupons = useMemo(() => {
    return getAvailableCoupons();
  }, [showCouponModal, selectedCouponId]);

  // ==========================================================
  // AMOUNT
  // ==========================================================

  const originalAmount = chargingSession.total;

  const selectedCoupon = availableCoupons.find(
    coupon => coupon.id === selectedCouponId,
  );

  // ==========================================================
  // CALCULATE DISCOUNT
  // ==========================================================

  const calculateDiscount = () => {
    if (!selectedCoupon) {
      return 0;
    }

    const discountText = selectedCoupon.discount.toLowerCase();

    // --------------------------------------------------------
    // PERCENTAGE DISCOUNT
    // Example: "10% OFF"
    // --------------------------------------------------------

    if (discountText.includes('%')) {
      const percent = parseFloat(discountText);

      if (isNaN(percent)) {
        return 0;
      }

      return Math.min(originalAmount * (percent / 100), originalAmount);
    }

    // --------------------------------------------------------
    // FIXED AMOUNT DISCOUNT
    // Example: "50 THB OFF"
    // --------------------------------------------------------

    const amount = parseFloat(discountText.replace(/[^0-9.]/g, ''));

    if (isNaN(amount)) {
      return 0;
    }

    return Math.min(amount, originalAmount);
  };

  const discountAmount = calculateDiscount();

  const finalAmount = Math.max(originalAmount - discountAmount, 0);

  // ==========================================================
  // SELECT COUPON
  // ==========================================================

  const handleSelectCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);

    setShowCouponModal(false);
  };

  // ==========================================================
  // REMOVE COUPON
  // ==========================================================

  const handleRemoveCoupon = () => {
    setSelectedCouponId(null);
  };

  // ==========================================================
  // CONFIRM PAYMENT
  // ==========================================================

  const confirmPayment = () => {
    // --------------------------------------------------------
    // CHECK PAYMENT METHOD
    // --------------------------------------------------------

    if (!paymentMethod) {
      Alert.alert(
        t('payment.paymentMethodRequired'),
        t('payment.selectPaymentMethodMessage'),
      );

      return;
    }

    // --------------------------------------------------------
    // WALLET PAYMENT
    // --------------------------------------------------------

    if (paymentMethod === 'Wallet') {
      console.log('Wallet Balance:', wallet.balance);

      console.log('Original Amount:', originalAmount);

      console.log('Discount:', discountAmount);

      console.log('Final Amount:', finalAmount);

      const success = deductWallet(chargingSession, finalAmount);

      if (!success) {
        Alert.alert(
          t('payment.paymentFailed'),
          t('payment.insufficientWalletBalance'),
        );
        return;
      }
    }

    // --------------------------------------------------------
    // CREDIT CARD
    // --------------------------------------------------------

    if (paymentMethod === 'Credit Card') {
      console.log('Credit Card Payment:', finalAmount);
    }

    // --------------------------------------------------------
    // USE COUPON
    //
    // IMPORTANT:
    // Coupon จะถูกเปลี่ยนเป็น "used"
    // หลังจาก Payment ผ่านเท่านั้น
    // --------------------------------------------------------

    if (selectedCouponId) {
      const couponUsed = useCoupon(selectedCouponId);

      if (!couponUsed) {
        Alert.alert(
          t('payment.couponError'),
          t('payment.couponCouldNotBeUsed'),
        );

        return;
      }
    }

    // --------------------------------------------------------
    // COMPLETE PAYMENT
    // --------------------------------------------------------

    completePayment(paymentMethod, finalAmount);

    // --------------------------------------------------------
    // GO TO RECEIPT
    // --------------------------------------------------------

    navigation.navigate('Receipt', {
      originalAmount,
      discountAmount,
      finalAmount,
      coupon: selectedCoupon
        ? {
            id: selectedCoupon.id,
            code: selectedCoupon.code,
            title: selectedCoupon.title,
            discount: selectedCoupon.discount,
          }
        : null,
      paymentMethod,
    });
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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

          <Text style={styles.title}>{t('payment.title')}</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* =====================================================
          PAYMENT SUMMARY
      ====================================================== */}

        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View style={styles.statusIcon}>
              <Ionicons name="card-outline" size={22} color="#00A651" />
            </View>

            <View>
              <Text style={styles.status}>{t('payment.paymentRequired')}</Text>

              <Text style={styles.statusSubtitle}>
                {t('payment.reviewPayment')}
              </Text>
            </View>
          </View>

          {/* ORIGINAL AMOUNT */}

          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>
              {t('payment.chargingAmount')}
            </Text>

            <Text style={styles.originalAmount}>
              {originalAmount.toFixed(2)} {t('common.currency')}
            </Text>
          </View>

          {/* =================================================
            COUPON
        ================================================== */}

          <Text style={styles.sectionTitle}>{t('payment.coupon')}</Text>

          <TouchableOpacity
            style={[
              styles.couponButton,
              selectedCoupon && styles.couponButtonSelected,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              if (availableCoupons.length === 0) {
                Alert.alert(
                  t('payment.noCoupons'),
                  t('payment.noAvailableCoupons'),
                );

                return;
              }

              setShowCouponModal(true);
            }}
          >
            <View style={styles.couponButtonLeft}>
              <View style={styles.couponIcon}>
                <Ionicons name="ticket-outline" size={22} color="#00A651" />
              </View>

              <View style={styles.couponButtonInfo}>
                <Text style={styles.couponButtonTitle}>
                  {selectedCoupon
                    ? selectedCoupon.title
                    : t('payment.selectCoupon')}
                </Text>

                <Text style={styles.couponButtonSubtitle}>
                  {selectedCoupon
                    ? `${selectedCoupon.discount} • ${selectedCoupon.code}`
                    : t('payment.couponsAvailable', {
                        count: availableCoupons.length,
                      })}
                </Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* REMOVE COUPON */}

          {selectedCoupon && (
            <TouchableOpacity
              style={styles.removeCouponButton}
              activeOpacity={0.7}
              onPress={handleRemoveCoupon}
            >
              <Ionicons name="close-circle-outline" size={16} color="#DC2626" />

              <Text style={styles.removeCouponText}>
                {t('payment.removeCoupon')}
              </Text>
            </TouchableOpacity>
          )}

          {/* =================================================
            PRICE BREAKDOWN
        ================================================== */}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{t('payment.originalAmount')}</Text>

            <Text style={styles.priceValue}>
              {originalAmount.toFixed(2)} {t('common.currency')}
            </Text>
          </View>

          {selectedCoupon && (
            <View style={styles.priceRow}>
              <View style={styles.discountLabelContainer}>
                <Text style={styles.priceLabel}>
                  {t('payment.couponDiscount')}
                </Text>

                <Text style={styles.couponCodeSmall}>
                  {selectedCoupon.code}
                </Text>
              </View>

              <Text style={styles.discountValue}>
                -{discountAmount.toFixed(2)} {t('common.currency')}
              </Text>
            </View>
          )}

          <View style={styles.totalDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('payment.totalPayment')}</Text>

            <Text style={styles.totalAmount}>
              {finalAmount.toFixed(2)} {t('common.currency')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          PAYMENT METHOD
      ====================================================== */}

        <View style={styles.paymentMethodSection}>
          <Text style={styles.sectionTitle}>
            {t('payment.selectPaymentMethod')}
          </Text>

          {/* WALLET */}

          <TouchableOpacity
            style={[
              styles.option,
              paymentMethod === 'Wallet' && styles.selected,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setPaymentMethod('Wallet');
            }}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Ionicons name="wallet-outline" size={23} color="#00A651" />
              </View>

              <View>
                <Text style={styles.optionText}>{t('payment.wallet')}</Text>

                <Text style={styles.optionSubtext}>
                  {t('payment.balance')}: {wallet.balance.toFixed(2)}{' '}
                  {t('common.currency')}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.radio,
                paymentMethod === 'Wallet' && styles.radioSelected,
              ]}
            >
              {paymentMethod === 'Wallet' && <View style={styles.radioDot} />}
            </View>
          </TouchableOpacity>

          {/* CREDIT CARD */}

          <TouchableOpacity
            style={[
              styles.option,
              paymentMethod === 'Credit Card' && styles.selected,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              setPaymentMethod('Credit Card');
            }}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Ionicons name="card-outline" size={23} color="#00A651" />
              </View>

              <View>
                <Text style={styles.optionText}>{t('payment.creditCard')}</Text>

                <Text style={styles.optionSubtext}>
                  {t('payment.paySecurelyWithCard')}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.radio,
                paymentMethod === 'Credit Card' && styles.radioSelected,
              ]}
            >
              {paymentMethod === 'Credit Card' && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* =====================================================
          INFO
      ====================================================== */}

        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#00A651"
          />

          <Text style={styles.infoText}>{t('payment.couponUsageInfo')}</Text>
        </View>
      </ScrollView>

      {/* =======================================================
        CONFIRM PAYMENT
    ======================================================== */}

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>{t('payment.total')}</Text>

          <Text style={styles.bottomAmount}>
            {finalAmount.toFixed(2)} {t('common.currency')}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !paymentMethod && styles.confirmButtonDisabled,
          ]}
          activeOpacity={0.85}
          onPress={confirmPayment}
        >
          <Text style={styles.confirmButtonText}>
            {t('payment.confirmPayment')}
          </Text>

          <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* =======================================================
        COUPON MODAL
    ======================================================== */}

      <Modal
        visible={showCouponModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowCouponModal(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* MODAL HEADER */}

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {t('payment.selectCoupon')}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {t('payment.chooseAvailableCoupon')}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.modalCloseButton}
                activeOpacity={0.7}
                onPress={() => {
                  setShowCouponModal(false);
                }}
              >
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>

            {/* COUPON LIST */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalList}
            >
              {availableCoupons.map(coupon => {
                const active = selectedCouponId === coupon.id;

                return (
                  <TouchableOpacity
                    key={coupon.id}
                    style={[
                      styles.modalCouponCard,
                      active && styles.modalCouponCardSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => {
                      handleSelectCoupon(coupon.id);
                    }}
                  >
                    <View style={styles.modalCouponIcon}>
                      <Ionicons
                        name="ticket-outline"
                        size={23}
                        color="#00A651"
                      />
                    </View>

                    <View style={styles.modalCouponContent}>
                      <Text style={styles.modalMerchant}>
                        {coupon.merchant}
                      </Text>

                      <Text style={styles.modalCouponTitle}>
                        {coupon.title}
                      </Text>

                      <Text style={styles.modalDiscount}>
                        {coupon.discount}
                      </Text>

                      <View style={styles.modalCodeRow}>
                        <Text style={styles.modalCodeLabel}>
                          {t('payment.code')}
                        </Text>

                        <Text style={styles.modalCode}>{coupon.code}</Text>
                      </View>

                      <Text style={styles.modalExpiry}>
                        {t('payment.expires')} {coupon.expiresAt}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.modalRadio,
                        active && styles.modalRadioSelected,
                      ]}
                    >
                      {active && (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* NO COUPONS */}

            {availableCoupons.length === 0 && (
              <View style={styles.modalEmpty}>
                <Ionicons name="ticket-outline" size={42} color="#CBD5E1" />

                <Text style={styles.modalEmptyTitle}>
                  {t('payment.noCouponsAvailable')}
                </Text>

                <Text style={styles.modalEmptyText}>
                  {t('payment.collectPromotionFirst')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 130,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },

  headerPlaceholder: {
    width: 42,
  },

  // ==========================================================
  // CARD
  // ==========================================================

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  status: {
    marginLeft: 11,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  statusSubtitle: {
    marginLeft: 11,
    marginTop: 3,
    fontSize: 11,
    color: '#64748B',
  },

  // ==========================================================
  // AMOUNT
  // ==========================================================

  amountRow: {
    marginTop: 22,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  amountLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  originalAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // SECTION
  // ==========================================================

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  // ==========================================================
  // COUPON
  // ==========================================================

  couponButton: {
    minHeight: 70,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  couponButtonSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#86EFAC',
  },

  couponButtonLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  couponIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  couponButtonInfo: {
    flex: 1,
    marginLeft: 10,
  },

  couponButtonTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },

  couponButtonSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: '#64748B',
  },

  removeCouponButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  removeCouponText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },

  // ==========================================================
  // PRICE
  // ==========================================================

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 18,
    marginBottom: 13,
  },

  priceRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  priceLabel: {
    fontSize: 12,
    color: '#64748B',
  },

  priceValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },

  discountLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  couponCodeSmall: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: '#ECFDF5',
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
  },

  discountValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
  },

  totalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 9,
    marginBottom: 9,
  },

  totalRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  totalAmount: {
    fontSize: 23,
    fontWeight: '900',
    color: '#00A651',
  },

  // ==========================================================
  // PAYMENT METHOD
  // ==========================================================

  paymentMethodSection: {
    marginTop: 5,
  },

  option: {
    minHeight: 72,
    marginBottom: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#16A34A',
  },

  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },

  optionSubtext: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 10,
    color: '#64748B',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioSelected: {
    borderColor: '#00A651',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00A651',
  },

  // ==========================================================
  // INFO
  // ==========================================================

  infoBox: {
    marginTop: 5,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#ECFDF5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 10,
    lineHeight: 16,
    color: '#166534',
  },

  // ==========================================================
  // BOTTOM BAR
  // ==========================================================

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 88,
    paddingHorizontal: 20,
    paddingVertical: 13,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomLabel: {
    fontSize: 10,
    color: '#64748B',
  },

  bottomAmount: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '900',
    color: '#00A651',
  },

  confirmButton: {
    minWidth: 175,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: '#00A651',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmButtonDisabled: {
    opacity: 0.55,
  },

  confirmButtonText: {
    marginRight: 7,
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ==========================================================
  // MODAL
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    maxHeight: '82%',
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  modalHeader: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111827',
  },

  modalSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: '#64748B',
  },

  modalCloseButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalList: {
    marginTop: 8,
  },

  modalCouponCard: {
    minHeight: 105,
    marginBottom: 10,
    padding: 13,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalCouponCardSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#16A34A',
  },

  modalCouponIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCouponContent: {
    flex: 1,
    marginLeft: 10,
  },

  modalMerchant: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00A651',
  },

  modalCouponTitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },

  modalDiscount: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '900',
    color: '#16A34A',
  },

  modalCodeRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalCodeLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94A3B8',
  },

  modalCode: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 1,
  },

  modalExpiry: {
    marginTop: 3,
    fontSize: 9,
    color: '#94A3B8',
  },

  modalRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  modalRadioSelected: {
    backgroundColor: '#00A651',
    borderColor: '#00A651',
  },

  modalEmpty: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  modalEmptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '800',
    color: '#334155',
  },

  modalEmptyText: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
