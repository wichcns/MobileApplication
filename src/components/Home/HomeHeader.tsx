// import React from 'react';
// import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';

// import { Images } from '../../assets';

// import Colors from '../../theme/colors';
// import Radius from '../../theme/radius';

// export default function HomeHeader() {
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.card}>
//         {/* Left */}
//         <View style={styles.left}>
//           <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
//             <Ionicons name="menu" size={22} color={Colors.icon} />
//           </TouchableOpacity>

//           <Image source={Images.logoLong300} style={styles.logo} />
//         </View>

//         {/* Right */}
//         <View style={styles.right}>
//           <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
//             <Ionicons
//               name="notifications-outline"
//               size={22}
//               color={Colors.icon}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
//             <Ionicons name="person-outline" size={22} color={Colors.icon} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     position: 'absolute',
//     top: 55,
//     left: 16,
//     right: 16,
//     zIndex: 100,
//   },

//   card: {
//     height: 64,

//     backgroundColor: '#c0c0c2',

//     borderRadius: Radius.lg,

//     paddingHorizontal: 14,

//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     alignItems: 'center',

//     borderWidth: 1,

//     borderColor: '#D7DDE5',

//     elevation: 4,

//     shadowColor: '#000',

//     shadowOpacity: 0.05,

//     shadowRadius: 8,

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//   },

//   left: {
//     flexDirection: 'row',

//     alignItems: 'center',
//   },

//   logoContainer: {
//     position: 'absolute',

//     left: 0,
//     right: 0,

//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   logo: {
//     width: 180,
//     height: 42,
//     resizeMode: 'contain',
//   },

//   right: {
//     flexDirection: 'row',

//     alignItems: 'center',
//   },

//   iconButton: {
//     width: 40,

//     height: 40,

//     borderRadius: 20,

//     backgroundColor: '#FFFFFF',

//     justifyContent: 'center',

//     alignItems: 'center',

//     marginLeft: 8,

//     borderWidth: 1,

//     borderColor: '#E9EDF2',
//   },
// });
