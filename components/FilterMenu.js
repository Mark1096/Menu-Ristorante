import React from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet } from 'react-native';
import FilterItem from "./FilterItem";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default class FilterMenu extends React.Component {
  
  static navigationOptions = ({navigation}) => {
     return {
      title: "Ingredienti",
      headerLeft: (
        <View>
            <TouchableOpacity 
              onPress={ () => navigation.goBack()}>
              <MaterialIcons 
                style={{paddingHorizontal: 5, marginBottom: 32}}
                name={"arrow-back"}
                size={40} 
                color={"black"}
              />
            </TouchableOpacity>          
        </View>
      ),
      headerRight: (
        <View></View>
      )
    }
  };

  state = {
    listIngredients: [],
  }

  _delDoubleItem = list => {
    var ingredients = [];
    var index = 0;
    var container;
    for(var i = 0; i < list.length; i++) {
      container = list[i];
      for(var j = 0; j < container.length; j++) {
        ingredients[index++] = container[j];  // prende la stringa corrente, converte il primo carattere da maiuscolo a minuscolo e lo unisce al resto della stringa; infine lo copia in ingredients
      }
    }
    let x = Array.from(new Set(ingredients));  // funzione che serve ad eliminare valori duplicati in un array
    let final = x.sort();    // ordina l'array in modo crescente
    let newList = [];
    final.map(child => 
      newList.push({
        ingredient: child,
        select: false,
      })  
    )
    this.setState({listIngredients: newList});  
  }

  componentWillMount() {
    var list = this.props.navigation.getParam("ingredients");
    this._delDoubleItem(list);
  }

  _toggle = item => {
    let list = this.state.listIngredients.map(currentItem =>
      currentItem == item ? {...currentItem,  select: !currentItem.select} : currentItem
    );
    this.setState({listIngredients: list});
  }

  _filter = item => {
    console.log("Done");
    var onFilter = this.props.navigation.getParam("onFilter");
    let newList = this.state.listIngredients.filter(currentItem => {
      return(currentItem.select == true)
    });
    onFilter(newList);
    this.props.navigation.goBack();
  }

  _reset = () => {
    console.log("Reset");
    let newList = [];
    this.state.listIngredients.forEach(child => {
      newList.push({
        ingredient: child.ingredient,
        select: false,
      })
    })
    this.setState({listIngredients: newList});
  }

  renderItems = ({item}) => (
    <FilterItem 
      data={item} 
      onToggle={() => this._toggle(item)} 
    />
  )

  _keyExtractor = (item, index) => {
    item.id = index;
    return String(index);
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.listIngredients}
          renderItem={this.renderItems}
          keyExtractor={this._keyExtractor} 
        /> 
        <View style={styles.showButton}>
          <TouchableOpacity 
            onPress={this._reset}>
            <View style={[styles.button, {backgroundColor: "white", color: "#00E5EE", borderColor: "#00E5EE"}]}>
              <Text style={[styles.textButton, {color: "#00E5EE"}]}> Reset </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._filter}>
            <View style={[styles.button, {marginLeft: 25, borderWidth: 0}]}>
              <Text style={[styles.textButton, {color: "white"}]}> Done </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  showButton: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 170,
    height: 70,
    backgroundColor: "#00E5EE",
    justifyContent: "center",
    alignItems: "center",   
    borderWidth: 2,
    borderRadius: 5,
  },
  textButton: {
    fontSize: 22,
    fontWeight: "bold",
  }
})