import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/Profile/ProfileScreen';
import PersonalInformationScreen from '../screens/Profile/PersonalInformationScreen';
import CreditPaymentScreen from '../screens/Profile/CreditPayment/CreditPaymentScreen';
import AddCreditCardScreen from '../screens/Profile/CreditPayment/AddCreditCardScreen';
import PromotionScreen from '../screens/Profile/Promotion/PromotionScreen';
import PromotionDetailScreen from '../screens/Profile/Promotion/PromotionDetailScreen';
import MyCouponsScreen from '../screens/Profile/Promotion/MyCouponsScreen';
import ChargingStationsScreen from '../screens/Profile/ChargingStations/ChargingStationsScreen';
import AboutScreen from '../screens/Profile/About/AboutScreen';
import LanguageScreen from '../screens/Profile/LanguageScreen';
import ServiceScreen from '../screens/Profile/ServiceScreen/ServiceScreen';
import FeedbackScreen from '../screens/Profile/ServiceScreen/FeedbackScreen';
import OnlineServiceScreen from '../screens/Profile/ServiceScreen/OnlineServiceScreen';
export type ProfileStackParamList = {
  ProfileHome: undefined;
  PersonalInformation: undefined;
  CreditPayment: undefined;
  AddCreditCard: undefined;
  Promotion: undefined;
  PromotionDetail: undefined;
  MyCoupons: undefined;
  ChargingStations: undefined;
  About: undefined;
  Language: undefined;
  Service: undefined;
  Feedback: undefined;
  OnlineService: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />

      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
      />

      <Stack.Screen name="CreditPayment" component={CreditPaymentScreen} />

      <Stack.Screen name="AddCreditCard" component={AddCreditCardScreen} />

      <Stack.Screen name="Promotion" component={PromotionScreen} />

      <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />

      <Stack.Screen name="MyCoupons" component={MyCouponsScreen} />

      <Stack.Screen
        name="ChargingStations"
        component={ChargingStationsScreen}
      />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="OnlineService" component={OnlineServiceScreen} />
    </Stack.Navigator>
  );
}
