import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { getMe } from '../api/auth.api';
import { getJwt, saveUser, clearAuthStorage } from '../storage/authStorage';

type AuthBootstrapProps = {
  children: (
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void,
  ) => React.ReactNode;
};

const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const jwt = getJwt();

        if (!jwt) {
          setIsAuthenticated(false);
          return;
        }

        const user = await getMe();

        console.log('===== AUTH RESTORE =====');
        console.log('User:', user);
        console.log('========================');

        if (user) {
          saveUser(user);
          setIsAuthenticated(true);
        } else {
          clearAuthStorage();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('===== AUTH RESTORE FAILED =====');
        console.log(error);

        clearAuthStorage();
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    console.log('===== AUTH LOGIN STATE =====');

    setIsAuthenticated(true);

    console.log('Authentication state:', true);
    console.log('============================');
  };

  const logout = () => {
    console.log('===== LOGOUT START =====');

    clearAuthStorage();

    console.log('JWT removed');
    console.log('User removed');

    setIsAuthenticated(false);

    console.log('Authentication state:', false);
    console.log('===== LOGOUT SUCCESS =====');
  };

  if (checkingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children(isAuthenticated, login, logout)}</>;
};

export default AuthBootstrap;
