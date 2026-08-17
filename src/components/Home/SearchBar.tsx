import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search EV Station..."
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    borderRadius:16,
    paddingHorizontal:15,
    height:52,
    justifyContent:'center',
    marginBottom:20,
    elevation:3,
  }
});