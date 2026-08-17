// import React from 'react';

// import { View, Text, FlatList, StyleSheet } from 'react-native';

// import { stations } from '../../../data/stations';

// import StationCard from './StationCard';

// import { colors } from '../../../theme/colors';
// import { spacing } from '../../../theme/spacing';
// import { radius } from '../../../theme/radius';
// import { shadows } from '../../../theme/shadow';

// interface StationBottomSheetProps {
//   expanded?: boolean;
// }

// const StationBottomSheet = ({ expanded = false }: StationBottomSheetProps) => {
//   return (
//     <View style={[styles.container, expanded && styles.expanded]}>
//       <View style={styles.handle} />

//       <Text style={styles.title}>Nearby Station</Text>

//       <Text style={styles.subtitle}>{stations.length} Stations Available</Text>

//       {expanded && (
//         <FlatList
//           data={stations}
//           keyExtractor={item => item.id.toString()}
//           renderItem={({ item }) => <StationCard station={item} />}
//         />
//       )}
//     </View>
//   );
// };

// export default StationBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',

//     bottom: 0,

//     left: 0,

//     right: 0,

//     backgroundColor: colors.surface,

//     height: 140,

//     borderTopLeftRadius: radius.xl,

//     borderTopRightRadius: radius.xl,

//     padding: spacing.lg,

//     ...shadows.bottomSheet,
//   },

//   expanded: {
//     height: '70%',
//   },

//   handle: {
//     width: 40,

//     height: 5,

//     borderRadius: 5,

//     backgroundColor: colors.border,

//     alignSelf: 'center',

//     marginBottom: spacing.md,
//   },

//   title: {
//     fontSize: 20,

//     fontWeight: '600',

//     color: colors.text.primary,
//   },

//   subtitle: {
//     marginTop: spacing.sm,

//     color: colors.text.secondary,
//   },
// });
