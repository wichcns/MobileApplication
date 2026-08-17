import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChargingScreen from '../screens/Charging/ChargingScreen';
import ChargingSummaryScreen from '../screens/Charging/ChargingSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ReceiptScreen from '../screens/Payment/ReceiptScreen';
import ReadyToChargeScreen from '../screens/Charging/ReadyToChargeScreen';
import TaxInvoiceScreen from '../screens/Charging/TaxInvoiceScreen';


const Stack = createNativeStackNavigator();

export default function ChargingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChargingScreen" component={ChargingScreen} />

      <Stack.Screen name="ChargingSummary" component={ChargingSummaryScreen} />

      <Stack.Screen name="Payment" component={PaymentScreen} />

      <Stack.Screen name="Receipt" component={ReceiptScreen} />

      <Stack.Screen name="TaxInvoice" component={TaxInvoiceScreen} />

      <Stack.Screen name="ReadyToCharge" component={ReadyToChargeScreen} />
    </Stack.Navigator>
  );
}
