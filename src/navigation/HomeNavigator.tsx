import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';

import SelectConnectorScreen from '../screens/Charging/SelectConnectorScreen';
import QRScannerScreen from '../screens/Charging/QRScannerScreen';
import ChargingScreen from '../screens/Charging/ChargingScreen';
import ReadyToChargeScreen from '../screens/Charging/ReadyToChargeScreen';
import ChargingSummaryScreen from '../screens/Charging/ChargingSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ReceiptScreen from '../screens/Payment/ReceiptScreen';
import TaxInvoiceScreen from '../screens/Charging/TaxInvoiceScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />

      <Stack.Screen name="SelectConnector" component={SelectConnectorScreen} />

      <Stack.Screen name="ReadyToCharge" component={ReadyToChargeScreen} />

      <Stack.Screen name="QRScanner" component={QRScannerScreen} />

      <Stack.Screen name="Charging" component={ChargingScreen} />

      <Stack.Screen name="ChargingSummary" component={ChargingSummaryScreen} />

      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
      <Stack.Screen name="TaxInvoice" component={TaxInvoiceScreen} />
    </Stack.Navigator>
  );
}
