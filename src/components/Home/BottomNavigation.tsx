import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


export default function BottomNavigation() {


  const menus = [
    {
      icon: '🏠',
      title: 'Home',
    },

    {
      icon: '📍',
      title: 'Station',
    },

    {
      icon: '⚡',
      title: 'Charging',
    },

    {
      icon: '💳',
      title: 'Wallet',
    },

    {
      icon: '👤',
      title: 'Profile',
    },

  ];


  return (

    <View style={styles.container}>

      {
        menus.map((item,index)=>(

          <TouchableOpacity
            key={index}
            style={styles.menu}
          >

            <Text style={styles.icon}>
              {item.icon}
            </Text>


            <Text style={styles.title}>
              {item.title}
            </Text>


          </TouchableOpacity>

        ))
      }


    </View>

  );

}



const styles = StyleSheet.create({

  container:{

    position:'absolute',

    bottom:0,

    left:0,

    right:0,


    height:80,


    backgroundColor:'#FFFFFF',


    flexDirection:'row',

    justifyContent:'space-around',

    alignItems:'center',


    borderTopLeftRadius:24,

    borderTopRightRadius:24,


    elevation:15,


    shadowColor:'#000',

    shadowOpacity:0.1,

    shadowRadius:10,

    shadowOffset:{
      width:0,
      height:-3,
    },

  },


  menu:{


    alignItems:'center',

    justifyContent:'center',


  },


  icon:{

    fontSize:24,

  },


  title:{

    fontSize:11,

    marginTop:4,

    color:'#6B7280',

  },


});