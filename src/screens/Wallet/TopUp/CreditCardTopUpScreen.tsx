import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import apiClient from '../../../api/client';
import { topUpWallet } from '../../../api/wallet.api';

type SavedCard = {
  id: string;
  brand: string;
  lastDigits: string;
  name: string;
  isDefault: boolean;
};

export default function CreditCardTopUpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const amount = Number(route.params?.amount ?? 0);

  const [cards, setCards] = useState<SavedCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCards = useCallback(async () => {
    try {
      setIsLoadingCards(true);
      const response = await apiClient.get<SavedCard[]>(
        '/payment/customers/cards',
      );
      const savedCards = Array.isArray(response.data) ? response.data : [];
      setCards(savedCards);
      setSelectedCardId(
        savedCards.find(card => card.isDefault)?.id ?? savedCards[0]?.id ?? null,
      );
    } catch {
      setCards([]);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดบัตรที่บันทึกไว้ได้');
    } finally {
      setIsLoadingCards(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [loadCards]),
  );

  const handleTopUp = async () => {
    const selectedCard = cards.find(card => card.id === selectedCardId);
    if (!selectedCard || amount < 20) {
      Alert.alert(
        'ไม่สามารถทำรายการได้',
        'กรุณาเลือกบัตรและระบุยอดเติมเงินอย่างน้อย 20 บาท',
      );
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('[CreditTopUp] Creating credit-card top-up', {
        amount,
        cardId: selectedCard.id,
        last4: selectedCard.lastDigits,
      });

      const response = await topUpWallet({
        amount,
        method: 'CREDIT_CARD',
        card: selectedCard.id,
        isSaveCard: true,
        isExistingCard: true,
      });
      const authorizeUri = response?.omiseCharge?.authorizeUri;

      console.log('[CreditTopUp] Top-up intent created', {
        hasAuthorizeUri: Boolean(authorizeUri),
      });

      if (authorizeUri) {
        const canOpenAuthorization = await Linking.canOpenURL(authorizeUri);
        if (!canOpenAuthorization) {
          throw new Error('Unable to open card authorization');
        }
        await Linking.openURL(authorizeUri);
      }

      Alert.alert(
        'สร้างรายการเติมเงินแล้ว',
        authorizeUri
          ? 'กรุณายืนยันการชำระเงินในหน้าต่างธนาคาร เมื่อสำเร็จยอด Wallet จะอัปเดตอัตโนมัติ'
          : 'กำลังรอการยืนยันจากผู้ให้บริการชำระเงิน ยอด Wallet จะอัปเดตอัตโนมัติเมื่อสำเร็จ',
        [
          {
            text: 'ตกลง',
            onPress: () => navigation.navigate('WalletHome'),
          },
        ],
      );
    } catch (error: any) {
      console.error('[CreditTopUp] Failed', {
        message: error?.message,
        status: error?.response?.status,
        serverMessage: error?.response?.data?.message,
      });
      Alert.alert(
        'เติมเงินไม่สำเร็จ',
        error?.response?.data?.message ||
          'ไม่สามารถสร้างรายการเติมเงินผ่านบัตรได้',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>เติมเงินด้วยบัตรเครดิต</Text>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>ยอดเติมเงิน</Text>
          <Text style={styles.amount}>฿{amount.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>เลือกบัตรที่บันทึกไว้</Text>

        {isLoadingCards ? (
          <ActivityIndicator style={styles.loader} size="large" color="#44C4CE" />
        ) : cards.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="card-outline" size={38} color="#44C4CE" />
            <Text style={styles.emptyTitle}>ยังไม่มีบัตรที่บันทึกไว้</Text>
            <TouchableOpacity
              style={styles.addCardButton}
              onPress={() => navigation.navigate('Profile', { screen: 'CreditPayment' })}
            >
              <Text style={styles.addCardText}>เพิ่มบัตรเครดิต</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cards.map(card => {
            const isSelected = card.id === selectedCardId;
            return (
              <TouchableOpacity
                key={card.id}
                style={[styles.card, isSelected && styles.selectedCard]}
                onPress={() => setSelectedCardId(card.id)}
              >
                <Ionicons
                  name="card-outline"
                  size={28}
                  color={isSelected ? '#FFFFFF' : '#44C4CE'}
                />
                <View style={styles.cardContent}>
                  <Text style={[styles.cardBrand, isSelected && styles.selectedText]}>
                    {card.brand}
                  </Text>
                  <Text style={[styles.cardNumber, isSelected && styles.selectedText]}>
                    •••• {card.lastDigits}
                  </Text>
                </View>
                {card.isDefault && (
                  <Text style={[styles.defaultText, isSelected && styles.selectedText]}>
                    ค่าเริ่มต้น
                  </Text>
                )}
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            );
          })
        )}

        <TouchableOpacity
          disabled={isLoadingCards || !selectedCardId || isSubmitting}
          style={[
            styles.confirmButton,
            (isLoadingCards || !selectedCardId || isSubmitting) && styles.disabledButton,
          ]}
          onPress={handleTopUp}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.confirmText}>ยืนยันการเติมเงิน</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  title: { marginLeft: 16, fontSize: 20, fontWeight: '800', color: '#111827' },
  amountCard: { backgroundColor: '#EAF9FA', borderRadius: 18, padding: 20 },
  amountLabel: { color: '#24777D', fontSize: 14, fontWeight: '600' },
  amount: { marginTop: 6, color: '#2E929A', fontSize: 32, fontWeight: '900' },
  sectionTitle: { marginTop: 28, marginBottom: 8, fontSize: 17, fontWeight: '800', color: '#111827' },
  loader: { marginTop: 36 },
  emptyCard: { marginTop: 8, padding: 28, alignItems: 'center', borderRadius: 18, backgroundColor: '#FFFFFF' },
  emptyTitle: { marginTop: 12, fontSize: 16, fontWeight: '700', color: '#111827' },
  addCardButton: { marginTop: 18, paddingHorizontal: 18, paddingVertical: 11, borderRadius: 16, backgroundColor: '#44C4CE' },
  addCardText: { color: '#FFFFFF', fontWeight: '800' },
  card: { marginTop: 12, padding: 16, borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center' },
  selectedCard: { backgroundColor: '#44C4CE', borderColor: '#44C4CE' },
  cardContent: { flex: 1, marginLeft: 14 },
  cardBrand: { fontSize: 15, fontWeight: '800', color: '#111827' },
  cardNumber: { marginTop: 4, fontSize: 13, color: '#64748B' },
  defaultText: { marginRight: 10, fontSize: 11, fontWeight: '700', color: '#2E929A' },
  selectedText: { color: '#FFFFFF' },
  confirmButton: { height: 56, marginTop: 32, borderRadius: 18, backgroundColor: '#44C4CE', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  disabledButton: { opacity: 0.45 },
  confirmText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
});
