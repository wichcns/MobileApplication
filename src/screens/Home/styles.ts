import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.background,
  },

  searchContainer: {
    position: 'absolute',

    top: 20,

    left: 0,

    right: 0,
  },

  filter: {
    position: 'absolute',

    right: 32,

    top: 8,
  },

  floatingContainer: {
    position: 'absolute',

    right: 20,

    bottom: 150,
  },

  navigation: {
    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,
  },
});
