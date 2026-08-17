import React from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
interface Props {
  onPress: () => void;
}

export default function ShowListButton({ onPress }: Props) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{t('showList')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',

    bottom: 10,

    alignSelf: 'center',

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 30,

    paddingVertical: 12,

    borderRadius: 30,

    elevation: 8,

    shadowColor: '#000',

    shadowOpacity: 0.15,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  text: {
    fontSize: 15,

    fontWeight: '700',

    color: '#111827',
  },
});
