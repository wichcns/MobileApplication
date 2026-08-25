import React, { useEffect } from 'react';
import './src/i18n';

import RootNavigator from './src/navigation/RootNavigator';
import { configureGoogleSignIn } from './src/config/googleSignIn';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return <RootNavigator />;
}