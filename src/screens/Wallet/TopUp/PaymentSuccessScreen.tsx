import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation, useRoute } from '@react-navigation/native';


export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();

  const route = useRoute<any>();

  const amount = route.params?.amount ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name="checkmark" size={60} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Payment Confirmed</Text>

        <Text style={styles.subtitle}>Your wallet balance has been updated by the payment server</Text>

        <Text style={styles.amount}>+ ฿{amount.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('WalletHome');
          }}
        >
          <Text style={styles.buttonText}>Back to Wallet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',

    padding: 20,
  },

  icon: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: '#00A651',

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    fontSize: 26,

    fontWeight: '800',

    marginTop: 30,

    color: '#111827',
  },

  subtitle: {
    marginTop: 10,

    color: '#64748B',
  },

  amount: {
    marginTop: 25,

    fontSize: 36,

    fontWeight: '900',

    color: '#00A651',
  },

  button: {
    marginTop: 50,

    width: '100%',

    backgroundColor: '#00A651',

    padding: 18,

    borderRadius: 18,

    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',

    fontSize: 17,

    fontWeight: '700',
  },
});
