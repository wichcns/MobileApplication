import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HistoryScreen from '../screens/History/HistoryScreen';
import ChargingHistoryDetail from '../screens/History/ChargingHistoryDetail';
import TaxInvoiceRequest from '../screens/History/TaxInvoiceRequest';
const Stack = createNativeStackNavigator();

export default function HistoryNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryHome" component={HistoryScreen} />

      <Stack.Screen
        name="ChargingHistoryDetail"
        component={ChargingHistoryDetail}
      />
      <Stack.Screen name="TaxInvoiceRequest" component={TaxInvoiceRequest} />
    </Stack.Navigator>
  );
}
