import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from '@react-native-vector-icons/ionicons';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  CreditPayment: undefined;
  AddCreditCard: undefined;
  Promotion: undefined;
  PromotionDetail: undefined;
  MyCoupons: undefined;
  ChargingStations: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'ChargingStations'>;

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSej3NSsECCfUPddwcpsiSwYxduIcZZl0D0pcIQao0vu1VPgtw/viewform';

export default function ChargingStationsScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>แบบประเมินการใช้งาน</Text>

        <View style={styles.headerRight} />
      </View>

      {/* Google Form */}
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: GOOGLE_FORM_URL }}
          style={styles.webView}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563EB" />

            <Text style={styles.loadingText}>กำลังโหลดแบบประเมิน...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  headerRight: {
    width: 40,
  },

  webViewContainer: {
    flex: 1,
    position: 'relative',
  },

  webView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
});
