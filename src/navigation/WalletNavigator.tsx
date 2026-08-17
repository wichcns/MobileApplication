import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WalletScreen from '../screens/Wallet/WalletScreen';

// import TopUpSection from '../screens/Wallet/Components/TopUpSection';

import PaymentMethodScreen from '../screens/Wallet/TopUp/PaymentMethodScreen';

import BankSelectionScreen from '../screens/Wallet/TopUp/BankSelectionScreen';

import QRPaymentScreen from '../screens/Wallet/TopUp/QRPaymentScreen';

import PaymentProcessingScreen from '../screens/Wallet/TopUp/PaymentProcessingScreen';

import PaymentSuccessScreen from '../screens/Wallet/TopUp/PaymentSuccessScreen';

import TransactionHistoryScreen from '../screens/Wallet/Transaction/TransactionHistoryScreen';
import TransactionDetailScreen from '../screens/Wallet/Transaction/TransactionDetailScreen';

const Stack = createNativeStackNavigator();

export default function WalletNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="WalletHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WalletHome" component={WalletScreen} />

      {/* <Stack.Screen name="TopUp" component={TopUpSection} /> */}

      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />

      <Stack.Screen name="BankSelection" component={BankSelectionScreen} />

      <Stack.Screen name="QRPayment" component={QRPaymentScreen} />

      <Stack.Screen
        name="PaymentProcessing"
        component={PaymentProcessingScreen}
      />

      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />

      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />

      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </Stack.Navigator>
  );
}
