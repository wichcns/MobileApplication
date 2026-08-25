import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import BottomNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

type AppNavigatorProps = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export default function AppNavigator({
  isAuthenticated,
  login,
  logout,
}: AppNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Main">
          {() => <BottomNavigator onLogout={logout} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {() => <AuthNavigator login={login} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
