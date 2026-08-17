import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigator from './HomeNavigator';

import WalletScreen from '../screens/Wallet/WalletScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
// import ChargingNavigator from './ChargingNavigator';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />

      <Tab.Screen name="Wallet" component={WalletScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      {/* <Tab.Screen name="Charging" component={ChargingNavigator} /> */}
    </Tab.Navigator>
  );
}
