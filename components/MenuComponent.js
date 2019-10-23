import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default class MenuComponent extends React.Component {

  _addSpace = array => {
    var contain = [];
    for(var i = 0; i < array.length; i++) {
      if(i < array.length-1) {
        contain += array[i] + ", ";
      }
      else {
        contain += array[i];
      }
    }
    return contain;
  } 

  render() {
    var {ingredients} = this.props.data;
    var list = this._addSpace(ingredients); 
    return(  
      <ScrollView>
        <View style={styles.container}>   
          <View style={{flex:2}}>
            <Text style={{fontSize: 18}}> {this.props.data.name} </Text>
            <Text numberOfLines={2} style={{fontSize: 15, color: "gray"}}> {list} </Text>
            <Text style={{fontSize: 20, color: "gray"}}> {this.props.data.price}€ </Text>
          </View>
          <View style={{flex:1, alignItems: "flex-end"}}>
            <Image source={{uri:this.props.data.image}} style={styles.image} /> 
          </View>
        </View> 
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  image: {
    width: 120,
    height: "100%",

  }
})