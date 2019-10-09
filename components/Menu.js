import React from 'react';
import { Text, View, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import FilterMenu from "./FilterMenu";
import MenuComponent from "./MenuComponent";
import SearchBar from "./SearchBar";


class Menu extends React.Component {

  state = {
    checklist: [], 
    risSearch: "",
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "Menu",
      headerStyle: {
        backgroundColor: "#EAEAEA",
        borderBottomWidth: 2,
        borderBottomColor: "#AAAAAA", 
        height: 35,
      },
      headerTintColor: "black",
      headerTitleStyle: {  
        flex: 1,
        textAlign: "center",    
        marginBottom: 40,
        fontWeight: "bold",
        fontSize: 28 
      }, 
    }
  }

  async componentWillMount() {
    var response = await fetch("http://www.dmi.unict.it/~calanducci/LAP2/food.json").then(response => response.json());

    this.setState({checklist: response.data || []});   
  } 

  _saveInput = text => {
    console.log(text);
    this.setState({risSearch: text});
    console.log(this.state.risSearch);
  }

  renderItems = ({item}) => {
    return(
      <View>
        <MenuComponent data={item} />
      </View>
    )
  }

  _keyExtractor = (item, index) => {
    return String(index);
  }

  render() {
    return ( 
      <View style={styles.container}>
        <SearchBar 
          onSubmit={this._saveInput}
        />
        <FlatList
          data={this.state.checklist}
          renderItem={this.renderItems}
          keyExtractor={this._keyExtractor} 
        />
      </View>
    )
  }
}

const AppNavigator = createStackNavigator({
  Menu: Menu, 
  FilterMenu: FilterMenu,
});

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})