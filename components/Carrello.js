import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class Carrello extends React.Component{
  render() {
    return (
      <View>
        <Text style={styles.text}> Sono Carrello </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 20,
  }
})