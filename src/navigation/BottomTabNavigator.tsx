import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigator from './HomeNavigator';
// import ChargingNavigator from './ChargingNavigator';
import HistoryNavigator from './HistoryNavigator';
import QRNavigator from './QRNavigator';

// import WalletScreen from '../screens/Wallet/WalletScreen';
import WalletNavigator from './WalletNavigator';
import ProfileNavigator from './ProfileNavigator';

import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A651',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;

            case 'History':
              iconName = 'time';
              break;

            case 'QR':
              iconName = 'qr-code';
              break;

            case 'Wallet':
              iconName = 'wallet';
              break;

            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Wallet" component={WalletNavigator} />

      <Tab.Screen name="QR" component={QRNavigator} />

      {/* <Tab.Screen name="Wallet" component={WalletScreen} /> */}
      {/* <Tab.Screen name="Charging" component={ChargingNavigator} /> */}
      <Tab.Screen name="History" component={HistoryNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
