import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import FilterMenu from "./FilterMenu";
import Detail from "./Detail";
import MenuComponent from "./MenuComponent";
import SearchBar from "./SearchBar";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

class Menu extends React.Component {

  state = {
    checklist: [], 
    inputSearch: false,
  }

  static navigationOptions = ({navigation}) => {
    var research = navigation.getParam("research");
    var filter = navigation.getParam("filter");
    return {
      title: "Menu",
      headerRight: (
        <TouchableOpacity 
          onPress={() => navigation.navigate("FilterMenu", { 
          onFilter: navigation.getParam("filter"), 
          ingredients: navigation.getParam("list")
          })
        }>
          <AntDesign 
            style={{marginRight: 10, marginBottom: 40}}
            name={"filter"}
            size={40} 
            color={"black"}
          />
        </TouchableOpacity>
      ), 
      headerLeft: (
        <View>
          { research? (
            <TouchableOpacity 
              onPress={navigation.getParam("loadMenu")}>
              <MaterialIcons 
                style={{paddingHorizontal: 5, marginBottom: 32}}
                name={"arrow-back"}
                size={40} 
                color={"black"}
              />
            </TouchableOpacity>) : null
          }
        </View>
      ) 
    }
  }

  _upperCaseElement = list => {
    let array = list.map( currentItem => {
      let ingredient = currentItem.ingredients;
      for(var i = 0; i < ingredient.length; i++) {
        ingredient[i] = ingredient[i].charAt(0).toUpperCase() + ingredient[i].slice(1);
      }
      return currentItem;  
    })
    return array;
  }

  async _loadMenu() {
    console.log("dentro loadMenu");
    this.props.navigation.setParams({research: false});
    var response = await fetch("http://www.dmi.unict.it/~calanducci/LAP2/food.json").then(response => response.json()); 
    let array = this._upperCaseElement(response.data);
    this.setState({checklist: array || [], inputSearch: false});
  }

  componentWillMount() {
    this._loadMenu();   
  } 

  async componentDidMount() {
    var response = await fetch("http://www.dmi.unict.it/~calanducci/LAP2/food.json").then(response => response.json());
    let list = this._upperCaseElement(response.data);
    var array = [];
    for(var i = 0; i < list.length; i++) {
      array[i] = list[i].ingredients;
    }
    this.props.navigation.setParams({loadMenu: () => this._loadMenu(), list: array, filter: item => this._filter(item)});
  }

  _filter = item => {
    console.log("filter: ", item.length);
    let filterList = [];
    let index = 0;
    for(var i = 0; i < item.length; i++) {
      let ingredient = item[i].ingredient;
      console.log(ingredient);
      filterList[index++] = this.state.checklist.filter(currentItem => {
        return (currentItem.ingredients.includes(ingredient));
      })
    }
    let list = [];
    let index2 = 0;
    for(var i = 0; i < filterList.length; i++) {
      container = filterList[i];
      for(var j = 0; j < container.length; j++) {
        list[index2++] = container[j];      // prende la stringa corrente, converte il primo carattere da maiuscolo a minuscolo e lo unisce al resto della stringa; infine lo copia in ingredients
      }
    }
    console.log("lista finale: ", list);
    this.props.navigation.setParams({research: true});
    this.setState({checklist: list || [], inputSearch: true});
  }

  async _search(text){    
    var response = await fetch("http://www.dmi.unict.it/~calanducci/LAP2/food.json").then(response => response.json());
    var container = response.data.filter( item => {return (item.category === text || item.name === text)});
    this.props.navigation.setParams({research: true});
    this.setState({checklist: container || [], inputSearch: true});
  }
  
  renderItems = ({item}) => {
    return(
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Detail", {
          data: item
        })}
      >
        <View>
          <MenuComponent data={item} />
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item, index) => {
    return String(index);
  }

  render() {
    return ( 
      <View style={styles.container}>
        <SearchBar 
          data={this.state.inputSearch}
          onSubmit={text => this._search(text)} 
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
    Detail: Detail,
  },
  {
    defaultNavigationOptions: {
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
  },
);

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})