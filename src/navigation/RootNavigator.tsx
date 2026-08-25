import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';
import AuthBootstrap from './AuthBootstrap';

export default function RootNavigator() {
  return (
    <AuthBootstrap>
      {(isAuthenticated, login, logout) => (
        <NavigationContainer>
          <AppNavigator
            isAuthenticated={isAuthenticated}
            login={login}
            logout={logout}
          />
        </NavigationContainer>
      )}
    </AuthBootstrap>
  );
}
