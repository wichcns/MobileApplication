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
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

import apiClient from '../../api/client';
import { chargingSession } from '../../store/chargingStore';

export default function TaxInvoiceScreen() {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
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
      Alert.alert(
        t('taxInvoice.incompleteInformation'),
        t('taxInvoice.fillRequiredFields'),
      );

      return;
    }

    if (!chargingSession.sessionId) {
      Alert.alert('Error', 'Charging session information is unavailable.');
      return;
    }

    try {
      setIsSubmitting(true);
      const billingPayload = {
        name: companyName.trim(),
        taxId: taxId.trim(),
        phoneNumber: phone.trim(),
        email: email.trim(),
        address: {
          address: address.trim(),
          province: province.trim(),
          district: district.trim(),
          subDistrict: subDistrict.trim(),
          postalCode: postalCode.trim(),
        },
      };
      const billingResponse = await apiClient.get('/billing-informations/me');
      const existingBillingInformation = Array.isArray(billingResponse.data)
        ? billingResponse.data[0]
        : null;

      if (existingBillingInformation?.id) {
        await apiClient.put(
          `/billing-informations/${existingBillingInformation.id}`,
          billingPayload,
        );
      } else {
        await apiClient.post('/billing-informations', billingPayload);
      }

      await apiClient.post(
        `/charging-sessions/${chargingSession.sessionId}/generate-invoice`,
        { email: email.trim() },
      );
      Alert.alert(t('taxInvoice.success'), 'Your tax invoice has been sent to your email.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.log('[TaxInvoice] Request failed', {
        status: error?.response?.status,
        message: error?.response?.data?.message || error?.message,
      });
      Alert.alert('Error', 'Unable to request a tax invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  type SectionProps = {
    title: string;
    icon: string;
    children: React.ReactNode;
  };

  const Section = ({ title, icon, children }: SectionProps) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon as any} size={20} color="#44C4CE" />

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
        {/* =====================================================
          HEADER
      ====================================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              marginLeft: 15,
            }}
          >
            <Text style={styles.headerTitle}>{t('taxInvoice.title')}</Text>

            <Text style={styles.description}>
              {t('taxInvoice.description')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          TAXPAYER INFORMATION
      ====================================================== */}

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

        {/* =====================================================
          ADDRESS INFORMATION
      ====================================================== */}

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
            label={t('taxInvoice.subdistrict')}
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

        {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

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

        {/* =====================================================
          INFORMATION NOTICE
      ====================================================== */}

        <View style={styles.noticeBox}>
          <Ionicons name="shield-checkmark" size={26} color="#44C4CE" />

          <View
            style={{
              flex: 1,
              marginLeft: 12,
            }}
          >
            <Text style={styles.noticeTitle}>
              {t('taxInvoice.confidentialTitle')}
            </Text>

            <Text style={styles.noticeText}>
              {t('taxInvoice.confidentialDescription')}
            </Text>
          </View>
        </View>

        {/* =====================================================
          SUBMIT REQUEST
      ====================================================== */}

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={onSubmit}
          activeOpacity={0.85}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="paper-plane" color="#FFFFFF" size={18} />
              <Text style={styles.buttonText}>{t('taxInvoice.submitRequest')}</Text>
            </View>
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

    marginBottom: 6,
  },

  description: {
    fontSize: 14,

    color: '#64748B',

    lineHeight: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,

    fontWeight: '700',

    color: '#334155',

    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',

    borderRadius: 14,

    borderWidth: 1,

    borderColor: '#E2E8F0',

    paddingHorizontal: 18,

    height: 56,

    fontSize: 16,

    color: '#111827',
  },

  button: {
    marginTop: 25,

    height: 56,

    borderRadius: 28,

    backgroundColor: '#44C4CE',

    justifyContent: 'center',

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '800',

    marginLeft: 10,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  section: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 20,

    marginBottom: 20,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 10,

    elevation: 4,

    borderWidth: 1,

    borderColor: '#EEF2F7',
  },

  shadowOffset: {
    width: 0,

    height: 4,
  },

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: '700',

    color: '#111827',

    marginLeft: 10,
  },

  noticeBox: {
    flexDirection: 'row',

    backgroundColor: '#EAF9FA',

    borderRadius: 18,

    padding: 18,

    marginTop: 5,

    marginBottom: 25,
  },

  noticeTitle: {
    fontWeight: '700',

    color: '#24777D',
  },

  noticeText: {
    color: '#24777D',

    marginTop: 5,

    lineHeight: 20,
  },
});
