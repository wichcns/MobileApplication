// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomNavigator from './BottomTabNavigator';

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <BottomNavigator />
//     </NavigationContainer>
//   );
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
