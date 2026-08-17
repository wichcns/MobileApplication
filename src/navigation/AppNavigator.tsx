import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />

      <Stack.Screen name="Main" component={BottomNavigator} />
    </Stack.Navigator>
  );
}
