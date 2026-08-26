import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';

const Stack = createNativeStackNavigator();

type AuthNavigatorProps = {
  login: () => void;
};

export default function AuthNavigator({ login }: AuthNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login">
        {() => <LoginScreen onLogin={login} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {() => <RegisterScreen onLogin={login} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
