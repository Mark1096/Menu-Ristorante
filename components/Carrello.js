import React from 'react';
import { Text, View, StyleSheet, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import CartComponent from "./CartComponent";
import { ScrollView } from 'react-native-gesture-handler';
import Ordina from "./Ordina";
import { createStackNavigator } from 'react-navigation-stack';

class Carrello extends React.Component {

  state = { 
    orderList: [],
    total: 0,
  }

  static navigationOptions = ({navigation}) => {
    return{
      title: "Il mio ordine",
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
/*
  componentWillMount() {
    console.log("componentWillMount");
    AsyncStorage.setItem('orderList', JSON.stringify([]));
  }
*/
  _totalPrice = array => {
    let total = 0;
    array.map((lang, index) => {
      total += lang.orderPrice;
    })
    return total;
  }

  async componentDidMount() {
    console.log("ComponentDidMount");
    let list = [];
    const res = await AsyncStorage.getItem('orderList').then(response => this.setState({orderList: JSON.parse(response) || [] }));
    let item = this.props.navigation.getParam("data");
    let finalPrice = 0;
    let i;
    let bool = false;
    this.state.orderList.map((lang, index) => {     // questi passaggi servono a rendere cumulativi i cibi già inseriti nel carrello e non crearne altri nella lista con lo stesso nome
      if(lang.name == item.name){
        i = index;
        bool = true;
      }
    }) 
    if(bool) {
      let order = [...this.state.orderList];
      let obj = {
        count: order[i].count + item.count,
        name: item.name,
        orderPrice: order[i].orderPrice + item.orderPrice,
      }
      order[i] = {...obj};
      finalPrice = this._totalPrice(order);
      this.setState({orderList: order || [], total: finalPrice});
      AsyncStorage.setItem('orderList', JSON.stringify(order));
      return;
    }
    list = [...this.state.orderList, this.props.navigation.getParam("data")];
    finalPrice = this._totalPrice(list);
    this.setState({orderList: list || [], total: finalPrice});
    AsyncStorage.setItem('orderList', JSON.stringify(list));
  }

  _clearList = () => {
    console.log("Sto per svuotare la lista del carrello");
    this.setState({orderList: [], total: 0});
    AsyncStorage.setItem('orderList', JSON.stringify([]));
  }

  _renderItems = ({item}) => {
    return (
      <View>
        <CartComponent data={item} />
      </View>
    )
  }

  _keyExtractor = (item, index) => {
    return String(index);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={this.state.orderList}
            renderItem={this._renderItems}
            keyExtractor={this._keyExtractor} 
          />
          <View style={styles.total}>
            <Text style={{fontSize: 20}}> Totale </Text>
            <Text style={{fontSize: 20, fontWeight: "bold"}}> {this.state.total}€ </Text>
          </View>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate("Ordina", {
              onClear: () => this._clearList(),
              list: this.state.orderList,
            })} >
            <View style={styles.button}>    
                <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}> Vai al pagamento </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const CartNavigator = createStackNavigator({
    Carrello: Carrello,
    Ordina: Ordina,
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

export default CartNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  
  text: {
    color: "black",
    fontSize: 20,
  },
  total: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#00E5EE",
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  }
})