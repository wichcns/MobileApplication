import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { preAuthorizeChargingCard, setChargingPaymentMethod, startChargingSessionOnServer } from '../../services/charging/chargingSessionApi';

type SavedCard = { id: string; brand?: string; lastDigits?: string; isDefault?: boolean };
type Method = 'CREDIT' | 'CREDIT_CARD';

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const sessionId = route.params?.sessionId as string | undefined;
  const [method, setMethod] = useState<Method>('CREDIT');
  const [balance, setBalance] = useState<number | null>(null);
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [cardId, setCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { (async () => {
    try {
      const [walletResult, cardResult] = await Promise.all([apiClient.get(ENDPOINTS.walletBalance), apiClient.get('/payment/customers/cards')]);
      const raw = walletResult.data?.balance ?? walletResult.data?.wallet?.balance ?? 0;
      // Credit balance from the production wallet API is stored in satang.
      setBalance(Number(raw) / 100);
      const list = Array.isArray(cardResult.data) ? cardResult.data : cardResult.data?.data ?? [];
      setCards(list); setCardId(list.find((card: SavedCard) => card.isDefault)?.id ?? list[0]?.id ?? null);
    } catch (error: any) {
      Alert.alert('ไม่สามารถโหลดวิธีชำระเงินได้', error?.response?.data?.message ?? error?.message);
    } finally { setLoading(false); }
  })(); }, []);

  const start = async () => {
    if (!sessionId || submitting) return;
    if (method === 'CREDIT_CARD' && !cardId) { Alert.alert('กรุณาเลือกบัตรเครดิต', 'เพิ่มบัตรเครดิตก่อนเริ่มชาร์จ'); return; }
    setSubmitting(true);
    try {
      if (method === 'CREDIT') await setChargingPaymentMethod(sessionId, 'CREDIT');
      else {
        const result = await preAuthorizeChargingCard(sessionId, cardId!);
        if (result?.authorizeUri && result.authorizeUri !== '/') {
          await Linking.openURL(result.authorizeUri);
          Alert.alert('ยืนยันบัตรเครดิต', 'ยืนยันกับธนาคารให้เสร็จ แล้วกลับมายังแอปเพื่อเริ่มชาร์จ');
          return;
        }
      }
      await startChargingSessionOnServer(sessionId);
      navigation.replace('Charging', { sessionId });
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.response?.data?.error?.message ?? error?.message;
      console.log('[ChargingPayment] Setup failed', { sessionId, status: error?.response?.status, message });
      Alert.alert('ไม่สามารถเริ่มชาร์จได้', message ?? 'กรุณาลองใหม่');
    } finally { setSubmitting(false); }
  };

  return <SafeAreaView style={s.page}>
    <View style={s.header}><TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#111827" /></TouchableOpacity><Text style={s.title}>วิธีชำระเงิน</Text><View style={{ width: 24 }} /></View>
    {loading ? <ActivityIndicator size="large" color="#44C4CE" style={{ flex: 1 }} /> : <ScrollView contentContainerStyle={s.content}>
      <Text style={s.hint}>เลือกวิธีชำระเงินก่อนเริ่มชาร์จ</Text>
      <TouchableOpacity style={[s.option, method === 'CREDIT' && s.selected]} onPress={() => setMethod('CREDIT')}><Ionicons name="wallet-outline" size={25} color="#44C4CE" /><View style={s.optionText}><Text style={s.name}>Wallet</Text><Text style={s.sub}>ยอดคงเหลือ {balance?.toFixed(2) ?? '-'} บาท</Text></View>{method === 'CREDIT' && <Ionicons name="checkmark-circle" size={24} color="#44C4CE" />}</TouchableOpacity>
      <TouchableOpacity style={[s.option, method === 'CREDIT_CARD' && s.selected]} onPress={() => setMethod('CREDIT_CARD')}><Ionicons name="card-outline" size={25} color="#44C4CE" /><View style={s.optionText}><Text style={s.name}>Credit Card</Text><Text style={s.sub}>กันวงเงินก่อนเริ่มชาร์จ</Text></View>{method === 'CREDIT_CARD' && <Ionicons name="checkmark-circle" size={24} color="#44C4CE" />}</TouchableOpacity>
      {method === 'CREDIT_CARD' && cards.map(card => <TouchableOpacity key={card.id} style={[s.card, cardId === card.id && s.selected]} onPress={() => setCardId(card.id)}><Text style={s.name}>{card.brand ?? 'Card'} •••• {card.lastDigits ?? ''}</Text>{cardId === card.id && <Ionicons name="checkmark" size={20} color="#44C4CE" />}</TouchableOpacity>)}
      {method === 'CREDIT_CARD' && cards.length === 0 && <Text style={s.warning}>ยังไม่มีบัตรที่บันทึกไว้ กรุณาเพิ่มบัตรใน Profile</Text>}
    </ScrollView>}
    <TouchableOpacity style={[s.button, (loading || submitting) && s.disabled]} disabled={loading || submitting} onPress={start}><Text style={s.buttonText}>{submitting ? 'กำลังดำเนินการ...' : 'ยืนยันและเริ่มชาร์จ'}</Text></TouchableOpacity>
  </SafeAreaView>;
}

const s = StyleSheet.create({ page:{flex:1,backgroundColor:'#F8FAFC'},header:{padding:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},title:{fontSize:18,fontWeight:'800',color:'#111827'},content:{padding:20},hint:{color:'#64748B',marginBottom:18},option:{backgroundColor:'#FFF',borderRadius:16,padding:18,flexDirection:'row',alignItems:'center',marginBottom:12,borderWidth:1,borderColor:'#E2E8F0'},selected:{borderColor:'#44C4CE',borderWidth:2},optionText:{flex:1,marginLeft:14},name:{color:'#111827',fontWeight:'800',fontSize:16},sub:{color:'#64748B',marginTop:3},card:{backgroundColor:'#FFF',marginLeft:12,marginBottom:8,borderRadius:12,padding:16,flexDirection:'row',justifyContent:'space-between',borderWidth:1,borderColor:'#E2E8F0'},warning:{color:'#B45309',marginTop:8},button:{backgroundColor:'#44C4CE',margin:20,height:54,borderRadius:16,justifyContent:'center',alignItems:'center'},disabled:{opacity:.6},buttonText:{color:'#FFF',fontWeight:'800',fontSize:16} });
