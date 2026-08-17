import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface Props {
  title: string;

  subtitle?: string;

  icon: React.ComponentProps<typeof Ionicons>['name'];

  color?: string;

  onPress?: () => void;
}

export default function QuickActionCard({
  title,
  subtitle,
  icon,
  color = '#00A651',
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons name={icon} size={26} color="#FFFFFF" />
      </View>

      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    paddingVertical: 20,

    alignItems: 'center',

    marginBottom: 14,

    elevation: 3,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  iconContainer: {
    width: 58,

    height: 58,

    borderRadius: 29,

    justifyContent: 'center',

    alignItems: 'center',
  },

  title: {
    marginTop: 14,

    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },

  subtitle: {
    marginTop: 5,

    fontSize: 12,

    color: '#6B7280',

    textAlign: 'center',

    paddingHorizontal: 10,
  },
});
