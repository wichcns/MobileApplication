import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/Register/RegisterScreen';
import PhoneLoginScreen from '../screens/Auth/PhoneLogin/PhoneLoginScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';

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
      <Stack.Screen name="PhoneLogin">
        {() => <PhoneLoginScreen onLogin={login} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
