import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeNavigator from './HomeNavigator';
import HistoryNavigator from './HistoryNavigator';
import QRNavigator from './QRNavigator';
import WalletNavigator from './WalletNavigator';
import ProfileNavigator from './ProfileNavigator';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

type BottomNavigatorProps = {
  onLogout: () => void;
};

export default function BottomNavigator({ onLogout }: BottomNavigatorProps) {
  const { t } = useTranslation();

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
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: t('bottomTab.home'),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={WalletNavigator}
        options={{
          tabBarLabel: t('bottomTab.wallet'),
        }}
      />

      <Tab.Screen
        name="QR"
        component={QRNavigator}
        options={{
          tabBarLabel: t('bottomTab.qr'),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryNavigator}
        options={{
          tabBarLabel: t('bottomTab.history'),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: t('bottomTab.profile'),
        }}
      >
        {() => <ProfileNavigator onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
