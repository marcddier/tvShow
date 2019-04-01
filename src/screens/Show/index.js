import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default ShowScreen = ( data ) => {
  const value = data.navigation.state.params.data
  console.log(value)
  let summary = cleanText = value.show.summary.replace(/<\/?[^>]+(>|$)/g, "");
  return (
    <View style={styles.container}>
      { value.show.image && value.show.image.medium ? <Image source={{ uri: value.show.image.medium}} style={{width: 100, height: 160}}/> : null }
      <Text style={{ fontWeight: 'bold'}}>{value.show.name}</Text>
      <Text>description: {summary}</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Expo.Constants.statusBarHeight,
    alignItems: "center"
  },
})