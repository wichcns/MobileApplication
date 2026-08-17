import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QRScreen from '../screens/QRScanner/QRScreen';

const Stack = createNativeStackNavigator();

export default function QRNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="QRScanner" component={QRScreen} />
    </Stack.Navigator>
  );
}
