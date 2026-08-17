import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  updateTaxInvoice,
  submitTaxInvoice,
} from '../../store/taxInvoiceStore';

export default function TaxInvoiceRequest() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const { history } = route.params;

  const [companyName, setCompanyName] = useState('');

  const [taxId, setTaxId] = useState('');

  const [address, setAddress] = useState('');

  const [province, setProvince] = useState('');

  const [district, setDistrict] = useState('');

  const [subDistrict, setSubDistrict] = useState('');

  const [postalCode, setPostalCode] = useState('');

  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');

  const onSubmit = () => {
    if (
      !companyName ||
      !taxId ||
      !address ||
      !province ||
      !district ||
      !subDistrict ||
      !postalCode ||
      !phone ||
      !email
    ) {
      Alert.alert('Incomplete Information', 'Please complete all information.');

      return;
    }

    updateTaxInvoice({
      companyName,

      taxId,

      address,

      province,

      district,

      subDistrict,

      postalCode,

      phone,

      email,
    });

    submitTaxInvoice();

    Alert.alert('Success', 'Tax invoice request submitted.');

    navigation.goBack();
  };

  const Input = ({
    label,
    value,
    onChangeText,
    keyboardType = 'default',
  }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={label}
        placeholderTextColor="#94A3B8"
      />
    </View>
  );

  const Section = ({ title, icon, children }: any) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={22} color="#16A34A" />

        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {children}
    </View>
  );

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

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.headerTitle}>{t('taxInvoice.title')}</Text>

            <Text style={styles.description}>
              {t('taxInvoice.description')}
            </Text>
          </View>
        </View>

        {/* CHARGING INFO */}

        <Section
          title={t('taxInvoice.chargingInformation')}
          icon="flash-outline"
        >
          <View style={styles.receiptBox}>
            <Text style={styles.stationName}>{history.stationName}</Text>

            <Text style={styles.receiptText}>
              {t('taxInvoice.receiptNo')}:{history.receiptNumber ?? 'AUTO'}
            </Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>{t('taxInvoice.energy')}</Text>

              <Text style={styles.rowValue}>{history.energy} kWh</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>{t('taxInvoice.duration')}</Text>

              <Text style={styles.rowValue}>
                {history.duration} {t('common.minutes')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>{t('taxInvoice.totalPaid')}</Text>

              <Text style={styles.total}>฿{history.total}</Text>
            </View>
          </View>
        </Section>

        {/* TAXPAYER INFORMATION */}

        <Section
          title={t('taxInvoice.taxpayerInformation')}
          icon="person-circle-outline"
        >
          <Input
            label={t('taxInvoice.companyName')}
            value={companyName}
            onChangeText={setCompanyName}
          />

          <Input
            label={t('taxInvoice.taxId')}
            value={taxId}
            onChangeText={setTaxId}
            keyboardType="number-pad"
          />
        </Section>

        {/* ADDRESS INFORMATION */}

        <Section
          title={t('taxInvoice.addressInformation')}
          icon="location-outline"
        >
          <Input
            label={t('taxInvoice.address')}
            value={address}
            onChangeText={setAddress}
          />

          <Input
            label={t('taxInvoice.province')}
            value={province}
            onChangeText={setProvince}
          />

          <Input
            label={t('taxInvoice.district')}
            value={district}
            onChangeText={setDistrict}
          />

          <Input
            label={t('taxInvoice.subDistrict')}
            value={subDistrict}
            onChangeText={setSubDistrict}
          />

          <Input
            label={t('taxInvoice.postalCode')}
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="number-pad"
          />
        </Section>

        {/* CONTACT INFORMATION */}

        <Section title={t('taxInvoice.contactInformation')} icon="call-outline">
          <Input
            label={t('taxInvoice.phoneNumber')}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Input
            label={t('taxInvoice.emailAddress')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </Section>

        {/* INFORMATION SECURITY */}

        <View style={styles.noticeBox}>
          <Ionicons name="shield-checkmark" size={26} color="#16A34A" />

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.noticeTitle}>
              {t('taxInvoice.informationSecurity')}
            </Text>

            <Text style={styles.noticeText}>
              {t('taxInvoice.securityDescription')}
            </Text>
          </View>
        </View>

        {/* SUBMIT */}

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Ionicons name="paper-plane" size={18} color="#FFFFFF" />

          <Text style={styles.buttonText}>{t('taxInvoice.submitRequest')}</Text>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },

  description: {
    marginTop: 5,
    color: '#64748B',
    fontSize: 14,
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    color: '#111827',
  },

  receiptBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 15,
  },

  stationName: {
    fontSize: 18,
    fontWeight: '800',
  },

  receiptText: {
    color: '#64748B',
    marginTop: 5,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  rowLabel: {
    color: '#64748B',
  },

  rowValue: {
    fontWeight: '700',
  },

  total: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16A34A',
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontWeight: '700',
    fontSize: 15,
    color: '#334155',
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },

  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    padding: 18,
    borderRadius: 18,
    marginBottom: 25,
  },

  noticeTitle: {
    fontWeight: '700',
    color: '#166534',
  },

  noticeText: {
    marginTop: 5,
    color: '#166534',
  },

  button: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
