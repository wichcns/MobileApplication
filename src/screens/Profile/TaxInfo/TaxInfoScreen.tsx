import React, { useEffect, useState } from 'react';

import {
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

import { user } from '../../../store/userStore';
import apiClient from '../../../api/client';

type TaxType = 'individual' | 'company';

export default function TaxInfoScreen() {
  const navigation = useNavigation<any>();

  const [taxType, setTaxType] = useState<TaxType>('individual');

  const [name, setName] = useState(user.name ?? '');
  const [taxId, setTaxId] = useState('');

  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [phone, setPhone] = useState(user.phone ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [billingInformationId, setBillingInformationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadBillingInformation = async () => {
      try {
        const response = await apiClient.get('/billing-informations/me');
        const billingInformation = Array.isArray(response.data) ? response.data[0] : null;

        if (!billingInformation) {
          return;
        }

        const savedAddress = billingInformation.address || {};
        setBillingInformationId(String(billingInformation.id));
        setName(billingInformation.name ?? '');
        setTaxId(billingInformation.taxId ?? '');
        setAddress(savedAddress.address ?? '');
        setProvince(savedAddress.province ?? '');
        setDistrict(savedAddress.district ?? '');
        setSubDistrict(savedAddress.subDistrict ?? '');
        setPostalCode(savedAddress.postalCode ?? '');
        setPhone(billingInformation.phoneNumber ?? '');
        setEmail(billingInformation.email ?? '');
        setTaxType(savedAddress.taxType === 'company' ? 'company' : 'individual');
      } catch (error: any) {
        console.log('[TaxInfo] Load failed', {
          status: error?.response?.status,
          message: error?.response?.data?.message || error?.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBillingInformation();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(
        'Incomplete Information',
        taxType === 'company'
          ? 'Please enter company name.'
          : 'Please enter your name.',
      );
      return;
    }

    if (!taxId.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your Tax ID.');
      return;
    }

    if (!address.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your address.');
      return;
    }

    if (!province.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your province.');
      return;
    }

    if (!district.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your district.');
      return;
    }

    if (!subDistrict.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your sub-district.');
      return;
    }

    if (!postalCode.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your postal code.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your phone number.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Incomplete Information', 'Please enter your email.');
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        name: name.trim(),
        taxId: taxId.trim(),
        phoneNumber: phone.trim(),
        email: email.trim(),
        address: {
          taxType,
          address: address.trim(),
          province: province.trim(),
          district: district.trim(),
          subDistrict: subDistrict.trim(),
          postalCode: postalCode.trim(),
        },
      };

      const response = billingInformationId
        ? await apiClient.put(`/billing-informations/${billingInformationId}`, payload)
        : await apiClient.post('/billing-informations', payload);

      setBillingInformationId(String(response.data?.id ?? billingInformationId));
      Alert.alert('Success', 'Your tax information has been saved successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      console.log('[TaxInfo] Save failed', {
        status: error?.response?.status,
        message: error?.response?.data?.message || error?.message,
      });
      Alert.alert('Error', 'Unable to save tax information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
  }: {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    keyboardType?: any;
  }) => {
    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder ?? label}
          placeholderTextColor="#94A3B8"
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Tax Information</Text>

            <Text style={styles.headerSubtitle}>
              Manage your billing information
            </Text>
          </View>
        </View>

        {/* INFO CARD */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="document-text-outline" size={25} color="#16A34A" />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Tax Invoice Information</Text>

            <Text style={styles.infoText}>
              Save your information once and use it when requesting a tax
              invoice.
            </Text>
          </View>
        </View>

        {/* TAX TYPE */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Type</Text>

          <View style={styles.typeContainer}>
            {/* INDIVIDUAL */}

            <TouchableOpacity
              style={[
                styles.typeButton,
                taxType === 'individual' && styles.typeButtonActive,
              ]}
              onPress={() => setTaxType('individual')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="person-outline"
                size={22}
                color={taxType === 'individual' ? '#16A34A' : '#64748B'}
              />

              <Text
                style={[
                  styles.typeText,
                  taxType === 'individual' && styles.typeTextActive,
                ]}
              >
                Individual
              </Text>

              {taxType === 'individual' && (
                <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
              )}
            </TouchableOpacity>

            {/* COMPANY */}

            <TouchableOpacity
              style={[
                styles.typeButton,
                taxType === 'company' && styles.typeButtonActive,
              ]}
              onPress={() => setTaxType('company')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="business-outline"
                size={22}
                color={taxType === 'company' ? '#16A34A' : '#64748B'}
              />

              <Text
                style={[
                  styles.typeText,
                  taxType === 'company' && styles.typeTextActive,
                ]}
              >
                Company
              </Text>

              {taxType === 'company' && (
                <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* TAX DETAILS */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name={
                taxType === 'company'
                  ? 'business-outline'
                  : 'person-circle-outline'
              }
              size={22}
              color="#16A34A"
            />

            <Text style={styles.sectionTitle}>
              {taxType === 'company'
                ? 'Company Information'
                : 'Personal Information'}
            </Text>
          </View>

          <Input
            label={taxType === 'company' ? 'Company Name' : 'Full Name'}
            value={name}
            onChangeText={setName}
            placeholder={
              taxType === 'company'
                ? 'Enter company name'
                : 'Enter your full name'
            }
          />

          <Input
            label="Tax ID"
            value={taxId}
            onChangeText={setTaxId}
            placeholder="Enter Tax ID"
            keyboardType="numeric"
          />
        </View>

        {/* ADDRESS */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="location-outline" size={22} color="#16A34A" />

            <Text style={styles.sectionTitle}>Billing Address</Text>
          </View>

          <Input
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="House number, street, building..."
          />

          <Input
            label="Province"
            value={province}
            onChangeText={setProvince}
            placeholder="Enter province"
          />

          <Input
            label="District"
            value={district}
            onChangeText={setDistrict}
            placeholder="Enter district"
          />

          <Input
            label="Sub-district"
            value={subDistrict}
            onChangeText={setSubDistrict}
            placeholder="Enter sub-district"
          />

          <Input
            label="Postal Code"
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Enter postal code"
            keyboardType="numeric"
          />
        </View>

        {/* CONTACT */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call-outline" size={22} color="#16A34A" />

            <Text style={styles.sectionTitle}>Contact Information</Text>
          </View>

          <Input
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Input
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            keyboardType="email-address"
          />
        </View>

        {/* SECURITY NOTICE */}

        <View style={styles.noticeBox}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#16A34A" />

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Your information is secure</Text>

            <Text style={styles.noticeText}>
              This information will be used only for issuing tax invoices.
            </Text>
          </View>
        </View>

        {/* SAVE */}

        <TouchableOpacity
          style={[styles.saveButton, (isLoading || isSaving) && styles.saveButtonDisabled]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={isLoading || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={21} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Tax Information</Text>
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

  // =========================
  // HEADER
  // =========================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

  headerTextContainer: {
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

  // =========================
  // INFO
  // =========================

  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#166534',
  },

  infoText: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: '#166534',
  },

  // =========================
  // SECTION
  // =========================

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  // =========================
  // TYPE
  // =========================

  typeContainer: {
    gap: 10,
  },

  typeButton: {
    minHeight: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  typeButtonActive: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },

  typeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },

  typeTextActive: {
    color: '#166534',
    fontWeight: '700',
  },

  // =========================
  // INPUT
  // =========================

  inputGroup: {
    marginBottom: 17,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  input: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#111827',
  },

  // =========================
  // NOTICE
  // =========================

  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },

  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#166534',
  },

  noticeText: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: '#166534',
  },

  // =========================
  // SAVE
  // =========================

  saveButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonText: {
    marginLeft: 9,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },
});
